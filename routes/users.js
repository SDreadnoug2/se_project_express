const router = require('express').Router();
const {getUsers, getUser, createUser} = require('../controllers/user');

router.get('/user', getUsers);
router.get('/users/:userId', getUser);
router.post('/user', createUser);

module.exports = router;
