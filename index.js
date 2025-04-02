const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Sample data
let books = [
    { isbn: "12345", title: "Node.js Mastery", author: "John Doe", review: "" },
    { isbn: "67890", title: "Async JavaScript", author: "Jane Doe", review: "" },
    { isbn: "11223", title: "JavaScript Fundamentals", author: "Alex Smith", review: "" }
];

let users = [{ username: "admin", password: "password" }]; // Simple user authentication
let reviews = {}; // Store reviews by user

// ✅ Task 1: Get the book list available in the shop
app.get('/books', (req, res) => {
    res.json(books);
});

// ✅ Task 2: Get books based on ISBN
app.get('/books/isbn/:isbn', (req, res) => {
    const { isbn } = req.params;
    const book = books.find(b => b.isbn === isbn);
    book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});

// ✅ Task 3: Get all books by Author
app.get('/books/author/:author', (req, res) => {
    const { author } = req.params;
    const booksByAuthor = books.filter(b => b.author.toLowerCase() === author.toLowerCase());
    booksByAuthor.length > 0 ? res.json(booksByAuthor) : res.status(404).json({ message: "No books found" });
});

// ✅ Task 4: Get all books based on Title
app.get('/books/title/:title', (req, res) => {
    const { title } = req.params;
    const booksByTitle = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
    booksByTitle.length > 0 ? res.json(booksByTitle) : res.status(404).json({ message: "No books found" });
});

// ✅ Task 5: Get book Review
app.get('/books/review/:isbn', (req, res) => {
    res.json(reviews[req.params.isbn] || { message: "No reviews available" });
});

// ✅ Task 6: Register New User
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "User already exists" });
    }
    users.push({ username, password });
    res.json({ message: "User registered successfully" });
});

// ✅ Task 7: Login as a Registered User
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    user ? res.json({ message: "Login successful" }) : res.status(401).json({ message: "Unauthorized" });
});

// ✅ Task 8: Add/Modify a Book Review (Registered Users Only)
app.post('/books/review/:isbn', (req, res) => {
    const { username, review } = req.body;
    if (!users.find(user => user.username === username)) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!reviews[req.params.isbn]) {
        reviews[req.params.isbn] = {};
    }
    reviews[req.params.isbn][username] = review;
    res.json({ message: "Review added/modified" });
});

// ✅ Task 9: Delete a Book Review (Only by the user who added it)
app.delete('/books/review/:isbn', (req, res) => {
    const { username } = req.body;
    if (!reviews[req.params.isbn] || !reviews[req.params.isbn][username]) {
        return res.status(404).json({ message: "No review found" });
    }
    delete reviews[req.params.isbn][username];
    res.json({ message: "Review deleted" });
});

// ✅ Task 10: Get All Books (Async Callback Function)
app.get('/async-books', async (req, res) => {
    res.json(books);
});

// ✅ Task 11: Search by ISBN (Using Promises)
app.get('/promise-books/isbn/:isbn', (req, res) => {
    new Promise((resolve, reject) => {
        const book = books.find(b => b.isbn === req.params.isbn);
        book ? resolve(book) : reject("Book not found");
    })
        .then(book => res.json(book))
        .catch(err => res.status(404).json({ message: err }));
});

// ✅ Task 12: Search by Author (Using Async/Await)
app.get('/promise-books/author/:author', async (req, res) => {
    const booksByAuthor = books.filter(b => b.author.toLowerCase() === req.params.author.toLowerCase());
    booksByAuthor.length > 0 ? res.json(booksByAuthor) : res.status(404).json({ message: "No books found" });
});

// ✅ Task 13: Search by Title (Using Async/Await)
app.get('/promise-books/title/:title', async (req, res) => {
    const booksByTitle = books.filter(b => b.title.toLowerCase().includes(req.params.title.toLowerCase()));
    booksByTitle.length > 0 ? res.json(booksByTitle) : res.status(404).json({ message: "No books found" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
