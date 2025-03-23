import React, { createContext, useContext, useState, useEffect } from 'react';

const TermsContext = createContext();


export const useTerms = () => useContext(TermsContext);

export const TermsProvider = ({ children }) => {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(localStorage.getItem('hasAcceptedTerms') === 'true');
  const [showTermsModal, setShowTermsModal] = useState(!hasAcceptedTerms); // Show modal if terms are not accepted


  const handleAcceptTerms = () => {
    setHasAcceptedTerms(true);
    localStorage.setItem('hasAcceptedTerms', 'true');
    setShowTermsModal(false);
  };

  const handleDeclineTerms = () => {
    setShowTermsModal(false); 
  };

  return (
    <TermsContext.Provider value={{ hasAcceptedTerms, showTermsModal, setShowTermsModal, handleAcceptTerms, handleDeclineTerms }}>
      {children}
    </TermsContext.Provider>
  );
};
