import React, { useState } from "react";
import { FaUserCircle, FaHeartbeat, FaFileMedical, FaTimes, FaHeart } from "react-icons/fa";

// Component for the Input Fields
const FormField = ({ label, type = "text", placeholder, options, legend, value, onChange, name, widthClass = "w-full" }) => {
  return (
    <div className={`flex flex-col ${widthClass}`}>
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
        {label}
      </label>
      
      {type === "select" ? (
        <div className="flex items-start gap-3">
          <div className="relative">
            <select
              name={name}
              value={value}
              onChange={onChange}
              className="appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 text-center font-medium outline-none shadow-sm"
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {/* Custom chevron if needed, usually browser default is fine for simple selects, but styled ones hide it. 
                For 'same to same' look, simple generic browser select with styled border fits the image vibe. */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
               <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          
          {/* Legend Text Area */}
          <div className="text-[10px] leading-tight text-gray-500 font-medium pt-1">
            {legend && legend.map((line, idx) => (
              <div key={idx} className="whitespace-nowrap">{line}</div>
            ))}
          </div>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none shadow-sm placeholder-gray-400"
        />
      )}
    </div>
  );
};

const HeartDiseaseForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    age: "",
    sex: "0",
    cp: "0",
    trestbps: "",
    chol: "",
    fbs: "0",
    restecg: "0",
    thalach: "",
    exang: "0",
    oldpeak: "",
    slope: "0",
    ca: "0",
    thal: "1"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black/60 flex items-center justify-center p-4 font-sans">
      {/* Main Modal Card */}
      <div className="bg-white w-full max-w-6xl rounded-[2rem] shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button className="absolute top-6 right-8 text-gray-400 hover:text-gray-600 transition-colors">
          <FaTimes size={20} />
        </button>

        {/* Header Section */}
        <div className="text-center pt-10 pb-2">
          <h3 className="text-xs font-bold text-red-500 uppercase tracking-[0.2em] mb-2">
            Medical Analysis
          </h3>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Enter Clinical Parameters
          </h1>
          <p className="text-sm text-gray-400 font-medium">
            Fill in the details below to generate a real-time risk assessment.
          </p>
        </div>

        {/* Form Container */}
        <div className="px-12 pb-12 pt-6">
          
          {/* Section 1: Patient Details */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <FaUserCircle className="text-blue-900" size={18} />
              <h2 className="text-md font-bold text-slate-800">Patient Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 border-b border-gray-100 pb-8">
              <FormField 
                label="1. Age" 
                name="age" 
                placeholder="Years" 
                value={formData.age} 
                onChange={handleChange} 
              />
              <FormField 
                label="2. Biological Sex" 
                name="sex" 
                type="select" 
                options={["0", "1"]} 
                value={formData.sex} 
                onChange={handleChange}
                legend={["0: Female", "1: Male"]} 
              />
              <FormField 
                label="3. Chest Pain Type" 
                name="cp" 
                type="select" 
                options={["0", "1", "2", "3"]} 
                value={formData.cp} 
                onChange={handleChange}
                legend={["0: Typical", "1: Atypical", "2: Non-Anginal", "3: None"]} 
              />
            </div>
          </div>

          {/* Section 2: Clinical Vitals */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <FaHeartbeat className="text-blue-900" size={18} />
              <h2 className="text-md font-bold text-slate-800">Clinical Vitals</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 border-b border-gray-100 pb-8">
              {/* Row 1 */}
              <FormField 
                label="4. Resting BP" 
                name="trestbps" 
                placeholder="mm Hg" 
                value={formData.trestbps} 
                onChange={handleChange} 
              />
              <FormField 
                label="5. Cholesterol" 
                name="chol" 
                placeholder="mg/dL" 
                type="number" // Adds the spinner controls seen in image
                value={formData.chol} 
                onChange={handleChange} 
              />
              <FormField 
                label="6. Blood Sugar" 
                name="fbs" 
                type="select" 
                options={["0", "1"]} 
                value={formData.fbs} 
                onChange={handleChange}
                legend={["0: ≤ 120", "1: > 120"]} 
              />

              {/* Row 2 */}
              <FormField 
                label="7. Resting ECG" 
                name="restecg" 
                type="select" 
                options={["0", "1", "2"]} 
                value={formData.restecg} 
                onChange={handleChange}
                legend={["0: Normal", "1: ST-T Abn", "2: LV Hyp"]} 
              />
              <FormField 
                label="8. Max Heart Rate" 
                name="thalach" 
                placeholder="BPM" 
                value={formData.thalach} 
                onChange={handleChange} 
              />
              <FormField 
                label="9. Ex. Angina" 
                name="exang" 
                type="select" 
                options={["0", "1"]} 
                value={formData.exang} 
                onChange={handleChange}
                legend={["0: No", "1: Yes"]} 
              />
            </div>
          </div>

          {/* Section 3: Test Results */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FaFileMedical className="text-blue-900" size={16} /> {/* Using FileMedical to look like the clipboard/doc icon */}
              <h2 className="text-md font-bold text-slate-800">Test Results</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-6 mb-10">
              <FormField 
                label="10. ST Depression" 
                name="oldpeak" 
                placeholder="e.g. 1.5" 
                value={formData.oldpeak} 
                onChange={handleChange} 
              />
              <FormField 
                label="11. ST Slope" 
                name="slope" 
                type="select" 
                options={["0", "1", "2"]} 
                value={formData.slope} 
                onChange={handleChange}
                legend={["0: Up", "1: Flat", "2: Down"]} 
              />
              <FormField 
                label="12. Major Vessels" 
                name="ca" 
                type="select" 
                options={["0", "1", "2", "3"]} 
                value={formData.ca} 
                onChange={handleChange}
                legend={["Colored", "(0-3)"]} 
              />
              <FormField 
                label="13. Thallium" 
                name="thal" 
                type="select" 
                options={["1", "2", "3"]} 
                value={formData.thal} 
                onChange={handleChange}
                legend={["1: Norm", "2: Fixed", "3: Rev"]} 
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button className="bg-slate-900 text-white text-sm font-semibold py-3 px-10 rounded-xl hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2">
              Process Data 
              <FaHeart className="text-white" size={12} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeartDiseaseForm;