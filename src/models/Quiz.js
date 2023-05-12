const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

module.exports = mongoose.model("Quiz", QuizSchema);
