const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;
const mainRouter = require("./routes/index");

app.use(express.json());
app.use("/", mainRouter);
app.use((req, res) => {
  req.user = { _id: "65ca73450f708f0aa646d950" };
  next;
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to WTWR_DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
