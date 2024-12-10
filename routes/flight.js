const express = require('express');
const app = express();
const router = express.Router();
const addFlight = require('../controller/flight/add-flight')
const getFlight = require('../controller/flight/get-flights')
const getFlightById = require('../controller/flight/get-flight-by-id')
const updateFlight = require('../controller/flight/update-flight')

router.route('/get-flight/:id').get(getFlightById)
router.route('/get-flights').get(getFlight)

router.route('/add-flight').post(addFlight)
router.route('/update-flight/:id').patch(updateFlight)

module.exports = router;
