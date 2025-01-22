import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import GithubLogo from '../assets/github-mark-white.svg';
import HuggingFaceLogo from '../assets/huggingface.svg';
import GradioLogo from '../assets/gradio.svg';
import ReactLogo from '../assets/react.svg';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.footer 
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="mt-16 border-t border-white/10 bg-gradient-to-b from-gray-900 to-gray-900/50"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3 lg:gap-8">
          {/* Platform Info */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
                Smart Healthcare AI
            </h3>
            <div className="flex flex-col items-center space-y-1 md:flex-row md:space-y-0 md:space-x-4">
              <a 
                href="https://github.com/manishborikar92/Smart-Healthcare-React" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
              >
                <img 
                  src={GithubLogo} 
                  alt="GitHub" 
                  className="w-5 h-5 md:w-6 md:h-6" // Reduced size
                />
                <span className="text-sm">Source Code</span>
              </a>
              <a 
                href="https://huggingface.co/spaces/theodinproject/skin_cancer_model_resnet50v2" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
              >
                <img 
                  src={HuggingFaceLogo} 
                  alt="Hugging Face" 
                  className="w-5 h-5 md:w-6 md:h-6" // Reduced size
                />
                <span className="text-sm">Model Hub</span>
              </a>
            </div>
          </div>

          {/* Model Details */}
          <div className="space-y-3 text-center md:text-left">
            <h4 className="text-gray-300 font-semibold text-sm md:text-base">Model Architecture</h4>
            <ul className="space-y-1.5">
              <li className="text-gray-400 text-xs md:text-sm">ResNet-50 v2</li>
              <li className="text-gray-400 text-xs md:text-sm">TensorFlow 2.0</li>
              <li className="text-gray-400 text-xs md:text-sm">Pre-trained Weights</li>
            </ul>
          </div>

          {/* Developers */}
          <div className="space-y-3 text-center md:text-left">
            <h4 className="text-gray-300 font-semibold text-sm md:text-base">Developers</h4>
            <ul className="space-y-2.5">
              <li>
                <div className="flex flex-col items-center md:items-start">
                  <a 
                    href="https://github.com/manishborikar92" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-cyan-400 text-xs md:text-sm flex items-center space-x-1.5 group"
                  >
                    <img 
                      src={GithubLogo} 
                      alt="GitHub" 
                      className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:scale-110"
                    />
                    <span>Manish Borikar</span>
                  </a>
                  <a 
                    href="mailto:manishborikar@proton.me" 
                    className="text-gray-400 hover:text-cyan-400 text-xs md:text-sm mt-1 break-all md:break-normal"
                  >
                    manishborikar@proton.me
                  </a>
                </div>
              </li>
              <li>
                <div className="flex flex-col items-center md:items-start">
                  <a 
                    href="https://github.com/prankitapotbhare" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-cyan-400 text-xs md:text-sm flex items-center space-x-1.5 group"
                  >
                    <img 
                      src={GithubLogo} 
                      alt="GitHub" 
                      className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:scale-110" // Smaller size
                    />
                    <span>Prankita Potbhare</span>
                  </a>
                  <a 
                    href="mailto:prankitapotbhare@proton.me" 
                    className="text-gray-400 hover:text-cyan-400 text-xs md:text-sm mt-1 break-all md:break-normal"
                  >
                    prankitapotbhare@proton.me
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-xs md:text-sm">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 fill-red-500/20 animate-pulse" />
              <span>for Medical Innovation</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              <span className="bg-cyan-400/10 text-cyan-400 px-3 py-1.5 rounded-full text-xs md:text-sm flex items-center transition hover:bg-cyan-400/20">
                <img 
                  src={HuggingFaceLogo} 
                  alt="Hugging Face" 
                  className="w-4 h-4 md:w-5 md:h-5 mr-1"
                />
                Hugging Face
              </span>
              <span className="bg-purple-400/10 text-purple-400 px-3 py-1.5 rounded-full text-xs md:text-sm flex items-center transition hover:bg-purple-400/20">
                <img 
                  src={GradioLogo} 
                  alt="Gradio" 
                  className="w-4 h-4 md:w-6 md:h-6 mr-1"
                />
                Gradio
              </span>
              <span className="bg-blue-400/10 text-blue-400 px-3 py-1.5 rounded-full text-xs md:text-sm transition hover:bg-blue-400/20 flex items-center">
                <img 
                  src={ReactLogo} 
                  alt="React" 
                  className="w-4 h-4 md:w-5 md:h-5 mr-1"
                />
                React
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;