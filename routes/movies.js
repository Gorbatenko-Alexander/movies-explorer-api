const router = require('express').Router();

const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', addMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
