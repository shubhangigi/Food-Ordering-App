// Import Express
const express = require("express");

// Create Router
const router = express.Router();

// Import Controller Functions
const {

    getAllOrders,

    createOrder

} = require("../controllers/orderController");


/*
==========================================
GET ALL ORDERS
URL : GET /orders
==========================================
*/

router.get(

    "/",

    getAllOrders

);


/*
==========================================
CREATE ORDER
URL : POST /orders
==========================================
*/

router.post(

    "/",

    createOrder

);


// Export Router
module.exports = router;