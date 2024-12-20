const asyncWrapper = require('../../middleware/async');
const Event = require("../../models/Event");
const bucket = require('../../firebase/firebase');

const addEvent = asyncWrapper(async (req, res, next) => {
    const { title, description, category, price, date, time } = req.body;
    const file = req.file;

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
        message: "File upload started. You will be notified once the event is created."
    });

    // Handle the file upload completion
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
                category,
                image: publicUrl,
                price,
                date,
                time
            });

            await event.save();

            console.log("Event added successfully with image:", publicUrl);
            // Notify the user (e.g., via email or notification service)
        } catch (err) {
            console.error("Error saving event:", err);
        }
    });

    // End the stream with the file buffer
    blobStream.end(file.buffer);
});

module.exports = addEvent;
