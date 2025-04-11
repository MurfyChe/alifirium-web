// src/components/Cart.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };
    
    fetchCartItems();
  }, []);

  return (
    <div className="cart-container">
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-left">
            <img src={item.image_url} alt={item.name} className="cart-item-image" />
          </div>
          <div className="cart-item-center">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
          <div className="cart-item-right">
            <p className="cart-item-price">${item.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
