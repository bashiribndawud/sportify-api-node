const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { validateEmail, validatePassword } = require("../utils/validator");
const bcrypt = require("bcrypt");
require('dotenv').config();

const signUpUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ err: "Please enter all fields" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ err: "Invalid Email provided" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ err: "Invalid password" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ err: "Email taken" });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashpassword,
    });
    if (!validateEmail(email)) {
      return res.status(400).json({ err: "Invalid Email provided" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ err: "Invalid password" });
    }

    const savedUser = await newUser.save();
    res.status(200).json({ success: "User created successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ err: error });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ err: "Please provide email" });
    }
    if (!password) {
      return res.status(400).json({ err: "Please provide password" });
    }

    const userExist = await User.findOne({ email });
    if(!userExist){
        return res.status(400).json({err: "Invalid email or password"})
    }
    const comparePassword = await bcrypt.compare(password, userExist.password);
    if(!comparePassword){
        return res.status(400).json({ err: "Invalid email or password" });
    }
    const payload = {id: userExist.id}
    
    const bearerToken = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: 360000
    });
    // set cookie on the client browser
    res.cookie("token", bearerToken, { expires: new Date(Date.now() + 90000) });
    const {password: userPassword, ...others} = userExist._doc 
    return res.status(200).json({
        msg: "User Signed In",
        token: `bearer ${bearerToken}`,
        ...others
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ err: error });
  }

};

const forgotPassword = (req, res) => {
    
}

module.exports = { signUpUser, signInUser, forgotPassword };