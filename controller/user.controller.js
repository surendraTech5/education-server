const UserModel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, phone } = req.body;
    if (!firstName || !lastName || !email || !password || !gender || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existing = await UserModel.findOne({ email });
    if (existing)
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    const hashed = await bcrypt.hash(password, 10);
    const seed = encodeURIComponent(email);
    const avatarStyle = gender === "male" ? "adventurer" : "avataaars";
    const profilePhoto = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${seed}`;

    const user = await UserModel.create({
      ...req.body,
      password: hashed,
      profilePhoto,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error : error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        succsess: false,
        message: "Invalid  Username or Password",
        error,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const token = jwt.sign(
      { id: user._id, email: user.email, firstName:user.firstName,lastName : user.lastName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(501).json({
      succsess: false,
      message: "Eroor in login",
      error : error.message,
    });
  }
};

const getAllAdminUser = async (req, res) => {
  try {
    const users = await UserModel.find({role: "admin"});
    res.status(200).json({
      success: true,
      message: "All Admin Users",
      users,
    });
  } catch (error) {
    res.status(501).json({
      status: false,
      message: "Error in getting all admin users",
      error : error.message,
    });
  }
}

const getAllUsers = async(req,res)=>{
  try{
    const users = await UserModel.find();
    res.status(200).json({
      success: true,
      message: "All Users",
      users,
    });
  } catch(error){
    res.status(501).json({
      status: false,
      message: "Error in getting all users",
      error : error.message,
    });
  }
 
}
module.exports = { userRegister, userLogin,getAllAdminUser,getAllUsers };
