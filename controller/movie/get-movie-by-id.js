const asyncWrapper = require('../../middleware/async')
const Movie = require('../../models/Movie')

const getMovieById = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findOne({ _id: id })
    if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' })
    }
    let category = []
    let seats = movie.seats

    let start = 1;
    let prev = seats[0]
    for (let i = 1; i < seats.length; i++) {
        let current = seats[i]
        if (prev.category != current.category) {
            category.push({ start: start, end: prev.seatNumber, name: prev.category, price: prev.price })
            start = seats[i].seatNumber
        }
        prev = current
    }
    category.push({ start: start, end: prev.seatNumber, name: prev.category, price: prev.price })
    const data = {
        title: movie.title,
        description: movie.description,
        category: category,
        image: movie.image,
        timeSlots: movie.timeSlots,
        seats: movie.seats,
        date: movie.date,
        seatsLeft: movie.seats.reduce((acc, seat) => {
            return acc + (seat.bookedBy == null ? 1 : 0)
        }, 0),
    }

    res.status(200).json({ success: true, data })
})

module.exports = getMovieById


