const mongoose = require('mongoose');
const { Schema } = mongoose;

const SeatSchema = new mongoose.Schema({
    seatNumber: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Reference to User model
});
const BookingSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['bus', 'train', 'flight', 'event', 'movie'], required: true },
    bookingId: { type: mongoose.Schema.Types.ObjectId, refPath: 'type', required: true },
    seats: { type: [SeatSchema], default: [] },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

BookingSchema.pre('validate', function (next) {
    if (this.type === 'event') {
        this.seats = undefined;
    }
    next();
});

module.exports = mongoose.model('Booking', BookingSchema);

