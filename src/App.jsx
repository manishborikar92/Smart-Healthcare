import React, { useState, useEffect } from "react";
import { Client } from "@gradio/client";

function App() {
  const [model, setModel] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load the model once when the app initializes
  useEffect(() => {
    const loadModel = async () => {
      try {
        const client = await Client.connect("theodinproject/skin_cancer_model_resnet50v2");
        setModel(client);
        console.log("Model loaded successfully!");
      } catch (err) {
        console.error("Error loading the model:", err);
        setError("Failed to load the model. Please try refreshing the page.");
      }
    };
    loadModel();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
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

      if (result && result.data && result.data.length > 0) {
        const { Disease, Accuracy } = result.data[0];
        if (!Disease || !Accuracy) {
          setError("Invalid response from API. Please try again.");
          return;
        }
        setResult({ disease: Disease, accuracy: Accuracy });
        setError(null);
      } else {
        setError("Invalid response from API. Please try again.");
      }
    } catch (err) {
      setError("Failed to predict. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col justify-center items-center py-10 px-6">
      <header className="text-center mb-5 max-w-4xl">
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 leading-normal py-2">
          🩺 Skin Disease Diagnosis
        </h1>
        <p className="mt-4 text-sm sm:text-xl md:text-2xl opacity-80">
          Upload a skin image, and our AI-powered model will provide a diagnosis with accuracy.
        </p>
      </header>

      <main className="bg-gray-800 shadow-2xl rounded-xl p-8 w-full max-w-3xl transform transition-all duration-300 hover:scale-105">
        <div className="flex flex-col items-center space-y-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-teal-700 file:text-teal-200 hover:file:bg-teal-600 focus:outline-none"
          />

          {previewImage && (
            <div className="relative w-90 h-64 rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-110">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <button
            onClick={handlePredict}
            disabled={loading || !model}
            className={`${
              loading || !model
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-500 to-cyan-600"
            } text-white py-3 px-8 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out`}
          >
            {loading ? "Analyzing..." : "Predict"}
          </button>
        </div>

        {error && (
          <div className="mt-6 text-red-500 text-center font-medium">
            {error}
          </div>
        )}
      </main>

      {result && (
        <section className="mt-8 w-full max-w-2xl bg-gray-800 shadow-xl rounded-xl p-6 text-center">
          <p className="text-lg md:text-xl font-semibold">
            <span className="text-teal-400">Disease:</span> {result.disease}
          </p>
          <p className="text-lg md:text-xl font-semibold mt-2">
            <span className="text-cyan-400">Accuracy:</span> {result.accuracy}
          </p>
        </section>
      )}

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>
          Developed by{" "}<br></br>
          <a
            href="https://github.com/prankitapotbhare"
            className="text-teal-400 hover:underline"
          >
            Prankita Potbhare
          </a>{" & "}
          <a
            href="https://github.com/manishborikar92/Smart-Healthcare"
            className="text-teal-400 hover:underline"
          >
            Manish Borikar
          </a>
          
        </p>
      </footer>
    </div>
  );
}

export default App;
