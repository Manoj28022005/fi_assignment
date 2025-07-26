# 📦 Inventory Management Tool - Backend APIs
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8e613933-7c4e-4744-9d83-bbf5f8516d2d" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4bdaea84-de95-48ef-b7ce-73a16d2164df" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f9dab508-3964-4d17-a803-b6c6dc9e7c25" />




## 🎯 Project Overview

A comprehensive full-stack inventory management system built for small businesses. This application provides REST APIs to manage users and products with authentication, product management, and advanced analytics features.

### 🚀 Key Features
- **User Authentication**: Secure JWT-based login system
- **Product Management**: Add, update, and retrieve products with inventory tracking
- **Admin Analytics**: Advanced dashboard with product statistics and insights
- **Interactive Documentation**: Swagger/OpenAPI documentation
- **Frontend Interface**: React-based user interface
- **Database Integration**: MySQL with automated schema initialization
- **Docker Support**: Containerized deployment

## 📋 Assignment Requirements Completed

1. **Authentication System** (POST /login)
   - ✅ Implemented secure user registration and login
   - ✅ JWT-based authentication as required
   - ✅ Password hashing using bcryptjs
   - ✅ Returns JWT token on successful login
   - ✅ Proper error handling for invalid credentials

2. **Product Management**
   - ✅ Add Product (POST /products)
     - All required fields implemented: name, type, SKU, image_url, description, quantity, price
     - Returns product ID and confirmation
   - ✅ Update Quantity (PUT /products/{id}/quantity)
     - Updates product quantity
     - Returns updated product details
   - ✅ Get Products (GET /products)
     - Implemented pagination as required
     - Returns list of all products
     - Proper error handling

3. **Database Integration**
   - ✅ MySQL database with proper schemas
   - ✅ Database initialization script provided
   - ✅ Efficient queries with error handling
   - ✅ Data persistence across sessions

4. **Documentation & Testing**
   - ✅ OpenAPI/Swagger documentation at `/api-docs`
   - ✅ Detailed README with setup instructions
   - ✅ Complete Postman collection provided
   - ✅ Test script compatibility ensured
   - ✅ API documentation in Markdown

5. **Stretch Goals Completed**
   - ✅ Basic frontend with React
   - ✅ Clean, maintainable code architecture
   - ✅ Comprehensive error handling
   - ✅ User-friendly UI
   - ✅ Docker containerization

4. **API Documentation**
   - Interactive Swagger UI implementation
   - Clear endpoint documentation
   - Request/response examples included

5. **Extra Features Implemented**
   - Frontend UI with React
   - Real-time stock updates
   - Clean code architecture
   - Comprehensive error handling

## ✨ Key Features

* **Secure Authentication**: JWT-based login system with securely hashed passwords using `bcryptjs`.
* **Full Product Management**: REST APIs for creating products, updating stock quantities, and fetching a paginated list of all items.
* **Protected Routes**: Backend middleware and frontend route guards ensure only authenticated users can access the inventory dashboard.
* **Responsive Frontend**: A clean and modern user interface built with React and Tailwind CSS that works seamlessly on all screen sizes.
* **Interactive API Documentation**: Integrated Swagger UI for easy visualization and testing of all backend endpoints.

---

## 🛠️ Tech Stack

| Area      | Technology                                                       |
| :-------- | :--------------------------------------------------------------- |
| **Backend** | Node.js, Express.js, MySQL, JWT, bcryptjs                        |
| **Frontend** | React, Vite, Tailwind CSS, Axios, React Router                   |
| **API Docs** | Swagger (`swagger-ui-express`)                                   |

---

## 🚀 Getting Started

Follow these steps to get the entire application running on your local machine.

### **Prerequisites**

* **Option 1: Local Setup**
  * **Node.js**: Version 18.x or higher.
  * **MySQL**: An active instance of a MySQL server.

* **Option 2: Docker Setup**
  * **Docker**: Latest version
  * **Docker Compose**: Latest version

### **1. Backend Setup**

* **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

* **Install dependencies:**
    ```bash
    npm install
    ```

* **Set up the database:**
    Connect to your MySQL instance and run the following SQL script to create the database and tables.
    ```sql
    CREATE DATABASE inventory_db;
    USE inventory_db;

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(255),
        sku VARCHAR(255) UNIQUE,
        image_url VARCHAR(2048),
        description TEXT,
        quantity INT NOT NULL DEFAULT 0,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    ```

### Database Schema Details

#### Users Table
- `id`: Unique identifier for each user
- `username`: Unique username for login (VARCHAR)
- `password`: Hashed password using bcryptjs (VARCHAR)

#### Products Table
- `id`: Unique identifier for each product
- `name`: Product name (VARCHAR)
- `type`: Product category/type (VARCHAR)
- `sku`: Unique Stock Keeping Unit (VARCHAR)
- `image_url`: URL to product image (VARCHAR)
- `description`: Detailed product description (TEXT)
- `quantity`: Current stock quantity (INT)
- `price`: Product price (DECIMAL)
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

