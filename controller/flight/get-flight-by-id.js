const asyncWrapper = require('../../middleware/async')
const Flight = require('../../models/Flight')

const getFlightById = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const flight = await Flight.findOne({ _id: id })
    if (!flight) {
        return res.status(404).json({ success: false, message: 'Flight not found' })
    }
    let category = []
    let seats = flight.seats

    let start = 1;
    let prev = seats[0]
    for (let i = 1; i < seats.length; i++) {
        let current = seats[i]
        if (prev.category != current.category) {
            category.push({ start: start, end: prev.seatNumber, name: prev.category, price: prev.price })
            start = seats[i].seatNumber
        }
        prev = current
    }
    category.push({ start: start, end: prev.seatNumber, name: prev.category, price: prev.price })
    const data = {
        title: flight.title,
        description: flight.description,
        arrival: flight.arrival,
        departure: flight.departure,
        description: flight.description,
        category: category,
        seatsLeft: flight.seats.reduce((acc, seat) => {
            return acc + (seat.bookedBy == null ? 1 : 0)
        }, 0),
        seats: flight.seats
    }
    res.status(200).json({ success: true, data })
})

module.exports = getFlightById

