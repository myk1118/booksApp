const request = require('supertest');
const app = require('../src/app');  // Import your Express app

// Test 1: Get all authors
describe('GET /api/authors', () => {
    it('should return all authors', async () => {
        const response = await request(app).get('/api/authors');
        expect(response.status).toBe(200); // Check if the response status is 200
        expect(Array.isArray(response.body)).toBe(true); // Ensure the response is an array
        expect(response.body.length).toBeGreaterThan(0); // Ensure at least one author exists
    });
});

// Test 2: Create a new author
describe('POST /api/authors', () => {
    it('should create a new author and return the created author data', async () => {
        const newAuthor = {
            firstName: 'John',
            lastName: 'Doe'
        };

        const response = await request(app).post('/api/authors').send(newAuthor);
        expect(response.status).toBe(201); // Check if the response status is 201 (created)
        expect(response.body.firstName).toBe(newAuthor.firstName); // Check if the firstName is correct
        expect(response.body.lastName).toBe(newAuthor.lastName); // Check if the lastName is correct
    });
});

// Test 3: Delete an author
describe('DELETE /api/authors/:id', () => {
    it('should delete an author and return a success message', async () => {
        // Create a new author first
        const newAuthor = {
            firstName: 'Jane',
            lastName: 'Smith'
        };
        const createResponse = await request(app).post('/api/authors').send(newAuthor);
        const authorId = createResponse.body.id; // Get the ID of the newly created author

        // Now delete the author
        const response = await request(app).delete(`/api/authors/${authorId}`);
        expect(response.status).toBe(200); // Check if the response status is 200
        expect(response.body.message).toBe('Author deleted successfully'); // Check if the success message is correct
    });
});
