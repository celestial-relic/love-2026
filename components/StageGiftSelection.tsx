import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onSuccess: () => void;
  onFail: () => void;
}

export const StageGiftSelection: React.FC<Props> = ({ onSuccess, onFail }) => {
  const [selected, setSelected] = useState<number | null>(null);

  // Randomize the winning box index (0, 1, or 2)
  const [winningIndex] = useState(() => Math.floor(Math.random() * 3));

  const handleSelect = (index: number) => {
    if (selected !== null) return; // Prevent multiple clicks
    setSelected(index);
    
    setTimeout(() => {
        if (index === winningIndex) {
            onSuccess();
        } else {
            onFail();
        }
    }, 1000); // Dramatic pause
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-4">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
      >
        Choose Your New Year Gift 🎁
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {[0, 1, 2].map((index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(index)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`group relative w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br ${
                selected === index ? 'from-yellow-400 to-orange-500' : 'from-pink-500 to-rose-600'
            } rounded-2xl shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300`}
          >
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Gift className={`w-20 h-20 md:w-32 md:h-32 text-white ${selected === index ? 'animate-bounce' : ''}`} />
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                ?
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
