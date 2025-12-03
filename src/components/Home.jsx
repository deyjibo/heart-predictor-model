import React from "react";
import logo from "./image/logo.PNG";  // <-- Import image

const Home = () => {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #ffffff, #fde0e0)",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ width: "140px", marginBottom: "20px" }}
      />

      <h1
        style={{
          fontSize: "44px",
          color: "#b71c1c",
          marginBottom: "10px",
        }}
      >
        MediNauts
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "#3a3a3a",
          maxWidth: "700px",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Innovating Healthcare Solutions through AI-Powered Prediction Tools.
      </p>

      <button
        onClick={() => (window.location.href = "/testing")}
        style={{
          padding: "15px 35px",
          fontSize: "18px",
          backgroundColor: "#b71c1c",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#7f1212")}
        onMouseLeave={(e) => (e.target.style.background = "#b71c1c")}
      >
        Have you any Disease?
      </button>
    </div>
  );
};

export default Home;