import React from 'react';
import { useNavigate } from "react-router-dom";
import './TermsAndConditions.css'; 

const TermsAndConditions = () => {

const navigate = useNavigate();  

const handlePrivacyPolicyClick = () => {
        navigate("/privacy-policy"); 
      };
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      
      <p>
        Welcome to SmartChe! By using our service, you agree to the following terms and conditions.
      </p>

      <h2>1. Use of Service</h2>
      <p>
        SmartChef provides recipe recommendations and dietary insights. 
        We do not guarantee accuracy, and you should consult a professional for specific health-related concerns.
        While we strive to provide accurate and reliable information, SmartChef cannot be held responsible for any mistakes, inaccuracies, or misunderstandings that may arise from the use of our service. 
        The information provided should be used at your own risk, and we encourage users to verify all dietary and health-related information before acting on it.
      </p>

      <h2>2. User Responsibilities</h2>
      <p>
        Users must ensure that the information they provide (e.g., dietary preferences) is accurate. 
        Misuse of the service may result in restricted access.
      </p>

      <h2>3. Privacy & Data</h2>
      <p>
        Your personal data is handled according to our 
        <span style={{color: "blue", textDecoration: "underline", cursor: "pointer"}} 
        onClick={handlePrivacyPolicyClick} > Privacy Policy</span>.
      </p>

      <h2>4. Liability</h2>
<p>
  SmartChef provides recipe suggestions and dietary advice based on user preferences and data entered into the app. However, SmartChef is not responsible for any adverse reactions, allergic reactions, or any other negative health consequences that may result from the consumption of recipes or ingredients suggested by the app.
</p>
<p>
  The information provided through the app is for general guidance only and should not be considered as a substitute for professional medical advice. If you have any specific health conditions, allergies, or dietary restrictions, it is crucial that you consult a healthcare provider before following any dietary suggestions or preparing any recipes suggested by SmartChef.
</p>
<p>
  By using the service, you acknowledge and agree that SmartChef is not liable for any injury, illness, or other health-related issues that may arise as a result of following the recipes or dietary recommendations provided. Users are solely responsible for ensuring that the recipes and ingredients selected are appropriate for their individual health needs.
</p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions, feel free to contact us at: 
      </p>
      <p>📧 support@smartchef.com</p>
    </div>
  );
};

export default TermsAndConditions;
