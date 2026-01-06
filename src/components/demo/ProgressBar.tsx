import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  duration: number;
}

export const ProgressBar = ({ current, total, duration }: ProgressBarProps) => {
  return (
    <div className="flex gap-2 px-4 py-3">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"
        >
          {index < current && (
            <div className="h-full bg-white rounded-full w-full" />
          )}
          {index === current && (
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
