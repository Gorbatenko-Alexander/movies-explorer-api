const movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NotOwnerError = require('../errors/NotOwnerError');

const getMovies = (req, res, next) => {
  movie.find({ owner: req.user._id })
    .then((results) => res.send(results))
    .catch(next);
};

const addMovie = (req, res, next) => {
  movie.create({ owner: req.user._id, ...req.body })
    .then((result) => res.status(201).send(result))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  movie.findById(req.params.movieId)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Закладка с указанным _id не найдена');
      }

      if (!(result.owner.toString() === req.user._id)) {
        throw new NotOwnerError('Вы не являетесь владельцем данной закладки');
      }

      return movie.findByIdAndRemove(req.params.movieId);
    })
    .then((result) => res.send(result))
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
