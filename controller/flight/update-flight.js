const asyncWrapper = require('../../middleware/async')
const Flight = require("../../models/Flight")
const updateFlight = asyncWrapper(async (req, res) => {
    const { id } = req.params
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

    const flight = await Flight.findByIdAndUpdate(id, {
        title,
        description,
        departure,
        arrival,
        seats: seatsArray,
    }, { new: true, runValidators: true })

    if (!flight) {
        return res.status(404).json({ success: false, message: 'Flight not found' })
    }
    res.status(200).json({ success: true, message: "Flight updated Successfully" });
})
module.exports = updateFlight

