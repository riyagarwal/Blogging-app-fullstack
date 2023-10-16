const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  followerUserId: {
    // this is a foreign key to the users collection
    type: Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  followingUserId: {
    // this also is a foreign key to the users collection
    type: Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  creationDateTime: {
    type: Date,
    default: Date.now(),
    require: true,
  },
});

module.exports = mongoose.model("follow", FollowSchema);
