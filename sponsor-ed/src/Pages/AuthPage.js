// src/Pages/AuthPage.js
import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import SignUpForm from '../components/Auth/SignUpForm';
import '../components/Auth/AuthForm.css'; // Import styles for the switch link

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Sign Up

  const toggleAuthMode = () => {
    setIsLogin(prevIsLogin => !prevIsLogin);
  };

  return (
    <div>
      {isLogin ? <LoginForm /> : <SignUpForm />}
      <div className="switch-auth-link">
        <button onClick={toggleAuthMode}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;