import { motion } from "framer-motion";
import { Lightbulb, Plug, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function CableLight() {
  const [isPowered, setIsPowered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPowered((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  ">
      {/* Light Bulb */}
      <motion.div
        animate={{ opacity: isPowered ? 1 : 0.1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center relative"
      >
        <Lightbulb
          className={`w-20 h-20 ${isPowered ? "text-yellow-400 drop-shadow-lg" : "text-gray-400"}`}
        />
        <div className={`w-1 h-20 ${isPowered ? "bg-yellow-500 animate-pulse" : "bg-gray-600"}`}></div> {/* Cable */}
        {isPowered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{ repeat: Infinity, duration: 0.3, repeatType: "reverse" }}
            className="absolute -top-10"
          >
            <Zap className="w-10 h-10 text-yellow-500 animate-ping" />
          </motion.div>
        )}
      </motion.div>
      
      {/* Power Cable */}
      <motion.div
        className="flex items-center mt-4"
        animate={{ x: isPowered ? 20 : -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`w-1 h-20 ${isPowered ? "bg-yellow-500 animate-pulse" : "bg-gray-600"}`}></div> {/* Cable */}
        <Plug 
          className={`w-10 h-10 transition-transform ${isPowered ? "text-green-600 scale-110" : "text-gray-600 rotate-90"}`}
        />
      </motion.div>
    </div>
  );
}
