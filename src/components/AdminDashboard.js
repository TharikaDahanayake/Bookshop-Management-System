// src/components/AdminDashboard.js
import React, { useState } from 'react';
import BookManagement from './BookManagement'; // ✅ updated name
import CustomerManagement from './CustomerManagement';
import '../styles.css';

const AdminDashboard = () => {
    const [activeFunction, setActiveFunction] = useState('bookManagement');

    const handleLogout = () => {
        // Implement logout logic (e.g., clear user session, redirect to login)
        console.log('Logging out...');
    };

    return (
        <div className="admin-dashboard">
            <div className="left-panel">
                <h2>Admin Functions</h2>
                <ul>
                    <li onClick={() => setActiveFunction('bookManagement')}>Book Management</li>
                    <li onClick={() => setActiveFunction('customerManagement')}>Customer Management</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
            <div className="right-panel">
                {activeFunction === 'bookManagement' && <BookManagement />} {/* ✅ use updated name */}
                {activeFunction === 'customerManagement' && <CustomerManagement />}
            </div>
        </div>
    );
};

export default AdminDashboard;
