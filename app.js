const express = require("express");
const app = express();
const port = 3000;
const bodyparser = require("body-parser");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb://localhost:27017/quizzy";

main().catch((err) => {
  console.log("hi");
  console.log(err);
});
async function main() {
  await mongoose.connect(mongoDB);
}

var indexRouter = require("./src/routes/index");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
// Adding routes
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
