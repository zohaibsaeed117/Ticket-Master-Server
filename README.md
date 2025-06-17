# Ticket-Master-Server

A comprehensive backend server built with Node.js and Express, designed to manage bookings for various events and transportation services, including movies, buses, trains, and flights. This server provides a robust API for handling user authentication, data management, and booking functionalities.

## Features

*   **User Authentication:** Secure user registration and login using bcrypt for password hashing and JSON Web Tokens (JWT) for authentication.
*   **Event Management:** Create, retrieve, update, and delete events with details like title, description, seats, price, date, time, and image.
*   **Transportation Management:** Manage bus, train, and flight schedules, including seat availability and pricing.
*   **Movie Management:** Handle movie listings with details like title, description, available seats, booking information, rating, date, time slots, and images.
*   **Booking Management:** Allow users to book events, buses, trains, and flights. Retrieve user-specific booking information.
*   **File Uploads:** Handle image uploads for events and movies using Multer middleware.
*   **Firebase Integration:** Utilizes Firebase Admin SDK for server-side interactions with Firebase services, specifically Firebase Storage.
*   **Error Handling:** Centralized error handling middleware for consistent error responses.
*   **CORS Support:** Implements Cross-Origin Resource Sharing (CORS) to allow requests from different domains.

## Technologies Used

*   **JavaScript:** Primary programming language.
*   **Node.js:** Runtime environment for server-side JavaScript.
*   **Express:** Web application framework for building APIs.
*   **Mongoose:** MongoDB object modeling tool.
*   **bcrypt:** Library for password hashing.
*   **jsonwebtoken:** Library for creating and verifying JWTs.
*   **cors:** Middleware for enabling CORS.
*   **multer:** Middleware for handling file uploads.
*   **firebase-admin:** Firebase Admin SDK for server-side Firebase integration.
*   **dotenv:** Loads environment variables from a `.env` file.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/zohaibsaeed117/Ticket-Master-Server.git
    cd Ticket-Master-Server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**

    *   Create a `.env` file in the root directory.
    *   Add the following environment variables, replacing the placeholders with your actual values:

    ```
    MONGO_URI=<Your MongoDB Connection String>
    JWT_SECRET=<Your JWT Secret Key>
    FIREBASE_PROJECT_ID=<Your Firebase Project ID>
    FIREBASE_PRIVATE_KEY=<Your Firebase Private Key>
    FIREBASE_CLIENT_EMAIL=<Your Firebase Client Email>
    FIREBASE_STORAGE_BUCKET=<Your Firebase Storage Bucket URL>
    ```

    *   For Firebase credentials, ensure you have a service account key file.  The `FIREBASE_PRIVATE_KEY` should be the entire private key string from the JSON file, with newline characters replaced by `\n`.  The `FIREBASE_CLIENT_EMAIL` should be the client email from the JSON file.

4.  **Start the server:**

    ```bash
    npm run dev
    ```

    This will start the server using `nodemon`, which automatically restarts the server on file changes.

## Usage

### API Endpoints

Here are some example API endpoints:

*   **User Signup:** `POST /api/v1/auth/signup`
    *   Request body: `{ username, email, password, firstName, lastName, age }`
*   **User Login:** `POST /api/v1/auth/login`
    *   Request body: `{ email, password }`
*   **Get All Events:** `GET /api/v1/events/get-events`
*   **Get Event by ID:** `GET /api/v1/events/get-event/:id`
*   **Add Event:** `POST /api/v1/events/add-event` (Requires authentication and file upload)
    *   Form data: `title`, `description`, `seats`, `price`, `date`, `time`, `file` (image)
*   **Update Event:** `PATCH /api/v1/events/update-event/:id` (Requires authentication and file upload)
    *   Request body: `{ title, description, seats, price, date, time }`
*   **Get All Buses:** `GET /api/v1/bus/get-buses`
*   **Add Bus:** `POST /api/v1/bus/add-bus`
    *   Request body: `{ title, description, departureTime, arrivalTime, date, totalSeats, category: [{price, categoryName, seatNumberStart, seatNumberEnd}] }`
*   **Book a Bus:** `PUT /api/v1/booking/book-bus/:id`
*   **Get My Bookings:** `GET /api/v1/booking/my-bookings` (Requires authentication)

## Project Structure

```
Ticket-Master-Server/
├── app.js             # Main application file
├── package.json       # Project metadata and dependencies
├── README.md          # Project documentation
├── .env               # Environment variables
├── db/
│   └── connect.js     # Database connection setup
├── middleware/
│   ├── async.js       # Async error handling middleware
│   ├── auth.js        # Authentication middleware
│   ├── error-handler.js # Error handling middleware
│   ├── not-found.js   # 404 Not Found middleware
│   └── multer.js      # Multer configuration for file uploads
├── errors/
│   ├── bad-request.js # Custom BadRequest error class
│   └── custom-error.js # Custom API error class
├── controller/
│   ├── auth/          # Authentication controllers
│   │   ├── login.js   # Login controller
│   │   └── signup.js  # Signup controller
│   ├── event/         # Event controllers
│   │   ├── add-event.js # Add event controller
│   │   ├── get-event.js # Get all events controller
│   │   ├── get-event-by-id.js # Get event by ID controller
│   │   └── update-event.js # Update event controller
│   ├── bus/           # Bus controllers
│   │   ├── add-bus.js   # Add bus controller
│   │   ├── get-bus.js   # Get bus controller
│   │   ├── get-bus-by-id.js # Get bus by ID controller
│   │   └── update-bus.js # Update bus controller
│   ├── flight/        # Flight controllers
│   │   ├── add-flight.js # Add flight controller
│   │   ├── get-flight.js # Get flight controller
│   │   ├── get-flight-by-id.js # Get flight by ID controller
│   │   └── update-flight.js # Update flight controller
│   ├── movie/         # Movie controllers
│   │   ├── add-movie.js  # Add movie controller
│   │   ├── get-movie.js  # Get movie controller
│   │   ├── get-movie-by-id.js # Get movie by ID controller
│   │   └── update-movie.js # Update movie controller
│   └── booking/       # Booking controllers
│       └── my-booking.js # Get user bookings controller
├── models/
│   ├── User.js        # User model
│   ├── Event.js       # Event model
│   ├── Bus.js         # Bus model
│   ├── Train.js       # Train model
│   ├── Flight.js      # Flight model
│   └── Movie.js       # Movie model
├── routes/
│   ├── auth.js        # Authentication routes
│   ├── events.js      # Event routes
│   ├── bus.js         # Bus routes
│   ├── train.js       # Train routes
│   ├── flight.js      # Flight routes
│   ├── movie.js       # Movie routes
│   └── booking.js     # Booking routes
└── firebase/
    └── firebase.js    # Firebase initialization
```

## Contributing

We welcome contributions to the Ticket-Master-Server project! To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise messages.
