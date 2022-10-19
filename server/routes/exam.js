const express = require("express");
const router = express.Router();
const Exam = require("../model/exam");
const Question = require("../model/question");
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
router.get("/get-exam-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("questions");
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

router.post("/edit/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findByIdAndUpdate(id, req.body);
    if (!exam) {
      return res.json(404, {
        success: false,
        error: "Exam not found",
      });
    }
    return res.json(200, {
      message: "Exam edited successfully",
      success: true,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id);
    if (!exam) {
      return res.json(404, {
        success: false,
        error: "Exam not found",
      });
    }
    exam.remove();
    return res.json(200, {
      message: "Exam deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
});

router.post("/add-question", authMiddleware, async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    const exam = await Exam.findById(req.body.exam);
    if (!exam) {
      return res.json(404, {
        error: "Exam not found",
        success: false,
      });
    }
    exam.questions.push(newQuestion._id);
    await exam.save();
    return res.json(200, {
      message: "Question added successfully",
      success: true,
      data: newQuestion,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
});

router.post("/edit-question-in-exam/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndUpdate(id, req.body);
    if (!question) {
      return res.json(404, {
        error: "Question not found",
        success: false,
      });
    }
    return res.json(200, {
      message: "Question edited successfully",
      success: true,
    });
  } catch (error) {
    return res.json(500, {
      error: error.message,
      success: false,
    });
  }
});

router.post("/delete-question/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(req.body.examId);
    if (!exam) {
      return res.json(404, {
        error: "Exam not found",
        success: false,
      });
    }
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.json(404, {
        error: "Question not found",
        success: false,
      });
    }

    exam.questions = exam.questions.filter((question) => question._id !== id);
    await exam.save();
    return res.json(200, {
      message: "Question deleted successfully",
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
