const { ERR, TRUE, FALSE } = require("../constants");
const { getUserDataFromId } = require("../repositories/user.repository");

const verifyUserId = async (userId) => {
  const userData = await getUserDataFromId(userId);

  // Different states of response
  if (userData.err) {
    return ERR;
  } else if (userData.data.length !== 0) {
    return TRUE;
  } else {
    return FALSE;
  }
};

module.exports = { verifyUserId };