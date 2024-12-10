const asyncWrapper = require('../../middleware/async')
const Bus = require("../../models/Bus")
const addBus = asyncWrapper(async (req, res) => {
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
    
    const bus = new Bus({
        title,
        description,
        departure,
        arrival,
        seats: seatsArray,
    })
    await bus.save()
    res.status(201).json({ success: true, message: "Bus added Successfully" });
})
module.exports = addBus
