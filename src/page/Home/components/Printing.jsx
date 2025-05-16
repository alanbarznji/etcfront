import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AudioLines, Plug } from "lucide-react";

import logo from "../../../assets/image-removebg-preview.png"
const Printing = () => {
  const [isPowered, setIsPowered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPowered((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Image that Expands from Height 0 */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isPowered ? "auto" : 0, opacity: isPowered ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="overflow-hidden w-60"
      >
        <img src={logo} alt="Generated Image" />
      </motion.div>

      {/* Light AudioLines with Movement */}
      <motion.div
        animate={{
          y: [-20, -40, -20], // Moves up and down
          x: [-20, 20, -20],  // Moves left and right
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center relative mt-2"
      >
        <AudioLines size={62} className="rotate-90 text-black" />
      </motion.div>

      {/* Power Cable */}
      <motion.div
        className="flex items-center mt-4"
        animate={{ x: isPowered ? 20 : -20 }}
        transition={{ duration: 0.5 }}
      >
     
      </motion.div>
    </div>
  );
};

export default Printing;
