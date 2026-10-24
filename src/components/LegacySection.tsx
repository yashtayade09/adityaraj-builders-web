import React, { useState } from 'react';
import { Award, Shield, CheckCircle2, History, Users, Building, Play } from 'lucide-react';

interface LegacySectionProps {
  onReplayIntro: () => void;
}

export const LegacySection: React.FC<LegacySectionProps> = ({ onReplayIntro }) => {
  const [logoSrc, setLogoSrc] = useState<string>('/assets/aistudio/Glossy_3D_Marathi_Real_Estate_Logo_d7948daa.png');

  return (
    <section id="legacy" className="py-24 bg-[#0a0f1d] text-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Legacy Story */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
              <History className="w-3.5 h-3.5" />
              <span>OVER 5 DECADES OF ENGINEERING HERITAGE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-['Cinzel'] text-white leading-tight">
              A Legacy Built on Concrete Principles
            </h2>

            <p className="mt-6 text-slate-300 font-light text-base leading-relaxed">
              Established with an unbending civil engineering ethos, <strong className="text-white font-semibold">Adityaraj Builders & Developers</strong> has transformed urban skylines from pioneering government infrastructure projects to luxury residential towers and commercial landmarks.
            </p>

            <p className="mt-4 text-slate-400 font-light text-sm leading-relaxed">
              Our Marathi motto, <span className="text-amber-400 font-semibold">प्रगत बांधकाम तंत्रज्ञान</span> (Advanced Construction Technology), is more than a slogan—it represents our daily practice on every jobsite in Akola, Mumbai, and across Maharashtra.
            </p>

            <div className="mt-8 space-y-3">
              {[
                'Zero compromise on steel grades (strictly primary Fe-550D TMT rebars)',
                'In-house certified civil engineers & quality control testing labs',
                '100% Clear title documentation, bank approvals & MahaRERA compliance',
                'Transparent architectural drawings & column load calculations shared with all clients',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            {/* Replay Intro CTA */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-4">
              <button
                onClick={onReplayIntro}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-mono flex items-center gap-2 transition-all shadow-md group"
              >
                <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Re-watch Intro Drafting Animation</span>
              </button>
              <span className="text-xs font-mono text-slate-500">3.8s Cinematic Experience</span>
            </div>
          </div>

          {/* Right Column: Authentic Emblem & Credential Showcase */}
          <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl relative flex flex-col items-center text-center">
            
            <div className="relative mb-6">
              <div className="absolute -inset-6 bg-amber-500/10 rounded-full blur-2xl" />
              <img
                src={logoSrc}
                alt="Adityaraj Builders & Developers Logo"
                onError={() => setLogoSrc('/adityaraj-logo.png')}
                className="max-w-[340px] w-full h-auto object-contain relative z-10 drop-shadow-2xl"
              />
            </div>

            <h3 className="text-xl font-bold font-['Cinzel'] text-white">
              Adityaraj Builders & Developers
            </h3>
            <span className="text-xs font-mono text-amber-400 mt-1">
              अकोला &bull; प्रगत बांधकाम तंत्रज्ञान
            </span>

            <div className="w-full grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800 text-left">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">HEADQUARTERS</span>
                <span className="text-xs text-slate-200 font-medium">Akola, Maharashtra</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">REGISTRATION</span>
                <span className="text-xs text-slate-200 font-medium">MahaRERA Certified</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">STRUCTURAL AUDIT</span>
                <span className="text-xs text-emerald-400 font-medium">100% BIS Pass Rate</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">WARRANTY</span>
                <span className="text-xs text-amber-400 font-medium">10-Yr Structural Assurance</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
