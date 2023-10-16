const getBlogDataFromDB = async (blogId) => {
  let blogData = {
    data: null,
    err: null,
  };

  try {
    blogData.data = await Blog.findOne({ _id: blogId });
    return blogData;
  } catch (err) {
    blogData.err = err;
    return blogData;
  }
};

module.exports = { getBlogDataFromDB };
