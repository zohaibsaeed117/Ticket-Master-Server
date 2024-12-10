const Flight = require("../../models/Flight")
const asyncWrapper = require("../../middleware/async")

const getFlights = asyncWrapper(async (req, res) => {
    const flights = await Flight.find()
    const finalData = flights.map(flight => {
        return {
            _id: flight._id,
            title: flight.title,
            description: flight.description,
            departure: flight.departure,
            arrival: flight.arrival,
            date: flight.departure.date,
            totalSeats: flight.seats.length,
            seatsLeft: flight.seats.reduce((acc, seat) => {
                return acc + (seat.bookedBy == null ? 1 : 0)
            }, 0),
            price: flight.seats[0].price
        }
    })
    // console.log(finalData)
    res.status(200).json({ success: true, data: finalData })
})
module.exports = getFlights
