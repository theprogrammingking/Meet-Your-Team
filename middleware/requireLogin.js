const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

// middleware for checking if user logged in or not

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in!" });
  }

  const token = authorization.replace("Bearer ", "");

  // Verify by jwt token
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in!" });
    }

    const { _id } = payload;
    // If user is authenticated successfully get user data
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
