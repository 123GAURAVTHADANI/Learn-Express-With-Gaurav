var express = require("express");
const { createUser, getUsers } = require("../Controllers/user.controller");
var userRouter = express.Router();

// Route Handler/ Controller
userRouter.get("/getUser", getUsers);
userRouter.post("/createUser", createUser);

module.exports = { userRouter };

// what is query string ..
