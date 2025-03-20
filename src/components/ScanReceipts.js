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
    setIsLoading(true); // show loading when processing starts

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
      setIsLoading(false); // hide loading when processing is done
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

  return (
    <div className="scan-container">
      <div className="video-feed-box">
        {imageSrc ? (
          <img src={imageSrc} alt="Captured" className="captured-image" />
        ) : (
          <video ref={videoRef} autoPlay muted playsInline className="video-feed" />
        )}
      </div>

      {isLoading && ( // show loading spinner if OCR is running
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
          <button className="ingredients-btn" onClick={handleButtonClick}>
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
        <h2>Extracted Ingredients</h2>
        {filteredIngredients.length > 0 ? (
          <ul>
            {filteredIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p>No ingredients detected.</p>
        )}

        <button className="discard-button" onClick={() => {setModalIsOpen(false)}}>
          <span className="material-icons">delete</span> Discard
        </button>

        <button className="add-ingredients-button" onClick={() => console.log("New Ingredients Added to list!")}>
          <span className="material-icons">check</span> Add to My Ingredients
        </button>
      </Modal>
    </div>
  );
};

export default ScanReceipts;
