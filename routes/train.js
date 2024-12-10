const express = require('express');
const app = express();
const router = express.Router();
const addTrain = require('../controller/train/add-train')
const getTrain = require('../controller/train/get-trains')
const getTrainById = require('../controller/train/get-train-by-id')
const updateTrain = require('../controller/train/update-train')

router.route('/get-train/:id').get(getTrainById)
router.route('/get-trains').get(getTrain)

router.route('/add-train').post(addTrain)
router.route('/update-train/:id').patch(updateTrain)

module.exports = router;
