import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HeartResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const riskScore = calculateRisk(state);

  return (
    <div style={pageWrapper}>
      <div style={card}>

        {/* TOP RIGHT CLOSE SIGN ONLY */}
        <button style={closeBtn} onClick={() => navigate("/")}>
          ×
        </button>

        {/* TITLE */}
        <h1 style={mainTitle}>Heart Disease Prediction Result</h1>
        <p style={subTitle}>Based on your submitted clinical parameters</p>

        {/* RESULT BOX */}
        <div style={resultBox}>
          <h2 style={riskTitle}>
            {riskScore >= 50 ? "⚠️ High Risk Detected" : "✅ Low Risk Detected"}
          </h2>
          <p style={riskPercentage}>
            Estimated Risk Score: <b>{riskScore}%</b>
          </p>
        </div>

        {/* USER INPUT SUMMARY */}
        <h3 style={sectionTitle}>Your Entered Parameters</h3>

        <div style={grid}>
          {Object.entries(state).map(([key, value]) => (
            <div key={key} style={infoItem}>
              <span style={infoLabel}>{key.toUpperCase() + " : "}</span>
              <span style={infoValue}>{value}</span>
            </div>
          ))}
        </div>

        {/* ONLY ONE BUTTON NOW */}
        <div style={btnRow}>
          <button style={newBtn} onClick={() => navigate(-1)}>
            Analyze New Patient
          </button>
        </div>

      </div>
    </div>
  );
};

/* -------- RISK SCORE FUNCTION -------- */
function calculateRisk(data) {
  let score = 0;
  if (data.age > 50) score += 15;
  if (data.chol > 200) score += 15;
  if (data.trestbps > 130) score += 10;
  if (data.exang === "1") score += 20;
  if (data.cp === "2" || data.cp === "3") score += 15;
  if (data.thalach < 120) score += 10;
  if (data.oldpeak > 2.0) score += 15;

  return Math.min(score, 95);
}

/* ---------- STYLES ---------- */

const pageWrapper = {
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "75%",
  background: "#fff",
  padding: "30px 40px",
  borderRadius: "30px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
  maxHeight: "85vh",
  overflowY: "auto",
  position: "relative"
};

const closeBtn = {
  position: "absolute",
  top: "18px",
  right: "20px",
  fontSize: "32px",
  border: "none",
  background: "none",
  cursor: "pointer",
  color: "#222",
};

const mainTitle = {
  fontSize: "26px",
  fontWeight: "700",
  textAlign: "center",
  color: "red",
  marginBottom: "5px"
};

const subTitle = {
  textAlign: "center",
  fontSize: "14px",
  color: "#666",
  marginBottom: "20px"
};

const resultBox = {
  background: "#f6f6f6",
  padding: "20px",
  borderRadius: "20px",
  textAlign: "center",
  marginBottom: "25px"
};

const riskTitle = {
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "8px"
};

const riskPercentage = {
  fontSize: "16px",
  color: "#444"
};

const sectionTitle = {
  fontSize: "18px",
  marginBottom: "10px",
  fontWeight: "600",
  borderBottom: "2px solid #ddd",
  paddingBottom: "5px",
  color: "#333"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "12px",
  marginBottom: "25px"
};

const infoItem = {
  background: "#fafafa",
  padding: "12px",
  borderRadius: "12px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const infoLabel = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#777"
};

const infoValue = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#222"
};

const btnRow = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px"
};

const newBtn = {
  background: "#00008b",
  color: "white",
  padding: "12px 20px",
  borderRadius: "15px",
  border: "none",
  fontSize: "14px",
  cursor: "pointer"
};

export default HeartResult;
