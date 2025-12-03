import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Collaborators from "./components/Collaborators";
import Contact from "./components/Contact";
import Testing from "./components/Testing";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HeartPredictor from "./components/HeartPredictor";   // ✅ NEW IMPORT
import './index.css';

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collaborators" element={<Collaborators />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/heart-disease" element={<HeartPredictor />} />  {/* ✅ NEW ROUTE */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
