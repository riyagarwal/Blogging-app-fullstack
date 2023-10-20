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
