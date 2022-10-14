const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = User.findOne({ email });
    // if (userExists) {
    //   return res.json(400, {
    //     error: "User with this email already exists",
    //     success: false,
    //   });
    // }
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    return res.json(200, {
      newUser,
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
