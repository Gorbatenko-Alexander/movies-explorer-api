const router = require('express').Router();

const { getUserInfo, changeUserInfo } = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', changeUserInfo);

module.exports = router;
