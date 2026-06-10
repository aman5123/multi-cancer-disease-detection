import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Download, Search, Eye } from 'lucide-react';
import { getHistory } from '../services/api';

const History = () => {
  const [history, setHistory] = useState([
    {
      _id: '1',
      model_key: 'skin',
      result: { class: 'Melanoma', confidence: 0.92 },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      imageUrl: null
    },
    {
      _id: '2',
      model_key: 'brain',
      result: { class: 'Grade II Tumor', confidence: 0.87 },
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      imageUrl: null
    },
    {
      _id: '3',
      model_key: 'gi',
      result: { class: 'Polyp Detected', confidence: 0.95 },
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      imageUrl: null
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');\n
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        // const response = await getHistory();
        // setHistory(response.data);
      } catch (err) {
        console.error('Failed to fetch history', err);
      } finally {
        setLoading(false);
      }
    };
    // fetchHistory();
  }, []);

  const filteredHistory = history.filter(item => 
    item.model_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.result.class && item.result.class.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCancerTypeBadge = (modelKey) => {
    const badges = {
      skin: { label: '🔍 Skin Cancer', color: 'bg-pink-500/20 border-pink-500/50 text-pink-300' },
      brain: { label: '🧠 Brain Tumor', color: 'bg-blue-500/20 border-blue-500/50 text-blue-300' },
      breast: { label: '⚕️ Breast Cancer', color: 'bg-red-500/20 border-red-500/50 text-red-300' },
      gi: { label: '🔬 GI Cancer', color: 'bg-orange-500/20 border-orange-500/50 text-orange-300' }
    };
    return badges[modelKey] || { label: 'Unknown', color: 'bg-slate-500/20 border-slate-500/50 text-slate-300' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            Analysis History
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400"
          >
            View and manage your previous cancer detection analyses
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400" />
          <input
            type="text"
            placeholder="Search by cancer type or result..."
            className="w-full pl-12 pr-6 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((item, idx) => {
              const badge = getCancerTypeBadge(item.model_key);
              const isAbnormal = item.result.class && !item.result.class.includes('Normal');
              
              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-slate-700/50 border border-slate-600/50 rounded-xl hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${badge.color}`}>
                          {badge.label}
                        </span>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                          isAbnormal 
                            ? 'bg-red-500/20 border border-red-500/50 text-red-300' 
                            : 'bg-green-500/20 border border-green-500/50 text-green-300'
                        }`}>
                          {item.result.class || 'Segmentation'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-slate-400 text-sm">
                        <span className="flex items-center gap-1">
                          📊 Confidence: <span className="text-cyan-400 font-bold">{(item.result.confidence * 100).toFixed(1)}%</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 md:gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-2 md:p-3 bg-slate-600/50 hover:bg-cyan-500/20 rounded-lg text-slate-400 hover:text-cyan-400 transition-all border border-slate-600/50 hover:border-cyan-500/50"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-2 md:p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/40 hover:to-blue-500/40 rounded-lg text-cyan-400 transition-all border border-cyan-500/30 hover:border-cyan-400"
                      >
                        <Download className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-slate-700/30 rounded-xl border border-slate-600/50"
          >
            <Clock className="h-16 w-16 mx-auto mb-4 text-slate-500" />
            <h3 className="text-2xl font-bold text-white mb-2">No Analysis History</h3>
            <p className="text-slate-400 mb-6">Start by uploading an image to analyze</p>
            <a
              href="/?type=gi"
              className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Run Analysis
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default History;
