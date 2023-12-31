const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.headers["x-acciojob"];
  let verifiedPayload;

  try {
    verifiedPayload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(400).send({
      status: 400,
      message: "You are not logged in!",
    });


  }

  // verifiedPayload has the entire payload sent while generating the token.

  // console.log(verifiedPayload);

  if (verifiedPayload) {
    req.locals = verifiedPayload;
    // console.log(req.locals);
    next();
  } else {
    res.status(401).send({
      status: 401,
      message: "User is unauthorized. Please login",
    });
  }
};

module.exports = { isAuth };

// req.locals is a temporary storage in express whose life exists between req and res of an API.
