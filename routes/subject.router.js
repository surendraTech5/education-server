const express = require("express");
const { isAdmin, requireSignIn } = require("../middlewear/auth.middlewaer");
const { subjectCreate,getAllSubjects,getSubjectFilterPage,subjectUpdate } = require("../controller/subject.controller");

const router = express.Router();
router.post("/create", requireSignIn, isAdmin,subjectCreate)
router.get("/get-all-subject", requireSignIn, isAdmin,getAllSubjects)
router.get("/get-sujects", requireSignIn, isAdmin,getSubjectFilterPage)

router.patch("/update/:id", requireSignIn, isAdmin, subjectUpdate)


module.exports = router;
