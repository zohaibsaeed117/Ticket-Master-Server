const express = require('express');
const multer = require('multer');
const upload = require('../middleware/multer');
const router = express.Router();
const addEvent = require('../controller/event/add-event')
const getEvent = require('../controller/event/get-event')
const getEventById = require('../controller/event/get-event-by-id')
const updateEvent = require('../controller/event/update-event')

router.route('/get-event/:id').get(getEventById)
router.route('/get-events').get(getEvent)

router.route('/add-event').post(upload.single('file'), addEvent)
router.route('/update-event/:id').patch(upload.single('file'), updateEvent)

module.exports = router;

