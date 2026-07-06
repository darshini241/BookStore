import React from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalAmount = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const handlePayment = () => {
    localStorage.removeItem("cart");
    navigate("/success");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        textAlign: "center",
        background: "#eef2f7",
        paddingTop: "40px",
      }}
    >
      <h1>💳 Payment Page</h1>

      <h2>Total Amount: ₹{totalAmount}</h2>

      <h3>Scan QR Code To Pay</h3>

      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=BookStorePayment"
        alt="QR Code"
      />

      <br />
      <br />

      <button
        onClick={handlePayment}
        style={{
          padding: "12px 25px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Confirm Payment
      </button>
    </div>
  );
}

export default Payment;