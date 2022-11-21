var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name not provided "],
  },
  password: {
    type: String,
    required: [true, "password not provided "],
  },
  about: {
    type: String,
    required: [true, "about not provided "],
  },
  image: {
    type: String,
    required: [true, "image not provided "],
  },
});

module.exports = mongoose.model("User", userSchema);
