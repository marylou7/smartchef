import React from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "SmartChef",
  "/scan-recipes": "Scan Recipes",
  "/shopping-lists": "Shopping Lists",
  "/saved-recipes": "Saved Recipes",
  "/my-profile": "My Profile"
};

const TopBar = () => {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Page Not Found";

  // Check if the page is the homepage to apply the smart font
  const isHomePage = location.pathname === "/";

  return (
    <div style={styles.topBar}>
      <h1 style={styles.title}>
        {isHomePage && <span style={styles.smartTitle}>Smart</span>}
        {pageTitle.replace("Smart", "")}
      </h1>
    </div>
  );
};

const styles = {
  topBar: {
    width: "100%",
    height: "45px",
    backgroundColor: "#000",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: "0px 4px 6px rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontFamily: "'Montserrat', sans-serif", 
    fontSize: "17px",
    fontWeight: "bold",
  },
  smartTitle: {
    fontFamily: "'Dancing Script', cursive",  
    fontSize: "22px",
    color: "#FF6347",
  }
};

export default TopBar;