* **Configure environment variables:**
    Create a `.env` file in the `backend` directory and add your credentials.
    ```env
    # Server Port
    PORT=8080

    # JWT Secret Key
    JWT_SECRET=your_strong_jwt_secret_key_here

    # MySQL Database Configuration
    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=inventory_db
    ```

* **Run the backend server:**
    ```bash
    npm run dev
    ```
    The backend API will be running at `http://localhost:8080`.

### **2. Frontend Setup**

* **Open a new terminal** and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

* **Install dependencies:**
    ```bash
    npm install
    ```

* **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The React application will be available at `http://localhost:5173` (or another port if 5173 is busy).

### **3. Docker Setup**

If you prefer using Docker, you can use Docker Compose to run both the backend and frontend services:

* **Build and start the containers:**
    ```bash
    # From the root directory
    docker-compose up --build
    ```

This will:
- Start MySQL container
- Build and start the backend container (available at `http://localhost:8080`)
- Build and start the frontend container (available at `http://localhost:5173`)
- Set up all necessary networking between containers
- Initialize the database with required tables

* **Stop the containers:**
    ```bash
    docker-compose down
    ```

* **View logs:**
    ```bash
    docker-compose logs -f
    ```

Note: The Docker setup uses environment variables defined in the docker-compose.yml file, so no manual .env configuration is needed.

---

## 📘 API Documentation & Testing

Once the backend server is running, you can test the APIs in two ways:

### 1. Swagger UI Documentation
Interactive API documentation is available via Swagger UI at:
**`http://localhost:8080/api-docs`**

### 2. Postman Collection
You can test all endpoints using these Postman URLs:

#### Authentication Endpoints
- **Register User**
  - POST: `http://localhost:8080/api/register`
  - Body:
    ```json
    {
        "username": "testuser",
        "password": "testpass123"
    }
    ```

- **Login**
  - POST: `http://localhost:8080/api/login`
  - Body:
    ```json
    {
        "username": "testuser",
        "password": "testpass123"
    }
    ```

- **Check Admin Status**
  - GET: `http://localhost:8080/api/check-admin`
  - Headers:
    ```
    Authorization: Bearer {your_jwt_token}
    ```

#### Product Management Endpoints
- **Add New Product**
  - POST: `http://localhost:8080/api/products`
  - Headers: `Authorization: Bearer {your_jwt_token}`
  - Body:
    ```json
    {
        "name": "Test Product",
        "type": "Electronics",
        "sku": "TECH001",
        "image_url": "https://example.com/image.jpg",
        "description": "Test product description",
        "quantity": 10,
        "price": 99.99
    }
    ```

- **Get All Products**
  - GET: `http://localhost:8080/api/products?page=1&limit=10`
  - Headers: `Authorization: Bearer {your_jwt_token}`

- **Update Product Quantity**
  - PUT: `http://localhost:8080/api/products/{productId}`
  - Headers: `Authorization: Bearer {your_jwt_token}`
  - Body:
    ```json
    {
        "quantity": 15
    }
    ```

### Testing Flow
1. First, register a new user using the register endpoint
2. Login with the registered credentials to get a JWT token
3. Use this token in the Authorization header for all subsequent requests
4. Try creating a new product
5. List all products to verify creation
6. Update a product's quantity

### Test Script Compatibility
The provided test script (`test_api.py`) works with our implementation:

1. **Endpoint Compatibility**
   - `/register` - Returns 201 for success, 409 for existing user
   - `/login` - Returns 200 with JWT token
   - `/products` - POST/GET with proper authentication
   - `/products/{id}/quantity` - PUT with proper authentication

2. **Response Format**
   - Login returns `{ "access_token": "jwt_token" }`
   - Product creation returns `{ "product_id": id }`
   - All endpoints return appropriate status codes as expected

3. **How to Run Tests**
   ```bash
   # Install dependencies
   pip install requests

   # Update BASE_URL in test_api.py if needed
   BASE_URL = "http://localhost:8080"  # Default port matches our setup

   # Run the test script
   python test_api.py
   ```

---

---

## ✅ Final Checklist

| Requirement                         | Status  |
| ----------------------------------- | :-----: |
| Login/Register API                  | ✅ Done |
| Secure Auth with JWT                | ✅ Done |
| Add, Update, Get Products API       | ✅ Done |
| Auth Middleware                     | ✅ Done |
| Interactive Swagger Docs            | ✅ Done |
| MySQL Database Integration          | ✅ Done |
| Clean, Simple, Functional Code      | ✅ Done |
| Full-Stack Project with React       | ✅ Done |
| README with Usage and Documentation | ✅ Done |
| Docker                              | ✅ Done |

---

## 🙋 About Me

👤 **Name**: R.V.S.S. Manoj
📧 **Email**: [rvssmanoj2005@gmail.com](mailto:rvssmanoj2005@gmail.com)
🎓 **College**: IIIT Nagpur
💻 **Branch**: Computer Science and Engineering
🎯 **Batch**: 2026
