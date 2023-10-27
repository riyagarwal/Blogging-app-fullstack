const express = require("express");
const cors = require("cors");

// file imports
require("dotenv").config();

const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const followRoutes = require("./routes/followRoutes")
const {cleanUpBin} = require("./utils/cron")
const app = express();

const PORT = process.env.SERVER_PORT;

// middlewares
app.use(express.json());
app.use(cors({ origin: "*" })); //accept api calls from any source

// adding all the routes from routes folder
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/follow", followRoutes);

app.listen(8001, () => {
  console.log("Server is running at port", PORT);
  cleanUpBin()
});
