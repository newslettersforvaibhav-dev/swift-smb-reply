import { motion } from "framer-motion";
import { MessageSquare, Sparkles, Clock, Search, MoreVertical } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Maria Santos",
    avatar: "MS",
    message: "Perfect! I'll book for 3pm tomorrow",
    time: "2m",
    aiResponded: true,
    responseTime: "8s",
    unread: false,
  },
  {
    id: 2,
    name: "João Silva",
    avatar: "JS",
    message: "Do you have the blue model in stock?",
    time: "5m",
    aiResponded: true,
    responseTime: "4s",
    unread: false,
  },
  {
    id: 3,
    name: "Ana Costa",
    avatar: "AC",
    message: "What are your opening hours?",
    time: "12m",
    aiResponded: true,
    responseTime: "6s",
    unread: false,
  },
  {
    id: 4,
    name: "Pedro Oliveira",
    avatar: "PO",
    message: "Thanks for the quick response!",
    time: "18m",
    aiResponded: true,
    responseTime: "5s",
    unread: false,
  },
  {
    id: 5,
    name: "Carla Mendes",
    avatar: "CM",
    message: "Can I reschedule my appointment?",
    time: "just now",
    aiResponded: false,
    responseTime: null,
    unread: true,
  },
];

export const InboxScreen = () => {
  return (
    <div className="h-full bg-clustal-dark flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-12 px-4 pb-3 bg-clustal-dark-surface"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-clustal-text">Inbox</h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-clustal-dark-card flex items-center justify-center">
              <Search className="w-4 h-4 text-clustal-text-muted" />
            </div>
            <div className="w-8 h-8 rounded-full bg-clustal-dark-card flex items-center justify-center">
              <MoreVertical className="w-4 h-4 text-clustal-text-muted" />
            </div>
          </div>
        </div>
        
        {/* Stats bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 px-3 py-2 bg-clustal-dark-card rounded-xl"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-ai-badge" />
            <span className="text-xs text-clustal-text">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                47 AI responses today
              </motion.span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-success" />
            <span className="text-xs text-clustal-text">Avg: 6s</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Conversations List */}
      <div className="flex-1 overflow-hidden px-2 py-2">
        {conversations.map((conv, index) => (
          <motion.div
            key={conv.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: 0.4 + index * 0.15,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className={`flex items-center gap-3 p-3 rounded-xl mb-2 ${
              conv.unread ? "bg-clustal-dark-card" : "bg-transparent"
            } hover:bg-clustal-dark-card transition-colors`}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-whatsapp-green to-whatsapp-green-light flex items-center justify-center text-white font-semibold text-sm">
                {conv.avatar}
              </div>
              {conv.unread && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.15, type: "spring" }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-whatsapp-green rounded-full flex items-center justify-center"
                >
                  <span className="text-[10px] text-white font-bold">1</span>
                </motion.div>
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-clustal-text text-sm">{conv.name}</span>
                <span className="text-[10px] text-clustal-text-muted">{conv.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-clustal-text-muted truncate flex-1">{conv.message}</p>
                {conv.aiResponded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-1 px-2 py-0.5 bg-ai-badge/20 rounded-full shrink-0"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-ai-badge" />
                    <span className="text-[9px] text-ai-badge font-medium">{conv.responseTime}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* New message notification */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 bg-whatsapp-green rounded-full shadow-lg"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-white" />
            <span className="text-xs text-white font-medium">New message from Carla</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
