const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  email: { type: String, require: true, trim: true, lowercase: true },
  password: { type: String, require: true, trim: true },
  tc: { type: String, require: true, trim: true },
});

const User = mongoose.model("products", userSchema);
module.exports = User;
