// user controller
const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Internal Server Error" });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error("NotFound"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.message === "NotFound") {
        return res.status(404).send({ message: "User not found" });
      } else if (err.kind === "ObjectId") {
        // Ensure invalid ObjectId is handled
        return res.status(400).send({ message: "Invalid User ID" });
      }
      res.status(500).send({ message: "Internal Server Error" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        // Handle validation error properly
        return res.status(400).send({ message: "Invalid data" });
      }
      res.status(500).send({ message: "Internal Server Error" });
    });
};
