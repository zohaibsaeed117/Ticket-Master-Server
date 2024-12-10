const asyncWrapper = require('../../middleware/async')
const Train = require("../../models/Train")
const addTrain = asyncWrapper(async (req, res) => {
    const { title, description, departure, arrival, seats, price, carriage } = req.body

    // const seatsArray = []
    const carriageArray = carriage?.map((item, index) => {
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
    const train = new Train({
        title,
        description,
        departure,
        arrival,
        carriage: carriageArray,
    })
    await train.save()
    res.status(201).json({ success: true, message: "Train added Successfully" });
})
module.exports = addTrain

