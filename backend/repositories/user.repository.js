const User = require("../models/User");

const getUserDataFromUsername = async (username) => {
  const userData = {
    data: null,
    err: null,
  };

  try {
    userData.data = await User.findOne({ username });

    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

const getUserDataFromEmail = async (email) => {
  const userData = {
    data: null,
    err: null,
  };

  try {
    userData.data = await User.findOne({ email });
    console.log(userData.data);

    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

const getAllUsersFromDB = async (userId) => {
  const allUserData = {
    data: null,
    err: null,
  };

  try {
    allUserData.data = await User.find({ _id: { $ne: userId } });

    return allUserData;
  } catch (err) {
    allUserData.err = err;
    return allUserData;
  }
};

const getUserDataFromId = async (userId) => {
  const userData = {
    data: null,
    err: null,
  };

  try {
    userData.data = await User.findById(userId);
    return userData;
  } catch (err) {
    userData.err = err;
    return userData;
  }
};

module.exports =
  (getUserDataFromUsername,
  getUserDataFromEmail,
  getAllUsersFromDB,
  getUserDataFromId);
