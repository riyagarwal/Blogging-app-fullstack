const {TRUE, FALSE, ERR, NOT_EXIST} = require("../constants")
const { getBlogDataFromDB } = require("../repositories/blog.repository");

const blogBelongsToUser = async (blogId, userId) => {
  const blogData = await getBlogDataFromDB(blogId);

  if (blogData.err) {
    return ERR;
  } else if (blogData.data.userId == userId) {
    //using == to only match the value and not their datatypes
    return TRUE;
  } else {
    return FALSE;
  }
};

module.exports = { blogBelongsToUser };
