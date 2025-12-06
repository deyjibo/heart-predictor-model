import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function calculateRisk(data) {
  if (!data) return 0;
  let score = 0;
  if (Number(data.age) > 50) score += 15;
  if (Number(data.chol) > 200) score += 15;
  if (Number(data.trestbps) > 130) score += 10;
  if (data.exang === "1" || data.exang === 1) score += 20;
  if (data.cp === "2" || data.cp === "3" || data.cp === 2 || data.cp === 3) score += 15;
  if (Number(data.thalach) < 120) score += 10;
  if (Number(data.oldpeak) > 2.0) score += 15;
  return Math.min(score, 95);
}

const HeartResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state;

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!form) return;

    const fetchPrediction = async () => {
      try {
        // 🔹 Replace the URL with your actual API endpoint
        fetch(`${process.env.REACT_APP_API_URL}/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });



        const data = await response.json();
        setPrediction(data); // data: { prediction: 0/1, probability: 0.0-1.0 }
      } catch (err) {
        console.error("Prediction failed, using local heuristic:", err);
        setPrediction(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [form]);

  if (!form) return <p>No data provided</p>;

  const riskScore = calculateRisk(form);

  return (
    <div style={overlay}>
      <div style={card}>
        <button style={closeBtn} onClick={() => navigate(-1)}>×</button>

        <h1 style={mainTitle}>Heart Disease Prediction Result</h1>
        <p style={subTitle}>Based on your submitted clinical parameters</p>

        <div style={resultBox}>
          {loading ? (
            <p>Loading prediction...</p>
          ) : (
            <>
              <h2 style={riskTitle}>
                {prediction
                  ? prediction.prediction === 1
                    ? "⚠️ High Risk Detected"
                    : "✅ Low Risk Detected"
                  : riskScore >= 50
                    ? "⚠️ High Risk Detected"
                    : "✅ Low Risk Detected"}
              </h2>

              <p style={riskPercentage}>
                {prediction
                  ? `Estimated Risk Score: ${Math.round(prediction.probability * 100)}%`
                  : `Estimated Risk Score: ${riskScore}%`}
              </p>

              {prediction && (
                <div style={{ marginTop: 6, fontWeight: "bold", color: prediction.prediction === 1 ? "red" : "green" }}>
                  {prediction.prediction === 1
                    ? "⚠️ The model predicts that you have heart disease."
                    : "✅ The model predicts that you do not have heart disease."}
                </div>
              )}
            </>
          )}
        </div>

        <h3 style={sectionTitle}>Your Entered Parameters</h3>
        <div style={grid}>
          {Object.entries(form).map(([key, value]) => (
            <div key={key} style={infoItem}>
              <span style={infoLabel}>{key.toUpperCase()} :</span>
              <span style={infoValue}>{value}</span>
            </div>
          ))}
        </div>

        <div style={btnRow}>
          <button
            style={newBtn}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = "left center")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = "right center")}
            onClick={() => navigate(-1)}
          >
            Analyze New Patient
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */
const overlay = {
  position: "fixed",
  top: 0, left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(8px)",
  display: "flex", justifyContent: "center", alignItems: "center",
  zIndex: 1000, padding: "20px"
};
const card = {
  width: "90%", maxWidth: "1000px",
  background: "#fff", borderRadius: "20px",
  padding: "30px 40px", boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
  position: "relative", maxHeight: "90vh", overflowY: "auto"
};
const closeBtn = { position: "absolute", top: "18px", right: "20px", fontSize: "32px", border: "none", background: "none", cursor: "pointer", color: "#222" };
const mainTitle = { fontSize: "28px", fontWeight: "700", textAlign: "center", color: "red", marginBottom: "5px" };
const subTitle = { textAlign: "center", fontSize: "14px", color: "#666", marginBottom: "20px" };
const resultBox = { background: "#f6f6f6", padding: "25px", borderRadius: "20px", textAlign: "center", marginBottom: "25px" };
const riskTitle = { fontSize: "22px", fontWeight: "700", marginBottom: "8px" };
const riskPercentage = { fontSize: "16px", color: "#444" };
const sectionTitle = { fontSize: "18px", marginBottom: "10px", fontWeight: "600", borderBottom: "2px solid #ddd", paddingBottom: "5px", color: "#333" };
const grid = { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginBottom: "25px" };
const infoItem = { background: "#fafafa", padding: "12px", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" };
const infoLabel = { fontSize: "12px", fontWeight: "600", color: "#777" };
const infoValue = { fontSize: "14px", fontWeight: "700", color: "#222" };
const btnRow = { display: "flex", justifyContent: "center", marginTop: "10px" };
const newBtn = { backgroundSize: "200% auto", backgroundImage: "linear-gradient(to right,#00008b 0%,#00008b 50%,#ff0000 50%,#ff0000 100%)", color: "#fff", padding: "12px 20px", borderRadius: "15px", border: "none", fontSize: "14px", cursor: "pointer", transition: "0.4s ease", backgroundPosition: "right center" };

export default HeartResult;
