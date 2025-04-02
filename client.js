const axios = require('axios');

async function getAllBooks() {
    const response = await axios.get('http://localhost:3000/books');
    console.log(response.data);
}

async function searchByISBN(isbn) {
    const response = await axios.get(`http://localhost:3000/books/isbn/${isbn}`);
    console.log(response.data);
}

async function searchByAuthor(author) {
    const response = await axios.get(`http://localhost:3000/books/author/${author}`);
    console.log(response.data);
}

async function searchByTitle(title) {
    const response = await axios.get(`http://localhost:3000/books/title/${title}`);
    console.log(response.data);
}

// Run all tests
async function runTasks() {
    console.log("Fetching all books...");
    await getAllBooks();

    console.log("\nSearching book by ISBN...");
    await searchByISBN("12345");

    console.log("\nSearching books by Author...");
    await searchByAuthor("John Doe");

    console.log("\nSearching books by Title...");
    await searchByTitle("Node.js Mastery");
}

runTasks();
