import React, { useEffect, useRef, useState } from 'react';
import './ScanReceipts.css';
import { Camera } from "lucide-react";
import Tesseract from 'tesseract.js'; //OCR API 

const ScanReceipts = () => {
  const videoRef = useRef(null); 
  const [imageSrc, setImageSrc] = useState(null); 
  const [ingredients, setIngredients] = useState([]); 
  const canvasRef = useRef(null); // reference to the canvas element

  useEffect(() => {
    // function to start the camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment', // ensure it's the back camera
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream; // sets the video stream to the video element
        }
      } catch (err) {
        console.error("Error accessing the camera", err);
      }
    };

    startCamera(); 

    return () => {
   
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // stosp each track to release the camera
      }
    };
  }, []);

  // function to capture the image from the video feed
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
     
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
    
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
     
      const imageURL = canvas.toDataURL('image/png');
      setImageSrc(imageURL);
      extractIngredients(imageURL); 
    }
  };

  // function to send the captured image to the Tesseract API to extract ingredients
  const extractIngredients = async (imageDataUrl) => {
    try {
      
      Tesseract.recognize(
        imageDataUrl,
        'eng', 
        {
          logger: (m) => console.log(m), // Log progress for testing 
        }
      ).then(({ data: { text } }) => {
        console.log("Extracted Text:", text);
        const ingredientList = parseIngredients(text);
        setIngredients(ingredientList); 
      });
    } catch (error) {
      console.error("Error extracting ingredients", error);
    }
  };

  // function to parse the recognized text into ingredients
  //TODO: add functionality to determine only valid ingredients
  const parseIngredients = (text) => {
   
    const lines = text.split('\n');
    const ingredients = lines.filter(line => line.trim().length > 0);
    return ingredients;
  };

  return (
    <div className="scan-container">
      <div className="video-feed-box">
        {/* shows the image if captured, otherwise show video */}
        {imageSrc ? (
          <img src={imageSrc} alt="Captured" className="captured-image" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="video-feed"
          />
        )}
      </div>

      <button className="camera-button" onClick={captureImage}>
        <Camera size={35} />
      </button>

      {/* hidden canvas used to capture the image */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* displays extracted ingredients for now*/}
      {ingredients.length > 0 && (
        <div className="ingredients-list">
          <h3>Ingredients Extracted:</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScanReceipts;
