const jwt = require("jsonwebtoken");
const userModels = require("../models/user.models");

const requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or malformed",
        errors: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      error: "Unauthorized",
      errors: err.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModels.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error in Admin Middleware",
      error,
    });
  }
};

module.exports = { requireSignIn, isAdmin };
