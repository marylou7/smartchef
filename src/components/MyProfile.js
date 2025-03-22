import React, { useEffect, useState, useRef } from "react";
import "./MyProfile.css";
import { FaHamburger } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode/DarkMode";
import HighContrastMode from "./HighContrastMode/HighContrastMode";

const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo"];

const MyProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dietPreferences, setDietPreferences] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  useEffect(() => {

    const savedDiet = JSON.parse(localStorage.getItem("dietPreferences")) || [];
    setDietPreferences(savedDiet);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    // function to close the menu if a user clicks outside the menu
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener to detect clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);


    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDietChange = (preference) => {
    let updatedPreferences;
    if (dietPreferences.includes(preference)) {
      updatedPreferences = dietPreferences.filter((item) => item !== preference);
    } else {
      updatedPreferences = [...dietPreferences, preference];
    }

    setDietPreferences(updatedPreferences);
    localStorage.setItem("dietPreferences", JSON.stringify(updatedPreferences));
  };

  const removePreference = (preference) => {
    const updatedPreferences = dietPreferences.filter((item) => item !== preference);
    setDietPreferences(updatedPreferences);
    localStorage.setItem("dietPreferences", JSON.stringify(updatedPreferences));
  };

  const handleButtonClick = () => {
    navigate("/my-ingredients");
  };

  const handlePrivacyPolicyClick = () => {
    navigate("/privacy-policy");
  };

  const handleTermsClick = () => {
    navigate("/terms-and-conditions");
  };




  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDeleteData = () => {
    localStorage.clear();
    setShowDeleteConfirmation(false);
    document.querySelector("body").setAttribute('class', 'light');
  };



  return (
    <div className="container">

      <div className="ingredients-container">
        <div className="button-container">
          <button className="ingredients-btn" onClick={handleButtonClick}>
            <FaHamburger className="burger-icon" /> View My Ingredients
          </button>
        </div>
        <hr className="section-divider" />

        <h3>Settings</h3>

        <div className="toggle-container">
          <label className="toggle-label">Dark Mode</label>
          <DarkMode />
        </div>

        <div className="toggle-container">
          <label className="toggle-label">High Constrast Mode</label>
          <HighContrastMode />
        </div>
  

        <hr className="section-divider" />

        {/* Dietary Preferences */}
        <div className="dietary-container">
          <h3>Dietary Preferences</h3>

          {/* Selected Preferences as Tags */}
          <div className="selected-preferences">
            {dietPreferences.map((preference) => (
              <span key={preference} className="tag">
                {preference}
                <button onClick={() => removePreference(preference)} className="remove-btn">×</button>
              </span>
            ))}
          </div>

          {/* Custom Multi-Select Dropdown */}
          <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Select Preferences ▼
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                {dietaryOptions.map((option) => (
                  <label key={option} className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={dietPreferences.includes(option)}
                      onChange={() => handleDietChange(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        
        {/* Delete My Data Section */}
        <hr className="section-divider" />
        <div className="delete-container">
          <button
            className="delete-btn"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <i className="fas fa-exclamation-triangle"></i>
            Delete My Data
            <i className="fas fa-exclamation-triangle"></i>
          </button>


          {/* Delete Confirmation Modal */}
          {showDeleteConfirmation && (
            <div className="confirmation-modal">
              <div className="modal-content">
                <p>Are you sure you want to delete all your data?</p>
                <div className="modal-buttons">
                  <button onClick={handleDeleteData} className="confirm-btn">Yes, Delete</button>
                  <button onClick={handleCancelDelete} className="cancel-btn">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>



        <hr className="section-divider" />

        {/* Privacy Policy Link */}
        <div className="privacy-policy">
          <p>
            By using this service, you agree to our{" "}
            <span
              onClick={handlePrivacyPolicyClick}
              style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
            >
              Privacy Policy
            </span>{" "}
            and{" "}
            <span
              onClick={handleTermsClick}
              style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
            >
              Terms & Conditions
            </span>.
          </p>



        </div>

      </div>
    </div>
  );
};

export default MyProfile;
