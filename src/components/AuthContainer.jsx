import React, { useState } from "react";
import "../App.css";
import logo from "../components/logo.jpg"; 

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    console.log("Login:", { email, password, rememberMe });
    if (onLoginSuccess) onLoginSuccess({ email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <img src={logo} alt="MediBox" class="imagesty h-100 w-5 " />
        </div>

        {/* Welcome */}
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Log in to your MediBox account.</p>

        {/* Email */}
        <div className="input-group">
          <span className="input-icon">👤</span>
          <input
            type="email"
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Remember + Forgot */}
        <div className="form-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <button className="forgot-password">Forgot Password?</button>
        </div>

        {/* Login Button */}
        <button className="login-btn" onClick={handleLogin}>
          Log In
        </button>

        {/* Footer */}
        <p className="signup-text">
          Don’t have an account?{" "}
          <button className="signup-btn" onClick={onSwitchToRegister}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;