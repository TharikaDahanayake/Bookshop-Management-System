import React, { useState } from 'react';
import '../styles.css'; // Custom styles (optional)

const SalesHistory = () => {
  const [salesData] = useState([
    {
      saleID: 'S004',
      product: 'The Alchemist',
      quantity: 1,
      price: 899.99,
      total: 899.99,
      date: '2025-04-01'
    },
    {
      saleID: 'S004',
      product: 'Atomic Habits',
      quantity: 2,
      price: 499.99,
      total: 999.98,
      date: '2025-04-02'
    },
    {
      saleID: 'S004',
      product: 'The Great Gatsby',
      quantity: 1,
      price: 199.99,
      total: 199.99,
      date: '2025-04-03'
    },
    {
      saleID: 'S004',
      product: 'To Kill a Mockingbird',
      quantity: 1,
      price: 59.99,
      total: 59.99,
      date: '2025-04-04'
    }
  ]);

  return (
    <div className="sales-history-container">
      <h2>Customer Sales History</h2>
      <table className="sales-history-table">
        <thead>
          <tr>
            <th>Sale ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price ($)</th>
            <th>Date</th>
            <th>Total ($)</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.saleID}>
              <td>{sale.saleID}</td>
              <td>{sale.product}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price.toFixed(2)}</td>
              <td>{sale.date}</td>
              <td>{sale.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesHistory;
