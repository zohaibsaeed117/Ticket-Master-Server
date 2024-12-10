const express = require('express');
const app = express();
const router = express.Router();
const addBus = require('../controller/bus/add-bus')
const getBus = require('../controller/bus/get-buses')
const getBusById = require('../controller/bus/get-bus-by-id')
const updateBus = require('../controller/bus/update-bus')

router.route('/get-bus/:id').get(getBusById)
router.route('/get-buses').get(getBus)

router.route('/add-bus').post(addBus)
router.route('/update-bus/:id').patch(updateBus)

module.exports = router;