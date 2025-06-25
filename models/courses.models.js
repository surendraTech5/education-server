const mongoose = require("mongoose");
const { MEDIUM_OPTIONS, BOARD_OPTIONS } = require("../constants/courseConstants");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    isActiveDiscount: {
        type: Boolean,
        default: false
    },
    isFree: {
        type: Boolean,
        default: false
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    duration: {
        type: String,
        required: true,
    },
    medium :{ 
        type:String,
        required: true,
        enum: MEDIUM_OPTIONS,
    },
    board :{ 
        type:String,
        required: true,
        enum: BOARD_OPTIONS,
    },
    classes :{
        type: String,
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject" 
    }],
     createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
