// user controller
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const errors = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const { NotFoundError, BadRequest, ServerError, NoPermission } = require("../utils/errors");


module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    next( new BadRequest('Please fill out all fields.'))
  }
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new BadRequest('User Exists')
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashword) => User.create({ name, avatar, email, password: hashword }))
    .then((user) => res.send({ name: user.name, avatar: user.avatar, email: user.email }))
    .catch((err) => {
      if (err instanceof BadRequest) {
        next(err)
      }
      if (err.name === "ValidationError") {
        next(new BadRequest('Invalid Data.'))
      }
      else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest('Please fill out all fields.')
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
      res.send({ token, user});
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new BadRequest('Incorrect email or password'))
     }
      else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('no user found')
      }

      return res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      if(err instanceof NotFoundError){
        next(err);
      }
      else{
        next(err)
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError('Updated User not found!')
      }
      console.log(`user updated: ${updatedUser}`)
      return res.send({ updatedUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' ) {
        next(new NoPermission('Validation Error'))
  } else {
    next(err);
  }
    });
};
