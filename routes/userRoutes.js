const express = require('express');
const router = express.Router();
const {
  signUpUser,
  signInUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/user");


router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/forgot-password", forgotPassword);
router.post("/password-reset/:userId/:token", resetPassword);



module.exports = router