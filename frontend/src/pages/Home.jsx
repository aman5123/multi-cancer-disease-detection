import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const cancerTypes = [
    {
      title: 'GI Cancer Detection',
      accuracy: '95.17%',
      icon: '🔬',
      model: 'ResNet-50 + U-Net',
      color: 'from-cyan-500 to-blue-600',
      path: '/detection?type=gi'
    },
    {
      title: 'Skin Cancer Detection',
      accuracy: '89.8%',
      icon: '🧬',
      model: 'EfficientNet-B7 + ISIC 2020',
      color: 'from-orange-500 to-red-600',
      path: '/detection?type=skin'
    },
    {
      title: 'Breast Cancer Detection',
      accuracy: '98.2%',
      icon: '👙',
      model: 'VGG-16 + U-Net',
      color: 'from-pink-500 to-rose-600',
      path: '/detection?type=breast'
    },
    {
      title: 'Brain Cancer Detection',
      accuracy: '96.9%',
      icon: '🧠',
      model: 'ViT-B16 + U-Net',
      color: 'from-green-500 to-emerald-600',
      path: '/detection?type=brain'
    }
  ];

  const keyStats = [
    { label: '4 Cancer Types', value: '360° Coverage' },
    { label: 'AI Accuracy', value: '92.5% Average' },
    { label: 'Response Time', value: '< 2 Seconds' }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Privacy First',
      description: 'Your medical data is encrypted and never stored permanently'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'AI-powered results in milliseconds using advanced deep learning'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Detailed Reports',
      description: 'Download comprehensive PDF reports with model confidence scores'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI at the Frontier of
              <br />
              <span className="text-blue-300">Cancer Early Detection</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Advanced deep learning models for early detection across gastrointestinal, skin, breast, and brain cancers. Supporting medical professionals with AI-powered insights.
            </p>
            <div className="flex gap-4 justify-center mb-16">
              <Link
                to="/detection?type=gi"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center gap-2"
              >
                Start Detection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border border-slate-400 rounded-lg font-semibold text-slate-300 hover:bg-slate-800 transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {keyStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 text-center"
              >
                <div className="text-slate-400 text-sm font-medium mb-2">{stat.label}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            Why Choose Our Platform?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-500/50 transition-colors"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cancer Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-4 text-white"
          >
            Model Accuracy by Cancer Type
          </motion.h2>
          <p className="text-center text-slate-400 mb-16">
            Each model is trained on peer-reviewed, publicly available clinical imaging datasets
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cancerTypes.map((cancer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${cancer.color} rounded-lg p-0.5 cursor-pointer group overflow-hidden`}
              >
                <Link to={cancer.path} className="block">
                  <div className="bg-slate-950 rounded-lg p-8 group-hover:bg-slate-900 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{cancer.title}</h3>
                        <p className="text-slate-400 text-sm">{cancer.model}</p>
                      </div>
                      <span className="text-3xl">{cancer.icon}</span>
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                      {cancer.accuracy}
                    </div>
                    <p className="text-slate-500 text-sm mt-4">Click to analyze images</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Ready to Get Started?
          </motion.h2>
          <p className="text-blue-100 mb-8 text-lg">
            Upload your medical imaging and receive AI-powered analysis in seconds with detailed, downloadable reports.
          </p>
          <Link
            to="/detection?type=gi"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all"
          >
            Start Analysis Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
