import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneMockup } from "./PhoneMockup";
import { ProgressBar } from "./ProgressBar";
import { InboxScreen } from "./screens/InboxScreen";
import { LiveChatScreen } from "./screens/LiveChatScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { RotateCcw, Pause, Play } from "lucide-react";

const screens = [
  { id: "inbox", component: InboxScreen, duration: 8000, label: "Inbox" },
  { id: "chat", component: LiveChatScreen, duration: 12000, label: "Live Chat" },
  { id: "settings", component: SettingsScreen, duration: 10000, label: "AI Settings" },
];

export const DemoPlayer = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0);

  const goToNextScreen = useCallback(() => {
    setCurrentScreen(prev => (prev + 1) % screens.length);
    setKey(prev => prev + 1);
  }, []);

  const restart = useCallback(() => {
    setCurrentScreen(0);
    setKey(prev => prev + 1);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      goToNextScreen();
    }, screens[currentScreen].duration);

    return () => clearTimeout(timer);
  }, [currentScreen, isPlaying, goToNextScreen, key]);

  const CurrentScreenComponent = screens[currentScreen].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center p-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          <span className="bg-gradient-to-r from-ai-badge to-success bg-clip-text text-transparent">Clustal</span>
        </h1>
        <p className="text-gray-400">AI-Powered WhatsApp Responses</p>
      </motion.div>

      {/* Phone with Demo */}
      <div className="relative">
        <PhoneMockup>
          {/* Progress Bar */}
          <div className="absolute top-8 left-0 right-0 z-50">
            <ProgressBar
              current={currentScreen}
              total={screens.length}
              duration={screens[currentScreen].duration}
              key={`progress-${key}`}
            />
          </div>

          {/* Screen Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${screens[currentScreen].id}-${key}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <CurrentScreenComponent />
            </motion.div>
          </AnimatePresence>
        </PhoneMockup>

        {/* Screen Label */}
        <motion.div
          key={`label-${currentScreen}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
        >
          <span className="text-sm text-white font-medium">{screens[currentScreen].label}</span>
        </motion.div>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-4 mt-12"
      >
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 text-white" />
              <span className="text-sm text-white">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-white" />
              <span className="text-sm text-white">Play</span>
            </>
          )}
        </button>
        
        <button
          onClick={restart}
          className="flex items-center gap-2 px-4 py-2 bg-ai-badge/20 hover:bg-ai-badge/30 rounded-full transition-colors border border-ai-badge/30"
        >
          <RotateCcw className="w-4 h-4 text-ai-badge" />
          <span className="text-sm text-ai-badge">Replay</span>
        </button>
      </motion.div>

      {/* Screen Navigation Dots */}
      <div className="flex items-center gap-3 mt-6">
        {screens.map((screen, index) => (
          <button
            key={screen.id}
            onClick={() => {
              setCurrentScreen(index);
              setKey(prev => prev + 1);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentScreen === index 
                ? "bg-ai-badge w-6" 
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
