var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Kindly fill the Name!"],
      minLength: [3, "Name must be atleast of length 3"],
      maxLength: [50, "Name cannot exceed 50 characters!"],
    },
    age: {
      type: Number,
      required: [true, "Kindly fill the Age!"],
      min: [18, "Kindly give the age between 18 to 70"],
      max: [70, "Age cannot exceed 70!"],
    },
    email: {
      type: String,
      requird: [true, "Email cannot be empty!"],
      unique: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Provide the valid email address",
      ],
    },
    role: {
      type: String,
      enum: ["ADMIN", "SUPER ADMIN", "STUDENT", "CONSULTANT"],
      default: "STUDENT",
      required: [true, "Kindly give the role!"],
    },
    course: [courseSchema],
    password: String,
  },
  { timestamps: true }
);
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
