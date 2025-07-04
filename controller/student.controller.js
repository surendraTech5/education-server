const Course = require("../models/courses.models");
const Subject = require("../models/subject.models");
const Lecture = require("../models/lecture.models");
const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
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



///Student MGMT
const createStudent = async (req, res) => {
  try {
     const { firstName, lastName, email, password, gender, phone } = req.body;
    if (!firstName || !lastName || !email || !password || !gender || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

        const existing = await User.findOne({ email });
        if (existing)
          return res.status(400).json({
            success: false,
            message: "Email already exists",
          });
    
        const hashed = await bcrypt.hash(password, 10);
        const seed = encodeURIComponent(email);
        const avatarStyle = gender === "male" ? "adventurer" : "avataaars";
        const profilePhoto = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${seed}`;
    
        const student = await User.create({
          ...req.body,
          password: hashed,
          profilePhoto,
        });
    res.status(201).json({
      status: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const name = req.query.name || "";

    const query = { role: "user" };
    if (name) {
      const regex = new RegExp(name, "i");
      query.$or = [{ firstName: regex }, { lastName: regex }];
    }

    const students = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("enrolledCourses");

    const totalStudents = await User.countDocuments(query); // ✅ fix here

    if (!students || students.length === 0) {
      return res.status(200).json({
        status: true,
        message: "No Data Found!!",
        data: [],
        totalPages: 0,
        currentPage: page,
      });
    }

    res.status(200).json({
      status: true,
      message: "Students fetched successfully",
      data: students,
      totalPages: Math.ceil(totalStudents / limit), // ✅ fix here
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


const getStudentById = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: "user" }).populate("enrolledCourses");
    if (!student) {
      return res.status(404).json({
        status: false,
        message: "Student not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await User.findOneAndUpdate(
      { _id: req.params.id, role: "user" },
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id, role: "user" });
    res.status(200).json({
      status: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
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
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,

};