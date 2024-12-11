const asyncWrapper = require('../../middleware/async');
const Movie = require('../../models/Movie');
const Booking = require("../../models/Booking");
const User = require('../../models/User')
const bookMovie = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { seats, price } = req.body;
    const userId = req.user.id;
    console.log(seats, price, userId)
    if (!id || !seats || !Array.isArray(seats) || seats.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid request data" });
    }
    const movie = await Movie.findOne({ _id: id });
    const newSeats = seats.map(seat => {
        return {
            ...seat,
            bookedBy: userId
        }
    })
    console.log("Test", newSeats)
    const booking = await Booking({
        user: userId,
        type: "movie",
        bookingId: movie._id,
        seats: newSeats,
        totalPrice: price,
        status: "confirmed",
    })
    const user = await User.findOne({ _id: userId })
    user.bookings.push(booking._id)

    if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    for (let seat of seats) {
        const index = movie.seats.findIndex(s => s.seatNumber === seat.seatNumber);
        console.log(seat)
        if (index === -1) {
            return res.status(400).json({ success: false, message: `Seat ${seat.seatNumber} does not exist` });
        }

        if (movie.seats[index].bookedBy) {
            return res.status(400).json({
                success: false,
                message: `Seat ${seat.seatNumber} is already booked`
            });
        }

        // Book the seat (ensure correct assignment)
        movie.seats[index].bookedBy = userId || null; // Only assign valid `userId`
        console.log(userId)
    }


    await booking.save()
    await user.save()
    await movie.save();

    res.status(200).json({ success: true, message: "Seats booked successfully" });
});

module.exports = bookMovie;

