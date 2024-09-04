require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require('helmet')
const errorHandler = require('./middleware/error-handler')
const { requestLogger, errorLogger } = require('./middleware/logger');
const {errors} = require('celebrate');
const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://localhost:27017/wtwr_db");
app.use(cors());
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use("/", require("./routes/index"));
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server runing on ${PORT}`);
});

