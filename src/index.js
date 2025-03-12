import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const Root = () => {
  useEffect(() => {
    // checks dark mode state from localStorage when the app is loaded
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      const mode = JSON.parse(savedDarkMode);
      // apply the class to the body based on saved state
      document.body.className = mode ? 'dark' : 'light';
    }
  }, []); 

  return (
    <BrowserRouter basename="/smartchef">
      <App />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
