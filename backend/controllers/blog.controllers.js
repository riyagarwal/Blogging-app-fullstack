const Joi = require("joi");
const Blog = require("../models/Blog");
const { blogBelongsToUser } = require("../utils/blogBelongsToUser");

// POST - create blog
const createBlog = async (req, res) => {
  const { title, textBody } = req.body;

  // validate the data received from the client
  const isValid = Joi.object({
    title: Joi.string().required(),
    textBody: Joi.string().min(30).max(1000).required(),
  }).validate(req.body);

  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Invalid data format",
      data: isValid.error,
    });
  }

  const blogObj = new Blog({
    title,
    textBody,
    username: req.locals.username,
    userId: req.locals.userId,
  });

  try {
    await blogObj.save();
    res.status(201).send({
      status: 201,
      message: "blog created Successfully!",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Blog creation failed!",
    });
  }
};

// GET - get blogs
// /blogs/getUserBlogs?page=2
const getUserBlogs = async (req, res) => {
  const userId = req.locals.userId;
  const page = parseInt(req.query.page) || 1; //page requested by user
  const LIMIT = 10; //blogs to display per page

  try {
    // PAGINATION
    const myBlogsData = await Blog.find({ userId })
      .sort({ creationDateTime: -1 })
      .skip((page - 1) * LIMIT)
      .limit(LIMIT);

    console.log(myBlogsData);

    res.status(200).send({
      status: 200,
      message: "User blogs fetched successfully!",
      data: myBlogsData,
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Failed to fetch the blogs!",
    });
  }
};

// DELETION - API to Delete a blog
const deleteBlog = async (req, res) => {
  const blogId = req.params.blogid;
  const userId = req.locals.userId;
  // check if the user whom the blog belongs to is trying to delete it
  const blogBelongsToUserStatus = await blogBelongsToUser(blogId, userId);

  if (blogBelongsToUserStatus === ERR) {
    return res.status(400).send({
      status: 400,
      message: "DB error: getBlogDataFromDB Failed",
    });
  } else if (blogBelongsToUserStatus === FALSE) {
    return res.status(403).send({
      status: 403,
      message: "Unauthorized to delete the blog",
    });
  } else {
    try {
      await Blog.findByIdAndDelete(blogId);
      res.status(200).send({
        status: 200,
        message: "Blog deleted successfully!",
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
        message: "Unable to delete the blog!",
      });
    }
  }
};

// PUT - API to edit a blog
const editBlog = async (req, res) => {
  const { blogId, title, textBody } = req.body;
  const userId = req.locals.userId;

  try {
    const blogData = await Blog.findById(blogId);

    // Check if a user is trying to edit someone else's blogs
    if (!(blogData.userId.toString() === userId.toString())) {
      return res.status(401).send({
        status: 401,
        message: "Not allowed to edit. Authorization failed!",
      });
    }

    // compare the time if it is in the 30mins bracket (only allow the user to edit within 30 mins from creation time)
    const creationDateTime = blogData.creationDateTime.getTime();
    const currentDateTime = Date.now();

    // console.log(creationDateTime);
    // console.log(currentDateTime);  //output in ms

    const diff = (currentDateTime - creationDateTime) / (1000 * 60);

    if (diff > 30) {
      return res.status(400).send({
        status: 400,
        message: "Not allowed to edit after 30 mins of blog creation!",
      });
    }
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Unable to edit the blog!",
    });
  }

  // if time gap is less than 30 mins, then edit the blog
  try {
    const newBlogData = {
      title,
      textBody,
    };

    await Blog.findOneAndUpdate({ _id: blogId }, newBlogData);

    res.status(200).send({
      status: 200,
      message: "Blog updated successfully!",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "Unable to edit the blog!",
    });
  }
};

module.exports = { createBlog, getUserBlogs, deleteBlog, editBlog };
