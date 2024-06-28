const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "667f1a94adb71d7397a18166", // paste the _id of the test user created in the previous step
  };
  next();
});

app.use("/", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`server runing on ${PORT}`);
});
