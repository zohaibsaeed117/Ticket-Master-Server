const express = require('express');
const bookBus = require('../controller/booking/book-bus');
const bookFlight = require('../controller/booking/book-flight');
const bookTrain = require('../controller/booking/book-train');
const eventBooking = require('../controller/booking/book-event');
const bookMovie = require('../controller/booking/book-movie');
const getMyBookings = require('../controller/booking/my-booking');
const getInsights = require('../controller/booking/get-insights');
const router = express.Router();

router.route('/my-booking').get(getMyBookings)
router.route('/get-insights').get(getInsights)
router.route('/book-bus/:id').put(bookBus)
router.route('/book-flight/:id').put(bookFlight)
router.route('/book-train/:id').put(bookTrain)
router.route('/book-event/:id').put(eventBooking)
router.route('/book-movie/:id').put(bookMovie)

module.exports = router;