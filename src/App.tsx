import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { products } from "./products";
import "./App.css";
import Despre from "./Despre";
import Contact from "./Contact";
import Produs from "./Produs";
import Account from "./Account";
import { Helmet } from "react-helmet-async";
import { FaUserCircle } from 'react-icons/fa';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <Router>
      <div className="app">
        <header className="main-header">
          <button onClick={toggleDarkMode} className="mode-toggle">
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
          <h1>Alifirium</h1>
          <nav className="main-nav">
            <ul>
              <li><Link to="/">Acasă</Link></li>
              <li><Link to="/products">Produse</Link></li>
              <li><Link to="/despre">Despre Noi</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
          <div className="account-icon">
            <Link to="/account"><FaUserCircle size={30} /></Link>
          </div>
        </header>

        {/* Ad spots */}
        <div className="ad-spot ad-spot-left">
          <img src="path-to-your-ad-image-left.jpg" alt="Ad Left" />
        </div>
        <div className="ad-spot ad-spot-right">
          <img src="path-to-your-ad-image-right.jpg" alt="Ad Right" />
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <section id="home" className="home-section">
                <h2>Bine ați venit la Alifirium!</h2>
                <p>Descoperiți gama noastră de alifii medicinale, realizate cu grijă și din ingrediente naturale.</p>
                <Link to="/products" className="btn">Vezi Produse</Link>
              </section>
            }
          />
          <Route
            path="/products"
            element={
              <section id="products" className="products-section">
                <h2>Produsele Noastre</h2>
                <div className="product-grid">
                  {products.map((product) => (
                    <div key={product.id} className="product-card">
                      <Link to={`/produs/${product.id}`}>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.src = "/produse-imagini/placeholder.png";
                          }}
                        />
                      </Link>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p>Preț: {product.price} RON</p>
                      <Link to={`/produs/${product.id}`} className="btn">Detalii</Link>
                    </div>
                  ))}
                </div>
              </section>
            }
          />
          <Route path="/produs/:id" element={<Produs />} />
          <Route path="/despre" element={<Despre />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
        </Routes>

        <footer className="main-footer">
          <p>&copy; 2024 Alifirium. Toate drepturile rezervate.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
