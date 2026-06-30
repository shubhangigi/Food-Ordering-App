console.log("menuRoutes.js loaded");
// Import Express
const express = require("express");

// Create Router Object
const router = express.Router();


// Import Controller Functions
const {

    getAllMenuItems,

    createMenuItem

} = require("../controllers/menuController");


// ============================================
// GET ALL MENU ITEMS
// URL: GET /menu
// ============================================

router.get(

    "/",

    getAllMenuItems

);


// ============================================
// ADD NEW MENU ITEM
// URL: POST /menu
// ============================================

router.post(

    "/",

    createMenuItem

);


// Export Router
module.exports = router;