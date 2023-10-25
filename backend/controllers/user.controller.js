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
    username: req.body.user,
    email: req.body.email,
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
  let userData;

  // check if loginId entered by user is email or username
  const isEmail = Joi.object({
    loginId: Joi.string().email().required(),
  }).validate({ loginId });
  // validate always takes in data in the form of object

  try {
    //search the database accordingly
    if (isEmail.error) {
      try {
        userData = await User.findOne({ username: loginId });
      } catch (err) {
        // case when connection to db is lost
        res.status(400).send({
          message: "Unable to get data from username from DB",
        });
      }
    } else {
      try {
        userData = await User.findOne({ email: loginId });
      } catch (err) {
        // case when connection to db is lost
        res.status(400).send({
          message: "Unable to get data from email from DB",
        });
      }
    }

    // If we do not get userData from the database, it means no user is present with that loginid.
    if (!userData) {
      return res.status(400).send({
        message: "No user found! Please register or check your credentials",
      });
    }

    // if userData is found for the corresponding loginId
    // match the password with the encrypted db password
    const isPasswordSame = await bcrypt.compare(password, userData.password);

    if (isPasswordSame) {
      return res.status(200).send({
        message: "Login Successful!",
      });
    } else {
      res.status(400).send({
        message: "Incorrect Password!",
      });
    }

    // if password matches successfully => user should be able to login
    const payload = {
      username: userData.data.username,
      name: userData.data.name,
      email: userData.data.email,
      userId: userData.data._id,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    res.status(200).send({
      status: 200,
      message: "Login successful!",
      data: {
        token,
      },
    });
  } catch (err) {
    res.status(400).send({
      message: "Login failed!",
      data: err,
    });
  }
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
