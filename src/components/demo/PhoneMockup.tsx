import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PhoneMockupProps {
  children: ReactNode;
}

export const PhoneMockup = ({ children }: PhoneMockupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto"
    >
      {/* Phone Frame */}
      <div className="relative w-[320px] h-[660px] bg-black rounded-[3rem] p-3 shadow-2xl shadow-black/50">
        {/* Inner bezel */}
        <div className="absolute inset-2 bg-clustal-dark-surface rounded-[2.5rem] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-50" />
          
          {/* Screen Content */}
          <div className="w-full h-full overflow-hidden rounded-[2.3rem]">
            {children}
          </div>
        </div>
        
        {/* Side buttons */}
        <div className="absolute -left-1 top-28 w-1 h-8 bg-zinc-800 rounded-l-lg" />
        <div className="absolute -left-1 top-40 w-1 h-12 bg-zinc-800 rounded-l-lg" />
        <div className="absolute -left-1 top-56 w-1 h-12 bg-zinc-800 rounded-l-lg" />
        <div className="absolute -right-1 top-36 w-1 h-16 bg-zinc-800 rounded-r-lg" />
      </div>
      
      {/* Reflection overlay */}
      <div className="absolute inset-0 w-[320px] h-[660px] rounded-[3rem] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};
