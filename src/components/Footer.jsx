import PropTypes from 'prop-types';

const FooterSection = ({ children, small = false }) => (
  <p className={`${small ? 'text-sm' : 'mb-4'} ${!small ? 'border-b border-white/10 pb-4' : ''}`}>
    {children}
  </p>
);

FooterSection.propTypes = {
  children: PropTypes.node.isRequired,
  small: PropTypes.bool
};

const Footer = () => (
  <footer className="mt-12 text-center text-gray-400">
    <div className="container mx-auto px-4">
      <FooterSection>
        Built with ❤️ by Smart Healthcare Team | Not for medical diagnosis - Consult a professional
      </FooterSection>
      <FooterSection small>
        Powered by Gradio, React, and TensorFlow
      </FooterSection>
    </div>
  </footer>
);

export default Footer;