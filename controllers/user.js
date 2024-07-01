// user controller
const User = require("../models/user");
const bcrypt = require("bcryptjs")
const errors = require("../utils/errors");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      console.error(err);
      return res
        .status(errors.BAD_REQUEST)
        .send({ message: "Internal Server Error" });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error("NotFound"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.message === "NotFound") {
        return res.status(errors.NOT_FOUND).send({ message: "User not found" });
      }
      if (err.kind === "ObjectId") {
        return res
          .status(errors.BAD_REQUEST)
          .send({ message: "Invalid User ID" });
      }
      return res
        .status(errors.BAD_REQUEST)
        .send({ message: "Internal Server Error" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({email}).then((user) => {
    if(user){
      const error = new Error("UserExists");
      error.name = "UserExists";
      throw error;
  }
  return bcrypt.hash(password, 10);
})
.then((hashword) => {
  return User.create({ name, avatar, email, password: hashword });
})
    .then((user) => res.send({ name: user.name, avatar: user.avatar, email: user.email }))
    .catch((err) => {
      console.error(err);
      if (err.name === "UserExists") {
        return res.status(errors.USER_EXISTS).send({message: "This email is already in use."})
      }
      if (err.name === "ValidationError") {
        return res.status(errors.BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(errors.BAD_REQUEST)
        .send({ message: "Internal Server Error" });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(errors.BAD_REQUEST).send({ message: "Please fill out all fields." });
  }
  return User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '7d'});
        res.send({token});
      })
      .catch((err) => {
          res.status(errors.AUTH_ERROR).send({ message: err.message });
      });
  };

  module.exports.getCurrentUser = (req, res) => {
    User.findById(req.user._id)
      .then((user) => {
        if (!user) {
          return res.status(errors.NOT_FOUND).send({ message: 'User not found' });
        }
        res.send({ data: user });
      })
      .catch((err) => {
        console.error(err);
        res.status(errors.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
      });
  };