const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();

dotenv.config({ path: './config.env' });


// Middleware
app.use(express.json()); // Replaces body-parser
app.use(cors());

// Logging middleware only in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
require('dotenv').config();

// MySQL Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL Connected...');
});

// API Route - Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    const adminQuery = "SELECT * FROM admins WHERE username = ? AND password = ?";
    db.query(adminQuery, [username, password], (err, adminResult) => {
      if (err) {
        console.error('❌ Admin query error:', err); // log error
        return res.status(500).json({ status: 'fail', message: 'Server error' });
      }
  
      if (adminResult.length > 0) {
        return res.json({ status: 'success', user: adminResult[0], userType: 'admin' });
      } else {
        const customerQuery = "SELECT * FROM customers WHERE username = ? AND password = ?";
        db.query(customerQuery, [username, password], (err, customerResult) => {
          if (err) {
            console.error('❌ Customer query error:', err); // log error
            return res.status(500).json({ status: 'fail', message: 'Server error' });
          }
  
          if (customerResult.length > 0) {
            return res.json({ status: 'success', user: customerResult[0], userType: 'customer' });
          } else {
            return res.json({ status: 'fail', message: 'Invalid Credentials' });
          }
        });
      }
    });
  });
  
  

// API Route - Add Book
// ✅ POST: Create Book (without genre)
app.post('/api/books', (req, res) => {
  const { title, author, price } = req.body;

  console.log("Incoming book data:", req.body); // ✅ Check what frontend sends

  const sql = 'INSERT INTO books (title, author, price) VALUES (?, ?, ?)';
  db.query(sql, [title, author, price], (err, result) => {
    if (err) {
      console.error('Error inserting book:', err);
      return res.status(500).json({ message: 'Failed to insert book' });
    }
    res.status(200).json({ message: 'Book added successfully', BookID: result.insertId });
  });
});



// API Route - Update Book
// ✅ PUT: Update Book (by BookID)
app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;

  console.log("BookID to update:", id);
  console.log("Data to update:", { title, author, price });

  if (!title && !author && !price) {
    return res.status(400).json({ message: 'No data provided for update' });
  }

  const sql = 'UPDATE books SET title = ?, author = ?, price = ? WHERE BookID = ?';
  db.query(sql, [title ?? null, author ?? null, price ?? null, id], (err, result) => {
    if (err) {
      console.error('Error updating book:', err.sqlMessage);
      return res.status(500).json({ message: 'Failed to update book' });
    }

    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book updated successfully' });
  });
});






// ✅ GET: Fetch All Books
app.get('/api/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to retrieve books' });
    }
    res.status(200).json(results);
  });
});

// ✅ GET: Fetch Book by ID
app.get('/api/books/:id', (req, res) => {
  const sql = 'SELECT * FROM books WHERE BookID = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(results[0]);
  });
});

// ✅ PUT: Update Book (without genre)
app.put('/api/books/:id', (req, res) => {
  const { title, author, price } = req.body;
  console.log('Update Request:', req.body); // Log the request data
  const sql = 'UPDATE books SET title = ?, author = ?, price = ? WHERE BookID = ?';
  db.query(sql, [title, author, price, req.params.id], (err, result) => {
    if (err) {
      console.error('Error updating book:', err);
      return res.status(500).json({ message: 'Failed to update book' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully' });
  });
});



// ✅ DELETE: Remove Book
app.delete('/api/books/:id', (req, res) => {
  const sql = 'DELETE FROM books WHERE BookID = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete book' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  });
});


// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
