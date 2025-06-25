const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db.config');
dotenv.config();
const authRoutes = require('./routes/user.router');
const courseRoutes = require('./routes/courses.router');
const lectureRoutes = require('./routes/lecture.router');
const subjectRotees = require('./routes/subject.router')
const cors = require('cors');

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/lecture',lectureRoutes);
app.use('/api/subject', subjectRotees);

app.get('/', (req, res) => {
    res.send('Hello World!');
}
)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});