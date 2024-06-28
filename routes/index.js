const express = require("express");

const router = express.Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const errors = require("../utils/errors");

router.use("/users", userRouter);

router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(errors.NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;
