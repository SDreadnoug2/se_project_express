const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const errors = require("../utils/errors");
const auth = require("../middleware/auth");
const { login, createUser } = require("../controllers/user");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", auth, userRouter);

router.use("/items", auth, itemRouter);

router.use((req, res) => {
  res.status(errors.NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;
