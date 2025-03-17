import React, { useEffect, useRef, useState } from 'react';
import './ScanReceipts.css';
import { Camera } from "lucide-react";
import Tesseract from 'tesseract.js'; //OCR API 
import { useNavigate } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";


import ingredientData from './ingredients.json';

const ScanReceipts = () => {
  const videoRef = useRef(null); 
  const [imageSrc, setImageSrc] = useState(null); 
  const [ingredients, setIngredients] = useState([]); 
  const [filteredIngredients, setFilteredIngredients] = useState([]); 
  const canvasRef = useRef(null); 
  const navigate = useNavigate();  

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
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
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

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

  const extractIngredients = async (imageDataUrl) => {
    try {
      Tesseract.recognize(
        imageDataUrl,
        'eng',
        {
          logger: (m) => console.log(m),
        }
      ).then(({ data: { text } }) => {
        console.log("Extracted Text:", text);
        const ingredientList = parseIngredients(text);
        setIngredients(ingredientList);
        filterIngredients(ingredientList); 
      });
    } catch (error) {
      console.error("Error extracting ingredients", error);
    }
  };

  const parseIngredients = (text) => {
   
    let words = text.toLowerCase().split(/\s+/);
  
   
    words = words.map(word => word.replace(/[^a-z]/g, "").trim()).filter(word => word.length > 0);
  
    console.log(words);
    return words;
  };
  
  // Function to filter ingredients
const filterIngredients = async (ingredientsList) => {
  try {

    const response = await fetch("/smartchef/ingredients.json");
    const validIngredients = await response.json();


    const ingredientSet = new Set(validIngredients.map(ingredient => ingredient.toLowerCase()));

  
    const filteredIngredients = ingredientsList.filter(word => ingredientSet.has(word));

    console.log(filterIngredients)
    return filteredIngredients;
  } catch (error) {
    console.error("Error loading ingredients:", error);
    return [];
  }
};

  

  const handleButtonClick = () => {
    navigate("/my-ingredients"); 
  };

  return (
    <div className="scan-container">
      <div className="video-feed-box">
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

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {ingredients.length > 0 && (
        <div className="extracted-text-list">
          <h3>Extracted Text:</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

{filteredIngredients.length > 0 ? (
  <div className="filtered-ingredients-list">
    <h3>Filtered Ingredients:</h3>
    <ul>
      {filteredIngredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ))}
    </ul>
  </div>
) : (
  <div className="no-ingredients-message">
    <h3>No ingredient extracted</h3>
  </div>
)}


      <div className="ingredients-container">
        <h3>View My Ingredients</h3>
        <div className="button-container">
          <button className="ingredients-btn" onClick={handleButtonClick}>
            <FaHamburger className="burger-icon" /> View My Ingredients
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanReceipts;
