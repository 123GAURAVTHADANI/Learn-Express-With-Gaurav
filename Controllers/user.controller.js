const { User } = require("../Models/user.model");
const bcrypt = require("bcrypt");

function createUser(req, res) {
  User.create(req.body)
    .then(() => {
      res.status(201).send("Succesffully created!!");
    })
    .catch((err) => {
      res.status(500).send("Error Occured!!");
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
  console.log(">>", req);
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
    let { password } = req.body;
    let user = await User.findOne({ _id: req.query.id });
    if (!user) {
      res.status(400).json({ Message: "User does not!!" });
    }
    let pass_result = await bcrypt.compare(password, user.password);
    console.log(pass_result);
  } catch (err) {
    res.status(500).json({ Message: "SOmething went wrong!!", error: err });
  }
  // bcrypt.compare(password,)
}

module.exports = { createUser, getUsers, getUserById, updateUserById, login };
