const router = require("express").Router();
const auth = require("../middleware/auth");
const { getCurrentUser, updateUser } = require("../controllers/user");

router.get("/me", getCurrentUser);
router.patch("/me", updateUser);
module.exports = router;
