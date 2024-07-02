const jwt = require("jsonwebtoken");
const errors = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(errors.AUTH_ERROR)
      .send({ message: "Authorization required." });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log("Payload:", payload);
  } catch (err) {
    return res
      .status(errors.AUTH_ERROR)
      .send({ message: "Authorization required:", err });
  }
  req.user = payload;
  console.log("User attached to req:", req.user);
  return next();
};
