const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "cold", "warm"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    owner: mongoose.ObjectId,
    required: true,
  },
  likes: {
    type: [user.ObjectId],
    enum: [],
  },
  createdAt: {
    date: Date.now,
  },
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);
