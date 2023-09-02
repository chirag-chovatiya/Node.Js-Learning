const User = require("../models/userModel");

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const userId = User.verifyToken(token);
      if (userId) {
        const user = await User.getUserById(userId);
        console.log(user);
        if (userId) {
          req.userId = User.userId;
          console.log(userId, "user id");
          console.log(req.userId, "req.userId");
          next();
        } else {
          res.status(401).json({ status: "failed", message: "User not found" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ status: "failed", message: "Unauthorized User" });
    }
  } else {
    res
      .status(401)
      .json({ status: "failed", message: "Unauthorized User, No Token" });
  }
};

module.exports = {
  checkUserAuth,
};
