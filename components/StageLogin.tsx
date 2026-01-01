import React, { useState } from 'react';
import { Heart, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export const StageLogin: React.FC<Props> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-pink-500 p-3 rounded-full">
            <Heart className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Welcome Back</h2>
        <p className="text-center text-purple-200 mb-8">Please login to access your surprise</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-3 text-purple-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/20 border border-purple-300/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-purple-300 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/20 border border-purple-300/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-pink-500/30 transition-all"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
