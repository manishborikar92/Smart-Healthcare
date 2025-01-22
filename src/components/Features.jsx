import PropTypes from 'prop-types';

const FeatureCard = ({ title, features }) => (
  <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
    <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
    <ul className="text-gray-400 space-y-2">
      {features.map((feature, index) => (
        <li key={index}>• {feature}</li>
      ))}
    </ul>
  </div>
);

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired
};

const Features = () => (
  <div className="bg-white/5 rounded-2xl p-8 animate-fade-in">
    <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
      Key Features
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FeatureCard
        title="AI-Powered Analysis"
        features={[
          "Advanced ResNet-50 v2 model",
          "Real-time processing",
          "High accuracy predictions"
        ]}
      />
      <FeatureCard
        title="Multiple Conditions"
        features={[
          "Burn Skin Detection",
          "Malignant Condition Analysis",
          "Healthy Skin Assessment"
        ]}
      />
      <FeatureCard
        title="User Experience"
        features={[
          "Intuitive interface",
          "Drag & drop functionality",
          "Instant results"
        ]}
      />
      <FeatureCard
        title="Privacy & Security"
        features={[
          "End-to-end encryption",
          "Secure cloud processing",
          "No personal data storage"
        ]}
      />
    </div>
  </div>
);

export default Features;