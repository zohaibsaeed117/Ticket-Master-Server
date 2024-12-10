const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const addMovie = require('../controller/movie/add-movie');
const getMovie = require('../controller/movie/get-movie');
const getMovieById = require('../controller/movie/get-movie-by-id');
const updateMovie = require('../controller/movie/update-movie');

router.route('/get-movie/:id').get(getMovieById);
router.route('/get-movies').get(getMovie);

router.route('/add-movie').post(upload.single("file"), addMovie);
router.route('/update-movie/:id').patch(updateMovie);

module.exports = router;

