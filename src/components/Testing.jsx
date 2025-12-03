import React, { useState } from "react";
import HeartFormModal from "./HeartFormModal";

const Testing = () => {
  const [showHeartModal, setShowHeartModal] = useState(false);

  return (
    <div style={{
      minHeight: "80vh",
      padding: "50px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h2>Select a Prediction Model</h2>

      <button
        style={{ padding: "10px 25px", background: "red", color: "white", cursor: "pointer" }}
        onClick={() => setShowHeartModal(true)}
      >
        Heart Disease Prediction
      </button>

      {showHeartModal && <HeartFormModal close={() => setShowHeartModal(false)} />}
    </div>
  );
};

export default Testing;
