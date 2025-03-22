import React, { useEffect, useState } from "react";
import "./HighContrastMode.css";

const HighContrastMode = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

  const updateMode = (newMode) => {
    // Remove previous modes and set the new mode
    document.body.classList.remove("dark", "high-contrast-mode", "light");
    document.body.classList.add(newMode);
    localStorage.setItem("mode", newMode);
    setMode(newMode);
  };

  const toggleTheme = (e) => {
    if (e.target.checked) {
      updateMode("high-contrast-mode");
    } else {
      updateMode("light");
    }
  };
  

  useEffect(() => {
    if (mode === "high-contrast-mode") {
      document.body.classList.add("high-contrast-mode");
    } else if (mode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.add("light");
    }
  }, [mode]);


   useEffect(() => {
      const observer = new MutationObserver(() => {
        if (document.body.classList.contains("dark")) {
          setMode("dark");
        } else if (document.body.classList.contains("high-contrast-mode")) {
          setMode("high-contrast-mode");
        } else {
          setMode("light");
        }
      });
    
      observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    
      return () => {
        observer.disconnect();
      };
    }, []);

  return (
    <div className="high_contrast_mode">
      <input
        className="high_contrast_mode_input"
        type="checkbox"
        id="HighContrastMode-toggle"
        checked={mode === "high-contrast-mode"}
        onChange={toggleTheme}
      />
      <label className="high_contrast_mode_label" htmlFor="HighContrastMode-toggle"></label>
    </div>
  );
};

export default HighContrastMode;
