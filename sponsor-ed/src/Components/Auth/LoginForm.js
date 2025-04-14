// src/components/Auth/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To redirect after login
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'; // Import the auth instance
import './AuthForm.css'; // Import shared styles

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully:", userCredential.user);
      // Redirect to home page or dashboard after successful login
      navigate('/'); // Redirect to home page
    } catch (err) {
      console.error("Login error:", err);
      // Provide more user-friendly error messages
       if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
           setError('Invalid email or password.');
       } else if (err.code === 'auth/invalid-email') {
           setError('Please enter a valid email format.');
       } else {
           setError('Failed to log in. Please try again.');
       }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        {error && <p className="auth-feedback error">{error}</p>}
        <div className="form-group">
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;