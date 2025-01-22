const About = () => (
    <div className="bg-white/5 rounded-2xl p-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
        About Smart Healthcare AI
      </h2>
      <div className="space-y-6 text-gray-300">
        <p>
          Smart Healthcare AI is an advanced medical imaging platform that leverages the power of artificial intelligence 
          to assist in skin condition diagnosis. Our system uses a custom-trained ResNet-50 v2 model to analyze skin 
          images and provide rapid, accurate assessments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
            <h3 className="text-lg font-semibold mb-2 text-white">Our Mission</h3>
            <p className="text-gray-400">
              To make accurate skin condition diagnosis more accessible and efficient through AI-powered technology.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
            <h3 className="text-lg font-semibold mb-2 text-white">Technology</h3>
            <p className="text-gray-400">
              Built using state-of-the-art deep learning models and modern web technologies for reliable, real-time analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default About;