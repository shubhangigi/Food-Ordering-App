// Import PostgreSQL connection
const pool = require("../config/db");

/*
==================================================
GET ALL MENU ITEMS
==================================================

Purpose:
Fetch all menu items from the database.
*/

const getAllMenuItems = async (req, res) => {

    try {

        // SQL Query to fetch all menu items
        const result = await pool.query(

            `SELECT * FROM menu_items
             ORDER BY id`

        );

        // Send menu items to client
        res.status(200).json(result.rows);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};



/*
==================================================
ADD MENU ITEM
==================================================

Purpose:
Insert a new menu item into the database.
*/

const createMenuItem = async (req, res) => {
console.log("MENU CONTROLLER REACHED");
    try {

        // Read data sent from React/Postman
        const {

            restaurant_id,
            item_name,
            description,
            price,
            category,
            image_url,
            is_available

        } = req.body;


        // SQL Insert Query
        const result = await pool.query(

            `INSERT INTO menu_items
            (
                restaurant_id,
                item_name,
                description,
                price,
                category,
                image_url,
                is_available
            )

            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7
            )

            RETURNING *`,

            [

                restaurant_id,
                item_name,
                description,
                price,
                category,
                image_url,
                is_available

            ]

        );


        res.status(201).json({

            message: "Menu Item Added Successfully",

            menuItem: result.rows[0]

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:error.message

        });

    }

};



module.exports = {

    getAllMenuItems,

    createMenuItem

};