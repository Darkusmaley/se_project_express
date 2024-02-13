const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;
const mainRouter = require("./routes/index");

app.use(express.json());
app.use((req, res, next) => {
  req.user = { _id: "65cac5cf5773f015c0b529f7" };
  next();
});
app.use("/", mainRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to WTWR_DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
