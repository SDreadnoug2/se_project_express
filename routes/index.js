const express = require("express");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const auth = require("../middleware/auth");
const { login, createUser } = require("../controllers/user");
const {createUserValidation, loginValidation} = require('../middleware/validation');
const NotFoundError = require("../utils/NotFoundError");
const router = express.Router();
router.post("/signin", loginValidation, login);
router.post("/signup", createUserValidation, createUser);
router.use("/users", auth, userRouter);
router.use("/items", itemRouter);
router.use((req, res, next) => {
  next(new NotFoundError("Route not found."));
});
module.exports = router;
