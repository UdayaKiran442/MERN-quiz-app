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
router.get("/get-all-exams", authMiddleware, async (req, res) => {
  try {
    const exams = await Exam.find({});
    if (!exams) {
      return res.json(404, {
        error: "No exams found",
        success: false,
      });
    }
    return res.json(200, {
      success: true,
      data: exams,
      message: "Exams fetched successfully",
    });
  } catch (error) {
    return res.json(500, {
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
});
router.get("/get-exam-by-id/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.json(404, {
        error: "Exam not found",
        success: false,
      });
    }
    return res.json(200, {
      success: true,
      data: exam,
      message: "Exam fetched successfully",
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
