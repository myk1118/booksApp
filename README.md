# Authors and Books API

This is a simple Node.js application that provides an API to manage authors and books. It uses **Express** for the server, **MySQL** for the database, and **dotenv** for managing environment variables.

## Features

- Get a list of authors
- Get a list of books
- Create, update, and delete authors and books
- Store data in a MySQL database

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version >= 14.0.0)
- [MySQL](https://www.mysql.com/) (version >= 5.7)
- [Postman](https://www.postman.com/) (optional, for testing the API)

### 1. Install Dependencies

Clone the repository to your local machine:
```
git clone https://github.com/myk1118/booksApp.git
cd booksApp
```

Install the required dependencies:
```
npm install
```

### 2. Set Up Your Database

1. Create a Database:

Use MySQL or a MySQL GUI (e.g., Sequel Ace or MySQL Workbench) to create a database for your application. You can name it something like `authors_books_db`.

2. Create Tables:

Run the following SQL queries to create the necessary tables (authors and books):
```
CREATE TABLE authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
```
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  authorId INT,
  pageCount INT,
  releaseDate DATE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (authorId) REFERENCES authors(id)
);
```

3. Add Data:

You can add some sample data to the authors and books tables.

Example query to add authors:
```
INSERT INTO authors (firstName, lastName) VALUES
('J.K.', 'Rowling'),
('George', 'Orwell'),
('J.R.R.', 'Tolkien');
```

Example query to add books:
```
INSERT INTO books (title, authorId, pageCount, releaseDate) VALUES
('Harry Potter and the Sorcerer\'s Stone', 1, 309, '1997-06-26'),
('1984', 2, 328, '1949-06-08'),
('The Hobbit', 3, 310, '1937-09-21');
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project to store sensitive data like your database credentials:
```
DB_HOST=localhost
DB_USER=root              # Your MySQL username
DB_PASSWORD=yourpassword  # Your MySQL password
DB_NAME=authors_books_db  # The name of your database
PORT=3000                 # Port for the app to run on
```

### 4. Run the Application

Start the Node.js application:
```
npm start
```

This will start the application on `http://localhost:3000`.

### 5. Test the API

You can use Postman or any other API testing tool to interact with the API.

**API Endpoints**

1. Get All Authors
- GET /api/authors
- Retrieves all authors from the database.

2. Get All Books
- GET /api/books
- Retrieves all books from the database.

3. Get Books by Author
- GET /api/authors/:id/books
- Retrieves all books by a specific author based on the authorId.

4. Create a New Author
- POST /api/authors
- Request body:
```
{
  "firstName": "John",
  "lastName": "Doe"
}
```

5. Create a New Book
- POST /api/books
- Request body:
```
{
  "title": "New Book",
  "authorId": 1,
  "pageCount": 300,
  "releaseDate": "2025-04-20"
}
```

6. Update an Author
- PUT /api/authors/:id
- Request body:
```
{
  "firstName": "Jane",
  "lastName": "Doe"
}
```

7. Update a Book
- PUT /api/books/:id
- Request body:
```
{
  "title": "Updated Book Title",
  "authorId": 2,
  "pageCount": 350,
  "releaseDate": "2025-05-15"
}
```

8. Delete an Author
- DELETE /api/authors/:id
- Deletes an author from the database.

9. Delete a Book
- DELETE /api/books/:id
- Deletes a book from the database.
