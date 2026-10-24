import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, FastForward, Compass, CheckCircle } from 'lucide-react';
import { EngineeringScale } from './EngineeringScale';
import { DraftingPencil } from './DraftingPencil';
import { DraftingCompass } from './DraftingCompass';
import { soundFx } from '../utils/audio';

interface CinematicIntroProps {
  onComplete: () => void;
  isReplay?: boolean;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
  isReplay = false,
}) => {
  // Animation progress state (0 to 100)
  const [progress, setProgress] = useState<number>(0);
  const [phase, setPhase] = useState<'scale_enter' | 'pencil_draw' | 'logo_reveal' | 'compass_draw' | 'transition_portal'>('scale_enter');
  const [pencilXPercent, setPencilXPercent] = useState<number>(10);
  const [compassAngle, setCompassAngle] = useState<number>(0);
  const [compassOpen, setCompassOpen] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getMuted());
  const [logoSrc, setLogoSrc] = useState<string>('/assets/aistudio/Glossy_3D_Marathi_Real_Estate_Logo_d7948daa.png');
  const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const startTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive scale dimensions
  const scaleWidth = Math.min(viewportWidth * 0.88, 920);
  const isMobile = viewportWidth < 640;
  const compassRadius = isMobile ? 130 : 210;

  // Reduced motion check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced && !isReplay) {
        onComplete();
        return;
      }
    }
  }, [onComplete, isReplay]);

  // Main 3.8-second cinematic timeline
  useEffect(() => {
    const totalDuration = 7400; // 7.4 seconds: the compass now has ~3.5s on screen (opens, plants its needle, then draws the circle)
    startTimeRef.current = performance.now();

    // Trigger scale sound
    soundFx.playScaleSlide();

    let pencilSoundTriggered = false;
    let logoSoundTriggered = false;
    let compassSoundTriggered = false;

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(1, elapsed / totalDuration);
      setProgress(Math.round(t * 100));

      // Phase breakdown (total 5.6s):
      // 0.00 - 0.09 : Scale enters
      // 0.09 - 0.30 : Pencil draws guideline along scale edge
      // 0.30 - 0.48 : Logo reveals on the line
      // 0.48 - 0.88 : Compass enters and traces the 360° circle (~2.2s)
      // 0.88 - 1.00 : Circle portal expands into landing page

      if (t < 0.07) {
        setPhase('scale_enter');
      } else if (t >= 0.07 && t < 0.24) {
        setPhase('pencil_draw');
        if (!pencilSoundTriggered) {
          pencilSoundTriggered = true;
          soundFx.playPencilDrawing(1180);
        }
        // Pencil progresses from 12% to 88% across width
        const pencilProgress = (t - 0.07) / 0.17;
        setPencilXPercent(12 + pencilProgress * 76);
      } else if (t >= 0.24 && t < 0.40) {
        setPhase('logo_reveal');
        setPencilXPercent(88);
        if (!logoSoundTriggered) {
          logoSoundTriggered = true;
          soundFx.playRevealChord();
        }
      } else if (t >= 0.40 && t < 0.90) {
        setPhase('compass_draw');
        if (!compassSoundTriggered) {
          compassSoundTriggered = true;
          soundFx.playCompassDraw(3000);
        }
        // First 18% of this phase: the compass legs OPEN and plant the needle.
        // Remaining 82%: the compass swings 360 degrees and draws the circle.
        const cp = (t - 0.40) / 0.50;
        const OPEN = 0.18;
        if (cp < OPEN) {
          const k = cp / OPEN;
          setCompassOpen(1 - Math.pow(1 - k, 3)); // ease-out
          setCompassAngle(0);
        } else {
          setCompassOpen(1);
          setCompassAngle(((cp - OPEN) / (1 - OPEN)) * 360);
        }
      } else {
        setPhase('transition_portal');
        setCompassOpen(1);
        setCompassAngle(360);
      }

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Completed intro animation
        setTimeout(() => {
          onComplete();
        }, 150);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [onComplete]);

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleSkip = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#070b12] text-slate-100 flex flex-col items-center justify-center select-none font-sans">
      {/* 1. Architectural Drafting Table Canvas & Blueprint Grid Texture */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle dark charcoal / navy gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,#0f172a_0%,#070b14_70%,#030712_100%)]" />

        {/* Engineering Blueprint Fine Grid (10px & 50px major lines) */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.25) 1px, transparent 1px),
              linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 50px 50px, 10px 10px, 10px 10px',
          }}
        />

        {/* Ambient Overhead Drafting Desk Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.12)_0%,rgba(15,23,42,0)_65%)]" />

        {/* Technical Blueprint Corner Stamps & Coordinate Calibration */}
        <div className="absolute top-6 left-8 text-[11px] font-mono tracking-widest text-sky-400/60 uppercase flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="font-semibold text-sky-300">CIVIL DRAFTING STATION // ADITYARAJ BUILDERS</span>
          </div>
          <span className="text-slate-400">SCALE: 1:100 &bull; IS 456-2000 STRUCTURAL CODE &bull; REV 4.2</span>
          <span className="text-slate-500">PROJECT: RESIDENTIAL & COMMERCIAL TOWERS &bull; AKOLA</span>
        </div>

        <div className="absolute top-6 right-8 text-[11px] font-mono tracking-widest text-right text-slate-400/80 flex flex-col gap-0.5">
          <span className="text-sky-400/80 font-semibold">CAD GRID CALIBRATION: ACTIVE</span>
          <span>X: {(pencilXPercent * 12.4).toFixed(2)} mm &bull; Y: 320.00 mm</span>
          <span className="text-amber-400/70">ARCHITECTURAL BLUEPRINT SEQUENCE</span>
        </div>

        {/* Bottom Drawing Specifications */}
        <div className="absolute bottom-6 left-8 text-[10px] font-mono text-slate-500/80 tracking-wider flex items-center gap-4">
          <span>TOLERANCE: &plusmn;0.05mm</span>
          <span>&bull;</span>
          <span>RCC DRAFTING SPEC</span>
          <span>&bull;</span>
          <span>HIGH-STRENGTH TMT FE-550D</span>
        </div>
      </div>

      {/* 2. Top-Right Audio & Skip Controls */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white hover:border-sky-500/50 transition-all backdrop-blur-md shadow-lg"
          title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-slate-400">Audio Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400">Drafting Audio</span>
            </>
          )}
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white hover:border-amber-500/50 transition-all backdrop-blur-md shadow-lg group"
        >
          <FastForward className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          <span>Skip Intro</span>
        </button>
      </div>

      {/* 3. Central Drafting Workspace */}
      <div className="relative w-full max-w-5xl h-[480px] flex items-center justify-center">

        {/* ARCHITECTURAL GUIDELINE (Drawn by the pencil along the scale edge) */}
        <div className="absolute w-full top-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center">
          <svg
            viewBox="0 0 1000 60"
            className="w-full h-14 overflow-visible"
            fill="none"
          >
            {/* Extended faint architectural construction line */}
            <line
              x1="40"
              y1="30"
              x2="960"
              y2="30"
              stroke="#38bdf8"
              strokeWidth="0.5"
              strokeDasharray="4 8"
              strokeOpacity="0.25"
            />

            {/* Solid Graphite Drawn Line (Etched by the pencil) */}
            <motion.line
              x1="120"
              y1="30"
              x2={120 + ((pencilXPercent - 12) / 76) * 760}
              y2="30"
              stroke="#e2e8f0"
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="drop-shadow(0 0 4px rgba(56, 189, 248, 0.75))"
            />

            {/* Graphite texture overlay on the line */}
            <motion.line
              x1="120"
              y1="30"
              x2={120 + ((pencilXPercent - 12) / 76) * 760}
              y2="30"
              stroke="#38bdf8"
              strokeWidth="1"
              strokeDasharray="1 1"
              strokeOpacity="0.8"
            />

            {/* Precision Datum Marks at start and end of guideline */}
            <g opacity={pencilXPercent > 14 ? 1 : 0}>
              <circle cx="120" cy="30" r="3" fill="#38bdf8" />
              <line x1="120" y1="20" x2="120" y2="40" stroke="#38bdf8" strokeWidth="1" />
              <text x="110" y="48" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="end">0.00</text>
            </g>

            {pencilXPercent >= 88 && (
              <g>
                <circle cx="880" cy="30" r="3" fill="#38bdf8" />
                <line x1="880" y1="20" x2="880" y2="40" stroke="#38bdf8" strokeWidth="1" />
                <text x="890" y="48" fill="#38bdf8" fontSize="9" fontFamily="monospace">760.00 mm</text>
              </g>
            )}
          </svg>
        </div>

        {/* COMPASS DRAWING ARC & CIRCULAR GUIDELINE */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-15 flex items-center justify-center">
          <svg
            width={compassRadius * 2 + 100}
            height={compassRadius * 2 + 100}
            viewBox={`-${compassRadius + 50} -${compassRadius + 50} ${(compassRadius + 50) * 2} ${(compassRadius + 50) * 2}`}
            className="overflow-visible"
            fill="none"
          >
            {/* Center Anchor Point Crosshairs */}
            <g opacity={phase === 'compass_draw' || phase === 'transition_portal' ? 0.7 : 0}>
              <circle cx="0" cy="0" r="3" fill="#38bdf8" />
              <line x1="-15" y1="0" x2="15" y2="0" stroke="#38bdf8" strokeWidth="0.75" />
              <line x1="0" y1="-15" x2="0" y2="15" stroke="#38bdf8" strokeWidth="0.75" />
            </g>

            {/* Faint construction concentric guide circles */}
            <circle
              cx="0"
              cy="0"
              r={compassRadius}
              stroke="#38bdf8"
              strokeWidth="0.6"
              strokeDasharray="3 6"
              strokeOpacity={phase === 'compass_draw' || phase === 'transition_portal' ? 0.25 : 0}
            />

            {/* The Precision Circle Drawn by the Compass */}
            {compassAngle > 0 && (
              <>
                {/* Drawn circular path with exact dashoffset based on compassAngle */}
                <circle
                  cx="0"
                  cy="0"
                  r={compassRadius}
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  strokeDasharray={2 * Math.PI * compassRadius}
                  strokeDashoffset={(2 * Math.PI * compassRadius) * (1 - compassAngle / 360)}
                  strokeLinecap="round"
                  filter="drop-shadow(0 0 8px rgba(251, 191, 36, 0.7))"
                />

                {/* Second inner architectural fine circle */}
                <circle
                  cx="0"
                  cy="0"
                  r={compassRadius - 6}
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeDasharray={2 * Math.PI * (compassRadius - 6)}
                  strokeDashoffset={(2 * Math.PI * (compassRadius - 6)) * (1 - compassAngle / 360)}
                  strokeOpacity="0.8"
                />

                {/* Degree markings at 0, 90, 180, 270 deg */}
                {compassAngle >= 90 && (
                  <g transform={`rotate(90) translate(${compassRadius}, 0)`}>
                    <line x1="-4" y1="0" x2="4" y2="0" stroke="#fbbf24" strokeWidth="1.5" />
                    <text x="8" y="3" fill="#fbbf24" fontSize="8" fontFamily="monospace" transform="rotate(-90 8 3)">90&deg;</text>
                  </g>
                )}
                {compassAngle >= 180 && (
                  <g transform={`rotate(180) translate(${compassRadius}, 0)`}>
                    <line x1="-4" y1="0" x2="4" y2="0" stroke="#fbbf24" strokeWidth="1.5" />
                    <text x="8" y="3" fill="#fbbf24" fontSize="8" fontFamily="monospace" transform="rotate(-180 8 3)">180&deg;</text>
                  </g>
                )}
                {compassAngle >= 270 && (
                  <g transform={`rotate(270) translate(${compassRadius}, 0)`}>
                    <line x1="-4" y1="0" x2="4" y2="0" stroke="#fbbf24" strokeWidth="1.5" />
                    <text x="8" y="3" fill="#fbbf24" fontSize="8" fontFamily="monospace" transform="rotate(-270 8 3)">270&deg;</text>
                  </g>
                )}
                {compassAngle >= 355 && (
                  <g transform={`translate(${compassRadius}, 0)`}>
                    <line x1="-4" y1="0" x2="4" y2="0" stroke="#fbbf24" strokeWidth="1.5" />
                    <text x="8" y="3" fill="#fbbf24" fontSize="8" fontFamily="monospace">360&deg; [LOCKED]</text>
                  </g>
                )}
              </>
            )}

            {/* Radius Dimension Annotation */}
            {compassAngle > 45 && (
              <g opacity={phase === 'compass_draw' ? 0.75 : 0.2}>
                <line
                  x1="0"
                  y1="0"
                  x2={compassRadius * 0.707}
                  y2={-compassRadius * 0.707}
                  stroke="#38bdf8"
                  strokeWidth="0.75"
                  strokeDasharray="2 2"
                />
                <text
                  x={compassRadius * 0.35}
                  y={-compassRadius * 0.38}
                  fill="#38bdf8"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  R = {compassRadius} mm
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* 4. THE COMPANY LOGO - EXACT ORIGINAL PRESERVED */}
        {/* Placed precisely on the architectural guideline */}
        <div className="relative z-20 flex flex-col items-center justify-center p-4">
          <AnimatePresence>
            {(phase === 'logo_reveal' || phase === 'compass_draw' || phase === 'transition_portal') && (
              <motion.div
                key="adityaraj-logo-intro"
                initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px) brightness(1.6)' }}
                animate={{
                  // logo is dimmed while the compass draws so the compass is clearly visible
                  opacity: phase === 'compass_draw' ? 0.42 : 1,
                  scale: phase === 'transition_portal' ? 1.05 : 1,
                  filter: 'blur(0px) brightness(1.0)',
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center justify-center"
              >
                {/* Architectural Hologram Scanline Effect on Reveal */}
                <motion.div
                  initial={{ top: '-10%', opacity: 1 }}
                  animate={{ top: '110%', opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent pointer-events-none z-30 shadow-[0_0_12px_#38bdf8]"
                />

                {/* Soft Blueprint Backlight Glow behind the logo */}
                <div className="absolute inset-0 -m-8 bg-gradient-to-r from-amber-500/15 via-sky-500/15 to-emerald-500/15 rounded-full blur-3xl -z-10" />

                {/* Exact, Unaltered Original Company Logo Provided by User */}
                <div className="relative flex items-center justify-center">
                  <img
                    src={logoSrc}
                    alt="Adityaraj Builders & Developers - प्रगत बांधकाम तंत्रज्ञान"
                    onError={() => setLogoSrc('/adityaraj-logo.png')}
                    className="max-w-[420px] sm:max-w-[480px] md:max-w-[560px] w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] filter contrast-[1.05]"
                    style={{
                      maxHeight: isMobile ? '160px' : '230px',
                    }}
                  />
                </div>

                {/* Subtitle / Verification Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="mt-3 flex items-center gap-2 text-[11px] font-mono tracking-wider text-slate-300/80 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700/60 backdrop-blur-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CIVIL ENGINEERING EXCELLENCE &bull; STRUCTURAL PRECISION</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. ENGINEER'S SCALE (RULER) ANIMATION */}
        {/* Appears horizontally aligned just above the drawn guideline */}
        <AnimatePresence>
          {(phase === 'scale_enter' || phase === 'pencil_draw' || phase === 'logo_reveal') && (
            <motion.div
              key="engineering-scale"
              initial={{ y: -90, opacity: 0, rotate: -2 }}
              animate={{
                y: phase === 'logo_reveal' ? -130 : -44, // Eases slightly upward to reveal logo clearly
                opacity: phase === 'logo_reveal' ? 0.35 : 1,
                rotate: 0,
              }}
              exit={{ y: -160, opacity: 0, transition: { duration: 0.4 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-25 pointer-events-none top-1/2 -translate-y-1/2 flex justify-center"
              style={{ width: '100%' }}
            >
              <EngineeringScale
                width={scaleWidth}
                highlightProgress={(pencilXPercent - 12) / 76}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. DRAFTING PENCIL ANIMATION */}
        {/* Moves along the scale's beveled edge and draws the line */}
        <AnimatePresence>
          {phase === 'pencil_draw' && (
            <motion.div
              key="drafting-pencil"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute z-40 pointer-events-none top-1/2"
              style={{
                left: `${pencilXPercent}%`,
                // Position lead point (x=30, y=296) right at (0, 0) relative to drawn line
                transform: 'translate(-21px, -240px) rotate(24deg)',
              }}
            >
              <DraftingPencil isDrawing={true} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7. GEOMETRY COMPASS ANIMATION */}
        {/* Anchored at center, rotating 360 degrees to draw circle */}
        <AnimatePresence>
          {phase === 'compass_draw' && (
            <motion.div
              key="drafting-compass"
              initial={{ y: -80, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -120, opacity: 0, scale: 0.85, transition: { duration: 0.3 } }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute z-40 pointer-events-none top-1/2 left-1/2"
            >
              <DraftingCompass
                radius={compassRadius}
                rotationAngle={compassAngle}
                openAmount={compassOpen}
                isDrawing={true}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 8. EXPANDING TRANSITION PORTAL TRIGGER (Phase 4) */}
        {phase === 'transition_portal' && (
          <motion.div
            initial={{ scale: 1, opacity: 0.9 }}
            animate={{ scale: 12, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-45 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-amber-400 shadow-[0_0_80px_#fbbf24]"
            style={{
              width: compassRadius * 2,
              height: compassRadius * 2,
            }}
          />
        )}
      </div>

      {/* 9. Bottom Progress Bar & Stage Indicator */}
      <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center gap-2 pointer-events-none z-30 px-6">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className={phase === 'scale_enter' ? 'text-sky-400 font-bold' : 'text-slate-500'}>
            01. SCALE ALIGN
          </span>
          <span>&rarr;</span>
          <span className={phase === 'pencil_draw' ? 'text-sky-400 font-bold' : 'text-slate-500'}>
            02. PENCIL GUIDELINE
          </span>
          <span>&rarr;</span>
          <span className={phase === 'logo_reveal' ? 'text-amber-400 font-bold' : 'text-slate-500'}>
            03. LOGO REVEAL
          </span>
          <span>&rarr;</span>
          <span className={phase === 'compass_draw' ? 'text-amber-400 font-bold' : 'text-slate-500'}>
            04. COMPASS DRAFT
          </span>
          <span>&rarr;</span>
          <span className={phase === 'transition_portal' ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
            05. TRANSITION
          </span>
        </div>

        {/* Slim architectural progress line */}
        <div className="w-64 max-w-full h-1 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 via-amber-400 to-emerald-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
