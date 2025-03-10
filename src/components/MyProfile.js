import React, { useEffect, useState } from "react";
import { ToggleSlider } from "react-toggle-slider";

const MyProfile = () => {
  const [isLoading, setIsLoading] = useState(true); // tracks loading state
  const [active, setActive] = useState(false); // state for toggle active status

  useEffect(() => {
    // get dark mode state from localStorage 
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      const mode = JSON.parse(savedDarkMode);
      setActive(mode); // set the active state of the slider from localStorage
    }

    // apply body class based on dark mode state
    document.body.className = active ? "dark" : "light";

    setIsLoading(false); 
  }, [active]);

  const handleToggleChange = (state) => {
    setActive(state); // Update the local active state

    // store the state in localStorage
    localStorage.setItem("darkMode", JSON.stringify(state));

    // apply the body class based on the toggle state
    document.body.className = state ? "dark" : "light";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h3>Settings</h3>

      {/* Dark Mode Toggle Slider */}
      <div style={toggleContainerStyle}>
        <label style={toggleLabelStyle}>Dark Mode</label>
        <ToggleSlider
          onToggle={handleToggleChange} // update state when toggled
          active={active} // use local state to set the active state
          thumbColor="#fff"
          trackColor="#4CAF50"
          width={60}
          height={30}
        />
      </div>
    </div>
  );
};

const containerStyle = { padding: "20px" };
const toggleContainerStyle = { marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" };
const toggleLabelStyle = { fontSize: "16px" };

export default MyProfile;
