import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Database, Cpu, Users, Github, Linkedin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            About OnCAI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 mb-8"
          >
            An advanced AI platform for multi-cancer detection and segmentation combining deep learning with clinical imaging
          </motion.p>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Cpu className="w-8 h-8 text-cyan-400" />
            Advanced Architecture
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: '🧠 Brain Tumor Detection',
                model: 'ViT-B16 + U-Net',
                dataset: 'BraTS 2023 + Figshare',
                classes: '4 classes',
                accuracy: '96.9%'
              },
              {
                title: '⚕️ Breast Cancer',
                model: 'VGG-16 + U-Net',
                dataset: 'CBIS-DDSM + BCDR',
                classes: '5 classes',
                accuracy: '98.2%'
              },
              {
                title: '🔍 Skin Cancer',
                model: 'EfficientNet-B7',
                dataset: 'HAM10000 + ISIC 2020',
                classes: '7 classes',
                accuracy: '89.8%'
              },
              {
                title: '🔬 GI Cancer',
                model: 'ResNet-50 + U-Net',
                dataset: 'Kvasir-SEG + CVC',
                classes: '8 classes',
                accuracy: '95.17%'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-slate-700/50 rounded-xl border border-slate-600/50 backdrop-blur-xl"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <div className="space-y-2 text-slate-300">
                  <p><span className="text-cyan-400 font-semibold">Model:</span> {item.model}</p>
                  <p><span className="text-cyan-400 font-semibold">Dataset:</span> {item.dataset}</p>
                  <p><span className="text-cyan-400 font-semibold">Classes:</span> {item.classes}</p>
                  <p><span className="text-cyan-400 font-semibold">Accuracy:</span> {item.accuracy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Datasets Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Database className="w-8 h-8 text-orange-400" />
            Training Datasets
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'BRATS 2023', desc: '7,023 MRI scans', icon: '🧠' },
              { name: 'HAM10000', desc: '10,015 dermoscopy images', icon: '🔍' },
              { name: 'ISIC 2020', desc: '33,126 skin lesion images', icon: '🔍' },
              { name: 'Kvasir-SEG', desc: '1,000 polyp images', icon: '🔬' },
              { name: 'CBIS-DDSM', desc: '2,478 mammography studies', icon: '⚕️' },
              { name: 'BreakHis', desc: 'Histopathology images', icon: '🔬' }
            ].map((dataset, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 bg-slate-700/50 rounded-xl border border-slate-600/50 text-center hover:border-cyan-500/50 transition-colors"
              >
                <div className="text-4xl mb-3">{dataset.icon}</div>
                <h3 className="font-bold text-white mb-1">{dataset.name}</h3>
                <p className="text-sm text-slate-400">{dataset.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Users className="w-8 h-8 text-purple-400" />
            Development Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {[
              { name: 'Aman', role: 'Lead Dev' },
              { name: 'Samrit', role: 'ML Engineer' },
              { name: 'Sejal', role: 'Frontend' },
              { name: 'Kritika', role: 'Research' },
              { name: 'Simran', role: 'UI/UX' }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white">
                  {member.name[0]}
                </div>
                <h3 className="font-bold text-white">{member.name}</h3>
                <p className="text-xs text-slate-400">{member.role}</p>
              </motion.div>
            ))}
          </div>

          {/* Mentor Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/30 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-cyan-400" />
              <h3 className="text-2xl font-bold text-white">Under Mentorship</h3>
            </div>
            <p className="text-lg text-slate-300">Er. Ravi Kumar</p>
            <p className="text-sm text-slate-400 mt-2">Department of CSE & AI-DS | Capstone Project 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white mb-12 text-center"
          >
            Technology Stack
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI/ML',
                items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'OpenCV']
              },
              {
                title: 'Frontend',
                items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion']
              },
              {
                title: 'Backend',
                items: ['FastAPI', 'Flask', 'MongoDB', 'Uvicorn']
              }
            ].map((stack, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-slate-700/50 rounded-xl border border-slate-600/50"
              >
                <h3 className="text-xl font-bold text-cyan-400 mb-4">{stack.title}</h3>
                <div className="space-y-2">
                  {stack.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white mb-8"
          >
            Connect with Developer
          </motion.h2>
          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/aman5123"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-slate-700/50 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors border border-slate-600/50 hover:border-cyan-500/50"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aman-aman-214ba9304/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold rounded-lg transition-colors border border-cyan-500/50 hover:border-cyan-400"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
