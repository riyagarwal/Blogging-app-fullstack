const express = require("express");
const { isAuth } = require("../middlewares/AuthMiddleware");
const {
  followUser,
  unfollowUser,
  getFollowingList,
  getFollowerList,
} = require("../controllers/follow.controller");

const app = express();

app.post("/followUser", isAuth, followUser);
app.post("/unfollowUser", isAuth, unfollowUser);
app.post("/getFollowingList", isAuth, getFollowingList);
app.post("/getFollowerList", isAuth, getFollowerList);

module.exports = app;
