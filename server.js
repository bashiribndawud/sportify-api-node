const express = require('express');
require('dotenv').config();
const cors = require('cors');
const logger = require('morgan');
const connectDB = require('./config/dbconnect')
const app = express()

const PORT = process.env.PORT || 8000;

// database connection
connectDB()

// middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

