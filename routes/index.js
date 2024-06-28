const express = require("express");

const router = express.Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");


router.use((req, res, next) => {
  req.user = {
    _id: '667d992c8d72dff6cc607ac4'
  };
  next();
});

router.use("/users", userRouter);

router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

module.exports = router;