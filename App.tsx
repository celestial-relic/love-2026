import React, { useState, useEffect } from 'react';
import { AppStage } from './types';
import { StageLogin } from './components/StageLogin';
import { StageCelebration } from './components/StageCelebration';
import { StageGiftSelection } from './components/StageGiftSelection';
import { StageLandmine } from './components/StageLandmine';
import { StageProposal } from './components/StageProposal';
import { StageMaze } from './components/StageMaze';
import { StageFinale } from './components/StageFinale';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.LOGIN);

  // Sound effects logic could go here, but browsers block autoplay without interaction.
  // The interaction in Login stage allows us to potentially start audio later if needed.

  const handleOfficialCouple = () => {
    // Show toast then move to Maze
    setStage(AppStage.OFFICIAL_COUPLE);
    setTimeout(() => {
        setStage(AppStage.MAZE);
    }, 3000);
  };

  return (
    <AnimatePresence mode="wait">
        {stage === AppStage.LOGIN && (
            <motion.div key="login" exit={{ opacity: 0 }}>
                <StageLogin onComplete={() => setStage(AppStage.CELEBRATION)} />
            </motion.div>
        )}

        {stage === AppStage.CELEBRATION && (
            <motion.div key="celebration" exit={{ opacity: 0 }}>
                <StageCelebration onComplete={() => setStage(AppStage.GIFT_SELECTION)} />
            </motion.div>
        )}

        {stage === AppStage.GIFT_SELECTION && (
            <motion.div key="gifts" exit={{ opacity: 0 }}>
                <StageGiftSelection 
                    onSuccess={() => setStage(AppStage.PROPOSAL)}
                    onFail={() => setStage(AppStage.LANDMINE)}
                />
            </motion.div>
        )}

        {stage === AppStage.LANDMINE && (
             <motion.div key="landmine" exit={{ opacity: 0 }}>
                <StageLandmine onRetry={() => setStage(AppStage.GIFT_SELECTION)} />
            </motion.div>
        )}

        {stage === AppStage.PROPOSAL && (
            <motion.div key="proposal" exit={{ opacity: 0 }}>
                <StageProposal onSigned={handleOfficialCouple} />
            </motion.div>
        )}

        {stage === AppStage.OFFICIAL_COUPLE && (
            <motion.div 
                key="official" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4"
            >
                <div className="text-center">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-6xl mb-4"
                    >
                        💑
                    </motion.div>
                    <h1 className="text-4xl font-bold text-white mb-2">It's Official!</h1>
                    <p className="text-xl text-pink-300">We are now a couple...</p>
                    <p className="text-sm text-gray-400 mt-4">(Loading next challenge...)</p>
                </div>
            </motion.div>
        )}

        {stage === AppStage.MAZE && (
            <motion.div key="maze" exit={{ opacity: 0 }}>
                <StageMaze onComplete={() => setStage(AppStage.FINALE)} />
            </motion.div>
        )}

        {stage === AppStage.FINALE && (
            <motion.div key="finale" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <StageFinale />
            </motion.div>
        )}
    </AnimatePresence>
  );
};

export default App;
