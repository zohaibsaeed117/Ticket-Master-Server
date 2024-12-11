const asyncWrapper = require('../../middleware/async');
const Train = require('../../models/Train');
const Booking = require("../../models/Booking");
const User = require('../../models/User')
const bookTrain = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { seats, price, carriageNumber } = req.body;
    const userId = req.user.id;
    console.log(price, seats)
    // Validate required fields
    if (!id || !seats || !Array.isArray(seats) || seats.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid request data" });
    }
    const train = await Train.findOne({ _id: id });
    const newSeats = seats.map(seat => {
        return {
            ...seat,
            bookedBy: userId
        }
    })
    const booking = await Booking({
        user: userId,
        type: "train",
        bookingId: train._id,
        seats: newSeats,
        totalPrice: price,
        status: "confirmed",
        carriageNumber: carriageNumber
    })
    const user = await User.findOne({ _id: userId })
    user.bookings.push(booking._id)

    if (!train) {
        return res.status(404).json({ success: false, message: 'Train not found' });
    }

    for (let seat of seats) {
        const carriageIndex = train.carriage.findIndex(t => t.name === seat.category);
        const seatIndex = train.carriage[carriageIndex].seats.findIndex(s => s.seatNumber === seat.seatNumber);
        if (carriageIndex === -1) {
            return res.status(400).json({ success: false, message: `Carriage ${seat.category} does not exist` });
        }
        else if (seatIndex === -1) {
            return res.status(400).json({ success: false, message: `Seat ${seat.seatNumber} does not exist` });
        }
        if (train.carriage[carriageIndex].seats[seatIndex].bookedBy) {
            return res.status(400).json({
                success: false,
                message: `Seat ${seat.seatNumber} is already booked`
            });
        }

        // Book the seat (ensure correct assignment)
        train.carriage[carriageIndex].seats[seatIndex].bookedBy = userId || null; // Only assign valid `userId`
        console.log(userId)
    }

    
    await train.save();
    await booking.save()
    await user.save()

    res.status(200).json({ success: true, message: "Seats booked successfully" });
});

module.exports = bookTrain;

