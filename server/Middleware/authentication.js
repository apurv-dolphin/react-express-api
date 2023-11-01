// tokenMiddleware.js
const verifyToken = (req, res, next) => {
  const userToken = req.header("Authorization");

  if (userToken !== "no token") {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Token is missing" });
  }
};

module.exports = verifyToken;
