const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Get all books
router.get('/books', bookController.getBooks);

// Get a single book by its ID
router.get('/books/:id', bookController.getBookById);

// Create a new book
router.post('/books', bookController.createBook);

// Update an existing book
router.put('/books/:id', bookController.updateBook);

// Delete a book
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
