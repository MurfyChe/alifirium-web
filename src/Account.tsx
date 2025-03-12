import React, { useState } from "react";
import { Link } from "react-router-dom";

const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with", { email, password });
    // Add your login functionality here (e.g., API call)
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign Up with", { email, password });
    // Add your sign-up functionality here (e.g., API call)
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="btn sign-up-btn"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button
            type="submit"
            className="btn login-btn"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
