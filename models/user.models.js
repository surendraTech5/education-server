const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    profilePhoto:{
        type:String,
        default:""
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 15
    },
    lastLogin: {
        type: Date
    },
     gender:{
        type:String,
        required:true,
        enum:["male","female"],
    },
    enrolledCourses: 
    [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
},{ timestamps: true });


module.exports = mongoose.model("User", userSchema);