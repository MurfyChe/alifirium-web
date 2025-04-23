import { useState } from "react";
import axios from "axios";

const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateInputs = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.includes("@")) {
      newErrors.email = "Email invalid.";
    }

    if (password.length < 8) {
      newErrors.password = "Parola trebuie să aibă cel puțin 8 caractere.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axios.post("http://localhost:5000/signup", { email, password });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Eroare la înregistrare");
    }
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      setMessage("Autentificare reușită");
      localStorage.setItem("token", response.data.token);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Eroare la autentificare");
    }
  };

  return (
    <div className="account-page">
      <h2>Contul Meu</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "input-error" : ""}
            required
          />
          {errors.email && <small className="error-text">{errors.email}</small>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Parola</label>
          <small className="password-requirement">Minimum 8 caractere</small>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "input-error" : ""}
            required
          />
          {errors.password && <small className="error-text">{errors.password}</small>}
        </div>

        <div className="form-buttons">
          <button type="button" className="btn sign-up-btn" onClick={handleSignUp}>
            Sign Up
          </button>
          <button type="button" className="btn login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>

      {message && <p className="server-message">{message}</p>}

      {/* Stiluri simple pentru feedback */}
      <style>{`
        .input-error {
          border: 1px solid red;
        }
        .error-text {
          color: red;
          font-size: 0.8rem;
        }
        .server-message {
          margin-top: 1rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Account;
