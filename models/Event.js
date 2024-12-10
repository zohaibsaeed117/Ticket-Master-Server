const mongoose = require('mongoose')
const { Schema } = mongoose;

const Event = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    seats: { type: Number, required: true, default: 0 },
    booked: { type: Number, default: 0 },
    price: { type: Number },
    date: { type: String, required: true },
    time: { type: String, required: true },
    image: { type: String },
    bookings:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
}, { timestamps: true });



module.exports = mongoose.model("Event", Event);