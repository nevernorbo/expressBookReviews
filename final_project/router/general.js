const express = require("express");
let books = require("./booksdb.js");
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({ username: username, password: password });
            return res.status(200).json({
                message: "User successfully registered. Now you can login",
            });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register user." });
});

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
};

// Get the book list available in the shop
public_users.get("/", function (req, res) {
    res.json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
    const isbn = req.params.isbn;
    res.json(books[isbn]);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
    const resBooks = [];
    for (const [key, value] of Object.entries(books)) {
        if (value.author === req.params.author) {
            resBooks.push(books[key]);
        }
    }

    res.json(resBooks);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
    const resBooks = [];
    for (const [key, value] of Object.entries(books)) {
        if (value.title === req.params.title) {
            resBooks.push(books[key]);
        }
    }

    res.json(resBooks);
});

/*
THE ASYNC/AWAIT ROUTES ARE BELOW
THE ASYNC/AWAIT ROUTES ARE BELOW
THE ASYNC/AWAIT ROUTES ARE BELOW
*/

// Promise to simulate fetching time
const timeout = () => new Promise(resolve => setTimeout(resolve, 2000));

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
    await timeout();

    res.json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
    await timeout();

    const isbn = req.params.isbn;
    res.json(books[isbn]);
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
    await timeout();

    const resBooks = [];
    for (const [key, value] of Object.entries(books)) {
        if (value.author === req.params.author) {
            resBooks.push(books[key]);
        }
    }

    res.json(resBooks);
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
    await timeout();

    const resBooks = [];
    for (const [key, value] of Object.entries(books)) {
        if (value.title === req.params.title) {
            resBooks.push(books[key]);
        }
    }

    res.json(resBooks);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
    res.json(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
