import React from 'react';
import { motion } from 'framer-motion';

export const StageFinale: React.FC = () => {
  return (
    <div className="min-h-screen bg-pink-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background Hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div
            key={i}
            className="absolute text-pink-700/30 text-6xl"
            initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0 
            }}
            animate={{ 
                y: [null, Math.random() * -100],
                scale: [0, 1, 0],
            }}
            transition={{ 
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "reverse"
            }}
        >
            ♥
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.5 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-9xl mb-8 filter drop-shadow-2xl"
      >
        👩‍❤️‍💋‍👨
      </motion.div>

      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-5xl md:text-7xl font-handwriting text-white text-center font-bold drop-shadow-lg"
      >
        I love you darling...
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8 text-pink-200 text-lg"
      >
        Forever & Always
      </motion.p>
    </div>
  );
};
