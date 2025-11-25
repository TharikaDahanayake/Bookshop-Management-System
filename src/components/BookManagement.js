import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const BookManagement = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    price: '',
  });
  const [bookID, setBookID] = useState('');
  const [searchID, setSearchID] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleInputChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { title, author, price } = bookData;
    return title && author && price && !isNaN(price);
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      alert('Please fill in all fields correctly.');
      return;
    }
    try {
      const preparedData = { ...bookData, price: parseFloat(bookData.price) };
      const res = await axios.post('http://localhost:5025/api/books', preparedData);
      alert('Book Created Successfully!');
      setSearchResults((prev) => [...prev, res.data]);
      clearForm();
    } catch (error) {
      console.error('Error creating book:', error);
      alert('Failed to create book.');
    }
  };


  useEffect(() => {
    const fetchBooks = async () => {
        setLoading(true); 
        setError('');
        try {
            const res = await axios.get('http://localhost:5025/api/books');
            console.log('Fetched data:', res.data); // Debug: Check what data is being fetched
            setSearchResults(res.data); 
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Failed to fetch books. Please try again later.');
        } finally {
            setLoading(false); 
        }
    };

    fetchBooks();
}, []);

  




const handleUpdate = async () => {
  if (!validateForm()) {
      alert('Please fill in all fields correctly.');
      return;
  }

  if (!bookID) {
      console.error('No Book ID selected for update'); // Debugging log
      alert('No Book ID selected for update.');
      return;
  }

  try {
      const preparedData = { ...bookData, price: parseFloat(bookData.price) };
      console.log('Update request payload:', preparedData); // Debugging log
      console.log('Book ID:', bookID); // Debugging log

      const res = await axios.put(`http://localhost:5025/api/books/${bookID}`, preparedData);
      console.log('Update response:', res.data); // Debugging log

      alert('Book updated successfully!');

      // Refresh the book list
      const updatedBooks = await axios.get('http://localhost:5025/api/books');
      setSearchResults(updatedBooks.data);

      clearForm();
  } catch (error) {
      console.error('Error updating book:', error.response || error.message);
      alert('Failed to update book.');
  }
};
  




  const handleDelete = async (id) => {
    console.log('Attempting to delete book with ID:', id); // Debug log for confirmation
    try {
        // Send DELETE request to the backend
        await axios.delete(`http://localhost:5025/api/books/${id}`);
        alert('Book deleted successfully!');

        // Fetch the updated list of books after deletion
        const updatedBooks = await axios.get('http://localhost:5025/api/books');
        setSearchResults(updatedBooks.data);

        // Clear the form if the deleted book was selected
        if (bookID === id) clearForm();
    } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book. Please try again later.');
    }
};




const handleSearch = async () => {
  console.log('Search button clicked'); // Debugging log

  if (!searchID || isNaN(searchID)) {
      alert('Please enter a valid numeric Book ID');
      return;
  }

  try {
      console.log('Searching for Book ID:', searchID); // Log the search ID
      const res = await axios.get(`http://localhost:5025/api/books/${searchID}`);
      console.log('Search result:', res.data); // Log the API response
      setSearchResults([res.data]);
  } catch (error) {
      console.error('Error searching book:', error.response || error.message);
      alert('Book not found.');
      setSearchResults([]);
  }
};



  const clearForm = () => {
    setBookData({ title: '', author: '', price: '' });
    setBookID('');
  };

  const clearSearchField = async () => {
    setSearchID(''); // Clear the search input field

    try {
        // Fetch all books from the backend
        const res = await axios.get('http://localhost:5025/api/books');
        setSearchResults(res.data); // Update the table with all books
    } catch (error) {
        console.error('Error fetching books after clearing search:', error);
        alert('Failed to refresh the book list. Please try again later.');
    }
};
  


  const handleRowClick = (book) => {
    setBookData({
        
        title: book.title,
        author: book.author,
        price: book.price,
    });
    setBookID(book.BookID || book.bookID);
    console.log('Selected Book ID:', book.BookID); // Debugging log
    console.log('Book ID:', book.BookID || book.bookID);

  };



  return (
    <div className="book-management-container">
      <div className="book-form-container">
        <h2>Book Management</h2>
        <form className="book-form" autoComplete="off">
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={bookData.title} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input type="text" name="author" value={bookData.author} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={bookData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          {bookID && (
          <div className="form-group">
              <label>Book ID:</label>
              <input type="text" value={bookID} readOnly />
          </div>
      )}


          <div className="button-group">
            <button type="button" onClick={handleCreate} className="btn green">Create</button>
            <button type="button" onClick={handleUpdate} className="btn blue">Update</button>
            <button type="button" onClick={clearForm} className="btn gray">Clear Form</button>
          </div>
        </form>
      </div>

      <div className="book-search-container">
        <h3>Search Book</h3>
        <div className="search-group">
          <input
            type="text"
            placeholder="Enter Book ID"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
            className="search-input"
          />
          <button type="button" onClick={handleSearch} className="btn blue">Search</button>
          <button type="button" onClick={clearSearchField} className="btn gray">Clear Search</button>
        </div>

        <h3>Search Results</h3>
        <table className="book-table">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
     {searchResults.length === 0 ? (
         <tr>
             <td colSpan="5" className="no-results">No Book Found</td>
         </tr>
     ) : (
         searchResults.map((book) => (
             <tr key={book.BookID} onClick={() => handleRowClick(book)}>
                 <td>{book.bookID}</td>
                 <td>{book.title}</td>
                 <td>{book.author}</td>
                 <td>{book.price}</td>
                 <td>
                     <button
                         onClick={(e) => {
                             e.stopPropagation();
                             handleDelete(book.BookID || book.bookID); // Covers different cases for ID naming
                         }}
                         className="btn red"
                     >
                         Delete
                     </button>
                 </td>
             </tr>
         ))
     )}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;
