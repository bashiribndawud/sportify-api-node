const express = require('express');
require('dotenv').config();
const cors = require('cors');
const logger = require('morgan');
const connectDB = require('./config/dbconnect');
const userRouter = require('./routes/userRoutes')
const playlistRouter = require('./routes/playlistRouter')
const songRouter = require('./routes/songRouter')
const app = express();
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 8000;

// database connection
connectDB()

// middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// api 
app.get("/", (req, res) => {
  res.send("Welcome to Spotify API with NodeJs");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/", playlistRouter);
app.use("/api/v1/songs", songRouter);






app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});

