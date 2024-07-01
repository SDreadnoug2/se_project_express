const router = require('express').Router();
const {getCurrentUser } = require('../controllers/user');
const auth = require("../middleware/auth")

router.get('/me', auth, getCurrentUser)
module.exports = router;