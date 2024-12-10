const asyncWrapper = require('../../middleware/async')
const Bus = require("../../models/Bus")
const updateBus = asyncWrapper(async (req, res) => {
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

    const bus = await Bus.findByIdAndUpdate(id, {
        title,
        description,
        departure,
        arrival,
        seats: seatsArray,
    }, { new: true, runValidators: true })

    if (!bus) {
        return res.status(404).json({ success: false, message: 'Bus not found' })
    }
    res.status(200).json({ success: true, message: "Bus updated Successfully" });
})
module.exports = updateBus

