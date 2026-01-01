import React from 'react';
import { Heart, Flower, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROPOSAL_TEXT } from '../constants';

interface Props {
  onSigned: () => void;
}

export const StageProposal: React.FC<Props> = ({ onSigned }) => {
  return (
    <div className="fixed inset-0 bg-pink-50 overflow-y-auto overflow-x-hidden">
      {/* Background Floating Elements - Fixed so they stay on screen while scrolling */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
            <motion.div
            key={i}
            className="absolute text-pink-300/40"
            initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                scale: 0,
                rotate: 0
            }}
            animate={{
                y: [null, Math.random() * -100],
                rotate: [0, 360],
                scale: [0, 1 + Math.random(), 0],
            }}
            transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5
            }}
            >
            {i % 2 === 0 ? <Heart size={24 + Math.random() * 24} fill="currentColor" /> : <Flower size={24 + Math.random() * 24} />}
            </motion.div>
        ))}
      </div>

      <div className="min-h-full flex flex-col items-center justify-center py-12 px-4 relative z-10">
        <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-full max-w-2xl bg-white/90 backdrop-blur-sm text-slate-800 p-8 md:p-12 rounded-3xl shadow-[0_20px_60px_rgba(236,72,153,0.3)] relative border-4 border-pink-200"
        >
            <div className="flex justify-center mb-8">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                    transition={{ delay: 0.6 }}
                    className="bg-red-100 p-5 rounded-full shadow-inner"
                >
                    <Heart className="w-16 h-16 text-red-500 fill-red-500 animate-pulse" />
                </motion.div>
            </div>
            
            <h2 className="text-4xl font-handwriting text-center text-pink-600 mb-8 font-bold drop-shadow-sm">Oops! You touched my heart...</h2>
            
            <div className="font-handwriting text-2xl md:text-3xl leading-loose text-gray-700 mb-12 whitespace-pre-line text-center">
                {PROPOSAL_TEXT}
            </div>

            <div className="flex justify-center">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ 
                        scale: { repeat: Infinity, duration: 2 } 
                    }}
                    onClick={onSigned}
                    className="group relative px-10 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xl font-bold rounded-full shadow-xl hover:shadow-pink-500/50 transition-all flex items-center gap-3 border-4 border-white ring-4 ring-pink-200 overflow-hidden cursor-pointer"
                >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <Check className="w-6 h-6 relative z-10" strokeWidth={3} />
                    <span className="relative z-10">Accept Proposal ❤️</span>
                </motion.button>
            </div>
        </motion.div>
      </div>
    </div>
  );
};
