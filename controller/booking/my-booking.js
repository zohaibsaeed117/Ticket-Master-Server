const asyncWrapper = require('../../middleware/async');
const User = require('../../models/User');

const getMyBookings = asyncWrapper(async (req, res) => {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId }, { select: "bookings" }).populate({
        path: 'bookings',
        select: 'type totalPrice status seats.seatNumber',
        populate: {
            path: 'bookingId',
            select: 'title',
        },
    });

    const normalizedBookings = user.bookings.map(booking => ({
        id: booking._id,
        type: booking.type,
        totalPrice: booking.totalPrice,
        status: booking.status,
        seats: booking.seats.map(seat => seat.seatNumber),
        title: booking.bookingId.title,
    }));

    return res.status(200).json({ success: true, data: normalizedBookings });
});

module.exports = getMyBookings;
