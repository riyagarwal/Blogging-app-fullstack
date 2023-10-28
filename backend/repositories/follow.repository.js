const { TRUE, ERR, FALSE } = require("../constants");
const Follow = require("../models/Follow");
const User = require("../models/User");

// used to check if follower already follows following
const getFollowData = async (followingUserId, followerUserId) => {
  const followData = {
    data: null,
    err: null,
  };

  try {
    followData.data = await Follow.findOne({ followerUserId, followingUserId });
    return followData;
  } catch (err) {
    followData.err = err;
    return followData;
  }

  // if we get followData then that means follower already follows
};

// make a user follow another user
const addFollowToDB = async (followObj) => {
  try {
    await followObj.save();
    return TRUE;
  } catch (err) {
    return ERR;
  }
};

const deleteFollowFromDB = async (followerUserId, followingUserId) => {
  try {
    await Follow.findOneAndDelete({ followerUserId, followingUserId });
    return TRUE;

  } catch (err) {
    return ERR;
  }
};

const getFollowingListFromDB = async (followerUserId) => {
  let followingList = {
    data: null,
    err: null,
  };

  try {
    followingList.data = await Follow.find({ followerUserId });
    return followingList;

  } catch (err) {
    followingList.err = err;
    return followingList;
  }
};

const getFollowingDetailsFromDB = async (followingUserIds) => {
  let followingDetails = {
    data: null,
    err: null,
  };

  try {
    // fetch details from the db based on the followingUserIds array
    followingDetails.data = await User.find({ _id: { $in: followingUserIds } });

    return followingDetails;
  } catch (err) {
    followingDetails.err = err;
    return followingDetails;
  }
};

const getFollowerListFromDB = async (followingUserId) => {
  let followerList = {
    data: null,
    err: null,
  };

  try {
    followerList.data = await Follow.find({ followingUserId });

    return followerList;
  } catch (err) {
    followerList.err = err;
    return followerList;
  }
};

const getFollowerDetailsFromDB = async (followerUserId) => {
  let followerDetails = {
    data: null,
    err: null,
  };

  try {
    followerDetails.data = await User.find({ _id: { $in: followerUserId } });

    return followerDetails;
  } catch (err) {
    followerDetails.err = err;
    return followerDetails;
  }
};

module.exports = {
  getFollowData,
  addFollowToDB,
  deleteFollowFromDB,
  getFollowingListFromDB,
  getFollowingDetailsFromDB,
  getFollowerListFromDB,
  getFollowerDetailsFromDB,
};