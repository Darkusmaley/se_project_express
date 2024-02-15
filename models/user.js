const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "Name cannot be less than 2 characters"],
    maxlength: [30, "Name cannot be More than 30 characters"],
  },
  avatar: {
    type: String,
    required: [true, "The Avatar field is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
