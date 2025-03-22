import React, { useEffect, useState } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = () => {
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
      updateMode("dark");
    } else {
      updateMode("light");
    }
  };

  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark");
    } else if (mode === "high-contrast-mode") {
      document.body.classList.add("high-contrast-mode");
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
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={mode === "dark"}
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
