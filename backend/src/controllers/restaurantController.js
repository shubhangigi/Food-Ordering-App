// Import the PostgreSQL connection
const pool = require("../config/db");

/*
==========================================
GET ALL RESTAURANTS
==========================================

Purpose:
Fetch every restaurant from the database.
*/

const getAllRestaurants = async (req, res) => {

    try {

        // Execute SQL query
        const result = await pool.query(
            "SELECT * FROM restaurants ORDER BY id"
        );

        // Send the data back as JSON
        res.status(200).json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch restaurants"
        });

    }

};


/*
==========================================
CREATE RESTAURANT
==========================================

Purpose:
Insert a new restaurant into PostgreSQL.
*/

const createRestaurant = async (req, res) => {

    try {

        // Read values sent from React/Postman
        const { name, location } = req.body;

        // Insert data into PostgreSQL
        const result = await pool.query(

            `INSERT INTO restaurants
            (name, location)

            VALUES($1,$2)

            RETURNING *`,

            [name, location]

        );

        // Return the inserted row
        res.status(201).json({

            message: "Restaurant Created Successfully",

            restaurant: result.rows[0]

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:"Unable to create restaurant"

        });

    }

};



// Export both functions
module.exports = {

    getAllRestaurants,

    createRestaurant

};