// Import PostgreSQL connection
const pool = require("../config/db");

/*
==================================================
GET ALL RESTAURANTS
==================================================

Purpose:
Fetch all restaurants from the database.
*/

const getAllRestaurants = async (req, res) => {

    try {

        // Fetch all restaurants
        const result = await pool.query(

            `SELECT *
             FROM restaurants
             ORDER BY id`

        );

        // Return restaurants
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
CREATE RESTAURANT
==================================================

Purpose:
Insert a new restaurant into the database.
*/

const createRestaurant = async (req, res) => {

    try {

        // Read data from Postman / React
        const {

            owner_id,
            restaurant_name,
            description,
            phone,
            email,
            cuisine,
            opening_time,
            closing_time,
            image_url,
            is_active

        } = req.body;


        // Insert restaurant into database
        const result = await pool.query(

            `INSERT INTO restaurants
            (
                owner_id,
                restaurant_name,
                description,
                phone,
                email,
                cuisine,
                opening_time,
                closing_time,
                image_url,
                is_active
            )

            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
            )

            RETURNING *`,

            [

                owner_id,
                restaurant_name,
                description,
                phone,
                email,
                cuisine,
                opening_time,
                closing_time,
                image_url,
                is_active

            ]

        );


        res.status(201).json({

            message: "Restaurant Created Successfully",

            restaurant: result.rows[0]

        });

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
EXPORT FUNCTIONS
==================================================
*/

module.exports = {

    getAllRestaurants,

    createRestaurant

};