# Restaurant Management System - Admin Backend

## Overview

This is the backend for a Restaurant Management System (Admin Panel). It is built with Node.js, Express, MySQL, and supports JWT authentication, role-based staff management, CRUD APIs, dashboard & reports for admin users.

This backend powers the admin panel to manage:

* Admins & roles
* Categories & foods
* Restaurant tables
* Orders & payments
* Staff management
* Settings & configurations
* Dashboard summaries and charts
* Reports (orders, revenue, admin performance)

## Features

### Core Features

* JWT Authentication (Admin login & registration)
* Role-based Staff Management
* Full CRUD operations for:
  * Categories
  * Foods
  * Tables
  * Orders
  * Payments
  * Staffs
  * Roles
* Dashboard API with:
  * Total orders
  * Revenue
  * Pending/served orders
  * Total foods, categories, staff, tables
  * Available vs occupied tables
  * Charts (orders by day, revenue by day)
* Reports API:
  * Orders by day
  * Revenue by day
  * Admin performance

## Technologies Used

* **Backend:** Node.js, Express.js
* **Database:** MySQL / MariaDB
* **Authentication:** JWT (JSON Web Tokens)
* **Other Packages:** bcrypt (password hashing), dotenv, nodemon, cors
* **Testing:** Postman / Insomnia

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/restaurant-admin-backend.git
cd restaurant-admin-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=restaurant_db
JWT_SECRET=your_jwt_secret
```

### 4. Start the server

```bash
npm run dev
```

Server will start on `http://localhost:5000`.

## Database Setup

### Tables

The project uses the following tables:

* `admins`
* `roles`
* `categories`
* `foods`
* `restaurant_tables`
* `orders`
* `staffs`
* `payments`
* `settings`

Make sure to run the SQL scripts in MySQL to create the database and tables.

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register admin (run once) |
| POST | `/api/auth/login` | Admin login |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

### Foods

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/foods` | Get all foods |
| POST | `/api/foods` | Create food |
| PUT | `/api/foods/:id` | Update food |
| DELETE | `/api/foods/:id` | Delete food |

### Staffs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/staffs` | Get all staff |
| POST | `/api/staffs` | Add staff |
| PUT | `/api/staffs/:id` | Update staff |
| DELETE | `/api/staffs/:id` | Delete staff |

### Roles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/roles` | Get all roles |
| POST | `/api/roles` | Add role |
| PUT | `/api/roles/:id` | Update role |
| DELETE | `/api/roles/:id` | Delete role |

### Tables

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tables` | Get all tables |
| POST | `/api/tables` | Add table |
| PUT | `/api/tables/:id` | Update table |
| DELETE | `/api/tables/:id` | Delete table |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Create order |
| PUT | `/api/orders/:id` | Update order status |
| DELETE | `/api/orders/:id` | Delete order |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payments` | Get all payments |
| POST | `/api/payments` | Add payment |

### Dashboard & Reports

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/summary` | Dashboard summary & charts |
| GET | `/api/reports/orders-by-day` | Orders by day report |
| GET | `/api/reports/revenue-by-day` | Revenue by day report |
| GET | `/api/reports/admin-performance` | Admin performance report |

## Notes

* All APIs are JWT protected, except `login` and `register`.
* Roles can be assigned to staff and admins for better management.
* Dashboard & report APIs help build graphs/charts on the frontend.

## Future Improvements

* Add pagination for large datasets (foods, orders, payments).
* Add search & filter functionality for orders, staff, foods.
* Add notifications for new orders or low stock items.
* Add frontend admin panel integration (React/Next.js).

## License

MIT License
