import React, { useState } from "react";
import HeartFormModal from "./HeartFormModal";

const Testing = () => {
  const [showHeartModal, setShowHeartModal] = useState(false);

  return (
    <div
      style={{
        minHeight: "84vh",
        padding: "60px 20px",
        background: "linear-gradient(to bottom, #ffffff, #fde0e0)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "600px",
          padding: "40px 30px",
          borderRadius: "18px",
          textAlign: "center",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "25px",
            color: "#b71c1c",
            fontWeight: "700",
          }}
        >
          Select Prediction Model
        </h2>

        <button
          style={buttonStyle}
          onClick={() => setShowHeartModal(true)}
          onMouseEnter={(e) => (e.target.style.background = "#7f1212")}
          onMouseLeave={(e) => (e.target.style.background = "#b71c1c")}
        >
          ❤️ Heart Disease Prediction
        </button>

        {showHeartModal && (
          <HeartFormModal close={() => setShowHeartModal(false)} />
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "14px 30px",
  background: "#b71c1c",
  color: "#fff",
  fontSize: "18px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "0.3s",
  marginTop: "10px",
};

export default Testing;
