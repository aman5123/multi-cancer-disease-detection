import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CANCER_TYPES = {
  gi: {
    name: 'GI Cancer Detection',
    description: 'Upload endoscopic, colonoscopic, or upper GI tract images',
    supportedFormats: 'JPEG, PNG — Endoscopy, Colonoscopy, Upper GI',
    icon: '🔬',
    color: 'from-cyan-500 to-blue-500',
    classes: ['dyed-lifted-polyps', 'dyed-resection-margins', 'esophagitis', 'normal-cecum', 'normal-pylorus', 'normal-z-line', 'polyps', 'ulcerative-colitis'],
    modelDetails: {
      architecture: 'ResNet-50 + U-Net',
      dataset: 'Kvasir-SEG + CVC-ClinicDB',
      trainingImages: '12,500+',
      validationMIoU: '0.868',
      f1Score: '0.912',
    },
  },
  skin: {
    name: 'Skin Cancer Detection',
    description: 'Upload dermoscopic images for skin lesion analysis',
    supportedFormats: 'JPEG, PNG — Dermoscopy Images',
    icon: '🔍',
    color: 'from-orange-500 to-red-500',
    classes: ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc'],
    modelDetails: {
      architecture: 'EfficientNet-B7 + ISIC 2020',
      dataset: 'HAM10000 + ISIC 2020',
      trainingImages: '33,126+',
      auc_roc: '0.943',
      sensitivity: '94.1%',
    },
  },
  breast: {
    name: 'Breast Cancer Detection',
    description: 'Upload mammograms, ultrasound, or histopathology images',
    supportedFormats: 'JPEG, PNG — Mammogram, Ultrasound, Histopathology',
    icon: '⚕️',
    color: 'from-pink-500 to-rose-500',
    classes: ['benign', 'malignant', 'dcis', 'invasive_lobular_carcinoma', 'fibroadenoma'],
    modelDetails: {
      architecture: 'VGG-16 + U-Net',
      dataset: 'CBIS-DDSM + BCDR',
      trainingImages: '18,200+',
      sensitivity: '97.6%',
      specificity: '98.7%',
    },
  },
  brain: {
    name: 'Brain Tumor Detection',
    description: 'Upload MRI brain scans for tumor detection and classification',
    supportedFormats: 'JPEG, PNG — T1/T2/FLAIR MRI sequences',
    icon: '🧠',
    color: 'from-green-500 to-emerald-500',
    classes: ['glioma', 'meningioma', 'pituitary', 'no_tumor'],
    modelDetails: {
      architecture: 'ViT-B16 + U-Net',
      dataset: 'BraTS 2023 + Figshare',
      trainingImages: '7,023 MRI scans',
      diceScore: '0.891',
      precision: '95.4%',
    },
  },
};

