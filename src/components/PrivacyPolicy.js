import React from 'react';
import './PrivacyPolicy.css'; 

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      
      <p>
        At SmartChef, we value your privacy and are committed to protecting
        the personal information you share with us. This Privacy Policy outlines how we collect,
        use, and protect your data.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We may collect the following types of information:
        <ul>
          <li>Personal information (name, email, dietary preferences, saved ingredients etc.)</li>
          <li>Usage data (Interaction with the app, feature usage, preferences.)</li>
          <li>Cookies & Tracking Data (To enhance user experience and improve recommendations.)</li>
        </ul>
      </p>

      <h2>How We Use Your Information</h2>
      <p>
       Your information helps us provide a better experience by:
        <ul>
        <li>Customizing recipe recommendations based on your preferences.</li>
        <li>Improving app features and functionality.</li>
        <li>Sending updates, tips, and promotional offers (if you opt in).</li>
        </ul>
      </p>

      <h2>Your Privacy Choices</h2>
      <p>
      <p>You have control over your data, including:</p>
        <ul>
        <li>Accessing and updating your account details.</li>
        <li>Managing your dietary preferences and saved recipes.</li>
        <li>Opting out of marketing communications.</li>
        </ul>
      </p>

      <h2>Cookies & Tracking</h2>
      <p>We use cookies to personalize content and analyze app performance. 
        You can disable cookies in your browser settings, but some features may be affected.</p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at:
        <br />
        📧 Email: contact@smartchef.com
      </p>
    </div>
  );
};

export default PrivacyPolicy;
