const asyncWrapper = require('../../middleware/async');
const Movie = require("../../models/Movie");
const bucket = require('../../firebase/firebase');

const addMovie = asyncWrapper(async (req, res, next) => {
    let { title, description, category, date, timeSlots, rating } = req.body;
    const file = req.file;
    const seatsArray = []

    category = JSON.parse(category)
    timeSlots = JSON.parse(timeSlots)
    category?.map((item, index) => {
        for (let i = item.start; i <= item.end; i++) {
            seatsArray.push({
                price: item.price,
                category: item.name,
                seatNumber: i
            })
        }
    })
    console.log(file)

    // Validate file
    if (!file) {
        return res.status(400).json({ success: false, message: "File is required" });
    }

    // Create a reference to the file in the bucket
    const blob = bucket.file(file.originalname);

    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    });

    // Handle error while uploading the file
    blobStream.on('error', (err) => {
        console.error("Error uploading file to Firebase:", err);
        return next(err); // Pass the error to the middleware
    });

    // Send an immediate response to the user before uploading completes
    res.status(202).json({
        success: true,
        message: "Upload Success"
    });

    // Handle the file upload completion
    blobStream.on('finish', async () => {
        try {
            // Make the file public
            await blob.makePublic();

            // Get the public URL
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            // Create and save the movie
            const movie = new Movie({
                title,
                description,
                category,
                image: publicUrl,
                date,
                timeSlots,
                rating,
                seats: seatsArray
            });

            await movie.save();

            console.log("Movie added successfully with image:", publicUrl);
            // Notify the user (e.g., via email or notification service)
        } catch (err) {
            console.error("Error saving movie:", err);
        }
    });

    // End the stream with the file buffer
    blobStream.end(file.buffer);
});

module.exports = addMovie;

