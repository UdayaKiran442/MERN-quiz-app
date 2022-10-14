const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json(400, {
        error: "User with this email already exists",
        success: false,
      });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    return res.status(200).json({
      newUser,
      message: "Account created successfully!Login to continue",
      success: true,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
});

module.exports = router;
