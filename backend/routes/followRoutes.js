const express = require("express");
const { isAuth } = require("../middlewares/AuthMiddleware");
const {
  followUser,
  unfollowUser,
  getFollowingList,
  getFollowerList,
} = require("../controllers/follow.controller");

const app = express();

app.post("/follow-user", isAuth, followUser);
app.post("/unfollow-user", isAuth, unfollowUser);
app.post("/get-following-list", isAuth, getFollowingList);
app.post("/get-follower-list", isAuth, getFollowerList);

module.exports = app;
