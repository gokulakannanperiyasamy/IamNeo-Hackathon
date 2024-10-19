import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordHint, setShowPasswordHint] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');

    const validatePassword = (password) => {
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const numberRegex = /\d/;
        const letterRegex = /[a-zA-Z]/;
        return (
            specialCharRegex.test(password) &&
            numberRegex.test(password) &&
            letterRegex.test(password)
        );
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^\d{10}$/; // Regular expression for 10 digits
        return mobileRegex.test(mobile);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validatePassword(password)) return;

        try {
            const response = await axios.post('http://localhost:3000/users', { username, password });
            console.log(response.data.message);
            navigate('/signup'); // Navigate to Signup
        } catch (error) {
            setError(error.response?.data?.message || "Login failed.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateMobile(mobile)) {
            setError("Mobile number must be exactly 10 digits.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/users', { username, email, mobile, password });
            console.log(response.data.message);
            setIsRegistering(false); // Close the registration form after submission
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed.");
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setShowPasswordHint(!validatePassword(newPassword));
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!validatePassword(newPassword)) {
            setError("New password must meet the requirements.");
            return;
        }
        console.log("Password reset successfully!"); // Placeholder for success message
        setIsResettingPassword(false); // Close reset form
    };

    return (
        <div className="login-container">
            <h1 className="heading">MINTO</h1>
            <h2 className="sub-heading">YOUR TRIP MAY OCCASIONAL<br />WE MAKE IT CELEBRATIONAL</h2>
            <div className="login-box">
                {isRegistering ? (
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Mobile Number"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            required
                        />
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit">Register</button>
                        <div className="back-to-login" onClick={() => setIsRegistering(false)}>
                            Back to Login
                        </div>
                    </form>
                ) : isResettingPassword ? (
                    <form onSubmit={handleResetPassword}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <div className="password-input-container">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                                required
                            />
                            {newPassword && !validatePassword(newPassword) && (
                                <div className="password-hint">
                                    ⚠ New password must contain at least one letter, one number, and one special character.
                                </div>
                            )}
                        </div>
                        <div className="password-input-container">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit">Submit</button>
                        <div className="forgot-password" onClick={() => setIsResettingPassword(false)}>
                            Back to Login
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <div className="password-input-container">
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Password"
                                required
                            />
                            {showPasswordHint && (
                                <div className="password-hint">
                                    ⚠ Password must contain at least one letter, one number, and one special character.
                                </div>
                            )}
                        </div>
                        <button type="submit">Login</button>
                        <div className="forgot-password" onClick={() => setIsResettingPassword(true)}>
                            Forgot Password?
                        </div>
                        <div className="new-user" onClick={() => setIsRegistering(true)}>
                            New User?
                        </div>
                    </form>
                )}
            </div>
            <div className="email-link">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mintotravelcompany123@gmail.com" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-envelope"></i> Contact Us via Email
                </a>
            </div>
            <div className="social-links">
                <a href="https://www.instagram.com/minto_travel_companion/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i> Follow us on Instagram
                </a>
            </div>
        </div>
    );
};

export default Login;
