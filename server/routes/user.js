const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json(400, {
        error: "Invalid email/password",
      });
    }
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.json(400, {
        error: "Invalid email/password",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json(200, {
      message: "Login successful",
      success: true,
      data: token,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
});

router.get("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.json(404, {
        error: "User not found",
        success: false,
      });
    }
    res.json(200, {
      message: "User data fetched successfully",
      data: user,
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
