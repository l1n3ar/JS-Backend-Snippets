const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.header.authorization &&
    req.header.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.header.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      console.log(error);
      res.status(400);
      throw new Error('Not Authorized');
    }
  }

  if (!token) {
    res.status(400);
    throw new Error('Not Authorized');
  }
});

module.exports = { protect };


//In your route, pass this function as the second argument.
