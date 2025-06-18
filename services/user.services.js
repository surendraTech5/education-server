const UserModel = require("../models/user.models")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerServices = async (userData) => {
  const { firstName, lastName,email, password } = userData;
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  }

  const existing = await UserModel.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, parseInt(process.env.SALT) || 10);
  const newUser = await UserModel.create({ ...userData, password: hashed });
  return newUser;
};

const loginServices = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } );
  return { token, user };
};

module.exports = {registerServices,loginServices}
