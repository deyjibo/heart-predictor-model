import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeartFormModal = ({ close }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: ""
  });

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    navigate("/heart-result", { state: form });
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>

        {/* CLOSE BUTTON (inside block) */}
        <button onClick={close} style={closeBtn}>×</button>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <h1 style={{ margin: 0, fontSize: "18px", color: "red" }}>Medical Analysis</h1>
          <h2 style={{ margin: "3px 0", fontSize: "22px", fontWeight: "700", color: "#222" }}>
            Enter Clinical Parameters
          </h2>
          <p style={{ fontSize: "13px", color: "#777", marginTop: "6px" }}>
            Fill in the details below to generate a real-time risk assessment.
          </p>
        </div>

        <form onSubmit={submitForm}>

          {/* PATIENT DETAILS */}
          <h3 style={sectionTitle}>
            <span style={iconStyle}>🫀</span> Patient Details
          </h3>

          <div style={row}>
            <Field label="1. AGE" name="age" type="number" placeholder="Years" value={form.age} onChange={updateField} />
            <Field
              label="2. BIOLOGICAL SEX"
              name="sex"
              type="select"
              options={[0, 1]}
              value={form.sex}
              onChange={updateField}
              hint={["0: Female", "1: Male"]}
            />
            <Field
              label="3. CHEST PAIN TYPE"
              name="cp"
              type="select"
              options={[0, 1, 2, 3]}
              value={form.cp}
              onChange={updateField}
              hint={["0: Typical", "1: Atypical", "2: Non-Anginal", "3: None"]}
            />
          </div>

          {/* CLINICAL VITALS */}
          <h3 style={sectionTitle}>
            <span style={iconStyle}>🩺</span> Clinical Vitals
          </h3>

          <div style={row}>
            <Field label="4. RESTING BP" name="trestbps" type="number" placeholder="mm Hg" value={form.trestbps} onChange={updateField} />
            <Field label="5. CHOLESTEROL" name="chol" type="number" placeholder="mg/dL" value={form.chol} onChange={updateField} />
            <Field
              label="6. BLOOD SUGAR"
              name="fbs"
              type="select"
              options={[0, 1]}
              value={form.fbs}
              onChange={updateField}
              hint={["0: ≤ 120", "1: > 120"]}
            />
          </div>

          <div style={row}>
            <Field
              label="7. RESTING ECG"
              name="restecg"
              type="select"
              options={[0, 1, 2]}
              value={form.restecg}
              onChange={updateField}
              hint={["0: Normal", "1: ST-T Abn", "2: LV Hypertrophy"]}
            />
            <Field label="8. MAX HEART RATE" name="thalach" type="number" placeholder="BPM" value={form.thalach} onChange={updateField} />
            <Field
              label="9. EXERCISE ANGINA"
              name="exang"
              type="select"
              options={[0, 1]}
              value={form.exang}
              onChange={updateField}
              hint={["0: No", "1: Yes"]}
            />
          </div>

          {/* TEST RESULTS */}
          <h3 style={sectionTitle}>
            <span style={iconStyle}>🧪</span> Test Results
          </h3>

          <div style={row}>
            <Field label="10. ST DEPRESSION" name="oldpeak" type="text" placeholder="e.g. 1.5" value={form.oldpeak} onChange={updateField} />
            <Field
              label="11. ST SLOPE"
              name="slope"
              type="select"
              options={[0, 1, 2]}
              value={form.slope}
              onChange={updateField}
              hint={["0: Up", "1: Flat", "2: Down"]}
            />
            <Field
              label="12. MAJOR VESSELS"
              name="ca"
              type="select"
              options={[0, 1, 2, 3]}
              value={form.ca}
              onChange={updateField}
              hint={["Colored (0–3)"]}
            />
          </div>

          <div style={row}>
            <Field
              label="13. THALLIUM"
              name="thal"
              type="select"
              options={[1, 2, 3]}
              value={form.thal}
              onChange={updateField}
              hint={["1: Normal", "2: Fixed", "3: Reversible"]}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              style={processBtn}
              onMouseEnter={(e) => (e.target.style.backgroundPosition = "left center")}
              onMouseLeave={(e) => (e.target.style.backgroundPosition = "right center")}
            >
              Process Data ❤️
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

/* ------------------ FIELD COMPONENT ------------------ */
const Field = ({ label, name, type, placeholder, value, onChange, options, hint }) => (
  <div style={fieldBox}>
    <label style={labelStyle}>{label}</label>

    {type === "select" ? (
      <select name={name} value={value} onChange={onChange} required style={inputStyle}>
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    ) : (
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required
        style={inputStyle}
      />
    )}

    {hint && (
      <div style={hintStyle}>
        {hint.map((h, i) => (
          <div key={i}>{h}</div>
        ))}
      </div>
    )}
  </div>
);

/* ------------------ STYLES ------------------ */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const modalStyle = {
  width: "85%",
  background: "#fff",
  borderRadius: "30px",
  padding: "25px 30px",
  boxShadow: "0px 10px 30px rgba(0,0,0,0.25)",
  maxHeight: "85vh",
  overflowY: "hidden",
  position: "relative"
};

const closeBtn = {
  fontSize: "28px",
  border: "none",
  background: "none",
  cursor: "pointer",
  position: "absolute",
  top: "12px",
  right: "15px",
  zIndex: 100
};

const sectionTitle = {
  marginTop: "22px",
  marginBottom: "8px",
  fontSize: "16px",
  color: "#444",
  fontWeight: "600",
  borderBottom: "2px solid #e0e0e0",
  paddingBottom: "4px",
  display: "flex",
  alignItems: "center",
  gap: "8px"
};

const iconStyle = {
  fontSize: "20px"
};

const row = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "18px",
  marginBottom: "12px"
};

const fieldBox = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const labelStyle = {
  width: "140px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#333"
};

const inputStyle = {
  flex: 1,
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  fontSize: "13px"
};

const hintStyle = {
  fontSize: "11px",
  color: "#777",
  width: "100px",
  lineHeight: "14px"
};

const processBtn = {
  backgroundSize: "200% auto",
  backgroundImage:
    "linear-gradient(to right, #00008b 0%, #00008b 50%, #ff0000 50%, #ff0000 100%)",
  color: "#fff",
  padding: "10px 22px",
  fontSize: "14px",
  borderRadius: "16px",
  cursor: "pointer",
  border: "none",
  transition: "0.4s ease",
  backgroundPosition: "right center"
};

export default HeartFormModal;
