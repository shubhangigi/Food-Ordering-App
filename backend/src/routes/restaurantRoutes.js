console.log("restaurantRoutes.js loaded");
// Import Express
const express = require("express");

// Create Router
const router = express.Router();


// Import Controller
const {

    getAllRestaurants,

    createRestaurant

} = require("../controllers/restaurantController");


// GET all restaurants
router.get(

    "/",

    getAllRestaurants

);


// POST new restaurant
router.post("/", createRestaurant);


// Export Router
module.exports = router;