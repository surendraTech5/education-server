const courseModel = require("../models/courses.models");

const courseCreate = async (req, res) => {
  console.log("courseCreate", req.body);
  try {
    const {
      courseName,
      description,
      price,
      discount,
      isActiveDiscount,
      isFree,
      isPaid,
      duration,
      medium,
      board,
      classes,
      subjects,
    } = req.body;

    if (!courseName || !description || !duration || !medium || !board) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const course = await courseModel.create({
      courseName,
      description,
      price: price || 0,
      discount: discount || 0,
      isActiveDiscount: isActiveDiscount || false,
      isFree: isFree || false,
      isPaid: isPaid || false,
      duration,
      medium,
      board,
      classes: classes || "",
      subjects: subjects || [],
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating course",
      error: error.message,
    });
  }
};
const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({})
    .populate("createdBy", "firstName lastName email")
    .populate("subjects", "subjectName")
    .sort({ createdAt: -1 }); 
    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
};
const getCoursesFilterPage = async(req,res)=>{
  try {
    const page = parseInt(req.query.page) || 1;
    const courseName = req.query.courseName || "";
    const createdBy = req.query.createdBy || ""; 
    const limit = 20;
    const skip = (page - 1) * limit;
    const query = {};
    if (courseName) {
      const regex = new RegExp(courseName, 'i');
      query.courseName = regex;
    }
    if (createdBy) {
      query.createdBy = createdBy;
    }


    const courses=await courseModel.find({})
    .populate("createdBy", "firstName lastName email")
    .populate("subjects", "subjectName")
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
    const totalCourses = await courseModel.countDocuments();

     if (!courses || courses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Data Found!!",
        courses: [],
        totalPages: 0,
        currentPage: page,
      });
    }

     res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: page,
    });
    
  } catch (error) {
    console.log(error)
    res.status(501).json({
     success: false,
      message: "Error fetching courses",
      error: error.message,
    })
  }
}
module.exports = { courseCreate,getAllCourses,getCoursesFilterPage };
