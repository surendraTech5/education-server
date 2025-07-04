const Course = require("../models/courses.models");
const Subject = require("../models/subject.models");
const Lecture = require("../models/lecture.models");

// GET all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      status: true,
      message: "Courses fetched successfully",
      courses,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// GET course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      isActive: true,
    }).sort({ createdAt: -1 });
    if (!course) {
      return res
        .status(404)
        .json({ status: false, message: "Course not found" });
    }
    res.status(200).json({
      status: true,
      message: "Course fetched successfully",
      course,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// GET subjects by course ID
const getSubjectsByCourseId = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate({
      path: "subjects",
      match: { isActive: true }
    }).sort({ createdAt: -1 });

    if (!course) {
      return res
        .status(404)
        .json({ status: false, message: "Course not found" });
    }

    res.status(200).json({
      status: true,
      message: "Subjects fetched successfully",
      subjects: course.subjects,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// GET subject by course ID and subject ID
const getSubjectByCourseAndSubjectId = async (req, res) => {
  try {
    const subject = await Subject.findOne({
      _id: req.params.subjectId,
      isActive: true,
    }).sort({ createdAt: -1 });

    if (!subject) {
      return res
        .status(404)
        .json({ status: false, message: "Subject not found" });
    }

    res.status(200).json({
      status: true,
      message: "Subject fetched successfully",
      subject,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// GET all subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message: "Subjects fetched successfully",
      subjects,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// GET all lectures
const getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message: "Lectures fetched successfully",
      lectures,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// GET lecture by ID
const getLectureById = async (req, res) => {
  try {
    const lecture = await Lecture.findOne({
      _id: req.params.id,
      isActive: true,
    }).sort({ createdAt: -1 });
    if (!lecture) {
      return res
        .status(404)
        .json({ status: false, message: "Lecture not found" });
    }
    res.status(200).json({
      status: true,
      message: "Lecture fetched successfully",
      lecture,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// GET lectures by subject ID
const getLecturesBySubjectId = async (req, res) => {
  try {
    const lectures = await Lecture.find({
      subjectId: req.params.subjectId,
      isActive: true,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message: "Lectures fetched successfully",
      lectures,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// GET lectures by course ID
const getLecturesByCourseId = async (req, res) => {
  try {
    const lectures = await Lecture.find({
      courseId: req.params.courseId,
      isActive: true,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message: "Lectures fetched successfully",
      lectures,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// GET lectures by course ID and subject ID
const getLecturesByCourseAndSubject = async (req, res) => {
  try {
    const lectures = await Lecture.find({
      courseId: req.params.courseId,
      subjectId: req.params.subjectId,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Lectures fetched successfully",
      lectures,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// GET subject by lecture ID
const getSubjectByLectureId = async (req, res) => {
  try {
    const lecture = await Lecture.findOne({
      _id: req.params.lectureId,
      isActive: true,
    }).populate({
      path: "subjectId",
      match: { isActive: true },
    }).sort({ createdAt: -1 });

    if (!lecture || !lecture.subjectId) {
      return res
        .status(404)
        .json({ status: false, message: "Subject not found for lecture" });
    }

    res.status(200).json({
      status: true,
      message: "Subject fetched successfully",
      subject: lecture.subjectId,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
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
};
