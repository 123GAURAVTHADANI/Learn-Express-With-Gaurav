const { User } = require("../Models/user.model");

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
  User.find({}).then()
}

module.exports = { createUser, getUsers };
