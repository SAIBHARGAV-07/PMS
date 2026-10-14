# 📦 Apex Inventory — Product Management System

A full-stack **CRUD web application** built with **Node.js**, **Express**, and **MySQL** for managing product inventory in real time.

## ✨ Features

- 📋 View all products in a filterable, sortable table
- 🔍 Search product by ID
- ➕ Add new products with category, price, stock & reorder level
- ✏️ Update existing product details
- 🗑️ Delete products with confirmation
- 💹 Live dashboard with KPIs: Total SKUs, Units in Stock, Stock Valuation, Low Stock Alerts
- 💰 Prices displayed in **Indian Rupees (₹)**

## 🛠️ Tech Stack

| Layer    | Technology         |
|----------|--------------------|
| Backend  | Node.js + Express  |
| Database | MySQL              |
| Frontend | HTML, CSS, JavaScript |

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/product-management.git
cd product-management
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and fill in your MySQL credentials.

### 4. Set up the MySQL database
Create a database named `product_management_system` and a table:
```sql
CREATE DATABASE product_management_system;
USE product_management_system;

CREATE TABLE product_details (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10, 2),
    quantity INT,
    reorder_level INT
);
```

### 5. Run the server
```bash
node app.js
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

## 📁 Project Structure

```
product-management/
├── public/
│   ├── index.html       # Dashboard
│   ├── list.html        # All Products
│   ├── listOne.html     # Search by ID
│   ├── insert.html      # Add Product
│   ├── update.html      # Update Product
│   ├── delete.html      # Delete Product
│   └── style.css        # Global styles
├── app.js               # Express server + API routes
├── .env.example         # Environment variable template
└── package.json
```
