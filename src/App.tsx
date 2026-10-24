import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CinematicIntro } from './components/CinematicIntro';
import { OriginalWebsite } from './components/OriginalWebsite';
import './utils/adityaraj-client';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isReplay, setIsReplay] = useState<boolean>(false);

  useEffect(() => {
    // Check if intro has already been played in this browser session
    if (typeof window !== 'undefined') {
      const alreadyPlayed = sessionStorage.getItem('adityaraj_intro_played');
      if (alreadyPlayed === 'true') {
        setShowIntro(false);
      }
    }
  }, []);

  const handleIntroComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('adityaraj_intro_played', 'true');
    }
    setShowIntro(false);
    setIsReplay(false);
  };

  const handleReplayIntro = () => {
    setIsReplay(true);
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b111d] text-[#f3efe6] font-sans antialiased overflow-x-hidden">
      {/* 1. Cinematic Civil Engineering Intro Animation Overlay */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="cinematic-intro-wrapper"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.04,
              filter: 'blur(6px)',
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <CinematicIntro
              onComplete={handleIntroComplete}
              isReplay={isReplay}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. User's Exact Website with Live Backend Integration */}
      <motion.div
        initial={showIntro ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <OriginalWebsite onReplayIntro={handleReplayIntro} />
      </motion.div>
    </div>
  );
}
