const router = require('express').Router();

const { login, register } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.use(require('../middlewares/reqValidator'));

router.post('/signin', login);
router.post('/signup', register);

router.use(require('../middlewares/auth'));

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
