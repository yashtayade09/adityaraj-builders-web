import React, { useState } from 'react';
import { Play, Shield, Compass, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const [logoSrc, setLogoSrc] = useState<string>('/assets/aistudio/Glossy_3D_Marathi_Real_Estate_Logo_d7948daa.png');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#03060c] text-slate-400 border-t border-slate-800/80 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <img
              src={logoSrc}
              alt="Adityaraj Builders & Developers"
              onError={() => setLogoSrc('/adityaraj-logo.png')}
              className="h-12 w-auto object-contain"
            />
            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
              Adityaraj Builders & Developers is Akola&apos;s foremost civil engineering and luxury real estate developer. Pioneers of <span className="text-amber-400">प्रगत बांधकाम तंत्रज्ञान</span> with over 50 years of structural excellence.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onReplayIntro}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-mono hover:bg-slate-800 transition-colors"
                title="Replay cinematic drafting intro animation"
              >
                <Play className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>Replay Intro Animation</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#projects" className="hover:text-amber-400 transition-colors">Landmark Developments</a></li>
              <li><a href="#engineering" className="hover:text-amber-400 transition-colors">Civil Engineering Codes</a></li>
              <li><a href="#blueprint" className="hover:text-amber-400 transition-colors">CAD Blueprint Studio</a></li>
              <li><a href="#legacy" className="hover:text-amber-400 transition-colors">50+ Years Heritage</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Site Visit Booking</a></li>
            </ul>
          </div>

          {/* Civil Engineering Specs */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Engineering Standards
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>IS 456-2000 (RCC Plain & Reinforced)</li>
              <li>IS 1893 (Seismic Design Criteria)</li>
              <li>IS 1786 (Fe-550D TMT Reinforcement)</li>
              <li>IS 10262 (Concrete Mix Proportioning)</li>
              <li>MahaRERA Registered Projects</li>
            </ul>
          </div>

          {/* Legal & Office */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Locations
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Akola Corporate Office:<br />
              <a 
                href="https://maps.app.goo.gl/6yZcjVRgAZQVKKj46?g_st=aw" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-amber-400 hover:underline"
              >
                Civil Lines, Murtizapur Road, Akola 444001, Maharashtra
              </a>
            </p>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              Phone: +91 724 245 8899
            </p>
          </div>

        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Adityaraj Builders & Developers. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-amber-400/80">प्रगत बांधकाम तंत्रज्ञान</span>
            <span>&bull;</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
