const authorModel = require('../models/authorModel');

// Get all authors
const getAuthors = async (req, res) => {
    try {
        const authors = await authorModel.getAllAuthors();
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single author by their ID
const getAuthorById = async (req, res) => {
    const authorId = req.params.id;

    try {
        const author = await authorModel.getAuthorById(authorId);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new author
const createAuthor = async (req, res) => {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
        return res.status(400).json({ message: 'First name and last name are required' });
    }

    try {
        const newAuthor = await authorModel.createAuthor({ firstName, lastName });
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing author
const updateAuthor = async (req, res) => {
    const authorId = req.params.id;
    const { firstName, lastName } = req.body;

    try {
        const updatedAuthor = await authorModel.updateAuthor(authorId, { firstName, lastName });

        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.json(updatedAuthor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an author
const deleteAuthor = async (req, res) => {
    const authorId = req.params.id;

    try {
        const result = await authorModel.deleteAuthor(authorId);

        if (!result) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.json({ message: 'Author deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};
