const express = require('express');
const app = express();

// Import routes for books and authors
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Route setup for books
app.use('/api', bookRoutes);

// Route setup for authors
app.use('/api', authorRoutes);

// Root route to check if server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Book & Author API');
});

// Error handling middleware (for catching errors not caught by routes)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Generic error handler
app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
});

module.exports = app;
