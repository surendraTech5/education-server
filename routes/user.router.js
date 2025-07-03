const express = require("express");
const {userRegister,userLogin,getAllAdminUser,getAllUsers,updateUserById} = require("../controller/user.controller");
const { requireSignIn } = require("../middlewear/auth.middlewaer");
const upload = require("../config/multer");
const router = express.Router();
router.post("/register", userRegister);
router.post("/login",userLogin);
router.get("/admin",getAllAdminUser);
router.get("/get-all-users",requireSignIn,getAllUsers);
router.patch(
  "/update/:id",
  requireSignIn,
   upload.single("profilePhoto"),
  updateUserById
);


module.exports = router;
