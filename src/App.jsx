import React, { useState, useEffect } from 'react';
import { Client } from "@gradio/client";
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Upload from './components/Upload';
import About from './components/About';
import Features from './components/Features';
import Footer from './components/Footer';

const App = () => {
  const [model, setModel] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <ErrorBoundary>
          <Header />
          
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="max-w-4xl mx-auto">
            {activeTab === 'upload' && (
              <Upload model={model} error={error} setError={setError} />
            )}
            
            {activeTab === 'about' && <About />}
            
            {activeTab === 'features' && <Features />}
          </div>

          <Footer />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;