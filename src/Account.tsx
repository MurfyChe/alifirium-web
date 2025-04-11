import React, { useState } from "react";
import axios from "axios";

const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Sign Up handler
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", { email, password });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error occurred");
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      setMessage("Login successful");

      // Store JWT token in localStorage (or sessionStorage)
      localStorage.setItem("token", response.data.token);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="account-page">
      <h2>Contul Meu</h2>
      <form>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <small className="password-requirement">Minimum 8 characters</small>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn sign-up-btn" onClick={handleSignUp}>
            Sign Up
          </button>
          <button type="submit" className="btn login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Account;
