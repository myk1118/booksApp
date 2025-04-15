const connection = require('../config/db');

// Get all authors
const getAllAuthors = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM authors';
        connection.query(query, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Get an author by their ID
const getAuthorById = (authorId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM authors WHERE id = ?';
        connection.query(query, [authorId], (err, results) => {
            if (err) reject(err);
            resolve(results[0]); // return the first matching author
        });
    });
};

// Create a new author
const createAuthor = ({ firstName, lastName }) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO authors (firstName, lastName) VALUES (?, ?)';
        connection.query(query, [firstName, lastName], (err, results) => {
            if (err) reject(err);
            const newAuthor = { id: results.insertId, firstName, lastName };
            resolve(newAuthor);
        });
    });
};

// Update an existing author
const updateAuthor = (authorId, { firstName, lastName }) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE authors SET firstName = ?, lastName = ? WHERE id = ?';
        connection.query(query, [firstName, lastName, authorId], (err, results) => {
            if (err) reject(err);
            if (results.affectedRows === 0) {
                return resolve(null); // No author found to update
            }
            resolve({ id: authorId, firstName, lastName });
        });
    });
};

// Delete an author
const deleteAuthor = (authorId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM authors WHERE id = ?';
        connection.query(query, [authorId], (err, results) => {
            if (err) reject(err);
            if (results.affectedRows === 0) {
                return resolve(null); // No author found to delete
            }
            resolve(true);
        });
    });
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};
