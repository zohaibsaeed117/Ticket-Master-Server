const asyncWrapper = require('../../middleware/async')
const Flight = require("../../models/Flight")
const addFlight = asyncWrapper(async (req, res) => {
    const { title, description, departure, arrival, seats, price, category } = req.body

    const seatsArray = []
    category?.map((item, index) => {
        for (let i = item.start; i <= item.end; i++) {
            seatsArray.push({
                price: item.price,
                category: item.name,
                seatNumber: i
            })
        }
    })
    
    const flight = new Flight({
        title,
        description,
        departure,
        arrival,
        seats: seatsArray,
    })
    await flight.save()
    res.status(201).json({ success: true, message: "Flight added Successfully" });
})
module.exports = addFlight

