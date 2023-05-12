const mongoose = require("mongoose");
// Define a schema
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    qnText: { type: String, required: true },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    correctAnswer: { type: Number },
    options: [String],
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

module.exports = mongoose.model("Question", QuestionSchema);
