require('express-async-errors');
const express = require('express');
const cors = require('cors');
const connectDb = require('./db/connect');
const authVerify = require('./middleware/auth');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const authRoutes = require('./routes/auth');
const busRoutes = require("./routes/bus")
const trainRoutes = require("./routes/train")
const flightRoutes = require("./routes/flight")
const eventRoutes = require("./routes/events")
const movieRoutes = require("./routes/movie")
require('dotenv').config();

const app = express();

// Configure CORS options
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors());

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/api', (req, res) => {
    ("Hello world");
    return res.status(200).json({ success: true });
});
app.use(authVerify);

app.get('/api/verify', (req, res) => {
    return res.status(200).json({ success: true })
})

app.use('/api/bus',busRoutes);
app.use('/api/train',trainRoutes);
app.use('/api/flight',flightRoutes);
app.use('/api/event',eventRoutes);
app.use('/api/movie',movieRoutes);

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 8080;

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};
start();
