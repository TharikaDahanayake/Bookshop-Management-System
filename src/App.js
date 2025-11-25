// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import './styles.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/login" element={<Login />} />
        0            <Route path="/register" element={<Register />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Direct access to Admin Dashboard */}
                    <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
