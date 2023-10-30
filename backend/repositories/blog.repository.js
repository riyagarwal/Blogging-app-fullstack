const Blog = require("../models/Blog");

const getBlogDataFromDB = async (blogId) => {
  let blogData = {
    data: null,
    err: null,
  };

  console.log(`BlogId: ${blogId}`)

  try {
    blogData.data = await Blog.findOne({ _id: blogId });
    return blogData;
  } catch (err) {
    blogData.err = err;
    return blogData;
  }
};

const getFollowingBlogsFromDB = async (followingUserIds) => {
  let followingBlogsData = {
    data: null,
    err: null,
  };

  // console.log(followingUserIds)

  try {
    followingBlogsData.data = await Blog.find({
      userId: { $in: followingUserIds },
      isDeleted: false,
    });
    return followingBlogsData;

  } catch (err) {
    followingBlogsData.err = err;
    console.log(err)
    return followingBlogsData;
  }
};

module.exports = { getBlogDataFromDB, getFollowingBlogsFromDB };
