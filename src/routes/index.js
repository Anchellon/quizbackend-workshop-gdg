const express = require("express");
const router = express.Router();

const quiz_controller = require("../controllers/quizController");
/* GET home page. */
// read all Quiz
router.get("/", quiz_controller.getQuizs);
// delete Quiz
router.delete("/quiz/:id", quiz_controller.quizDelete);
module.exports = router;

// read Single Quiz with options
router.get("/quiz/:id", quiz_controller.quiz_Info_getMethod);
// Update quiz name

// create A quiz
router.post("/quiz", quiz_controller.quizCreate);
