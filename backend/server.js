const menuRoutes = require("./src/routes/menuRoutes");
const restaurantRoutes = require("./src/routes/restaurantRoutes");
const authRoutes = require("./src/routes/authRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./src/config/db");

const app = express();

console.log("Starting server...");

app.use(cors());
app.use(express.json());
app.use("/restaurants", restaurantRoutes);
app.use("/menu", menuRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Food Ordering API Running");
});

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log("End of server.js");