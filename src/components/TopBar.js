import React from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "HomePage",
  "/scan-recipes": "Scan Recipes",
  "/shopping-lists": "Shopping Lists",
  "/saved-recipes": "Saved Recipes",
  "/my-profile": "My Profile"
};

const TopBar = () => {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Page Not Found";

  return (
    <div style={styles.topBar}>
      <h1 style={styles.title}>{pageTitle}</h1>
    </div>
  );
};

const styles = {
  topBar: {
    width: "100%",
    height: "45px",
    backgroundColor: "#333",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  },
  title: {
    fontFamily: "'Montserrat', sans-serif", 
    fontSize: "17px",
    fontWeight: "bold",
  },
};

export default TopBar;
