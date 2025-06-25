const express = require("express");
const { isAdmin, requireSignIn } = require("../middlewear/auth.middlewaer");
const { lectureCreate, getAllLecture,getLectureWithPage } = require("../controller/lecture.controller");
const upload = require("../config/multer");

const router = express.Router();
router.post("/create",requireSignIn,isAdmin,
    upload.fields([
    { name: "videoUrl", maxCount: 1 },
    { name: "notes", maxCount: 1 },
    { name: "additionalDocuments", maxCount: 1 }
  ]),lectureCreate);
router.get('/get-all-lecture',requireSignIn,isAdmin,getAllLecture);
router.get('/get-lectures',requireSignIn,isAdmin,getLectureWithPage)


module.exports = router;
