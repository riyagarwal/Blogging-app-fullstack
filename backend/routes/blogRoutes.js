const express = require("express");

const { isAuth } = require("../middlewares/AuthMiddleware");
const { createBlog, getUserBlogs, deleteBlog, editBlog } = require("../controllers/blog.controllers");

const blogRouter = express(); //'router' is the same as 'app' in index.js just with a different name.

blogRouter.post("/create-blog", isAuth, createBlog);
blogRouter.get("/get-user-blogs", isAuth, getUserBlogs);
blogRouter.delete("/delete-blog/:blogId", isAuth, deleteBlog);
blogRouter.put("/edit-blog", isAuth, editBlog)

module.exports = blogRouter;
