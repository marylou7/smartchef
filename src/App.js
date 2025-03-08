import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';  
import TopBar from "./components/TopBar"; // 
import Navbar from './components/Navbar';  
import ScanReceipts from './components/ScanReceipts';
import ShoppingLists from './components/ShoppingLists';
import SavedRecipes from './components/SavedRecipes';
import MyProfile from './components/MyProfile';
import HomePage from './components/HomePage';
import RecipePage from './components/RecipePage';

function App() {
  return (
    <BrowserRouter basename="/smartchef">
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
         <Route path="/recipe/:id" element={<RecipePage />} /> 
       </Routes>
       </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
