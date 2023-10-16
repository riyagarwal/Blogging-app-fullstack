const express = require("express");

const { isAuth } = require("../middlewares/AuthMiddleware");
const { createBlog, getUserBlogs, deleteBlog, editBlog } = require("../controllers/blog.controllers");

const blogRouter = express(); //'router' is the same as 'app' in index.js just with a different name.

blogRouter.post("/createBlog", isAuth, createBlog);
blogRouter.get("/getUserBlogs", isAuth, getUserBlogs);
blogRouter.delete("/deleteBlog/:blogId", isAuth, deleteBlog);
blogRouter.put("/editBlog", isAuth, editBlog)

module.exports = blogRouter;
