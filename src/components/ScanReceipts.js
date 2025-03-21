import React, { useEffect, useRef, useState } from "react";
import "./ScanReceipts.css";
import { Camera } from "lucide-react";
import { FaUpload, FaHamburger } from "react-icons/fa";
import Tesseract from "tesseract.js";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";

Modal.setAppElement("#root");

const ScanReceipts = () => {
  const videoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [extractedText, setExtractedText] = useState("");
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isIngredientsDetected, setIsIngredientsDetected] = useState(false);


  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
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
      const context = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageURL = canvas.toDataURL("image/png");
      setImageSrc(imageURL);
      extractIngredients(imageURL);
    }
  };

  const extractIngredients = async (imageDataUrl) => {
    setIsLoading(true); 

    try {
      const { data: { text } } = await Tesseract.recognize(imageDataUrl, "eng", {
        logger: (m) => console.log(m),
      });

      console.log("Extracted Text:", text);
      setExtractedText(text);

      const ingredientList = parseIngredients(text);
      setIngredients(ingredientList);
      filterIngredients(ingredientList);
    } catch (error) {
      console.error("Error extracting ingredients", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const parseIngredients = (text) => {
    let words = text.toLowerCase().split(/\s+/);
    words = words
      .map((word) => word.replace(/[^a-z]/g, "").trim())
      .filter((word) => word.length > 0);
    console.log(words);
    return words;
  };

  const filterIngredients = async (ingredientsList) => {
    try {
      const response = await fetch("/smartchef/ingredients.json");
      const validIngredients = await response.json();
      const ingredientSet = new Set(validIngredients.map((ing) => ing.toLowerCase()));
      const filtered = ingredientsList.filter((word) => ingredientSet.has(word));

      setFilteredIngredients(filtered);
      console.log("Filtered Words:", filtered);

      setModalIsOpen(true);
    } catch (error) {
      console.error("Error loading ingredients:", error);
      setFilteredIngredients([]);
    }
  };

  const handleButtonClick = () => {
    navigate("/my-ingredients");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        extractIngredients(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveToLocalStorage = () => {
    let savedIngredients = JSON.parse(localStorage.getItem("mySavedIngredients")) || [];

    const existingNames = new Set(savedIngredients.map((ing) => ing.name.toLowerCase()));

    filteredIngredients.forEach((name) => {
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);


      if (!existingNames.has(formattedName.toLowerCase())) {
        const newId = savedIngredients.length > 0
          ? Math.max(...savedIngredients.map((ing) => ing.id)) + 1
          : 1;

        savedIngredients.push({ id: newId, name: formattedName });
        existingNames.add(formattedName.toLowerCase());
      }
    });

    localStorage.setItem("mySavedIngredients", JSON.stringify(savedIngredients));
    console.log("Updated ingredients:", savedIngredients);
  };


  // Function to handle close action
  const handleDiscard = async () => {
    setImageSrc(null);
    setModalIsOpen(false);


    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  };





  return (
    <div className="scan-container">
      <div className="video-feed-box">
        {imageSrc ? (
          <img src={imageSrc} alt="Captured" className="captured-image" />
        ) : (
          <video ref={videoRef} autoPlay muted playsInline className="video-feed" />
        )}
      </div>

      {isLoading && ( 
        <div className="loading-overlay">
          <ClipLoader size={50} color="#36d7b7" />
          <p>Scanning Receipt...</p>
        </div>
      )}

      <div className="button-container">
        <button className="camera-button" onClick={captureImage}>
          <Camera size={35} />
        </button>
        <label htmlFor="file-upload" className="upload-button">
          <FaUpload size={35} />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="ingredients-container">
        <div className="button-container">
          <button className="ingredients-btn" onClick={handleButtonClick}
            style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <FaHamburger className="burger-icon" /> View My Ingredients
          </button>
        </div>
      </div>

      {/* React Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Filtered Ingredients"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>{filteredIngredients.length > 0 ? "Extracted Ingredients" : "No Ingredients Detected"}</h2>
        {filteredIngredients.length > 0 ? (
          <>
            <ul>
              {filteredIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <button
              className="discard-button"
              onClick={handleDiscard}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",  
                gap: "8px",
                width: "100%"  
              }}
            >
              <span className="material-icons">delete</span>
              Discard
            </button>
            <button
              className="add-ingredients-button"
              onClick={() => {
                saveToLocalStorage();
                setModalIsOpen(false);
                navigate("/my-ingredients");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px", 
                width: "100%"
              }}
            >
              <span className="material-icons">check</span>
               Add to My Ingredients
            </button>

          </>
        ) : (
          <>
            <p>
              Please make sure your receipt is clear, properly aligned,
              and that the image is of good quality.
              If the issue persists, try uploading a different image
              or ensure proper lighting and focus.
            </p>

            <button
              className="ok-button"
              onClick={() => {
                setModalIsOpen(false);
                handleDiscard();
              }}
            >
              OK
            </button>

          </>

        )}


      </Modal>

    </div>
  );
};

export default ScanReceipts;
