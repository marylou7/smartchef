import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';  
import TopBar from "./components/TopBar"; // 
import Navbar from './components/Navbar';  
import ScanReceipts from './components/ScanReceipts';
import ShoppingLists from './components/ShoppingLists';
import SavedRecipes from './components/SavedRecipes';
import MyProfile from './components/MyProfile';
import HomePage from './components/HomePage';

function App() {
  return (
    
    <div className="App">
       <TopBar />
       <Navbar />
       <div style={{ marginTop: "45px" }}> {/* margin the same height as the topbar so the page doesn't get hidden */}
       <Routes>
         <Route path="/scan-recipes" element={<ScanReceipts />} />
         <Route path="/shopping-lists" element={<ShoppingLists />} />
         <Route path="/saved-recipes" element={<SavedRecipes />} />
         <Route path="/my-profile" element={<MyProfile />} />
         <Route path="/" element={<HomePage />} />
       </Routes>
       </div>
      
       
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          This is a test!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
   
    

    </div>
    
  );
}

export default App;
