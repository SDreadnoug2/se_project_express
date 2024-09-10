const express = require("express");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const auth = require("../middleware/auth");
const { login, createUser } = require("../controllers/user");
const {createUserValidation, loginValidation} = require('../middleware/validation');

const router = express.Router();
router.post("/signin", loginValidation, login);
router.post("/signup", createUserValidation, createUser);
router.use("/users", auth, userRouter);
router.use("/items", itemRouter);
module.exports = router;
