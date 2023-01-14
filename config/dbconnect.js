const mongoose = require('mongoose');
const MONGO_URI =
  "mongodb+srv://bashir:4xQRG6i3LKxVRUMs@cluster0.cakbw2m.mongodb.net/sportify?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to database')
    } catch (error) {
       console.log(error.message)
       process.exit(1) 
    }
}

module.exports = connectDB