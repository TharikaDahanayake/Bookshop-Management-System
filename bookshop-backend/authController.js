// controllers/authController.js
const bcrypt = require('bcrypt');
const db = require('../db'); // Import your database connection

const registerUser = (username, password) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return;
        }
        // Now you can insert hashedPassword into the database
        const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
        db.query(sql, [username, hashedPassword], (error, results) => {
            if (error) {
                console.error('Error inserting user:', error);
            } else {
                console.log('User registered successfully:', results);
            }
        });
    });
};

module.exports = { registerUser };
