import React from "react";

const Testing = () => {
  const openHeartModel = () => {
    // 🔥 Change this URL to your Heart Disease UI or Model Page
    window.open("/heart-disease", "_blank"); 
  };

  const openOtherTests = () => {
    window.open("/other-tests", "_blank");
  };

  return (
    <div style={{
      minHeight: "80vh",
      padding: "50px 20px",
      background: "linear-gradient(to bottom, #ffffff, #fde0e0)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h2 style={{
        fontSize: "34px",
        color: "#b71c1c",
        marginBottom: "15px",
        textAlign: "center"
      }}>Select a Prediction Model</h2>

      <p style={{
        fontSize: "18px",
        color: "#3a3a3a",
        marginBottom: "30px",
        textAlign: "center",
        maxWidth: "700px"
      }}>
        Choose a model to test from our AI-powered healthcare solutions.
      </p>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        <button style={modelBtn} onClick={openHeartModel}>
          Heart Disease Prediction
        </button>

        <button style={modelBtn} onClick={openOtherTests}>
          Other Tests
        </button>
      </div>
    </div>
  );
};

const modelBtn = {
  padding: "15px 35px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#b71c1c",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.3s",
  minWidth: "200px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
};

export default Testing;
