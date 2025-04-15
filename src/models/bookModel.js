const connection = require('../config/db');

// Get all books
const getAllBooks = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM books';
        connection.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Get a book by its ID
const getBookById = (bookId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM books WHERE id = ?';
        connection.query(query, [bookId], (err, results) => {
            if (err) reject(err);
            resolve(results[0]);
        });
    });
};

// Function to get all books by a specific author
const getBooksByAuthor = (authorId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM books WHERE authorId = ?';
        connection.query(query, [authorId], (err, results) => {
            if (err) reject(err);
            resolve(results);  // Resolves with an array of books
        });
    });
};

// Create a new book
const createBook = ({ title, authorId, pageCount, releaseDate }) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO books (title, authorId, pageCount, releaseDate) VALUES (?, ?, ?, ?)';
        connection.query(query, [title, authorId, pageCount, releaseDate], (err, results) => {
            if (err) reject(err);
            const newBook = { id: results.insertId, title, authorId, pageCount, releaseDate };
            resolve(newBook);
        });
    });
};

// Update an existing book
const updateBook = (bookId, { title, authorId, pageCount, releaseDate }) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE books SET title = ?, authorId = ?, pageCount = ?, releaseDate = ? WHERE id = ?';
        connection.query(query, [title, authorId, pageCount, releaseDate, bookId], (err, results) => {
            if (err) reject(err);
            if (results.affectedRows === 0) {
                return resolve(null); // No book found to update
            }
            resolve({ id: bookId, title, authorId, pageCount, releaseDate });
        });
    });
};

// Delete a book
const deleteBook = (bookId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM books WHERE id = ?';
        connection.query(query, [bookId], (err, results) => {
            if (err) reject(err);
            if (results.affectedRows === 0) {
                return resolve(null); // No book found to delete
            }
            resolve(true);
        });
    });
};

module.exports = {
    getAllBooks,
    getBookById,
    getBooksByAuthor,
    createBook,
    updateBook,
    deleteBook
};
