const asyncWrapper = require('../../middleware/async')
const Train = require("../../models/Train")
const updateTrain = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const { title, description, departure, arrival, seats, price, category, carriage } = req.body
    const carriageArray = category?.map((item, index) => {
        let seatArrays = []
        for (let i = item.start; i <= item.end; i++) {
            seatArrays.push({
                index: i,
                price: item.price,
                seatNumber: i
            })
        }
        return {
            carriageNumber: index + 1,
            name: item.name,
            price: item.price,
            seats: seatArrays
        }
    })
    const train = await Train.findByIdAndUpdate(id, {
        title,
        description,
        departure,
        arrival,
        carriage: carriageArray,
    }, { new: true, runValidators: true });

    if (!train) {
        return res.status(404).json({ success: false, message: 'Train not found' })
    }
    res.status(200).json({ success: true, message: "Train updated Successfully" });
})
module.exports = updateTrain

