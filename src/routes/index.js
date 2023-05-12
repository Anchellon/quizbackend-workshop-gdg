const express = require("express");
const router = express.Router();

const quiz_controller = require("../controllers/quizController");
const question_controller = require("../controllers/questionController");
/* GET home page. */
// read all Quiz
router.get("/", quiz_controller.getQuizs);
// delete Quiz
router.delete("/quiz/:id", quiz_controller.quizDelete);
module.exports = router;

// read Single Quiz with options
router.get("/quiz/:id", quiz_controller.quiz_Info_getMethod);
// Update quiz name
// Expected json payload
// { name: <Insert Updated Name> }
router.put("/quiz/:id", quiz_controller.quiz_updateName);

// create A quiz
router.post("/quiz", quiz_controller.quizCreate);

// create/add a qn to a quiz
router.post("/quiz/:id/qn/add", question_controller.quiz_AddQn);

// Delete a qn from a given quiz
router.delete("/quiz/:id/qn/:qid/delete", question_controller.quiz_DeleteQn);

// Mod a qn from a given quiz
// Fields that are updated need to be tracked from the front end and passed in the body of the request
router.put("/quiz/:id/qn/:qid/update", question_controller.quiz_UpdateQn);
