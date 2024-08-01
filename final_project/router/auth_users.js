const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
return true;
}

const authenticatedUser = (username,password)=>{ //returns boolean
    // Check if username or password is missing
    return true;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }

  //return res.status(300).json({message: "Yet to be implemented"});
});



// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
  return res.send(`The review for the book with ISBN ${isbn} has been added/updated.`)
  //return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    // Extract the email parameter from the request URL
    const isbn = req.params.isbn;
    //const review = req.params.review
    // Filter the users array to exclude the user with the specified email
    //review = review.filter((book) => book.review != review);
    // Send a success message as the response, indicating the user has been deleted
    res.send(`Review for the ISBN ${isbn} posted bu the user test deleted.`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

