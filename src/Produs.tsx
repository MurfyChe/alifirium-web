import React from "react";
import { useParams } from "react-router-dom";
import { products } from "./products";
import "./Produs.css";

const Produs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "");
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Produsul nu a fost găsit.</div>;
  }

  return (
    <div className="produs-page">
      <div className="produs-details">
        <div className="produs-image">
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = "/produse-imagini/placeholder.png";
            }}
          />
        </div>
        <div className="produs-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Preț:</strong> {product.price} RON</p>
        </div>
      </div>
      <div className="produs-reviews">
        <h3>Recenzii ale utilizatorilor</h3>
        <ul>
          <li>"Excelent produs!" - Maria</li>
          <li>"Funcționează perfect, recomand!" - Andrei</li>
          <li>"Foarte mulțumit de rezultat." - Elena</li>
        </ul>
      </div>
    </div>
  );
};

export default Produs;
