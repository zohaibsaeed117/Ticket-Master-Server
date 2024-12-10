const mongoose = require('mongoose')
const { Schema } = mongoose;

const SeatSchema = new mongoose.Schema({
    seatNumber: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Reference to User model
});
const Flight = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    departure: {
        city: { type: String, required: true },
        time: { type: String, required: true },
        date: { type: String, required: true }
    },
    arrival: {
        city: { type: String, required: true },
        time: { type: String, required: true },
        date: { type: String, required: true }
    },
    seats: [SeatSchema]
}, { timestamps: true });


module.exports = mongoose.model("Flight", Flight);
