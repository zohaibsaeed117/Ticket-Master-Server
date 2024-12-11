const asyncWrapper = require('../../middleware/async');
const Bus = require('../../models/Bus');
const Booking = require("../../models/Booking");
const User = require('../../models/User')
const bookBus = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { seats, price } = req.body;
    const userId = req.user.id;
    console.log(price, seats)
    // Validate required fields
    if (!id || !seats || !Array.isArray(seats) || seats.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid request data" });
    }
    const bus = await Bus.findOne({ _id: id });
    const newSeats = seats.map(seat => {
        return {
            ...seat,
            bookedBy: userId
        }
    })
    const booking = await Booking({
        user: userId,
        type: "bus",
        bookingId: bus._id,
        seats: newSeats,
        totalPrice: price,
        status: "confirmed",
    })
    const user = await User.findOne({ _id: userId })
    user.bookings.push(booking._id)
    
    if (!bus) {
        return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    for (let seat of seats) {
        const index = bus.seats.findIndex(s => s.seatNumber === seat.seatNumber);

        if (index === -1) {
            return res.status(400).json({ success: false, message: `Seat ${seat.seatNumber} does not exist` });
        }

        if (bus.seats[index].bookedBy) {
            return res.status(400).json({
                success: false,
                message: `Seat ${seat.seatNumber} is already booked`
            });
        }

        // Book the seat (ensure correct assignment)
        bus.seats[index].bookedBy = userId || null; // Only assign valid `userId`
        console.log(userId)
    }


    await user.save()
    await booking.save()
    await bus.save();

    res.status(200).json({ success: true, message: "Seats booked successfully" });
});

module.exports = bookBus;
