const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Inventory Management System API",
    version: "1.0.0",
    description: "REST API documentation for the Inventory Management Tool",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string", example: "newuser" },
          password: { type: "string", example: "newpassword" },
        },
      },
      Login: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string", example: "sudarshan" },
          password: { type: "string", example: "1234" },
        },
      },
      Product: {
        type: "object",
        required: ["name", "sku", "quantity", "price"],
        properties: {
          id: { type: "integer", description: "Auto-generated product ID", example: 1 },
          name: { type: "string", example: "Laptop Pro" },
          type: { type: "string", example: "Electronics" },
          sku: { type: "string", example: "LP-PRO-X1" },
          image_url: { type: "string", example: "https://example.com/laptop.jpg" },
          description: { type: "string", example: "A powerful new laptop." },
          quantity: { type: "integer", example: 50 },
          price: { type: "number", format: "float", example: 1299.99 },
        },
      },
    },
  },
  paths: {
    "/login": {
      post: {
        summary: "Login user and return JWT token",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/Login" } } },
        },
        responses: {
          "200": { description: "Login successful" },
          "400": { description: "Invalid credentials" },
        },
      },
    },
    "/register": {
      post: {
        summary: "Register a new user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } },
        },
        responses: {
          "201": { description: "User created" },
          "409": { description: "User already exists" },
        },
      },
    },
    "/products": {
      post: {
        summary: "Add a new product",
        tags: ["Products"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } },
        },
        responses: {
          "201": { description: "Product created" },
          "401": { description: "Unauthorized" },
        },
      },
      get: {
        summary: "Get all products",
        tags: ["Products"],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "A list of products",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Product" } } } },
          },
        },
      },
    },
    "/products/{id}/quantity": {
      put: {
        summary: "Update a product's quantity",
        tags: ["Products"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "integer" }, description: "ID of the product to update" },
        ],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", properties: { quantity: { type: "integer", example: 45 } } } } },
        },
        responses: {
          "200": { description: "Quantity updated" },
          "401": { description: "Unauthorized" },
          "404": { description: "Product not found" },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
