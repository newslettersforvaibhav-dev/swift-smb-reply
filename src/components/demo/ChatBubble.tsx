import { motion } from "framer-motion";
import { Check, CheckCheck, Sparkles } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  isAI?: boolean;
  isCustomer?: boolean;
  time?: string;
  delivered?: boolean;
  delay?: number;
}

export const ChatBubble = ({ 
  message, 
  isAI = false, 
  isCustomer = false, 
  time = "now",
  delivered = true,
  delay = 0 
}: ChatBubbleProps) => {
  const isOutgoing = isAI;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: isCustomer ? -20 : 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ 
        duration: 0.4, 
        delay,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className={`flex ${isOutgoing ? "justify-end" : "justify-start"} mb-2`}
    >
      <div 
        className={`relative max-w-[85%] px-3 py-2 rounded-2xl ${
          isCustomer 
            ? "bg-whatsapp-bubble-in text-gray-800 rounded-bl-md" 
            : "bg-clustal-dark-card text-clustal-text rounded-br-md"
        }`}
      >
        {isAI && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.2 }}
            className="flex items-center gap-1 mb-1"
          >
            <Sparkles className="w-3 h-3 text-ai-badge" />
            <span className="text-[10px] text-ai-badge font-medium">Clustal AI</span>
          </motion.div>
        )}
        
        <p className="text-sm leading-relaxed">{message}</p>
        
        <div className={`flex items-center justify-end gap-1 mt-1 ${isCustomer ? "text-gray-500" : "text-clustal-text-muted"}`}>
          <span className="text-[10px]">{time}</span>
          {isOutgoing && delivered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.5 }}
            >
              <CheckCheck className="w-3 h-3 text-ai-badge" />
            </motion.div>
          )}
          {isCustomer && (
            <Check className="w-3 h-3" />
          )}
        </div>
      </div>
    </motion.div>
  );
};
