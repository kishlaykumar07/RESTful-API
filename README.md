# Bookstore API

This is a RESTful API for managing books in a bookstore. It provides CRUD (Create, Read, Update, Delete) operations for books stored in a MongoDB database.

## API Endpoints

- **POST /api/books**: Add a new book with a JSON request body containing `title`, `author`, and `summary`.
- **GET /api/books**: Retrieve a list of all books.
- **GET /api/books/:id**: View details of a specific book by its unique ID.
- **PUT /api/books/:id**: Update a book's details by providing the book's ID and new data in the request body.
- **DELETE /api/books/:id**: Delete a book by its ID.

## Setting Up and Running the Application Locally

To run this application locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/bookstore-api.git
   cd bookstore-api

2. **Install Dependencies:**
    ```bash
    npm install
    
3. **Set Up MongoDB:**
   ```bash
    Set Up MongoDB: Make sure you have MongoDB installed and running locally on the default port (27017).
    You can customize the MongoDB connection URL in server.js if needed.

4. **Start the Application:**    
    ```bash
    nodemon restAPI.js

5. **Access the API:** 
    ```bash
    The API will be running on http://localhost:3000 by default.
    You can test the API using a tool like Postman or any HTTP client