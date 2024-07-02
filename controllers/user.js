// user controller
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const errors = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    return res
      .status(errors.BAD_REQUEST)
      .send({ message: "Please fill out all fields." });
  }
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new Error("UserExists");
        error.name = "UserExists";
        throw error;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashword) => User.create({ name, avatar, email, password: hashword }))
    .then((user) => res.send({ name: user.name, avatar: user.avatar, email: user.email }))
    .catch((err) => {
      if (err.name === "UserExists") {
        return res
          .status(errors.USER_EXISTS)
          .send({ message: "This email is already in use." });
      }
      if (err.name === "ValidationError") {
        return res.status(errors.BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(errors.SERVER_ERROR)
        .send({ message: "Internal Server Error!" });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(errors.BAD_REQUEST)
      .send({ message: "Please fill out all fields." });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return res.status(errors.AUTH_ERROR).send({message: "Incorrect email or password"})
     }
      return res.status(errors.SERVER_ERROR).send({ message: "Server Error!" });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(errors.NOT_FOUND).send({ message: "User not found" });
      }

      return res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(errors.INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(errors.NOT_FOUND).send({ message: "User not found" });
      }
      return res.send({ data: updatedUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' ) {
        return res.status(errors.BAD_REQUEST).send({messsage: "Validation Error"});
  }
      return res
        .status(errors.SERVER_ERROR)
        .send({ message: "Internal Server Error"});
    });
};
