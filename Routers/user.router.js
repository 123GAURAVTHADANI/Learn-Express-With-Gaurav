var express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  login,
} = require("../Controllers/user.controller");
const {
  isLoggedIn,
  authorizeRole,
} = require("../Middlewares/custom.middleware");
var userRouter = express.Router();

// Route Handler/ Controller ///
userRouter.get("/getUsers", getUsers);
userRouter.post("/login", login);
userRouter.post("/createUser", createUser);
userRouter.get("/getUser/", isLoggedIn, getUserById);
userRouter.patch(
  "/updateUser/:id",
  isLoggedIn,
  authorizeRole("SUPER ADMIN"),
  updateUserById
);

module.exports = { userRouter };

// what is query string ..
