const Event = require("../../models/Event")
const asyncWrapper = require("../../middleware/async")

const getEvents = asyncWrapper(async (req, res) => {
    const events = await Event.find()
    res.status(200).json({ success: true, data: events })
})
module.exports = getEvents

