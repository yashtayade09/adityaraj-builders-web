import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, ArrowRight, Play, Compass, HardHat, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onReplayIntro: () => void;
  onOpenBlueprint: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReplayIntro, onOpenBlueprint }) => {
  const [logoSrc, setLogoSrc] = useState<string>('/assets/aistudio/Glossy_3D_Marathi_Real_Estate_Logo_d7948daa.png');

  return (
    <section className="relative min-h-[92vh] pt-28 pb-20 flex flex-col justify-center overflow-hidden bg-[#070b14] text-slate-100">
      {/* 1. Seamless Blueprint Grid & Decorative Extension of the Intro Guideline */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,rgba(245,158,11,0.06)_45%,transparent_70%)] blur-3xl -z-10" />

        {/* Blueprint Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Continuous Architectural Guideline extending across the Hero section */}
        <div className="absolute top-1/2 inset-x-0 -translate-y-1/2 flex items-center justify-between opacity-30">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
        </div>

        {/* CAD Drafting Ticks & Engineering Calibration Crosshairs */}
        <div className="absolute top-24 left-10 text-[10px] font-mono text-sky-400/50 hidden md:block">
          <span>+ GRID REF: SEC-01</span> &bull; <span>DATUM EL: +14.20M</span>
        </div>
        <div className="absolute bottom-16 right-10 text-[10px] font-mono text-amber-400/50 hidden md:block text-right">
          <span>STRUCTURAL CODE: IS 456-2000</span><br />
          <span>EARTHQUAKE RESISTANT ZONE III COMPLIANT</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">

          {/* Badge: Engineering Certification */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-300 text-xs font-mono tracking-wider mb-6 backdrop-blur-md shadow-lg"
          >
            <HardHat className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">CIVIL ENGINEERING EXCELLENCE</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-amber-300">AKOLA, MAHARASHTRA</span>
          </motion.div>

          {/* Authentic Official Company Logo Featured Prominently */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 relative flex flex-col items-center group cursor-pointer"
            onClick={onReplayIntro}
            title="Click to replay the 3-4 second cinematic drafting intro"
          >
            <div className="relative">
              {/* Backlight halo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <img
                src={logoSrc}
                alt="Adityaraj Builders & Developers - प्रगत बांधकाम तंत्रज्ञान"
                onError={() => setLogoSrc('/adityaraj-logo.png')}
                className="max-w-[420px] sm:max-w-[540px] md:max-w-[620px] w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] relative z-10 transition-transform group-hover:scale-[1.02]"
              />
            </div>
            
            <span className="mt-2 text-[11px] font-mono text-slate-400/80 flex items-center gap-1 group-hover:text-amber-400 transition-colors">
              <Play className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
              <span>Click logo or button to Replay Cinematic Intro</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl font-['Cinzel'] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 leading-[1.15]"
          >
            Where Civil Engineering Meets Modern Architectural Grandeur
          </motion.h1>

          {/* Tagline / Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed"
          >
            Pioneering <span className="text-amber-400 font-semibold">प्रगत बांधकाम तंत्रज्ञान</span> (Advanced Construction Technology) in Akola & Maharashtra. High-strength RCC framed structures, seismic resilience, and landmark residential & commercial spaces built to last generations.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all hover:scale-105"
            >
              <span>Explore Landmark Towers</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenBlueprint}
              className="px-6 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-sky-500/40 hover:border-sky-400 text-sky-300 font-medium text-sm flex items-center gap-2 backdrop-blur-md shadow-lg transition-all hover:scale-105 group"
            >
              <Compass className="w-4 h-4 text-sky-400 group-hover:rotate-45 transition-transform" />
              <span>Interactive Blueprint Studio</span>
            </button>

            <button
              onClick={onReplayIntro}
              className="px-5 py-3.5 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-700/80 text-amber-300 font-mono text-xs flex items-center gap-2 transition-all hover:border-amber-400/50"
              title="Experience the full 3.8s intro drafting animation again"
            >
              <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Replay Intro</span>
            </button>
          </motion.div>

          {/* Structural & Heritage Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-left relative overflow-hidden group hover:border-amber-500/40 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-full pointer-events-none" />
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-['Rajdhani']">50+</div>
              <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mt-1">Years Heritage</div>
              <div className="text-[11px] text-slate-500 mt-2">Pioneering civil infrastructure since 1970s</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-left relative overflow-hidden group hover:border-sky-500/40 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/5 rounded-bl-full pointer-events-none" />
              <div className="text-3xl sm:text-4xl font-extrabold text-sky-400 font-['Rajdhani']">100%</div>
              <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mt-1">RCC IS-456 Code</div>
              <div className="text-[11px] text-slate-500 mt-2">Earthquake-resistant Zone III engineered</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-left relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-['Rajdhani']">25+</div>
              <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mt-1">Landmark Projects</div>
              <div className="text-[11px] text-slate-500 mt-2">Residential towers & commercial plazas</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-left relative overflow-hidden group hover:border-rose-500/40 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/5 rounded-bl-full pointer-events-none" />
              <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-['Rajdhani']">12,000+</div>
              <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mt-1">Happy Residents</div>
              <div className="text-[11px] text-slate-500 mt-2">Uncompromising quality & on-time delivery</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
