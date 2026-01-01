import React, { useState, useEffect } from 'react';
import { User, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { MAZE_GRID } from '../constants';
import { Position } from '../types';

interface Props {
  onComplete: () => void;
}

export const StageMaze: React.FC<Props> = ({ onComplete }) => {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 1, y: 0 }); 
  
  const handleMove = (dx: number, dy: number) => {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (newY < 0 || newY >= MAZE_GRID.length || newX < 0 || newX >= MAZE_GRID[0].length) {
        return;
    }

    if (MAZE_GRID[newY][newX] === 1) {
        return;
    }

    setPlayerPos({ x: newX, y: newY });

    if (newY === 8 && newX === 9) {
        onComplete();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        switch(e.key) {
            case 'ArrowUp': handleMove(0, -1); break;
            case 'ArrowDown': handleMove(0, 1); break;
            case 'ArrowLeft': handleMove(-1, 0); break;
            case 'ArrowRight': handleMove(1, 0); break;
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20"
      >
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-pink-300 mb-2 font-handwriting flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6" /> Come and meet me <Sparkles className="w-6 h-6" />
            </h2>
            <p className="text-pink-100/80 text-sm">Navigate to the heart ❤️</p>
        </div>

        <div className="grid grid-cols-10 gap-1 bg-black/20 p-3 rounded-xl border border-white/10 w-fit mx-auto">
            {MAZE_GRID.map((row, rowIndex) => (
                row.map((cell, colIndex) => {
                    const isPlayer = playerPos.x === colIndex && playerPos.y === rowIndex;
                    const isEnd = rowIndex === 8 && colIndex === 9;
                    
                    return (
                        <div 
                            key={`${rowIndex}-${colIndex}`}
                            className={`w-7 h-7 md:w-9 md:h-9 rounded-md flex items-center justify-center transition-colors duration-200
                                ${cell === 1 ? 'bg-indigo-950/80' : 'bg-white/5'}
                                ${isPlayer ? 'bg-pink-500 shadow-[0_0_15px_#ec4899] z-10 scale-110' : ''}
                            `}
                        >
                            {isPlayer && <User className="w-5 h-5 text-white" />}
                            {isEnd && <Heart className="w-5 h-5 text-red-500 animate-pulse fill-red-500" />}
                        </div>
                    );
                })
            ))}
        </div>

        {/* Mobile Controls */}
        <div className="mt-8 grid grid-cols-3 gap-2 w-48 mx-auto md:hidden">
            <div></div>
            <button onClick={() => handleMove(0, -1)} className="bg-white/10 p-4 rounded-xl active:bg-pink-600 transition-colors text-white hover:bg-white/20">↑</button>
            <div></div>
            <button onClick={() => handleMove(-1, 0)} className="bg-white/10 p-4 rounded-xl active:bg-pink-600 transition-colors text-white hover:bg-white/20">←</button>
            <button onClick={() => handleMove(0, 1)} className="bg-white/10 p-4 rounded-xl active:bg-pink-600 transition-colors text-white hover:bg-white/20">↓</button>
            <button onClick={() => handleMove(1, 0)} className="bg-white/10 p-4 rounded-xl active:bg-pink-600 transition-colors text-white hover:bg-white/20">→</button>
        </div>
      </motion.div>
    </div>
  );
};
