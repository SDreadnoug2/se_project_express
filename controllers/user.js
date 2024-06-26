const express = require('express');
const user = require('../models/user');

module.exports.getUsers = (req, res) => {

}

module.exports.getUser = (req, res) => {
  user.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err }));
};

module.exports.createUser = (req, res) => {
  const { name, about } = req.body;

  user.create({ name, about })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err }));
};
/*
GET /users — returns all users
GET /users/:userId - returns a user by _id
POST /users — creates a new user
*/
