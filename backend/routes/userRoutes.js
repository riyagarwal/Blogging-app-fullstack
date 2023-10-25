const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/AuthMiddleware");

const app = express(); //'router' is the same as 'app' in index.js just with a different name.

app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/get-all-users", getAllUsers)

module.exports = app;
