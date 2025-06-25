const mongoose=require("mongoose");

const lectureSchema = new mongoose.Schema({
    lectureName: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    notes:{
        type: String,
    },
    test:{
        type: String, 
    },
    additionalDocuments: {
        type: String,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Lecture", lectureSchema);