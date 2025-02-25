const { User } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function createUser(req, res) {
  console.log(">>>req", req.body);
  User.create(req.body)
    .then(() => {
      res.status(201).send("Succesffully created!!");
    })
    .catch((err) => {
      res.status(500).json({ Message: err });
    });
}

function getUsers(req, res) {
  User.find({})
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ Message: "Something! Went Wrong", error: err });
    });
}

function getUserById(req, res) {
  console.log(">>", req.user);
  User.find({ _id: req.query.id })
    .then((response) => {
      res
        .status(200)
        .json({ Message: "User Fetched Succesfully", data: response });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ Message: "User did not fetched Succesfully", error: err });
    });
}

function updateUserById(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((response) => {
      res
        .status(200)
        .json({ Message: "User Updated Succesfully", data: response });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ Message: "User did not updated Succesfully", error: err });
    });
}

async function login(req, res) {
  try {
    let { password, email } = req.body;
    const user = await User.findOne({ email: email });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      res.status(401).json({ Message: "Email or Password does watch" });
      return;
    }
    const token = await jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("token", token);
    res.status(200).json({ Message: "Logined suceessufully!!" });
  } catch (err) {
    res.status(500).json({ Message: "Server error!" });
  }
  // bcrypt.compare(password,)
}

//

module.exports = { createUser, getUsers, getUserById, updateUserById, login };
