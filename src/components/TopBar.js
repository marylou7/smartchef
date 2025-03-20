import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

const pageTitles = {
  "/": "SmartChef",
  "/scan-recipes": "Scan Receipts",
  "/shopping-lists": "Shopping Lists",
  "/saved-recipes": "Saved Recipes",
  "/my-profile": "My Account",
  "/recipe/": "SmartChef",
  "/list/": "SmartChef",
  "/my-ingredients": "My Saved Ingredients",
  "/privacy-policy": "Privacy Policy",
  "/terms-and-conditions": "Terms & Conditions"
};

const TopBar = ({ isEditable, handleEditClick, listName }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle = location.pathname.startsWith("/list/") ? listName : pageTitles[location.pathname] || "SmartChef";

  const isSmartChefPage = pageTitle === "SmartChef";
  const isRecipePage = location.pathname.startsWith("/recipe");
  const isShoppingListsPage = location.pathname === "/shopping-lists";
  const isListPage = location.pathname.startsWith("/list/");
  const isMyIngredientsPage = location.pathname === "/my-ingredients";
  const isPrivacyPolicyPage = location.pathname === "/privacy-policy";
  const isTermsAndConditionsPage = location.pathname === "/terms-and-conditions";


  const handleBackClick = () => {
    navigate(-1); // go back to the previous page
  };

  return (
    <div style={styles.topBar}>
      {(isRecipePage|| isListPage || isMyIngredientsPage || isPrivacyPolicyPage || isTermsAndConditionsPage) && (
        <button onClick={handleBackClick} style={styles.backButton}>
          <FaArrowLeft style={styles.backIcon} />
        </button>
      )}
      <h1 style={styles.title}>
        {isSmartChefPage && <span style={styles.smartTitle}>Smart</span>}
        {pageTitle ? pageTitle.replace("Smart", "") : ""}
      </h1>

      {isShoppingListsPage && (
        <button onClick={handleEditClick} style={styles.editButton}>
          <FaEdit style={styles.editIcon} />
          {isEditable ? "Done" : "Edit"}
        </button>
      )}

      {isListPage && (
        <button onClick={handleEditClick} style={styles.editButton}>
          <FaEdit style={styles.editIcon} />
          {isEditable ? "Done" : "Edit"}
        </button>
      )}

       {isMyIngredientsPage && (
        <button onClick={handleEditClick} style={styles.editButton}>
          <FaEdit style={styles.editIcon} />
          {isEditable ? "Done" : "Edit"}
        </button>
      )}
    </div>
  );
};

const styles = {
  topBar: {
    width: "100%",
    height: "45px",
    backgroundColor: "#FFDAB9",
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
    color: "#000"
  },
  smartTitle: {
    fontFamily: "'Dancing Script', cursive",  
    fontSize: "22px",
    color: "#FF6347",
  },
  backButton: {
    position: "absolute",
    left: "10px",
    backgroundColor: "#FF6347",
    color: "#fff",
    border: "none",
    padding: "5px 10px", 
    fontSize: "14px",      
    cursor: "pointer",
    borderRadius: "5px",
    zIndex: 1001,
    display: "flex",
    alignItems: "center", 
  },
   editButton: {
    position: "absolute",
    right: "10px", 
    backgroundColor: "#FF6347", 
    color: "#fff",
    border: "none",
    padding: "5px 10px", 
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "5px",
    zIndex: 1001,
    display: "flex",
    alignItems: "center", 
  },
};

export default TopBar;
