import React, { useState } from "react";
import { connectToGradio } from "./api";
import "./App.css"; // Ensure you have the styles in a separate CSS file

const SkinDiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDoctor, setShowDoctor] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setResult(null); // Clear previous results
      setShowDoctor(false); // Hide doctor illustration when a new image is uploaded
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true); // Start processing
    setResult(null); // Clear previous results

    try {
      const resultData = await connectToGradio(image);
      if (resultData.length > 0) {
        setResult(resultData[0]);
        setShowDoctor(true); // Show doctor illustration once result is available
      } else {
        setResult({ Error: "No result received from the server." });
      }
    } catch (error) {
      console.error("Error:", error);
      setResult({ Error: "An error occurred while fetching the result." });
    } finally {
      setLoading(false); // End processing
    }
  };

  return (
    <div className="container">
      <h1 className="header">Skin Disease Detection</h1>
      <p className="quote">"Healthy skin is a reflection of overall wellness."</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-upload"
      />
      <button
        onClick={handleSubmit}
        className={`detect-button ${loading ? "loading" : ""}`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Detect Disease"}
      </button>

      {/* Nurse Illustration */}
      {loading && (
        <div className="nurse-container">
          <img
            src="/images/thinking-nurse.png"
            alt="Nurse thinking"
            className="nurse-image"
          />
          <div className="nurse-thought">
            "Check your skin condition and get a health tip by Doctor."
          </div>
        </div>
      )}

      {/* Prediction Result */}
      {result && (
        <div className="result-container">
          <h3 className="result-header">Prediction Results:</h3>
          {result.Error ? (
            <p className="error">{result.Error}</p>
          ) : (
            <>
              <p><strong>Disease:</strong> {result.Disease}</p>
              <p><strong>Accuracy:</strong> {result.Accuracy}</p>
            </>
          )}
        </div>
      )}

      {/* Doctor Illustration */}
      {showDoctor && !loading && (
        <div className="doctor-container">
          <img
            src="/images/thinking-doctor.png"
            alt="Doctor thinking"
            className="doctor-image"
          />
          <div className="doctor-thought">"Stay healthy and take care of your skin!"</div>
        </div>
      )}

      {/* Health Tip Section */}
      <div className="health-tips">
        <h4>Healthy Skin Tip:</h4>
        <ul className="tips-list">
          <li>Drink plenty of water to keep your skin hydrated.</li>
          <li>Eat a balanced diet rich in vitamins and minerals.</li>
          <li>Always apply sunscreen before stepping out in the sun.</li>
          <li>Sleep well to allow your skin to repair itself.</li>
          <li>Never pick or scratch blemishes to avoid scarring.</li>
        </ul>
      </div>
    </div>
  );
};

export default SkinDiseaseDetection;


