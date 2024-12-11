const express = require('express');
const bookBus = require('../controller/booking/book-bus');
const bookFlight = require('../controller/booking/book-flight');
const bookTrain = require('../controller/booking/book-train');
const router = express.Router();

router.route('/book-bus/:id').put(bookBus)
router.route('/book-flight/:id').put(bookFlight)
router.route('/book-train/:id').put(bookTrain)

module.exports = router;