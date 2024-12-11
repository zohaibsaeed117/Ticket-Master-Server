const express = require('express');
const bookBus = require('../controller/booking/book-bus');
const bookFlight = require('../controller/booking/book-flight');
const bookTrain = require('../controller/booking/book-train');
const eventBooking = require('../controller/booking/book-event');
const bookMovie = require('../controller/booking/book-movie');
const router = express.Router();

router.route('/book-bus/:id').put(bookBus)
router.route('/book-flight/:id').put(bookFlight)
router.route('/book-train/:id').put(bookTrain)
router.route('/book-event/:id').put(eventBooking)
router.route('/book-movie/:id').put(bookMovie)

module.exports = router;