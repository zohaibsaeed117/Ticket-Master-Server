const asyncWrapper = require('../../middleware/async')
const Bus = require('../../models/Bus')

const getBusById = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const bus = await Bus.findOne({ _id: id })
    if (!bus) {
        return res.status(404).json({ success: false, message: 'Bus not found' })
    }
    let category = []
    let seats = bus.seats

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
        title: bus.title,
        description: bus.description,
        arrival: bus.arrival,
        departure: bus.departure,
        description: bus.description,
        category: category,
        seatsLeft: bus.seats.reduce((acc, seat) => {
            return acc + (seat.bookedBy == null ? 1 : 0)
        }, 0),
        seats: bus.seats
    }
    res.status(200).json({ success: true, data })
})

module.exports = getBusById
