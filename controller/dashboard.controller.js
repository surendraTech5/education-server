const Course = require("../models/courses.models");
const Subject = require("../models/subject.models");
const Lecture = require("../models/lecture.models");
const User = require("../models/user.models");

function getLastMonthRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);
  return { start, end };
}
exports.getDashboardStats = async (req, res) => {
     const { start, end } = getLastMonthRange();
  try {
    const [userCount, courseCount, subjectCount, lectureCount] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Subject.countDocuments(),
      Lecture.countDocuments(),
    ]);
   const [usersLastMonth, coursesLastMonth, lecturesLastMonth,subjectLastMonth] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: start, $lt: end } }),
      Course.countDocuments({ createdAt: { $gte: start, $lt: end } }),
      Lecture.countDocuments({ createdAt: { $gte: start, $lt: end } }),
      Subject.countDocuments({ createdAt: { $gte: start, $lt: end } }),
    ]);

    return res.status(200).json({
      success: true,
      userCount,
      courseCount,
      subjectCount,
      lectureCount,
     usersLastMonth,
      coursesLastMonth,
      lecturesLastMonth,
      subjectLastMonth
    });
  } catch (error) {
    console.error("Error fetching dashboard stats", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching stats",
    });
  }
};
