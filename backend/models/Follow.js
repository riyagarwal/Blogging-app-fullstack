const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  // if A follows B, then
  followerUserId: {
    // this is A's user id
    // foreign key to users collection
    type: String,
    ref: "users",
    require: true,
  },
  followingUserId: {
    // this is B's user id
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

// mongo db saves collection's name in plural form. Hence, "follow" will be converted to "follows".
