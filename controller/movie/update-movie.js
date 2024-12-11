const asyncWrapper = require('../../middleware/async')
const Movie = require("../../models/Movie")

const updateMovie = asyncWrapper(async (req, res) => {
    const { id } = req.params
    let { title, description, image, timeSlots, seats, price, category } = req.body

    console.log(req.body)
    timeSlots = JSON.parse(timeSlots)
    category = JSON.parse(category)
    const seatsArray = []
    category?.forEach((item, index) => {
        for (let i = Number(item.start); i <= Number(item.end); i++) {
            seatsArray.push({
                price: item.price,
                category: item.name,
                seatNumber: i
            })
        }
    })
    console.log(seatsArray)

    const movie = await Movie.findByIdAndUpdate(id, {
        title,
        description,
        image,
        timeSlots,
        seats: seatsArray,
    }, { new: true, runValidators: true })

    if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' })
    }
    res.status(200).json({ success: true, message: "Movie updated Successfully" });
})

module.exports = updateMovie

