const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const e = require("express");

exports.quiz_DeleteQn = (req, res) => {
  resObj = {};
  qnAdded = false;
  qnCount = 0;
  isDeleted = false;
  Quiz.find(req.params.id).then((quiz) => {
    if (quiz) {
      Question.deleteOne(req.params.qid).then(() => {
        isDeleted = true;
      });
    }
  });
  if (isDeleted) {
    resObj.message = "Successfully Deleted";
  } else {
    resObj.message = "Failed to delete question";
    res.status(404).send(resObj);
  }
  res.status(200).send(resObj);
};

exports.quiz_AddQn = (req, res) => {
  resObj = {};
  qnAdded = false;
  qnCount = 0;
  Quiz.find(req.params.id).then((quiz) => {
    if (quiz) {
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
              quiz: quiz.id,
            });
            console.log(question);
            question.save();
            qnCount++;
          }
        });
      }
    }
  });
  if (qnAdded) {
    resObj.message = qnCount + " Questions Have been Added Successfully";
  } else {
    resObj.message = "No question was added";
  }
  res.status(200).send(resObj);
};

//  update question info
// Mention all the fields that have been  modded stored in an object
// called 'moddedFields'
// ideally you could create a dynamic object which contains only the moded fields and the new values
// let moddedFields = {
//   qnText: {
//     modifed: true / false,
//     value: "<insert New Value>", // optional, present if it has been modded
//   },
//   correctAnswer: {
//     modifed: true / false,
//     value: "<insert New Value>", // optional, present if it has been modded
//   },
//   options: {
//     modifed: true / false,
//     value: ["<insert New Value>"], // optional, present if it has been modded
//   },
// };

exports.quiz_UpdateQn = (res, req) => {
  Quiz.find(req.params.id).then((quiz) => {
    if (quiz) {
      Question.find(req.params.qid).then((qn) => {
        let moddedFields = req.body.moddedFields;
        updatedFields = {};
        if (moddedFields.qnText) {
          updatedFields.qnText = moddedFields.qnText.value;
        }
        if (moddedFields.correctAnswer) {
          updatedFields.correctAnswer = moddedFields.correctAnswer;
        }
        if (moddedFields.options) {
          updatedFields.options = moddedFields.options;
        }
        resObj = Question.update(req.params.qid, updatedFields);
        res.status(200).send(resObj);
      });
    }
  });
};
