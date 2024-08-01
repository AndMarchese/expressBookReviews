const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
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
    }
        // Check if the user with the given username and password exists
        const authenticatedUser = (username, password) => {
            // Filter the users array for any user with the same username and password
            let validusers = users.filter((user) => {
                return (user.username === username && user.password === password);
            });
            // Return true if any valid user is found, otherwise false
            if (validusers.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
     let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(res.send(JSON.stringify({books}, null, 4)))
        },6000)})
    //res.send(JSON.stringify({books}, null, 4));
 
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn/',function (req, res) {
    const isbn = req.params.isbn;
    let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(res.send(books[isbn]))
    },6000)})
  
 });

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    return res.send(books[3]);

  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    return res.send(books[1]);
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    return res.send(books[isbn]["reviews"]);
  // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

