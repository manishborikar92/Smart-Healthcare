const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg' 
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
  
  const Navigation = ({ activeTab, setActiveTab }) => (
    <div className="flex justify-center space-x-4 mb-8">
      <TabButton 
        id="upload" 
        label="Analyze" 
        active={activeTab === 'upload'} 
        onClick={setActiveTab} 
      />
      <TabButton 
        id="about" 
        label="About" 
        active={activeTab === 'about'} 
        onClick={setActiveTab} 
      />
      <TabButton 
        id="features" 
        label="Features" 
        active={activeTab === 'features'} 
        onClick={setActiveTab} 
      />
    </div>
  );
  
  export default Navigation;