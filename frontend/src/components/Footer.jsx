import React from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">OnCAI</h3>
            <p className="text-sm text-slate-400 max-w-xs">
              Advanced multi-cancer detection system using state-of-the-art deep learning architectures for medical imaging analysis and clinical decision support.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Project Info</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>🎓 Capstone Project 2025</li>
              <li>4 Cancer Detection Models</li>
              <li>92.5% Average Accuracy</li>
              <li>Research & Educational Use</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect with Developer</h4>
            <div className="flex flex-col space-y-3">
              <a 
                href="https://github.com/aman5123" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/aman-aman-214ba9304/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-slate-500">
            © 2025 OnCAI - Cancer Detection AI. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for Medical Innovation
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-700/50">
          <p className="text-xs text-slate-500 text-center">
            ⚠️ <strong>Disclaimer:</strong> This is a research and educational tool only. Not for clinical diagnosis. Always consult qualified healthcare professionals.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
