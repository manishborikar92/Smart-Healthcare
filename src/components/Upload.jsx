import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Results from './Results';

const Upload = ({ model, error, setError }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    } else {
      setError("Please upload a valid image file.");
    }
  };

  const handlePredict = async () => {
    if (!model) {
      setError("Model is still loading. Please wait a moment.");
      return;
    }

    if (!selectedFile) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await model.predict("/predict", { image: selectedFile });
      if (result?.data?.[0]?.Disease && result?.data?.[0]?.Accuracy) {
        setResult({
          disease: result.data[0].Disease,
          accuracy: result.data[0].Accuracy
        });
      } else {
        setError("Invalid response from API. Please try again.");
      }
    } catch (err) {
      setError("Failed to predict. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div 
        className={`
          relative p-8 rounded-2xl mb-8
          ${dragActive 
            ? 'bg-teal-500/10 border-2 border-teal-500/50' 
            : 'bg-white/5 border-2 border-white/10'
          } 
          transition-all duration-300 transform hover:scale-[1.01]
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">
            Upload Image for Analysis
          </h3>
          <p className="text-gray-400">
            Drag and drop your skin condition image here or click to browse
          </p>
        </div>
      </div>

      {previewImage && (
        <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-gray-700 transform hover:scale-[1.01] transition-transform duration-300">
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-64 object-contain rounded-xl mb-4"
          />
          <button
            onClick={handlePredict}
            disabled={loading}
            className={`
              w-full py-3 px-6 rounded-xl font-semibold text-white
              ${loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700'
              }
              transition-all duration-300 transform hover:scale-[1.02]
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : "Analyze Image"}
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-8 animate-fade-in">
          {error}
        </div>
      )}

      {result && <Results result={result} />}
    </>
  );
};

Upload.propTypes = {
    model: PropTypes.object,
    error: PropTypes.string,
    setError: PropTypes.func.isRequired
  };

export default Upload;