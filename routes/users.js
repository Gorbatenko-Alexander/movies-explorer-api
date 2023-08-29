const router = require('express').Router();

const { getUserInfo, changeUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', changeUserInfo);

module.exports = router;
