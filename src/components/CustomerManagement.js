import React, { useState } from 'react';
import '../styles.css'; // Import your custom CSS styles (optional)

// Mock customer data for testing
const mockCustomers = [
  {
    customerID: 'C001',
    name: 'Michael Scott',
    email: 'michael.scott@dundermifflin.com',
    phone: '0774547890',
    address: '1725 Slough Ave, Scranton, PA',
  },
  {
    customerID: 'C002',
    name: 'Pam Beesly',
    email: 'pam.beesly@dundermifflin.com',
    phone: '0774567891',
    address: '54 Palm Drive, Scranton, PA',
  },
  {
    customerID: 'C003',
    name: 'Jim Halpert',
    email: 'jim.halpert@dundermifflin.com',
    phone: '0716789012',
    address: '912 Maple St, Scranton, PA',
  },
  {
    customerID: 'C004',
    name: 'Dwight Schrute',
    email: 'dwight.schrute@dundermifflin.com',
    phone: '0777890123',
    address: 'Schrute Farms, Honesdale, PA',
  },
  {
    customerID: 'C005',
    name: 'Stanley Hudson',
    email: 'stanley.hudson@dundermifflin.com',
    phone: '0718901234',
    address: '14 Elm Blvd, Scranton, PA',
  },
];

const CustomerManagement = () => {
  const [customerData, setCustomerData] = useState({
    customerID: '',
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [searchResults, setSearchResults] = useState(mockCustomers); // Preload mock data
  const [searchID, setSearchID] = useState('');

  const handleInputChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const result = mockCustomers.filter(
      (customer) => customer.customerID === searchID
    );
    if (result.length > 0) {
      setSearchResults(result);
    } else {
      alert('Customer not found.');
      setSearchResults([]);
    }
    clearSearchField();
  };

  const handleDelete = (customerID) => {
    setSearchResults(searchResults.filter((c) => c.customerID !== customerID));
    alert('Customer Deleted Successfully!');
  };

  const clearSearchField = () => {
    setSearchID('');
  };

  const handleRowClick = (customer) => {
    setCustomerData(customer);
  };

  return (
    <div className="customer-management-container">
      <h2>Customer Management</h2>
      <div className="customer-search-container">
        <h3>Search Customer</h3>
        <div className="search-group">
          <input
            type="text"
            name="searchID"
            placeholder="Enter Customer ID"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
          />
          <button type="button" onClick={handleSearch} className="btn blue">
            Search
          </button>
          <button type="button" onClick={clearSearchField} className="btn gray">
            Clear Search
          </button>
        </div>
      </div>

      <div className="customer-table-container">
        <h3>Search Results</h3>
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-results">
                  No Customer Found
                </td>
              </tr>
            ) : (
              searchResults.map((customer) => (
                <tr key={customer.customerID} onClick={() => handleRowClick(customer)}>
                  <td>{customer.customerID}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        handleDelete(customer.customerID);
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

export default CustomerManagement;