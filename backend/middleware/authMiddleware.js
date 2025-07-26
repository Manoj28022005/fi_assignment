const jwt = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    request.user = payload;
    next();
  } catch (error) {
    return response.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = verifyToken;