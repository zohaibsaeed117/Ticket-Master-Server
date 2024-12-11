const mongoose = require('mongoose')
const { Schema } = mongoose;

const users = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  avatar: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean,default:false },
  bookings:[{type:mongoose.Schema.Types.ObjectId,ref:'Booking'}],
}, { timestamps: true });

module.exports = mongoose.model("User", users);