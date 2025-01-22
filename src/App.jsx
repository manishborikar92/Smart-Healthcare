import React, { useState, useEffect } from 'react';
import { Client } from "@gradio/client";

const App = () => {
  const [model, setModel] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const client = await Client.connect("theodinproject/skin_cancer_model_resnet50v2");
        setModel(client);
      } catch (err) {
        setError("Failed to load the model. Please try refreshing the page.");
      }
    };
    loadModel();
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
            🩺 Smart Healthcare AI
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Advanced skin condition analysis powered by AI
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <div 
            className={`
              relative p-8 rounded-2xl mb-8
              ${dragActive 
                ? 'bg-teal-500/10 border-2 border-teal-500/50' 
                : 'bg-white/5 border-2 border-white/10'
              } 
              transition-all duration-300
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
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Upload Image
              </h3>
              <p className="text-gray-400">
                Drag and drop your image here or click to browse
              </p>
            </div>
          </div>

          {/* Preview Section */}
          {previewImage && (
            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-gray-700">
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
                {loading ? "Analyzing..." : "Analyze Image"}
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-8">
              {error}
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="bg-white/5 border border-teal-500/20 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
                Analysis Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
                  <p className="text-gray-400 mb-2">Condition</p>
                  <p className="text-xl font-semibold text-white">{result.disease}</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
                  <p className="text-gray-400 mb-2">Confidence</p>
                  <p className="text-xl font-semibold text-white">{result.accuracy}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400">
          <p className="mb-2">
            Developed with ❤️ by the Smart Healthcare Team
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/prankitapotbhare"
              className="text-teal-400 hover:text-teal-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prankita Potbhare
            </a>
            <span>|</span>
            <a
              href="https://github.com/manishborikar92"
              className="text-teal-400 hover:text-teal-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Manish Borikar
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;