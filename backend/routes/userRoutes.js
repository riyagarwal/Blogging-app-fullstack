const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/AuthMiddleware");

const userRouter = express(); //'router' is the same as 'app' in index.js just with a different name.

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
// userRouter.post("/logout", isAuth, logoutUser);

module.exports = userRouter;
