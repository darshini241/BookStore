import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>🛒 My Cart</h1>

      <h2>Total Books: {cartItems.length}</h2>

      <h2>Total Amount: ₹{totalAmount}</h2>

      {cartItems.length === 0 ? (
        <h3>No Books In Cart</h3>
      ) : (
        cartItems.map((book, index) => (
          <div
            key={index}
            style={{
              width: "400px",
              margin: "15px auto",
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: ₹{book.price}</p>
          </div>
        ))
      )}

      <button
        onClick={() => navigate("/payment")}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        Proceed To Payment
      </button>
    </div>
  );
}

export default Cart;