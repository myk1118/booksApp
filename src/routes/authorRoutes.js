const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Get all authors
router.get('/authors', authorController.getAuthors);

// Get a single author by their ID
router.get('/authors/:id', authorController.getAuthorById);

// Create a new author
router.post('/authors', authorController.createAuthor);

// Update an existing author
router.put('/authors/:id', authorController.updateAuthor);

// Delete an author
router.delete('/authors/:id', authorController.deleteAuthor);

module.exports = router;