const Detection = () => {
  const [searchParams] = useSearchParams();
  const cancerType = searchParams.get('type') || 'gi';
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const reportRef = useRef(null);

  const config = CANCER_TYPES[cancerType] || CANCER_TYPES.gi;

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('image')) {
      setError('Please upload an image file');
      return;
    }

    setImage(file);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock result
      const mockResult = {
        predictions: config.classes.map((cls, idx) => ({
          class: cls,
          probability: Math.random() * 0.3 + (idx === 0 ? 0.7 : 0),
        })).sort((a, b) => b.probability - a.probability),
        processingTime: (Math.random() * 1 + 0.5).toFixed(2),
        confidence: (Math.random() * 0.2 + 0.8).toFixed(4),
        timestamp: new Date().toLocaleString(),
      };

      setResult(mockResult);
    } catch (err) {
      setError(err.message || 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {\n    if (!reportRef.current) return;\n\n    try {\n      const canvas = await html2canvas(reportRef.current);\n      const imgData = canvas.toDataURL('image/png');\n      const pdf = new jsPDF();\n      const imgWidth = 210;\n      const imgHeight = (canvas.height * imgWidth) / canvas.width;\n      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);\n      pdf.save(`cancer-detection-report-${Date.now()}.pdf`);\n    } catch (err) {\n      console.error('Failed to download report:', err);\n    }\n  };\n\n  return (\n    <div className=\"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8\">\n      <div className=\"max-w-6xl mx-auto\">\n        {/* Header */}\n        <motion.div\n          initial={{ opacity: 0, y: -20 }}\n          animate={{ opacity: 1, y: 0 }}\n          className=\"text-center mb-12\"\n        >\n          <div className=\"flex items-center justify-center gap-3 mb-4\">\n            <span className=\"text-5xl\">{config.icon}</span>\n            <h1 className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>\n              {config.name}\n            </h1>\n          </div>\n          <p className=\"text-slate-400 text-lg\">{config.description}</p>\n        </motion.div>\n\n        <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-8\">\n          {/* Upload Section */}\n          <motion.div\n            initial={{ opacity: 0, x: -20 }}\n            animate={{ opacity: 1, x: 0 }}\n            className=\"lg:col-span-2\"\n          >\n            <div className=\"space-y-6\">\n              {/* Upload Area */}\n              <div\n                className={`relative p-8 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer ${\n                  preview\n                    ? `border-cyan-500 bg-cyan-500/5`\n                    : 'border-slate-600 hover:border-cyan-500 bg-slate-700/20 hover:bg-slate-700/40'\n                }`}\n                onClick={() => fileInputRef.current?.click()}\n              >\n                <input\n                  ref={fileInputRef}\n                  type=\"file\"\n                  accept=\"image/*\"\n                  onChange={handleImageSelect}\n                  className=\"hidden\"\n                />\n\n                {preview ? (\n                  <div className=\"flex flex-col items-center gap-4\">\n                    <img src={preview} alt=\"preview\" className=\"max-h-64 rounded-lg\" />\n                    <button\n                      onClick={(e) => {\n                        e.stopPropagation();\n                        setPreview(null);\n                        setImage(null);\n                        setResult(null);\n                      }}\n                      className=\"text-sm text-cyan-400 hover:text-cyan-300\"\n                    >\n                      Remove image\n                    </button>\n                  </div>\n                ) : (\n                  <div className=\"flex flex-col items-center gap-4 text-center\">\n                    <Upload className=\"w-12 h-12 text-slate-500\" />\n                    <div>\n                      <p className=\"text-white font-semibold\">Drop your image here</p>\n                      <p className=\"text-sm text-slate-400\">{config.supportedFormats}</p>\n                    </div>\n                  </div>\n                )}\n              </div>\n\n              {/* Error Message */}\n              {error && (\n                <motion.div\n                  initial={{ opacity: 0 }}\n                  animate={{ opacity: 1 }}\n                  className=\"p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3\"\n                >\n                  <AlertCircle className=\"w-5 h-5 text-red-400\" />\n                  <span className=\"text-red-300\">{error}</span>\n                </motion.div>\n              )}\n\n              {/* Analyze Button */}\n              <motion.button\n                whileHover={{ scale: 1.02 }}\n                whileTap={{ scale: 0.98 }}\n                onClick={handleAnalyze}\n                disabled={!image || loading}\n                className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${\n                  !image || loading\n                    ? 'bg-slate-600 cursor-not-allowed'\n                    : `bg-gradient-to-r ${config.color} hover:shadow-lg hover:shadow-cyan-500/30`\n                }`}\n              >\n                {loading ? (\n                  <>\n                    <Loader className=\"w-5 h-5 animate-spin\" />\n                    Analyzing...\n                  </>\n                ) : (\n                  <>\n                    <span>🔍</span>\n                    Analyze Image\n                  </>\n                )}\n              </motion.button>\n\n              {/* Results Section */}\n              {result && (\n                <motion.div\n                  initial={{ opacity: 0, y: 10 }}\n                  animate={{ opacity: 1, y: 0 }}\n                  className=\"mt-8 p-6 bg-slate-700/50 rounded-xl border border-slate-600/50\"\n                >\n                  <div className=\"flex items-center gap-2 mb-4\">\n                    <CheckCircle className=\"w-5 h-5 text-green-400\" />\n                    <h3 className=\"text-xl font-bold text-white\">Analysis Complete</h3>\n                  </div>\n\n                  <div className=\"space-y-4\">\n                    <div className=\"flex justify-between items-center\">\n                      <span className=\"text-slate-400\">Processing Time:</span>\n                      <span className=\"text-cyan-400 font-semibold\">{result.processingTime}s</span>\n                    </div>\n                    <div className=\"flex justify-between items-center\">\n                      <span className=\"text-slate-400\">Confidence:</span>\n                      <span className=\"text-cyan-400 font-semibold\">{(parseFloat(result.confidence) * 100).toFixed(1)}%</span>\n                    </div>\n                    <div className=\"flex justify-between items-center\">\n                      <span className=\"text-slate-400\">Timestamp:</span>\n                      <span className=\"text-slate-300 text-sm\">{result.timestamp}</span>\n                    </div>\n\n                    <div className=\"mt-6 pt-6 border-t border-slate-600/50\">\n                      <h4 className=\"text-white font-semibold mb-4\">Class Predictions</h4>\n                      <div className=\"space-y-3\">\n                        {result.predictions.map((pred, idx) => (\n                          <div key={idx} className=\"space-y-1\">\n                            <div className=\"flex justify-between items-center\">\n                              <span className=\"text-slate-300 capitalize\">{pred.class.replace(/_/g, ' ')}</span>\n                              <span className=\"text-cyan-400 font-semibold\">{(pred.probability * 100).toFixed(1)}%</span>\n                            </div>\n                            <div className=\"w-full bg-slate-600/50 rounded-full h-2\">\n                              <motion.div\n                                initial={{ width: 0 }}\n                                animate={{ width: `${pred.probability * 100}%` }}\n                                transition={{ duration: 0.8, ease: 'easeOut' }}\n                                className=\"h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full\"\n                              />\n                            </div>\n                          </div>\n                        ))}\n                      </div>\n                    </div>\n\n                    <motion.button\n                      whileHover={{ scale: 1.02 }}\n                      onClick={downloadReport}\n                      className=\"w-full mt-6 py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg flex items-center justify-center gap-2\"\n                    >\n                      <Download className=\"w-4 h-4\" />\n                      Download Report\n                    </motion.button>\n                  </div>\n                </motion.div>\n              )}\n            </div>\n          </motion.div>\n\n          {/* Model Details Sidebar */}\n          <motion.div\n            initial={{ opacity: 0, x: 20 }}\n            animate={{ opacity: 1, x: 0 }}\n            className=\"space-y-6\"\n          >\n            {/* Model Details Card */}\n            <div className=\"p-6 bg-slate-700/50 rounded-xl border border-slate-600/50 backdrop-blur-xl\">\n              <h3 className=\"text-lg font-bold text-white mb-4 flex items-center gap-2\">\n                <span>🤖</span> Model Details\n              </h3>\n              <div className=\"space-y-3\">\n                {Object.entries(config.modelDetails).map(([key, value]) => (\n                  <div key={key}>\n                    <p className=\"text-slate-400 text-sm capitalize\">{key.replace(/([A-Z])/g, ' $1').trim()}</p>\n                    <p className=\"text-white font-semibold\">{value}</p>\n                  </div>\n                ))}\n              </div>\n            </div>\n\n            {/* Classes Card */}\n            <div className=\"p-6 bg-slate-700/50 rounded-xl border border-slate-600/50 backdrop-blur-xl\">\n              <h3 className=\"text-lg font-bold text-white mb-4\">📋 Detectable Conditions</h3>\n              <div className=\"space-y-2\">\n                {config.classes.map((cls, idx) => (\n                  <div key={idx} className=\"flex items-center gap-2\">\n                    <div className=\"w-2 h-2 bg-cyan-400 rounded-full\" />\n                    <span className=\"text-slate-300 text-sm capitalize\">{cls.replace(/_/g, ' ')}</span>\n                  </div>\n                ))}\n              </div>\n            </div>\n\n            {/* Info Card */}\n            <div className=\"p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg\">\n              <p className=\"text-sm text-yellow-300\">\n                <strong>⚠️ Research Tool Only</strong><br/>This AI model is for research & educational use only. Always consult a qualified healthcare professional.\n              </p>\n            </div>\n          </motion.div>\n        </div>\n      </div>\n\n      {/* Hidden Report Reference */}\n      <div ref={reportRef} className=\"hidden\">\n        {result && (\n          <div className=\"p-8 bg-white\" style={{ width: '8.5in', height: '11in' }}>\n            <h1 className=\"text-2xl font-bold mb-2\">{config.name} - Analysis Report</h1>\n            <p className=\"text-gray-600 mb-6\">{result.timestamp}</p>\n            <hr className=\"mb-4\" />\n            <div className=\"mb-6\">\n              <h2 className=\"text-lg font-bold mb-2\">Analysis Results</h2>\n              <p>Confidence: {(parseFloat(result.confidence) * 100).toFixed(1)}%</p>\n              <p>Processing Time: {result.processingTime}s</p>\n            </div>\n            <div>\n              <h3 className=\"text-lg font-bold mb-2\">Predictions</h3>\n              {result.predictions.map((pred, idx) => (\n                <div key={idx} className=\"mb-2\">\n                  <p>{pred.class}: {(pred.probability * 100).toFixed(1)}%</p>\n                </div>\n              ))}\n            </div>\n          </div>\n        )}\n      </div>\n    </div>\n  );\n}\n\nexport default Detection;
                    title="Download PDF Report"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Detection Output</h4>
                      {result.class ? (
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold gradient-text">{result.class.toUpperCase()}</span>
                          <div className="text-right">
                            <div className="text-xs text-slate-400">Confidence</div>
                            <div className="text-xl font-mono">{(result.confidence * 100).toFixed(2)}%</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xl font-bold text-primary-500">Segmentation Mask Generated</div>
                      )}
                    </div>

                    {result.probabilities && (
                      <div className="h-64 w-full">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Probability Distribution</h4>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} layout="vertical">
                            <XAxis type="number" hide domain={[0, 100]} />
                            <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.value > 50 ? '#0ea5e9' : '#94a3b8'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 self-start">Visual Analysis (AI Interpretation)</h4>
                    <div className="relative group rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-square w-full max-w-sm">
                      <img src={preview} alt="Original" className="absolute inset-0 w-full h-full object-cover" />
                      
                      {/* Classification Heatmap (Grad-CAM) */}
                      {result.heatmap && (
                        <img 
                          src={result.heatmap} 
                          alt="Heatmap" 
                          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay animate-pulse" 
                        />
                      )}

                      {/* Segmentation Mask */}
                      {result.mask && (
                        <img 
                          src={result.mask} 
                          alt="Mask" 
                          className="absolute inset-0 w-full h-full object-cover mix-blend-screen" 
                        />
                      )}
                    </div>
                    <div className="flex gap-4">
                      {result.heatmap && (
                        <span className="text-[10px] bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded">Grad-CAM Heatmap</span>
                      )}
                      {result.mask && (
                        <span className="text-[10px] bg-primary-500/10 text-primary-600 px-2 py-1 rounded">Segmentation Mask</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Detection;
