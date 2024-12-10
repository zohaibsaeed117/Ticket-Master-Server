const mongoose = require('mongoose')
const { Schema } = mongoose;
const SeatSchema = new mongoose.Schema({
    seatNumber: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Reference to User model
});
const Movie = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    seats: { type: Number, required: true, default: 0 },
    booked: { type: Number, default: 0 },
    rating: { type: Number },
    date: { type: String, required: true },
    seats:[SeatSchema],
    timeSlots: { type: [{ start: { type: String }, end: { type: String } }], required: true },
    image: { type: String }
}, { timestamps: true });



module.exports = mongoose.model("Movie", Movie);