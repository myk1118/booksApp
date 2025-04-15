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

// Function to get all books by a specific author
const getBooksByAuthor = async (req, res) => {
    const authorId = req.params.id;

    try {
        // Query to get all books by the given author ID
        const books = await bookModel.getBooksByAuthor(authorId);

        if (books.length === 0) {
            return res.status(404).json({ message: `No books found for author with id ${authorId}` });
        }

        // Respond with the list of books
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching books for the author' });
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
    getBooksByAuthor,
    createBook,
    updateBook,
    deleteBook
};
