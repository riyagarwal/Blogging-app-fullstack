const User = require("../models/User");

const verifyUsernameAndEmailExists = async (email, username) => {
  try {
    const userData = await User.findOne({
      $or: [{ email }, { username }],
    }); //find based on email or username

    console.log(userData)
    
    if (userData && (userData.email === email)) {
      return "E";
    }

    if (userData && (userData.username === username)) {
      return "U";
    }

    return null;
  } catch (err) {
    return "err"
  }
};

module.exports = { verifyUsernameAndEmailExists };
