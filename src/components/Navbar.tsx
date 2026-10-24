import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Phone, Building2, Compass, Menu, X } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayIntro }) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getMuted());
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [logoSrc, setLogoSrc] = useState<string>('/assets/aistudio/Glossy_3D_Marathi_Real_Estate_Logo_d7948daa.png');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-2'
          : 'bg-transparent py-4 border-b border-slate-800/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Official unaltered asset */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          title="Adityaraj Builders & Developers - प्रगत बांधकाम तंत्रज्ञान"
        >
          <img
            src={logoSrc}
            alt="Adityaraj Builders & Developers"
            onError={() => setLogoSrc('/adityaraj-logo.png')}
            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.03]"
          />
          <div className="hidden lg:flex flex-col border-l border-slate-700/80 pl-3">
            <span className="text-[10px] font-mono tracking-widest text-sky-400 font-bold uppercase">
              CIVIL ENG. &bull; AKOLA
            </span>
            <span className="text-xs text-slate-400 font-medium">
              प्रगत बांधकाम तंत्रज्ञान
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#projects"
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <span>Landmarks</span>
          </a>
          <a
            href="#engineering"
            className="hover:text-amber-400 transition-colors"
          >
            Civil Engineering
          </a>
          <a
            href="#blueprint"
            className="hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Blueprint Studio</span>
          </a>
          <a
            href="#legacy"
            className="hover:text-amber-400 transition-colors"
          >
            Legacy & Quality
          </a>
          <a
            href="#contact"
            className="hover:text-amber-400 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Action Controls: Replay Intro, Sound, Inquire */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Replay Intro Animation Button */}
          <button
            onClick={onReplayIntro}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/80 hover:border-amber-400/60 text-xs font-mono text-amber-300 transition-all shadow-md group"
            title="Replay the 3-4s Cinematic Civil Engineering Intro Animation"
          >
            <Play className="w-3 h-3 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Replay Intro</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-white transition-all"
            title={isMuted ? 'Turn on drafting audio' : 'Mute drafting audio'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          {/* Site Visit Inquiry CTA */}
          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-[0_0_15px_rgba(245,158,11,0.35)]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Book Site Visit</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={onReplayIntro}
            className="p-2 rounded-full bg-slate-800 text-amber-400 border border-slate-700"
            title="Replay Intro"
          >
            <Play className="w-3.5 h-3.5 fill-amber-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0f1d] border-b border-slate-800 px-6 py-5 flex flex-col gap-4 text-sm font-medium">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-amber-400"
          >
            Landmark Developments
          </a>
          <a
            href="#engineering"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-amber-400"
          >
            Civil Engineering Prowess
          </a>
          <a
            href="#blueprint"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-amber-400"
          >
            Interactive Blueprint Studio
          </a>
          <a
            href="#legacy"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-amber-400"
          >
            Legacy & Structural Codes
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-amber-400"
          >
            Contact & Location
          </a>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                toggleAudio();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-mono text-slate-300"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span>{isMuted ? 'Audio Off' : 'Audio On'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-mono"
            >
              Replay Cinematic Intro
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
