import React, { useState } from 'react';
import ViewProfile from './ViewProfile';
import PlaceOrders from './PlaceOrders';
import SalesHistory from './SalesHistory';
import '../styles.css';

const CustomerDashboard = () => {
    const [activeFunction, setActiveFunction] = useState('viewProfile');

    const handleLogout = () => {
        // Clear user session or authentication data
        localStorage.removeItem('authToken'); // Example for clearing a token
        localStorage.removeItem('userData');  // Example for clearing user data
    
        // Redirect to login page
        window.location.href = '/login'; // Replace '/login' with the route for your login page
    };

    return (
        <div className="admin-dashboard">
            <div className="left-panel">
                <h2>Customer Dashboard</h2>
                <ul>
                    <li onClick={() => setActiveFunction('viewProfile')}>View Profile</li>
                    <li onClick={() => setActiveFunction('placeOrders')}>Place Orders</li>
                    <li onClick={() => setActiveFunction('salesHistory')}>Sales History</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
            <div className="right-panel">
                {activeFunction === 'viewProfile' && <ViewProfile />}
                {activeFunction === 'placeOrders' && <PlaceOrders />}
                {activeFunction === 'salesHistory' && <SalesHistory />}
            </div> 
        </div>
    );
};

export default CustomerDashboard;
