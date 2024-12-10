const asyncWrapper = require('../../middleware/async')
const Event = require("../../models/Event")
const updateEvent = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const { title, description, seats, price, date, time } = req.body;
    const event = await Event.findByIdAndUpdate(id, {
        title,
        description,
        seats,
        price,
        date,
        time
    }, { new: true, runValidators: true });

    if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' })
    }
    res.status(200).json({ success: true, message: "Event updated Successfully" });
})
module.exports = updateEvent

