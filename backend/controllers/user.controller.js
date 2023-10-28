const User = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {
  verifyUsernameAndEmailExists,
} = require("../utils/verifyEmailUsername");
const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT);

// REGISTER USER
const registerUser = async (req, res) => {
  const isValid = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).max(30).alphanum().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
  }).validate(req.body);

  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Invalid input",
      data: isValid.error,
    });
  }

  // checking if username or email already exists before registering a new user
  const usernameEmailVerify = verifyUsernameAndEmailExists(
    req.body.email,
    req.body.username
  );

  console.log(usernameEmailVerify);

  if (usernameEmailVerify === "E") {
    res.status(400).send({
      message: "Email already exists",
    });
    return;
  } else if (usernameEmailVerify === "U") {
    res.status(400).send({
      message: "Username already exists",
    });
    return;
  } else if (usernameEmailVerify === "err") {
    res.status(400).send({
      message: "DB error: Couldn't register user!",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, BCRYPT_SALT);

  const userObj = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  });


  try {
    await userObj.save();
    res.send({ status: 201, message: "User created successfully!" });
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "DB error: User creation failed!",
      data: err,
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { loginId, password } = req.body;

  const isEmail = Joi.object({
    loginId: Joi.string().email().required(),
  }).validate({ loginId });

  let userData;

  if (isEmail.error) {
    userData = await getUserDataFromUsername(loginId);
    if (userData.err) {
      return res.status(400).send({
        status: 400,
        message: "DB error: getUserDataFromUsername failed",
        data: userData.err,
      });
    }
  } else {
    userData = await getUserDataFromEmail(loginId);

    if (userData.err) {
      return res.status(400).send({
        status: 400,
        message: "DB error: getUserDataFromEmail failed",
        data: userData.err,
      });
    }
  }

  if (!userData.data) {
    return res.status(400).send({
      status: 400,
      message: "No user found! Please register",
    });
  }

  const isPasswordMatching = await bcrypt.compare(
    password,
    userData.data.password
  );

  if (!isPasswordMatching) {
    return res.status(400).send({
      status: 400,
      message: "Incorrect Password",
    });
  }

  const payload = {
    username: userData.data.username,
    name: userData.data.name,
    email: userData.data.email,
    userId: userData.data._id,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET);

  res.status(200).send({
    status: 200,
    message: "Logged in successfully",
    data: {
      token,
    },
  });
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  const userId = req.locals.userId;

  const allUsersData = await getAllUsersFromDB(userId);

  if (allUsersData.err) {
    return res.status(400).send({
      status: 400,
      message: "DB Error: getAllUsersFromDB failed",
    });
  }

  let usersData = [];
  allUsersData.data.map((user) => {
    let userObj = {
      name: user.name,
      username: user.username,
      email: user.email,
      _id: user._id,
    };

    usersData.push(userObj);
  });

  res.status(200).send({
    status: 200,
    message: "All users fetched successfully",
    data: usersData,
  });
};

module.exports = { registerUser, loginUser, getAllUsers };
