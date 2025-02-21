var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,
  password: String,
});
// hooks & middleware
userSchema.pre("save", async function (next) {
  console.log("password", this.password);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// document query

// Structure of the collection
// 1 st para : Name of the collection
// 2nd para : schema name

const User = mongoose.model("user", userSchema);
module.exports = { User };
