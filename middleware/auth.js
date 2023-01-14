const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuthenticatedUser = async(req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ err: "Authorization header not set" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(400).json({ err: "Token not found" });
      }
      // {user: {id: 1}}
      const decoded = jwt.verify(token, "SECRET");
      const user = await User.findById(decoded.user.id);

      if (!user) {
        return res.status(404).json({ err: "User not found" });
      }
    //   const {password, ...others} = user._doc
      req.user = user;
      next();
    } catch (error) {
      res.status(503).json({
        err: "Token is not valid",
      });
    }
}

module.exports = isAuthenticatedUser