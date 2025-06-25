const subjectModels = require("../models/subject.models");

const subjectCreate = async (req, res) => {
  try {
    console.log("subject:::",req.body)
    const {subjectName,description} = req.body;
    
    if (!subjectName || !description) {
      return res.status(400).json({ 
        status: false,
        message: "Required fields are missing"
       });
    }

    const newSubject = await subjectModels.create({
      subjectName,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({
        status: true,
        message: "Subject created successfully",
        newSubject,
    });
  } catch (err) {
    res.status(500).json({ 
      status: false,
      message: "Error creating subject",
      error: err.message
     });
  }
};

const getAllSubjects = async(req,res)=>{
  try {
    const subjects=await subjectModels.find({})
    .populate("createdBy", "firstName lastName email")
    .sort({ createdAt: -1 });

     if (!subjects || subjects.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Data Found!!",
        subjects: [],
      });
    }

     res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      subjects,
    });
    
  } catch (error) {
    res.status(501).json({
      status:false,
      message :"error in Subjects Get",
      error
    })
  }
}

const getSubjectFilterPage = async(req,res)=>{
  try {
    const page = parseInt(req.query.page) || 1;
    const subjectName = req.query.subjectName || "";
    const createdBy = req.query.createdBy || ""; 
    const limit = 20;
    const skip = (page - 1) * limit;
    const query = {};
    if (subjectName) {
      const regex = new RegExp(subjectName, 'i');
      query.subjectName = regex;
    }
    if (createdBy) {
      query.createdBy = createdBy;
    }


    const subjects=await subjectModels.find({})
    .populate("createdBy", "firstName lastName email")
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
    const totalSubjects = await subjectModels.countDocuments();

     if (!subjects || subjects.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Data Found!!",
        subjects: [],
        totalPages: 0,
        currentPage: page,
      });
    }

     res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      subjects,
      totalPages: Math.ceil(totalSubjects / limit),
      currentPage: page,
    });
    
  } catch (error) {
    console.log(error)
    res.status(501).json({
      status:false,
      message :"error in Subjects Get",
      error
    })
  }
}

const subjectUpdate = async (req, res) => {
  console.log("subject:::",req.body)
  try {
    const subjectId = req.params.id;
    const { subjectName, description,isActive  } = req.body;

    if (!subjectId) {
      return res.status(400).json({
        status: false,
        message: "Subject ID is required",
      });
    }

    const updateFields = {};
    if (subjectName) updateFields.subjectName = subjectName;
    if (description) updateFields.description = description;
    if (isActive !== undefined) updateFields.isActive = isActive;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one field is required to update",
      });
    }

    const updatedSubject = await subjectModels.findByIdAndUpdate(subjectId, updateFields, {
      new: true,
    });
    console.log("updatedSubject",updatedSubject)

    if (!updatedSubject) {
      return res.status(404).json({
        status: false,
        message: "Subject not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Subject updated successfully",
      data: updatedSubject,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Error updating subject",
      error: err.message,
    });
  }
};

module.exports = { subjectCreate,getAllSubjects,getSubjectFilterPage,subjectUpdate };
