import React, { useState, useEffect } from 'react';
import { ToggleSlider }  from "react-toggle-slider";

const MyProfile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleChange = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // apply dark or light mode class to body
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return (
    <div style={containerStyle}>
      <h3>Settings</h3>

      {/* Dark Mode Toggle Slider */}
      <div style={toggleContainerStyle}>
        <label style={toggleLabelStyle}>Dark Mode</label>
        <ToggleSlider
          checked={isDarkMode}
          onChange={handleToggleChange}
          thumbColor="#fff" 
          trackColor="#4CAF50" 
          width={60} 
          height={30} 
        />
      </div>
    </div>
  );
};


const containerStyle = {
  padding: '20px',
};

const toggleContainerStyle = {
  marginTop: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const toggleLabelStyle = {
  fontSize: '16px',
};

export default MyProfile;
