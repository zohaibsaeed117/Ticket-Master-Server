const asyncWrapper = require('../../middleware/async')
const Train = require('../../models/Train')

const getTrainById = asyncWrapper(async (req, res) => {
    const { id } = req.params
    console.log(req.params)
    const train = await Train.findOne({ _id: id })
    if (!train) {
        return res.status(404).json({ success: false, message: 'Train not found' })
    }
    let category = train.carriage.map((item, index) => {
        console.log(item)
        const start = item.seats[0].seatNumber
        const end = item.seats.pop().seatNumber
        return {
            name: item.name,
            start,
            end,
            price: item.price
        }
    })
    console.log(category)



    const data = {
        title: train.title,
        description: train.description,
        arrival: train.arrival,
        departure: train.departure,
        description: train.description,
        category: category,
        carriage: train.carriage,
        seatsLeft: train.carriage.reduce((acc, seat) => {
            return acc + seat.seats.reduce((acc, seat) => {
                return acc + (seat.bookedBy == null ? 1 : 0)
            }, 0)
        }, 0),
        totalSeats: train.carriage.reduce((acc, seat) => {
            return acc + seat.seats.length
        }, 0)
    }
    res.status(200).json({ success: true, data })
})

module.exports = getTrainById

