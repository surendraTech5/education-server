const express = require("express");
const {userRegister,userLogin,getAllAdminUser,getAllUsers} = require("../controller/user.controller");
const { requireSignIn } = require("../middlewear/auth.middlewaer");

const router = express.Router();
router.post("/register", userRegister);
router.post("/login",userLogin);
router.get("/admin",getAllAdminUser);
router.get("/get-all-users",requireSignIn,getAllUsers);


module.exports = router;
