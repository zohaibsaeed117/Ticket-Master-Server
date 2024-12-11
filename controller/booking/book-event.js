const asyncWrapper = require('../../middleware/async');
const Event = require('../../models/Event');
const Booking = require("../../models/Booking");
const User = require('../../models/User')
const bookEvent = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { price, seats } = req.body;
    const userId = req.user.id;
    // Validate required fields
    if (!id) {
        return res.status(400).json({ success: false, message: "Invalid request data" });
    }

    const event = await Event.findOne({ _id: id });
    if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.seats < seats) {
        return res.status(400).json({ success: false, message: 'Not enough seats available' });
    }
    event.booked += seats;

    const booking = await Booking({
        user: userId,
        type: "event",
        bookingId: event._id,
        quantity: seats,
        totalPrice: price,
        status: "confirmed",
    })

    const user = await User.findOne({ _id: userId })
    user.bookings.push(booking._id)

    await user.save()
    await event.save()
    await booking.save()


    res.status(200).json({ success: true, message: "Seats booked successfully" });
});

module.exports = bookEvent;

