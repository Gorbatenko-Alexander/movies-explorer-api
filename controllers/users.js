const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = require('../models/user');
const NotUniqueError = require('../errors/NotUniqueError');

const { JWT_SECRET = 'enc-key-should-be-here' } = process.env;

const getUserInfo = (req, res, next) => {
  user.findById(req.user._id)
    .then((result) => res.send({ id: req.user._id, name: result.name, email: result.email }))
    .catch(next);
};

const changeUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  user.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then(() => res.send({ name, email }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new NotUniqueError('Пользователь с таким e-mail уже существует'));
      }
      next(err);
    });
};

const register = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => user.create({ name, email, password: hash }))
    .then(() => res.status(201).send({ name, email }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new NotUniqueError('Пользователь с таким e-mail уже существует'));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return user.findUserByCreds(email, password)
    .then((result) => {
      res.send({
        token: jwt.sign({ _id: result._id }, JWT_SECRET, { expiresIn: '7d' }),
      });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  changeUserInfo,
  register,
  login,
};
