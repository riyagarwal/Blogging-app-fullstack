const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/AuthMiddleware");
const {logger} = require("../middlewares/logger")

const app = express(); 

app.get("/", (req, res) => {
  res.status(200).send("working");
});

app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/get-all-users", isAuth, logger, getAllUsers);

module.exports = app;
