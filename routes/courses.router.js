const express = require("express");
const { courseCreate, getAllCourses, getCoursesFilterPage,updateCourceById } = require("../controller/course.controller");
const { isAdmin, requireSignIn } = require("../middlewear/auth.middlewaer");

const router = express.Router();
router.post("/create",requireSignIn,isAdmin,courseCreate);
router.get("/get-all-courses",requireSignIn,isAdmin,getAllCourses);
router.get("/get-courses", requireSignIn, isAdmin,getCoursesFilterPage)
router.patch("/update/:id", requireSignIn, isAdmin, updateCourceById)



module.exports = router;
