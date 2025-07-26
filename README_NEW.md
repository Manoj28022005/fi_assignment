# 📦 Inventory Management Tool - Backend APIs

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

### ✅ Core Requirements
1. **User Authentication (POST /login)** - JWT-based secure authentication
2. **Product Addition (POST /api/products)** - Add new products with all required fields
3. **Product Quantity Updates (PUT /api/products/{id}/quantity)** - Update inventory quantities
4. **Get Products (GET /api/products)** - Retrieve products with pagination support

### ✅ Technical Requirements
- **Working Backend Server**: Express.js REST API server
- **Database Schema**: MySQL with automated initialization
- **OpenAPI/Swagger Documentation**: Interactive API docs at `/api-docs`
- **Setup Documentation**: Comprehensive README with instructions
- **Postman Collection**: Complete API testing collection included
- **Test Script Compatibility**: Fully compatible with provided Python test script

### ✅ Stretch Goals Achieved
- **Admin Portal**: Complete admin dashboard with analytics
- **Basic Analytics**: Most added products, inventory stats, product history
- **Frontend Interface**: React-based user interface with Material-UI
- **Docker Support**: Full containerization with docker-compose

## 🏗️ Architecture

### Backend Stack
- **Framework**: Express.js (Node.js)
- **Database**: MySQL 8.0
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs hashing
- **Documentation**: Swagger/OpenAPI 3.0
- **Validation**: Express middleware

### Frontend Stack
- **Framework**: React 18
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router
- **State Management**: Context API
- **HTTP Client**: Axios

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

#### Products Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  sku VARCHAR(255) UNIQUE,
  image_url VARCHAR(2048),
  description TEXT,
  quantity INT NOT NULL DEFAULT 0,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Admin Users Table
```sql
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role ENUM('admin', 'superadmin') DEFAULT 'admin',
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Product Analytics Table
```sql
CREATE TABLE product_analytics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  action_type ENUM('add', 'update') NOT NULL,
  quantity_changed INT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MySQL 8.0+
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd epify-assignment--main-1
```

### 2. Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file:**
```env
# Server Configuration
PORT=8080

# JWT Secret Key
JWT_SECRET=your_strong_jwt_secret_key_here

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=epify_db
```

**Start Backend Server:**
```bash
npm start
```
Backend will be available at `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Frontend will be available at `http://localhost:5173`

### 4. Docker Setup (Alternative)

```bash
# From root directory
docker-compose up --build
```

This will start:
- MySQL container
- Backend container (port 8080)
- Frontend container (port 5173)

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /register
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Response:**
- `201`: User created successfully
- `409`: User already exists
- `500`: Server error

#### Login
```http
POST /login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "access_token": "jwt_token_here"
}
```

### Product Management Endpoints

#### Add Product
```http
POST /api/products
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "string",
  "type": "string",
  "sku": "string",
  "image_url": "string",
  "description": "string",
  "quantity": integer,
  "price": number
}
```

#### Update Product Quantity
```http
PUT /api/products/{id}/quantity
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "quantity": integer
}
```

#### Get Products
```http
GET /api/products?page=1&limit=10
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "type": "Category",
    "sku": "SKU-001",
    "image_url": "https://example.com/image.jpg",
    "description": "Product description",
    "quantity": 10,
    "price": "99.99",
    "created_at": "2025-01-01T00:00:00.000Z",
    "user_id": 1
  }
]
```

### Admin Analytics Endpoints

#### Check Admin Status
```http
GET /check-admin
Authorization: Bearer <jwt_token>
```

#### Get Product Statistics
```http
GET /api/admin/analytics/stats
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "total_products": 10,
  "total_inventory": "150",
  "average_price": "299.99",
  "inventory_value": "44998.50"
}
```

#### Get Most Added Products
```http
GET /api/admin/analytics/most-added?limit=5
Authorization: Bearer <jwt_token>
```

#### Get Product History
```http
GET /api/admin/analytics/product/{id}/history
Authorization: Bearer <jwt_token>
```

## 🧪 Testing

### Using Provided Python Test Script

1. **Install Python dependencies:**
```bash
pip install requests
```

2. **Update BASE_URL in test script:**
```python
BASE_URL = "http://localhost:8080"
```

3. **Run tests:**
```bash
python test_api.py
```

