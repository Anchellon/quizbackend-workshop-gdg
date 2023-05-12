const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

exports.getQuizs = (req, res, next) => {
  resObj = {};

  Quiz.find({}).then((quizArray) => {
    resObj.quizzes = quizArray;
    resObj.message = "Quiz List for the user";
    res.status(200).send(resObj);
  });
};

exports.quiz_Info_getMethod = (req, res) => {
  let resObj = {};
  Quiz.findById(req.params.id).then((quiz) => {
    // if (err) {
    //   return next(err);
    // }
    // For the quiz find all relevant details including all questions and their corresponding
    resObj.quiz = quiz;
    Question.find({ quiz: req.params.id }).then((qns) => {
      //   if (err) {
      //     return next(err);
      //   }
      resObj = qns;
      resObj.message = "Quiz Info Retrieved";
      res.status(200).send(resObj);
    });
  });
};

exports.quizDelete = (req, res) => {
  Quiz.findById(req.params.id)
    .remove()
    .then(() => Question.deleteMany({ quiz: req.params.id }));
  resObj.message =
    "Quiz with id " + req.params.id + " ad associated questions Deleted";
  res.status(200).send(resObj);
};

exports.quizCreate = (req, res) => {
  const qz = new Quiz({ name: req.body.name });
  qz.save();
  console.log(req.body);
  if (req.body.questions) {
    questions = req.body.questions;
    questions.forEach((qn) => {
      if (
        qn.correctAnswer <= qn.options.length &&
        qn.correctAnswer > 0 &&
        qn.options.length > 0
      ) {
        let question = new Question({
          qnText: qn.qnText,
          correctAnswer: qn.correctAnswer,
          options: qn.options,
          quiz: qz.id,
        });
        console.log(question);
        question.save();
      }
    });
  }
  res.status(200).send(qz);
};

// Add specific question to a quiz
// or delete a qn from a quiz
// Expected payload
// {
//     "name": "Postman Quiz",
//     "questions": [
//         {
//             "qnText": "Who created Postman?",
//             "correctAnswer": 2,
//             "options": [
//                 "myself",
//                 "me",
//                 "I"
//             ]
//         },
//         {
//             "qnText": "Why should you use postman?",
//             "correctAnswer": 0,
//             "options": [
//                 "duh",
//                 "obv",
//                 "ez"
//             ]
//         }
//     ]
// }
