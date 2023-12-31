const express = require("express");

const { isAuth } = require("../middlewares/AuthMiddleware");
const { createBlog, getUserBlogs, deleteBlog, editBlog, getHomepageBlogs } = require("../controllers/blog.controllers");

const app = express(); //'router' is the same as 'app' in index.js just with a different name.

app.use(isAuth)

app.post("/create-blog", createBlog);
app.get("/get-user-blogs", getUserBlogs);
app.delete("/delete-blog/:blogId", deleteBlog);
app.put("/edit-blog", editBlog)
app.get("/homepage-blogs", getHomepageBlogs);

module.exports = app;
