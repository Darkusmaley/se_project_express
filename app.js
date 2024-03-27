const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("../se_project_express/middlewares/errorHandler");
const { errors } = require("celebrate");
const {
  requestLogger,
  errorLogger,
} = require("../se_project_express/middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;
const mainRouter = require("./routes/index");

app.use(requestLogger);
app.use(cors());
app.use(express.json());
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to WTWR_DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
