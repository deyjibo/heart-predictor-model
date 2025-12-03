import React from "react";
import { Link } from "react-router-dom";
import logo from "./image/logo.PNG";   // <-- Import image

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 40px",
        backgroundColor: "#fff",
        color: "#d32f2f",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo and Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "55px", height: "55px" }}
        />
        <h1 style={{ fontSize: "30px", fontWeight: "600", margin: 0, color: "#d32f2f" }}>
          MediNauts
        </h1>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "30px", fontSize: "18px", fontWeight: "500" }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/collaborators">Collaborators</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/testing">Check Health</NavLink>
      </div>
    </nav>
  );
};

// Custom link component with hover effect
const NavLink = ({ to, children }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Link
      to={to}
      style={{
        color: hover ? "#b71c1c" : "#d32f2f",
        textDecoration: "none",
        transition: "0.3s",
        fontWeight: "500",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Link>
  );
};

export default Navbar;
