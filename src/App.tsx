import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { products } from "./products";
import "./App.css";
import Despre from "./Despre";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <div className="app">
        <header className="main-header">
          <h1>Alifirium</h1>
          <nav className="main-nav">
            <ul>
              <li><Link to="/">Acasă</Link></li>
              <li><Link to="/products">Produse</Link></li>
              <li><Link to="/despre">Despre Noi</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <section id="home" className="home-section">
                  <h2>Bine ați venit la Alifirium!</h2>
                  <p>Descoperiți gama noastră de alifii medicinale, realizate cu grijă și din ingrediente naturale.</p>
                  <Link to="/products" className="btn">Vezi Produse</Link>
                </section>
              </>
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
                      <img src={product.imageUrl} alt={product.name} />
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p>Preț: {product.price} RON</p>
                      <button>Cumpără</button>
                    </div>
                  ))}
                </div>
              </section>
            }
          />
          <Route path="/despre" element={<Despre />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer className="main-footer">
          <p>&copy; 2024 Alifirium. Toate drepturile rezervate.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
