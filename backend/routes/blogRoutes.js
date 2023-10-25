const express = require("express");

const { isAuth } = require("../middlewares/AuthMiddleware");
const { createBlog, getUserBlogs, deleteBlog, editBlog } = require("../controllers/blog.controllers");

const app = express(); //'router' is the same as 'app' in index.js just with a different name.

app.post("/create-blog", isAuth, createBlog);
app.get("/get-user-blogs", isAuth, getUserBlogs);
app.delete("/delete-blog/:blogId", isAuth, deleteBlog);
app.put("/edit-blog", isAuth, editBlog)

module.exports = app;