### Manual Testing with Postman

Import the provided Postman collection from `/docs/postman_collection.json`

### Test Scenarios Covered

1. **User Registration**: Create new user account
2. **User Login**: Authenticate and receive JWT token
3. **Add Product**: Create new product with all fields
4. **Update Quantity**: Modify product inventory
5. **Get Products**: Retrieve product list with pagination
6. **Admin Access**: Verify admin dashboard functionality
7. **Analytics**: Test product statistics and insights

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 8080 |
| `JWT_SECRET` | JWT signing secret | Required |
| `DB_HOST` | MySQL host | localhost |
| `DB_USER` | MySQL username | root |
| `DB_PASSWORD` | MySQL password | Required |
| `DB_NAME` | Database name | epify_db |

### Database Configuration

The application automatically:
- Creates database if it doesn't exist
- Initializes all required tables
- Sets up foreign key relationships
- Grants admin privileges to first user (ID: 1)

## 📖 Interactive Documentation

Access comprehensive API documentation at:
- **Swagger UI**: `http://localhost:8080/api-docs`

Features:
- Interactive API testing
- Request/response examples
- Authentication flow documentation
- Schema definitions

## 🛡️ Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Request payload validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Cross-origin request handling
- **Error Handling**: Secure error responses

## 📁 Project Structure

```
epify-assignment--main-1/
├── backend/
│   ├── config/
│   │   ├── db.js              # Database configuration
│   │   └── swaggerConfig.js   # API documentation
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── productController.js # Product management
│   │   └── adminController.js # Admin analytics
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── adminMiddleware.js # Admin access control
│   ├── models/
│   │   ├── userModel.js       # User database operations
│   │   └── productModel.js    # Product database operations
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication endpoints
│   │   ├── productRoutes.js   # Product endpoints
│   │   └── adminRoutes.js     # Admin endpoints
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   └── package.json           # Dependencies
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── context/           # React context
│   │   └── App.jsx            # Main app component
│   └── package.json           # Frontend dependencies
├── docker-compose.yml         # Docker configuration
├── Dockerfile                 # Container definition
└── README.md                  # This file
```

## 🚀 Deployment

### Local Development
1. Follow Quick Start instructions above
2. Backend: `http://localhost:8080`
3. Frontend: `http://localhost:5173`

### Docker Deployment
```bash
docker-compose up --build
```

### Production Considerations
- Use environment-specific `.env` files
- Configure proper MySQL credentials
- Set strong JWT secrets
- Enable HTTPS in production
- Configure proper CORS origins

## 🤝 API Test Script Compatibility

This implementation is fully compatible with the provided Python test script. The script tests:

1. ✅ **User Registration** (`POST /register`)
2. ✅ **User Login** (`POST /login`)
3. ✅ **Add Product** (`POST /api/products`)
4. ✅ **Update Quantity** (`PUT /api/products/{id}/quantity`)
5. ✅ **Get Products** (`GET /api/products`)

All endpoints return the expected status codes and response formats as specified in the test script.

## 📊 Features Beyond Requirements

### Admin Dashboard
- Real-time product statistics
- Most added products analytics
- Inventory value calculations
- Product history tracking

### Frontend Interface
- User-friendly React interface
- Material-UI design system
- Responsive design
- Admin portal access

### Advanced Features
- Pagination support
- Error boundary handling
- Loading states
- Form validation
- Route protection

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**
- Verify MySQL is running
- Check `.env` database credentials
- Ensure database exists or can be created

**JWT Token Issues:**
- Verify `JWT_SECRET` is set in `.env`
- Check token expiration (24 hours default)
- Ensure proper Authorization header format

**Port Conflicts:**
- Backend default: 8080
- Frontend default: 5173
- Change ports in configuration if needed

**Admin Access Denied:**
- First user (ID: 1) automatically gets admin privileges
- Check admin_users table for user permissions

## 📝 License

This project is part of the Epify Backend Assignment and is intended for educational and evaluation purposes.

## 🙋‍♂️ Support

For questions or issues:
1. Check the troubleshooting section
2. Review API documentation at `/api-docs`
3. Examine console logs for detailed error messages
4. Verify all environment variables are properly set

---

**Assignment Status: ✅ COMPLETE**

All core requirements, stretch goals, and technical specifications have been successfully implemented and tested.
