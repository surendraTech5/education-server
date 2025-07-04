const express = require("express");
const {
  getAllCourses,
  getCourseById,
  getSubjectsByCourseId,
  getSubjectByCourseAndSubjectId,
  getAllSubjects,
  getAllLectures,
  getLectureById,
  getLecturesBySubjectId,
  getLecturesByCourseId,
  getLecturesByCourseAndSubject,
  getSubjectByLectureId,
  getStudentById,
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
} = require("../controller/student.controller");
const { requireSignIn, isAdmin } = require("../middlewear/auth.middlewaer");

const router = express.Router();

// Courses
router.get("/courses", getAllCourses);
router.get("/courses/:id", getCourseById);
router.get("/courses/:courseId/subjects", getSubjectsByCourseId);
router.get("/courses/:courseId/subjects/:subjectId", getSubjectByCourseAndSubjectId);
router.get("/courses/:courseId/lectures", getLecturesByCourseId);
router.get("/courses/:courseId/subjects/:subjectId/lectures", getLecturesByCourseAndSubject);

// Subjects
router.get("/subjects", getAllSubjects);
router.get("/lectures/:lectureId/subject", getSubjectByLectureId);

// Lectures
router.get("/lectures", getAllLectures);
router.get("/lectures/:id", getLectureById);
router.get("/subjects/:subjectId/lectures", getLecturesBySubjectId);


//StudentMGMT

router.post("/create", requireSignIn, isAdmin, createStudent);
router.get("/get-all", requireSignIn, isAdmin, getAllStudents);
router.get("/get/:id", requireSignIn, isAdmin, getStudentById);
router.put("/update/:id", requireSignIn, isAdmin, updateStudent);
router.delete("/delete/:id", requireSignIn, isAdmin, deleteStudent);

module.exports = router;
