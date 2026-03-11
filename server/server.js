require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const postRoutes = require('./src/routes/postRoutes');
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');

const app = express();
app.use(cookieParser());

connectDB();

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
}));

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/posts", postRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
