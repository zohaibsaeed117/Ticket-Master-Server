const asyncWrapper = require('../../middleware/async')
const Event = require('../../models/Event')

const getEventById = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const event = await Event.findOne({ _id: id })
    if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' })
    }

    res.status(200).json({ success: true, data: event })
})

module.exports = getEventById

