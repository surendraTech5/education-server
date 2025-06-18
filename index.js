const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db.config');
dotenv.config();
const authRoutes = require('./routes/user.router');
const cors = require('cors');

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB();

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
}
)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});