import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, Sliders, Database, Zap, ChevronRight, Check, TrendingUp } from "lucide-react";

const settings = [
  { id: "auto", label: "Auto-respond to messages", enabled: true, delay: 0.5 },
  { id: "hours", label: "24/7 availability", enabled: true, delay: 0.7 },
  { id: "handoff", label: "Smart human handoff", enabled: true, delay: 0.9 },
  { id: "learn", label: "Learn from corrections", enabled: true, delay: 1.1 },
];

const knowledgeSources = [
  { id: 1, name: "Product Catalog", items: "847 products", delay: 1.5 },
  { id: 2, name: "FAQs & Policies", items: "124 answers", delay: 1.7 },
  { id: 3, name: "Business Hours", items: "Updated", delay: 1.9 },
];

export const SettingsScreen = () => {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    // Animate toggles turning on
    settings.forEach((setting) => {
      setTimeout(() => {
        setToggleStates(prev => ({ ...prev, [setting.id]: setting.enabled }));
      }, setting.delay * 1000);
    });

    // Animate progress bar
    setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 94) {
            clearInterval(interval);
            return 94;
          }
          return prev + 2;
        });
      }, 30);
    }, 2500);

    // Animate customer count
    setTimeout(() => {
      const interval = setInterval(() => {
        setCustomerCount(prev => {
          if (prev >= 2847) {
            clearInterval(interval);
            return 2847;
          }
          return prev + 47;
        });
      }, 20);
    }, 3000);
  }, []);

  return (
    <div className="h-full bg-clustal-dark flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 px-4 pb-4 bg-clustal-dark-surface"
      >
        <div className="flex items-center gap-3 mb-4">
          <ArrowLeft className="w-5 h-5 text-clustal-text" />
          <h1 className="text-xl font-bold text-clustal-text">AI Settings</h1>
        </div>
        
        {/* AI Status Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-ai-badge/20 to-success/20 rounded-2xl p-4 border border-ai-badge/30"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 rounded-full bg-ai-badge/20 flex items-center justify-center"
            >
              <Brain className="w-5 h-5 text-ai-badge" />
            </motion.div>
            <div>
              <h3 className="text-sm font-semibold text-clustal-text">Clustal AI Active</h3>
              <span className="text-xs text-success">Learning & improving</span>
            </div>
          </div>
          
          {/* Learning Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-clustal-text-muted">AI Learning Progress</span>
              <span className="text-xs text-ai-badge font-medium">{progress}%</span>
            </div>
            <div className="h-2 bg-clustal-dark-card rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-ai-badge to-success rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Settings */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Response Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-4 h-4 text-clustal-text-muted" />
            <h2 className="text-sm font-semibold text-clustal-text">Response Settings</h2>
          </div>
          
          <div className="bg-clustal-dark-surface rounded-xl overflow-hidden">
            {settings.map((setting, index) => (
              <motion.div
                key={setting.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: setting.delay }}
                className={`flex items-center justify-between px-4 py-3 ${
                  index < settings.length - 1 ? "border-b border-clustal-dark-border" : ""
                }`}
              >
                <span className="text-sm text-clustal-text">{setting.label}</span>
                <motion.div
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                    toggleStates[setting.id] ? "bg-success" : "bg-clustal-dark-card"
                  }`}
                  animate={toggleStates[setting.id] ? { scale: [1, 1.1, 1] } : {}}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: toggleStates[setting.id] ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Knowledge Base */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-4 h-4 text-clustal-text-muted" />
            <h2 className="text-sm font-semibold text-clustal-text">Knowledge Base</h2>
          </div>
          
          <div className="space-y-2">
            {knowledgeSources.map((source) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: source.delay, type: "spring" }}
                className="flex items-center justify-between px-4 py-3 bg-clustal-dark-surface rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-ai-badge/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-ai-badge" />
                  </div>
                  <div>
                    <p className="text-sm text-clustal-text">{source.name}</p>
                    <span className="text-xs text-clustal-text-muted">{source.items}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-clustal-text-muted" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="bg-gradient-to-br from-success/20 to-ai-badge/20 rounded-xl p-4 border border-success/30"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-xs text-success font-medium">Performance</span>
          </div>
          <div className="flex items-baseline gap-1">
            <motion.span 
              className="text-3xl font-bold text-clustal-text"
              key={customerCount}
            >
              {customerCount.toLocaleString()}
            </motion.span>
            <span className="text-sm text-clustal-text-muted">customers served</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
