const asyncWrapper = require('../../middleware/async');
const Event = require("../../models/Event");
const bucket = require('../../firebase/firebase');

const addEvent = asyncWrapper(async (req, res, next) => {
    const { title, description, seats, price, date, time } = req.body;
    const file = req.file;
    console.log(price)

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

    // End the stream with the file buffer
    blobStream.end(file.buffer);
    // Once the file is uploaded successfully, handle the event creation
    blobStream.on('finish', async () => {
        try {
            // Make the file public
            await blob.makePublic();

            // Get the public URL
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            // Create and save the event
            const event = new Event({
                title,
                description,
                seats,
                image: publicUrl,
                price,
                date,
                time
            });

            await event.save();

            // Send response after the event is saved
            return res.status(201).json({ success: true, message: "Event added successfully" });

        } catch (err) {
            console.error("Error saving event:", err);
            return next(err); // Pass the error to the middleware
        }
        blobStream.end(file.buffer);
    });
});

module.exports = addEvent;


