const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { validateEmail, validatePassword } = require("../utils/validator");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendMail = require("../service/sendEmail");
require("dotenv").config();

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
    if (!userExist) {
      return res.status(400).json({ err: "Invalid email or password" });
    }
    const comparePassword = await bcrypt.compare(password, userExist.password);
    if (!comparePassword) {
      return res.status(400).json({ err: "Invalid email or password" });
    }
    const payload = { user: { id: userExist.id } };

    console.log(process.env.SECRET);
    const bearerToken = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: 360000,
    });
    res.cookie("token", bearerToken, { expire: new Date() + 9999 });
    const { password: userpassword, ...others } = userExist._doc;
    return res.status(200).json({
      msg: "User logged In",
      token: `bearer ${bearerToken}`,
      ...others,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ err: error });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ err: "Please provide your registered email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ err: "Please provide your registered email" });
    }

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;

    await sendMail(user.email, "Password Reset", link);

    return res
      .status(200)
      .json({ msg: "password reset link sent to your email account" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ err: error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;
    console.log(password)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ err: "invalid link or expired" });
    }
    const verifyToken = await Token.findOne({
      userId: user._id,
      token: token,
    });
    if (!verifyToken) {
      return res.status(400).json({ err: "invalid link or expired" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ err: "Invalid password" });
    }
    if(!password){
      return res.status(400).json({ err: "Please Input you password" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    user.password = hashpassword;
    await user.save();
    await verifyToken.delete();

    return res.status(201).json({ success: "password reset sucessfully." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ err: error.message });
  }
};

module.exports = { signUpUser, signInUser, forgotPassword, resetPassword };
