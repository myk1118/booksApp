const bookModel = require('../models/bookModel');

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await bookModel.getAllBooks();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single book by its ID
const getBookById = async (req, res) => {
    const bookId = req.params.id;

    try {
        const book = await bookModel.getBookById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new book
const createBook = async (req, res) => {
    const { title, authorId, pageCount, releaseDate } = req.body;

    if (!title || !authorId || !pageCount || !releaseDate) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newBook = await bookModel.createBook({ title, authorId, pageCount, releaseDate });
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing book
const updateBook = async (req, res) => {
    const bookId = req.params.id;
    const { title, authorId, pageCount, releaseDate } = req.body;

    try {
        const updatedBook = await bookModel.updateBook(bookId, { title, authorId, pageCount, releaseDate });

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    const bookId = req.params.id;

    try {
        const result = await bookModel.deleteBook(bookId);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
