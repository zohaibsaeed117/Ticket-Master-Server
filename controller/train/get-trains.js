const Train = require("../../models/Train")
const asyncWrapper = require("../../middleware/async")

const getTrains = asyncWrapper(async (req, res) => {
    const trains = await Train.find()

    const finalData = trains.map(train => {
        const totalSeats = train.carriage.reduce((acc, seat) => {
            return acc + seat.seats.length
        }, 0)
        const seatsLeft = train.carriage.reduce((acc, seat) => {
            return acc + seat.seats.reduce((acc, seat) => {
                return acc + (seat.bookedBy == null ? 1 : 0)
            }, 0)
        }, 0)
        return {
            _id: train._id,
            title: train.title,
            description: train.description,
            departure: train.departure,
            arrival: train.arrival,
            date: train.departure.date,
            totalSeats: totalSeats,
            seatsLeft: seatsLeft,
            price: train.carriage[0].price
        }
    })
    // console.log(finalData)
    res.status(200).json({ success: true, data: finalData })
})
module.exports = getTrains
