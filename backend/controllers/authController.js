const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.handleLogin = async (request, response) => {
  const { username, password } = request.body;
  console.log("Login attempt for user:", username);
  try {
    const foundUser = await userModel.findUserByUsername(username);
    if (!foundUser) {
      return response.status(400).json({ message: "Invalid username" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordCorrect) {
      return response.status(400).json({ message: "Invalid password" });
    }

    const jwtToken = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    response.json({ access_token: jwtToken });
  } catch (error) {
    response.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.handleRegistration = async (request, response) => {
  const { username, password } = request.body;
  try {
    const existingUser = await userModel.findUserByUsername(username);
    if (existingUser) {
      return response.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(username, hashedPassword);

    response.status(201).json({ message: "User created successfully" });
  } catch (error) {
    response.status(500).json({ message: "Error creating user", error: error.message });
  }
};