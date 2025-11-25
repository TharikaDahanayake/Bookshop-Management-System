import React, { useState } from 'react';
import '../styles.css'; // Include custom styles

const PlaceOrder = () => {
  const [books, setBooks] = useState([
    {
      bookID: 'B001',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      price: 12.99
    },
    {
      bookID: 'B002',
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 14.50
    },
    {
      bookID: 'B003',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 10.99
    },
    {
      bookID: 'B004',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 13.99
    }
  ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handlePlaceOrderClick = (book) => {
    setSelectedBook(book);
    setQuantity(1);
    setMessage('');
  };

  const handleConfirmOrder = async () => {
    if (quantity < 1) {
      alert('Please enter a valid quantity.');
      return;
    }

    try {
      // Mock order confirmation
      setMessage(`Order confirmed for "${selectedBook.title}" with quantity ${quantity}!`);
      setSelectedBook(null);
      setQuantity(1);
    } catch (error) {
      console.error('Error placing order:', error);
      setMessage('Failed to place order.');
    }
  };

  return (
    <div className="order-container">
      <h2>Bookshop - Browse and Order Books</h2>

      <div className="order-content">
        {/* Table Part */}
        <div className="book-table-section">
          <table className="book-table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price ($)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.bookID}>
                  <td>{book.bookID}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price}</td>
                  <td>
                    <button onClick={() => handlePlaceOrderClick(book)} className="btn green">
                      Place Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Place Order Part - Always displayed, but content changes based on selection */}
        <div className="order-popup-section">
          {selectedBook ? (
            <>
              <h3>Place Order for: {selectedBook.title}</h3>
              <p><strong>Book ID:</strong> {selectedBook.bookID}</p>
              <p><strong>Author:</strong> {selectedBook.author}</p>
              <p><strong>Price:</strong> ${selectedBook.price}</p>

              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <button onClick={handleConfirmOrder} className="btn blue">
                Confirm Order
              </button>

              <button onClick={() => setSelectedBook(null)} className="btn cancel">
                Cancel
              </button>
            </>
          ) : (
            <p>Select a book to place an order.</p>
          )}
        </div>
      </div>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default PlaceOrder;
