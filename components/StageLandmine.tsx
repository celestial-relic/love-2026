import React from 'react';
import { Bomb, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onRetry: () => void;
}

export const StageLandmine: React.FC<Props> = ({ onRetry }) => {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-red-600 flex flex-col items-center justify-center text-center p-4"
    >
        <motion.div
            animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.2, 1]
            }}
            transition={{ duration: 0.5 }}
            className="mb-8"
        >
            <Bomb className="w-32 h-32 text-black" />
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-black text-black mb-4 uppercase tracking-tighter">
            BOOM!
        </h1>
        <p className="text-2xl md:text-3xl text-white font-bold mb-8">
            Ooops! You touched the landmine! <br/>
            The website is destroyed!
        </p>

        <button 
            onClick={onRetry}
            className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-colors shadow-lg"
        >
            <RefreshCcw className="w-5 h-5" />
            Try Again
        </button>
    </motion.div>
  );
};
