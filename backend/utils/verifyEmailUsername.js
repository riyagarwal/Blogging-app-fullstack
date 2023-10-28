const {TRUE, FALSE, ERR} = require("../constants")

const {
  findUsersWithEmailOrUsername
} = require("../repositories/user.repository");

const verifyUsernameAndEmailExists = async (email, username) => {
  const userData = await findUsersWithEmailOrUsername(email, username);

  // Different states of response
  if (userData.err) {
    return ERR;
  } else if (userData.data.length !== 0) {
    return TRUE; //user exists
  } else {
    return FALSE;
  }
};

module.exports = { verifyUsernameAndEmailExists };
