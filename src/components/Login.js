import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import axios from 'axios';


const API_BASE_URL = 'http://localhost:5025/api/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Determine login type based on username
            const loginType = username.startsWith("admin") ? "admin" : "customer";
            console.log(`Trying login with role: ${loginType}, Username: ${username}`);
    
            // Make Axios POST request
            const response = await axios.post(`${API_BASE_URL}/${loginType}-login`, {
                username,
                password,
            });
    
            console.log("Response:", response.data); 
    
            // Handle response from backend
            if (response.data.status === 'success') {
                if (response.data.role === 'admin') {
                    navigate('/admin-dashboard');
                } else if (response.data.role === 'customer') {
                    navigate('/customer-dashboard');
                }
            } else {
                setError(response.data.message || 'Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error("Error:", error);
            setError('Something went wrong. Please check your network or try again later.');
        } finally {
            setLoading(false);
        }
    };
    


    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
