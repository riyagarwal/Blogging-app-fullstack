const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log(err);
  });
