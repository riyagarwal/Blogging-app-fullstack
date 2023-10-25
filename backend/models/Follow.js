const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  // if A follows B, then
  followerUserId: {
    // this is A's id
    type: String,
    ref: "users",
    require: true,
  },
  followingUserId: {
    // this is B's id
    type: String,
    ref: "users",
    require: true,
  },
  creationDateTime: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("follow", FollowSchema);
