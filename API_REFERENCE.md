# 🍽️ Restaurant Management Backend – Full API Reference (FINAL)

## 🌐 Base URL

```
http://localhost:5000/api
```

## 🔐 Auth Header (Required for protected routes)

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 👤 ADMIN AUTH APIs

### 1️⃣ Register Admin (RUN ONCE)

**POST** `/auth/register`

```json
{
  "name": "Super Admin",
  "email": "admin@gmail.com",
  "password": "123456"
}
```

📌 *Used only once to create first admin*

---

### 2️⃣ Login Admin

**POST** `/auth/login`

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

**Response**

```json
{
  "token": "JWT_TOKEN",
  "admin": {
    "id": 1,
    "name": "Super Admin",
    "email": "admin@gmail.com"
  }
}
```

---

## 📊 DASHBOARD API (SUMMARY + CHARTS)

### Dashboard Summary

**GET** `/dashboard/summary`

**Response**

```json
{
  "summary": {
    "orders": {
      "total": 120,
      "pending": 8,
      "served": 112
    },
    "revenue": 24500,
    "foods": 25,
    "categories": 6,
    "staffs": 10,
    "tables": {
      "total": 20,
      "available": 6,
      "occupied": 14
    }
  },
  "charts": {
    "ordersByDay": [
      { "date": "2026-01-15", "total": 18 }
    ],
    "revenueByDay": [
      { "date": "2026-01-15", "revenue": 4800 }
    ]
  }
}
```

---

## 📁 CATEGORY APIs

### Get Categories

**GET** `/categories`

### Create Category

**POST** `/categories`

```json
{
  "name": "Fast Food"
}
```

### Update Category

**PUT** `/categories/:id`

```json
{
  "name": "Chinese",
  "status": true
}
```

### Delete Category

**DELETE** `/categories/:id`

---

## 🍔 FOOD APIs

### Get Foods

**GET** `/foods`

### Create Food

**POST** `/foods`

```json
{
  "name": "Burger",
  "category_id": 1,
  "price": 250,
  "image": "burger.png",
  "is_available": true
}
```

### Update Food

**PUT** `/foods/:id`

```json
{
  "name": "Cheese Burger",
  "price": 280,
  "is_available": false
}
```

### Delete Food

**DELETE** `/foods/:id`

---

## 🪑 TABLE APIs

### Get Tables

**GET** `/tables`

### Create Table

**POST** `/tables`

```json
{
  "table_no": "T-01",
  "capacity": 4,
  "status": "available"
}
```

### Update Table

**PUT** `/tables/:id`

### Delete Table

**DELETE** `/tables/:id`

---

## 🧾 ORDER APIs

### Get Orders

**GET** `/orders`

### Create Order (Admin Auto Detected)

**POST** `/orders`

```json
{
  "table_id": 2,
  "total_price": 1200
}
```

📌 `admin_id` comes from JWT token

---

### Update Order Status (with Log)

**PUT** `/orders/:id/status`

```json
{
  "order_status": "served"
}
```

📌 Saves log in `order_logs`

---

### Delete Order

**DELETE** `/orders/:id`

---

## 💳 PAYMENT APIs

### Get Payments

**GET** `/payments`

### Create Payment

**POST** `/payments`

```json
{
  "order_id": 5,
  "amount": 1200,
  "method": "cash"
}
```

📌 `admin_id` auto from token

---

## 👨‍🍳 STAFF APIs

### Get Staffs

**GET** `/staffs`

### Create Staff

**POST** `/staffs`

```json
{
  "name": "Rahim",
  "role": "waiter",
  "phone": "017xxxx",
  "status": true
}
```

### Update Staff

**PUT** `/staffs/:id`

### Delete Staff

**DELETE** `/staffs/:id`

---

## ⚙️ SETTINGS APIs

### Get Settings

**GET** `/settings`

### Update Settings

**PUT** `/settings`

```json
{
  "restaurant_name": "Food House",
  "tax_percentage": 5,
  "opening_time": "10:00",
  "closing_time": "23:00"
}
```

---

## 📈 REPORT APIs (Charts)

### Orders By Day

**GET** `/reports/orders-by-day`

### Revenue By Day

**GET** `/reports/revenue-by-day`

### Admin Performance

**GET** `/reports/admin-performance`

```json
[
  {
    "name": "Super Admin",
    "totalOrders": 85
  }
]
```

---

## 🔐 SECURITY NOTES

* JWT required for all APIs except login/register
* `req.admin.id` is used for:

  * orders
  * payments
  * logs
  * reports
* Fully supports **multi-admin system**

---
