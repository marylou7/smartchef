import React from 'react';
import './ScanReceipts.css';  
import { Camera } from "lucide-react"; 

const ScanReceipts = () => {
  return (
    <div className="scan-container">

      <div className="video-feed-box">
        <p>Video feed will be displayed here</p>
      </div>

      <button className="camera-button">
        <Camera size={35} />
      </button>


      </div>

  );
};

export default ScanReceipts;
