const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("MySQL Connection Error:", err.message);
        return;
    }

    console.log("Connected to MySQL Database");
});

// Home Route - Serve index.html directly
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// 1. GET - Display All Products
app.get("/products", (req, res) => {
    const sql = "SELECT * FROM product_details ORDER BY product_id ASC";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

// 2. GET - Display Product by Product ID
app.get("/products/:product_id", (req, res) => {
    const sql = "SELECT * FROM product_details WHERE product_id = ?";

    db.query(sql, [req.params.product_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(results[0]);
    });
});

// 3. POST - Add a New Product
app.post("/products", (req, res) => {
    const {
        product_name,
        category,
        price,
        quantity,
        reorder_level
    } = req.body;

    if (
        !product_name ||
        !category ||
        price == null ||
        quantity == null ||
        reorder_level == null
    ) {
        return res.status(400).json({
            message: "Please provide all product details"
        });
    }

    const sql = `
        INSERT INTO product_details
        (product_name, category, price, quantity, reorder_level)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        product_name,
        category,
        price,
        quantity,
        reorder_level
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Product added successfully",
            product_id: result.insertId
        });
    });
});

// 4. PUT - Update Product Details
app.put("/products/:product_id", (req, res) => {
    const {
        product_name,
        category,
        price,
        quantity,
        reorder_level
    } = req.body;

    if (
        !product_name ||
        !category ||
        price == null ||
        quantity == null ||
        reorder_level == null
    ) {
        return res.status(400).json({
            message: "Please provide all product details"
        });
    }

    const sql = `
        UPDATE product_details
        SET product_name = ?,
            category = ?,
            price = ?,
            quantity = ?,
            reorder_level = ?
        WHERE product_id = ?
    `;

    const values = [
        product_name,
        category,
        price,
        quantity,
        reorder_level,
        req.params.product_id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product updated successfully" });
    });
});

// 5. DELETE - Delete Product by Product ID
app.delete("/products/:product_id", (req, res) => {
    const sql = "DELETE FROM product_details WHERE product_id = ?";

    db.query(sql, [req.params.product_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});