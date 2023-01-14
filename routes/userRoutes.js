const express = require('express');
const router = express.Router();
const {signUpUser, signInUser, forgotPassword} = require('../controllers/user');
const isAuthenticated = require('../middleware/auth')

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/forgot-password", forgotPassword);



module.exports = router