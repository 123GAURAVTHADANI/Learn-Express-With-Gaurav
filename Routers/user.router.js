var express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  login,
} = require("../Controllers/user.controller");
var userRouter = express.Router();

// Route Handler/ Controller
userRouter.get("/getUsers", getUsers);
userRouter.post("/login", login);
userRouter.post("/createUser", createUser);
userRouter.get("/getUser/", getUserById);
userRouter.patch("/updateUser/:id", updateUserById);

module.exports = { userRouter };

// what is query string ..
