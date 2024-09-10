const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {AuthError} = require("../utils/AuthError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new AuthError('No Authorization.'));
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log("Payload:", payload);
  } catch (err) {
   next(new AuthError('No Authorization.'));
  }
  req.user = payload;
  console.log("User attached to req:", req.user);
  return next();
};
