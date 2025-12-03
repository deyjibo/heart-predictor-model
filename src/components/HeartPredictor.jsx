import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const fieldLabels = {
  age: "Age",
  sex: "Sex",
  cp: "Chest Pain Type",
  trestbps: "Resting Blood Pressure",
  chol: "Serum Cholesterol",
  fbs: "Fasting Blood Sugar >120 mg/dl",
  restecg: "Resting Electrocardiographic Results",
  thalach: "Maximum Heart Rate Achieved",
  exang: "Exercise Induced Angina",
  oldpeak: "ST Depression Induced by Exercise",
  slope: "Slope of Peak Exercise ST Segment",
  ca: "Number of Major Vessels Colored by Fluoroscopy",
  thal: "Thalassemia",
};

const selectOptions = {
  sex: [
    { value: 0, label: "Female" },
    { value: 1, label: "Male" },
  ],
  cp: [
    { value: 0, label: "Typical Angina" },
    { value: 1, label: "Atypical Angina" },
    { value: 2, label: "Non-anginal Pain" },
    { value: 3, label: "Asymptomatic" },
  ],
  fbs: [
    { value: 0, label: "<=120 mg/dl" },
    { value: 1, label: ">120 mg/dl" },
  ],
  restecg: [
    { value: 0, label: "Normal" },
    { value: 1, label: "ST-T Abnormality" },
    { value: 2, label: "Left Ventricular Hypertrophy" },
  ],
  exang: [
    { value: 0, label: "No" },
    { value: 1, label: "Yes" },
  ],
  slope: [
    { value: 0, label: "Upsloping" },
    { value: 1, label: "Flat" },
    { value: 2, label: "Downsloping" },
  ],
  thal: [
    { value: 0, label: "Normal" },
    { value: 1, label: "Fixed Defect" },
    { value: 2, label: "Reversible Defect" },
  ],
};

const HeartPredictor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    Object.keys(fieldLabels).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/result", { state: { formData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-pink-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl p-12">
        <h1 className="text-5xl font-extrabold text-red-700 mb-10 text-center drop-shadow-md">
          Heart Disease Prediction
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto flex flex-col gap-8 text-center">
          {Object.keys(fieldLabels).map((field) => (
            <div key={field} className="flex flex-col w-full text-left">
              <label className="font-semibold mb-2 text-gray-700 text-lg text-left">
                {fieldLabels[field]}
              </label>

              {selectOptions[field] ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="p-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400 text-lg shadow-sm w-full text-left"
                  required
                >
                  <option value="">Select</option>
                  {selectOptions[field].map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={fieldLabels[field]}
                  className="p-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400 text-lg shadow-sm w-full text-left"
                  step={field === "oldpeak" ? 0.1 : 1}
                  required
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="bg-red-700 text-white py-5 rounded-3xl text-2xl font-extrabold hover:bg-red-800 transition shadow-lg hover:shadow-xl mt-4 w-full"
          >
            Predict Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeartPredictor;
