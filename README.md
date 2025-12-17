# Inventory Management System

An **Inventory Management System** built with **React + Vite** on the frontend and **Node.js** on the backend. The application allows users to **add, edit, delete, and view products** in a tabular format, visualize inventory data using charts, and persist data using a **PostgreSQL** database.

## 🚀 Features

* **Product Management (CRUD)**

  * Add new products
  * Edit existing products
  * Delete products
  * View all products in a table

* **Data Visualization**

  * Interactive charts using **Chart.js**
  * Visual representation of inventory data (e.g., stock by category)

* **Modern UI**

  * Clean and responsive design using **Ant Design (AntD)** components
  * Tables, forms, modals, buttons, and pagination

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **Vite**
* **Ant Design (AntD)**
* **Chart.js**
* **TypeScript / JavaScript**

### Backend

* **Node.js** (used mainly to expose simple APIs for product CRUD)

## 🗄️ Database

* **PostgreSQL**

## ⚙️ CRUD Operations

| Operation | Description                       |
| --------- | --------------------------------- |
| Create    | Add new products to the inventory |
| Read      | View products in an AntD table    |
| Update    | Edit product details              |
| Delete    | Remove products from inventory    |

## 📊 Charts & Visualization

* Uses **Chart.js** to display inventory insights
* Charts update dynamically based on product data
* Helps in understanding stock distribution and trends

## 🔌 API Overview

The backend provides simple REST APIs used by the frontend to perform CRUD operations on products.

## 🗄️ Database Schema Details

* **PostgreSQL** is used for data persistence
* Stores product information such as:

  * Product name
  * Category
  * Quantity
  * Price
  * Created / updated timestamps