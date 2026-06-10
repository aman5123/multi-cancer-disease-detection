import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Detection', path: '/detection?type=gi' },
    { name: 'History', path: '/history' },
    { name: 'About', path: '/about' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/aman5123', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/aman-aman-214ba9304', label: 'LinkedIn' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center font-bold text-white transform group-hover:scale-110 transition-transform">
              ✨
            </div>
            <span className="text-xl font-bold text-white hidden sm:inline bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              OnCAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium relative group transition-colors duration-300 ${
                  location.pathname === link.path.split('?')[0]
                    ? 'text-cyan-400'
                    : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right side - Social Links & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Social Links Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-cyan-400"
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-cyan-400" />
              ) : (
                <Menu className="w-6 h-6 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-700/50"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="px-3 py-2 border-t border-slate-700/50 mt-2 pt-3">
                  <p className="text-xs text-slate-500 mb-2">Follow Us</p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-cyan-400"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
