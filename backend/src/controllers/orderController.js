// Import PostgreSQL Connection
const pool = require("../config/db");

/*
==================================================
GET ALL ORDERS
==================================================

Purpose:
Fetch all orders from the database.
*/

const getAllOrders = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT *
             FROM orders
             ORDER BY id`

        );

        res.status(200).json(result.rows);

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};



/*
==================================================
CREATE ORDER
==================================================

Purpose:
1. Create a new order.
2. Create all ordered items.
3. Save everything in one transaction.
*/

const createOrder = async (req, res) => {

    // Get one database connection
    const client = await pool.connect();

    try {

        // Start Transaction
        await client.query("BEGIN");

        // Read request body
        const {

            customer_id,
            restaurant_id,
            total_amount,
            items

        } = req.body;

        // Insert Order
        const orderResult = await client.query(

            `INSERT INTO orders
            (
                customer_id,
                restaurant_id,
                total_amount
            )

            VALUES
            (
                $1,$2,$3
            )

            RETURNING id`,

            [

                customer_id,
                restaurant_id,
                total_amount

            ]

        );

        // Get generated Order ID
        const orderId = orderResult.rows[0].id;

        /*
        Loop through every menu item
        and insert into order_items
        */

        for (const item of items) {

            await client.query(

                `INSERT INTO order_items
                (
                    order_id,
                    menu_item_id,
                    quantity,
                    price
                )

                VALUES
                (
                    $1,$2,$3,$4
                )`,

                [

                    orderId,
                    item.menu_item_id,
                    item.quantity,
                    item.price

                ]

            );

        }

        // Save everything permanently
        await client.query("COMMIT");

        res.status(201).json({

            message: "Order Placed Successfully",

            order_id: orderId

        });

    }

    catch(error){

        // Undo everything
        await client.query("ROLLBACK");

        console.error(error);

        res.status(500).json({

            message:error.message

        });

    }

    finally{

        // Return connection to pool
        client.release();

    }

};



module.exports = {

    getAllOrders,

    createOrder

};