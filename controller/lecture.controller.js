const lectureModels = require("../models/lecture.models");
const uploadToCloudinary = require("../config/uploadToCloudinary");

const lectureCreate = async (req, res) => {
  console.log("req.body",req.body);
  console.log("req.files", req.files);
  try {
    const {lectureName, description, test, courseId, subjectId} = req.body;
    
    if (!lectureName || !description || !courseId || !subjectId) {
      return res.status(400).json({ 
        status: false,
        message: "Required fields are missing" 
      });
    }

    let videoUrl = "", notes = "", additionalDocuments = "";

    if (req.files?.videoUrl?.[0]) {
      const result = await uploadToCloudinary(req.files.videoUrl[0].buffer, "lectures/videos", "video");
      videoUrl = result.secure_url;
    }

    if (req.files?.notes?.[0]) {
      const result = await uploadToCloudinary(req.files.notes[0].buffer, "lectures/notes", "raw");
      notes = result.secure_url;
    } 
    if (req.files?.additionalDocuments?.[0]) {
      const result = await uploadToCloudinary(req.files.additionalDocuments[0].buffer, "lectures/documents", "raw");
      additionalDocuments = result.secure_url;
    }    

    const newLecture = await lectureModels.create({
      lectureName,
      description,
      test,
      courseId,
      subjectId,
      createdBy: req.user.id,
      videoUrl,
      notes,
      additionalDocuments
    });

    res.status(201).json({
      status: true,
      message: "Lecture created successfully",
      newLecture,
    });
  } catch (err) {
    res.status(500).json({ 
      status: false,
      message: "Error creating lecture",
      error: err.message
     });
  }
};

const getAllLecture= async (req,res) => {
  try {
    const lectures=await lectureModels.find({})
    .populate("courseId","courseName")
    .populate("subjectId")
    .populate("createdBy", "firstName lastName email")
    .select("-notes -additionalDocuments -videoUrl -__v")
    .sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message: "Lectures fetched successfully",
      lectures,
    })
  } catch (error) {
    res.status(501).json({
      status:false,
      message:"Errr in get lecture"

    })
  }
}
const getLectureWithPage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const { courseId, subjectId, createdBy, lectureName = "" } = req.query;
    const query = {};

     if (lectureName) {
      const regex = new RegExp(lectureName, 'i');
      query.lectureName = regex;
    }

    if (courseId) query.courseId = courseId;
    if (subjectId) query.subjectId = subjectId;
    if (createdBy) query.createdBy = createdBy;

    const lectures = await lectureModels
      .find(query)
      .populate("courseId", "courseName")
      .populate("subjectId")
      .populate("createdBy", "firstName lastName email")
      // .select("-notes -additionalDocuments -__v")
      .select(" -__v")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalLecture = await lectureModels.countDocuments(query);

    if (!lectures.length) {
      return res.status(200).json({
        success: true,
        message: "No Data Found!!",
        lectures: [],
        totalPages: 0,
        currentPage: page,
      });
    }

    res.status(200).json({
      success: true,
      message: "Lectures fetched successfully",
      lectures,
      totalPages: Math.ceil(totalLecture / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Error fetching lectures",
      error: error.message,
    });
  }
};


module.exports = { lectureCreate,getAllLecture,getLectureWithPage };
