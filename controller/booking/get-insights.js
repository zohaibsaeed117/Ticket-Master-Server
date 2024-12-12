const asyncWrapper = require('../../middleware/async');
const Booking = require('../../models/Booking');

const getInsights = asyncWrapper(async (req, res) => {

    if (!req.user.isAdmin) {
        return res.status(404).json({ success: false, message: "Route doesn't exists" })
    }
    // Fetch total sales and income with aggregation
    const insights = await Booking.aggregate([
        {
            $group: {
                _id: '$type',
                totalBookings: { $sum: 1 },
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
    ]);

    // Calculate overall totals for sales and income
    const totalSales = insights.reduce((acc, curr) => acc + curr.totalBookings, 0);
    const totalIncome = insights.reduce((acc, curr) => acc + curr.totalRevenue, 0);

    // Fetch recent sales with populated user details
    const recentSales = await Booking.find()
        .sort({ createdAt: -1 }) // Sort by most recent bookings
        .limit(5).select('user -_id totalPrice')
        .populate({
            path: 'user',
            select: 'username firstName lastName email', // Only fetch username and email from user model
        });

    res.status(200).json({
        success: true,
        data: {
            totalSales,
            totalIncome,
            insights,
            sales: recentSales,
        },
    });
});

module.exports = getInsights;