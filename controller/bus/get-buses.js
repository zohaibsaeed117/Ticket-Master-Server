const Bus = require("../../models/Bus")
const asyncWrapper = require("../../middleware/async")

const getBuses = asyncWrapper(async (req, res) => {
    const buses = await Bus.find()
    const finalData = buses.map(bus => {
        return {
            _id: bus._id,
            title: bus.title,
            description: bus.description,
            departure: bus.departure,
            arrival: bus.arrival,
            date: bus.departure.date,
            totalSeats: bus.seats.length,
            seatsLeft: bus.seats.reduce((acc, seat) => {
                return acc + (seat.bookedBy == null ? 1 : 0)
            }, 0),
            price: bus.seats[0].price
        }
    })
    // console.log(finalData)
    res.status(200).json({ success: true, data: finalData })
})
module.exports = getBuses