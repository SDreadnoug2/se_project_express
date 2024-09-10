const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/user");
const auth = require('../middleware/auth');
const {updateUserValidation} = require('../middleware/validation');

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUserValidation, updateUser);
module.exports = router;
