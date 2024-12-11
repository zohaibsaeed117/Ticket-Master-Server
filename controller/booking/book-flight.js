const asyncWrapper = require('../../middleware/async');
const Flight = require('../../models/Flight');
const Booking = require("../../models/Booking");
const User = require('../../models/User')
const bookFlight = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { seats, price } = req.body;
    const userId = req.user.id;
    console.log(price, seats)
    // Validate required fields
    if (!id || !seats || !Array.isArray(seats) || seats.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid request data" });
    }
    const flight = await Flight.findOne({ _id: id });
    const newSeats = seats.map(seat => {
        return {
            ...seat,
            bookedBy: userId
        }
    })
    const booking = await Booking({
        user: userId,
        type: "flight",
        bookingId: flight._id,
        seats: newSeats,
        totalPrice: price,
        status: "confirmed",
    })
    await booking.save()
    const user = await User.findOne({ _id: userId })
    user.bookings.push(booking._id)
    await user.save()
    
    if (!flight) {
        return res.status(404).json({ success: false, message: 'Flight not found' });
    }

    for (let seat of seats) {
        const index = flight.seats.findIndex(s => s.seatNumber === seat.seatNumber);

        if (index === -1) {
            return res.status(400).json({ success: false, message: `Seat ${seat.seatNumber} does not exist` });
        }

        if (flight.seats[index].bookedBy) {
            return res.status(400).json({
                success: false,
                message: `Seat ${seat.seatNumber} is already booked`
            });
        }

        // Book the seat (ensure correct assignment)
        flight.seats[index].bookedBy = userId || null; // Only assign valid `userId`
        console.log(userId)
    }


    await flight.save();

    res.status(200).json({ success: true, message: "Seats booked successfully" });
});

module.exports = bookFlight;

