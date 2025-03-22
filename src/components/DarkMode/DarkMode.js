import React, { useEffect, useState } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

//Template for darkMode taken from this tutorial - https://www.youtube.com/watch?v=Uz35Qiia84g

const DarkMode = () => {

  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  const setDarkMode = () => {
    document.querySelector("body").setAttribute('class', 'dark');
    localStorage.setItem("darkMode", "true");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute('class', 'light');
    localStorage.setItem("darkMode", "false");
  };

  const toggleTheme = e => {
    if (e.target.checked) {
      setDarkMode();
      setIsDarkMode(true);
    } else {
      setLightMode();
      setIsDarkMode(false);
    }
  };

  // automatically detect body class changes and update state
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bodyClass = document.querySelector("body").className;
      setIsDarkMode(bodyClass === "dark");
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect(); 
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, [isDarkMode]);

  return (
    <div className='dark_mode'>
      <input
        className='dark_mode_input'
        type='checkbox'
        id='darkmode-toggle'
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      <label className='dark_mode_label' htmlFor='darkmode-toggle'>
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
