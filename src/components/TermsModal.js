import React from 'react';
import { useTerms } from '../TermsContext'; 
import './TermsModal.css';

const TermsModal = () => {
  const { showTermsModal, handleAcceptTerms, handleDeclineTerms } = useTerms();  

  if (!showTermsModal) return null;  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>SmartChef - Terms and Conditions & Privacy Policy</h2>
        
        <div className="modal-scrollable-content">
          <h3>Welcome to SmartChef!</h3>
          <p>
            By using our service, you agree to the following terms and conditions.
          </p>

          <h2>1. Use of Service</h2>
          <p>
            SmartChef provides recipe recommendations and dietary insights. 
            We do not guarantee accuracy, and you should consult a professional for specific health-related concerns.
            The information provided should be used at your own risk.
          </p>

          <h2>2. User Responsibilities</h2>
          <p>
            Users must ensure that the information they provide (e.g., dietary preferences) is accurate. 
            Misuse of the service may result in restricted access.
          </p>

          <h2>3. Privacy & Data</h2>
          <p>
            Your personal data is handled according to our Privacy Policy.
          </p>

          <h2>4. Liability</h2>
          <p>
            SmartChef provides dietary advice but is not responsible for any adverse reactions or health issues.
            Users should consult a healthcare provider before acting on the information provided.
          </p>

          <h2>Privacy Policy</h2>
          <p>
            At SmartChef, we value your privacy and are committed to protecting your personal information.
          </p>

          <h3>Information We Collect</h3>
          <ul>
            <li>Personal information (name, email, dietary preferences, saved ingredients, etc.)</li>
            <li>Usage data (interaction with the app, feature usage, preferences)</li>
            <li>Cookies & Tracking Data (to enhance user experience and improve recommendations)</li>
          </ul>

          <h3>How We Use Your Information</h3>
          <ul>
            <li>Customizing recipe recommendations based on your preferences</li>
            <li>Improving app features and functionality</li>
            <li>Sending updates, tips, and promotional offers (if you opt in)</li>
          </ul>

          <h3>Your Privacy Choices</h3>
          <ul>
            <li>Accessing and updating your account details</li>
            <li>Managing your dietary preferences and saved recipes</li>
            <li>Opting out of marketing communications</li>
          </ul>

          <h3>Cookies & Tracking</h3>
          <p>
            We use cookies to personalize content and analyze app performance.
            You can disable cookies in your browser settings, but some features may be affected.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions, feel free to contact us:</p>
          <p>📧 support@smartchef.com</p>
        </div>

        <div className="modal-buttons">
          <button onClick={handleAcceptTerms}>Accept</button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
