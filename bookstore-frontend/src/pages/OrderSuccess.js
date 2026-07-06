import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#eef2f7",
      }}
    >
      <h1>✅ Order Placed Successfully</h1>
      <p>Thank you for purchasing books from our store.</p>

      <button
        onClick={() => navigate("/home")}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Back To Home
      </button>
    </div>
  );
}

export default OrderSuccess;