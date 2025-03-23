import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';  
import TopBar from "./components/TopBar";
import Navbar from './components/Navbar';  
import ScanReceipts from './components/ScanReceipts';
import ShoppingLists from './components/ShoppingLists';
import SavedRecipes from './components/SavedRecipes';
import MyProfile from './components/MyProfile';
import HomePage from './components/HomePage';
import RecipePage from './components/RecipePage';
import ListPage from './components/ListPage';
import MyIngredientsPage from './components/MyIngredientsPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import { TermsProvider } from "./TermsContext";
import TermsModal from "./components/TermsModal";

function App() {
  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable((prevState) => !prevState);
  };

  return (
    <div className="App">
        <TermsProvider>
        <TermsModal />
      <TopBar isEditable={isEditable} handleEditClick={handleEditClick} />
      <Navbar />
      <div style={{ marginTop: "45px" }}> {/* margin the same height as the topbar so the page doesn't get hidden */}
       
        <Routes>
          <Route path="/scan-recipes" element={<ScanReceipts />} />
          <Route path="/shopping-lists" element={<ShoppingLists isEditable={isEditable} />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} /> 
          <Route path="/list/:id" element={<ListPage />} /> 
          <Route path="/my-ingredients" element={<MyIngredientsPage />} /> 
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
      
      </div>
      </TermsProvider>
    </div>
  );
}

export default App;
