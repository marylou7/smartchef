import React, { useEffect, useState, useRef } from "react";
import { ToggleSlider } from "react-toggle-slider";
import "./MyProfile.css"; 
import { FaHamburger } from "react-icons/fa";



const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo"];

const MyProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [dietPreferences, setDietPreferences] = useState([]); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null); 

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setActive(JSON.parse(savedDarkMode));
    }

    const savedDiet = JSON.parse(localStorage.getItem("dietPreferences")) || [];
    setDietPreferences(savedDiet);

    document.body.className = active ? "dark" : "light";

    setIsLoading(false);
  }, [active]);

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

  const handleToggleChange = (state) => {
    setActive(state);
    localStorage.setItem("darkMode", JSON.stringify(state));
    document.body.className = state ? "dark" : "light";
  };

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">

<div className="ingredients-container">
        <h3>View My Ingredients</h3>
        <div className="button-container">
          <button className="ingredients-btn">
         <FaHamburger className="burger-icon" /> View My Ingredients
       </button>
      </div>

       <hr className="section-divider" />
      <h3>Settings</h3>

      <div className="toggle-container">
        <label className="toggle-label">Dark Mode</label>
        <ToggleSlider
          onToggle={handleToggleChange}
          active={active}
          thumbColor="#fff"
          trackColor="#4CAF50"
          width={60}
          height={30}
        />
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

     

    
        
      </div>
    </div>
  );
};

export default MyProfile;
