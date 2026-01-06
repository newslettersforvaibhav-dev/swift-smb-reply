import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Phone, MoreVertical, Send, Smile, Paperclip, Mic, Sparkles, Clock } from "lucide-react";
import { ChatBubble } from "../ChatBubble";
import { TypingIndicator } from "../TypingIndicator";

const chatSequence = [
  { type: "customer", message: "Hi! Do you have any appointments available tomorrow?", delay: 0.5 },
  { type: "typing", delay: 2 },
  { type: "ai", message: "Hello! 👋 Yes, we have several slots available tomorrow. We have openings at 10am, 2pm, and 4pm. Which time works best for you?", delay: 3.5 },
  { type: "customer", message: "2pm would be perfect!", delay: 6 },
  { type: "typing", delay: 7.5 },
  { type: "ai", message: "Excellent choice! ✨ I've reserved the 2pm slot for you tomorrow. You'll receive a confirmation SMS shortly. Is there anything specific you'd like us to prepare for your visit?", delay: 9 },
  { type: "responseTime", time: "6s", delay: 9.5 },
];

export const LiveChatScreen = () => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showResponseTime, setShowResponseTime] = useState(false);

  useEffect(() => {
    chatSequence.forEach((item, index) => {
      if (item.type === "typing") {
        setTimeout(() => setShowTyping(true), item.delay * 1000);
        setTimeout(() => setShowTyping(false), (item.delay + 1.5) * 1000);
      } else if (item.type === "responseTime") {
        setTimeout(() => setShowResponseTime(true), item.delay * 1000);
      } else {
        setTimeout(() => {
          setVisibleMessages(prev => [...prev, index]);
        }, item.delay * 1000);
      }
    });
  }, []);

  return (
    <div className="h-full flex flex-col bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzBhMGUxNCIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIiBmaWxsPSIjMWExZjI4IiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8L3N2Zz4=')] bg-clustal-dark">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-12 px-3 pb-3 bg-clustal-dark-surface flex items-center gap-3 border-b border-clustal-dark-border"
      >
        <ArrowLeft className="w-5 h-5 text-clustal-text" />
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-whatsapp-green to-whatsapp-green-light flex items-center justify-center text-white font-semibold text-sm">
          CM
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-clustal-text">Carla Mendes</h2>
          <span className="text-xs text-success flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
            online
          </span>
        </div>
        <Phone className="w-5 h-5 text-clustal-text-muted" />
        <MoreVertical className="w-5 h-5 text-clustal-text-muted" />
      </motion.div>

      {/* AI Active Banner */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ delay: 0.3 }}
        className="bg-ai-badge/10 border-b border-ai-badge/20 px-4 py-2"
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-ai-badge" />
          </motion.div>
          <span className="text-xs text-ai-badge font-medium">Clustal AI is handling this conversation</span>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <AnimatePresence>
          {chatSequence.map((item, index) => {
            if (!visibleMessages.includes(index)) return null;
            
            if (item.type === "customer") {
              return (
                <ChatBubble
                  key={index}
                  message={item.message!}
                  isCustomer
                  time="now"
                />
              );
            }
            
            if (item.type === "ai") {
              return (
                <ChatBubble
                  key={index}
                  message={item.message!}
                  isAI
                  time="now"
                />
              );
            }
            
            return null;
          })}
        </AnimatePresence>
        
        {showTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex justify-end"
          >
            <TypingIndicator />
          </motion.div>
        )}
        
        {/* Response time celebration */}
        <AnimatePresence>
          {showResponseTime && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="flex justify-center mt-4"
            >
              <motion.div 
                className="flex items-center gap-2 px-4 py-2 bg-success/20 rounded-full border border-success/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <Clock className="w-4 h-4 text-success" />
                <span className="text-xs text-success font-semibold">Responded in 6 seconds!</span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.3, repeat: 5 }}
                >
                  🎉
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-3 py-3 bg-clustal-dark-surface border-t border-clustal-dark-border"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Smile className="w-6 h-6 text-clustal-text-muted" />
            <Paperclip className="w-5 h-5 text-clustal-text-muted" />
          </div>
          <div className="flex-1 bg-clustal-dark-card rounded-full px-4 py-2">
            <span className="text-sm text-clustal-text-muted">AI will respond automatically...</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-whatsapp-green flex items-center justify-center">
            <Mic className="w-5 h-5 text-white" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
