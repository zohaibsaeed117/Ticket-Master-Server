const Movie = require("../../models/Movie")
const asyncWrapper = require("../../middleware/async")

const getMovies = asyncWrapper(async (req, res) => {
    const movies = await Movie.find()
    const finalData = movies.map(movie => {
        return {
            _id: movie._id,
            title: movie.title,
            description: movie.description,
            date: movie.date,
            seats: movie.seats.length,
            booked: movie.seats.reduce((acc, seat) => {
                return acc + (seat.bookedBy == null ? 0 : 1)
            }, 0),
            price: movie.seats[0].price,
            rating: movie.rating,
            image:movie.image
        }
    })
    res.status(200).json({ success: true, data: finalData })
})
module.exports = getMovies

