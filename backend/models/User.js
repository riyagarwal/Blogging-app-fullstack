const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("users", UserSchema);
