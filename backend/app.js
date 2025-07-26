const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { testDbConnection } = require("./config/db.js");
const swaggerUI = require("swagger-ui-express");
const swaggerDefinition = require("./config/swaggerConfig.js");


dotenv.config();
const expressApp = express();

expressApp.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDefinition));

expressApp.use(cors());
expressApp.use(express.json());
testDbConnection();

// Auth routes at root level for direct access
expressApp.use("/", require("./routes/authRoutes.js"));

// Other API routes under /api prefix
expressApp.use("/api", require("./routes/productRoutes.js"));
expressApp.use("/api/admin", require("./routes/adminRoutes.js"));

module.exports = expressApp;