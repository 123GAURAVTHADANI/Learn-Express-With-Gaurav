var mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,
});

// Structure of the collection
// 1 st para : Name of the collection
// 2nd para : schema name

const User = mongoose.model("user", userSchema);
module.exports = { User };
