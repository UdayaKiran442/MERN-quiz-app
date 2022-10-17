const express = require("express");
const router = express.Router();
const Exam = require("../model/exam");
const authMiddleware = require("../middlewares/authMiddleware");
router.post("/add", authMiddleware, async (req, res) => {
  try {
    req.body.questions = [];
    const newExam = new Exam(req.body);
    await newExam.save();
    return res.json({
      message: "Exam added succesfully",
      data: newExam,
      success: true,
    });
  } catch (error) {
    return res.json(500, {
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
});
module.exports = router;
