import React from 'react';
import { ShieldAlert, Cpu, Layers, Hammer, Ruler, CheckCircle2, Award, Zap } from 'lucide-react';

export const CivilEngineeringProwess: React.FC = () => {
  const engineeringPillars = [
    {
      icon: Ruler,
      title: 'Structural Drafting & BIM 3D Modeling',
      code: 'IS 456:2000 & IS 13920',
      description: 'Every layout begins with micrometer-level precision. Multi-disciplinary 3D BIM simulations eliminate structural clashes and optimize load paths before ground breaking.',
    },
    {
      icon: ShieldAlert,
      title: 'Seismic Zone III Earthquake Resilience',
      code: 'IS 1893 (PART 1): 2016',
      description: 'Dual ductile shear-wall RCC frames rigorously analyzed for lateral shear forces, ground accelerations, and resonant harmonics for supreme occupant safety.',
    },
    {
      icon: Layers,
      title: 'Deep Raft & Bored Pile Foundations',
      code: 'IS 2911 (PART 1/SEC 2)',
      description: 'Extensive geotech soil core sampling down to unyielding basalt bedrock. Heavy bored cast-in-situ concrete piles ensure absolute zero settlement risk.',
    },
    {
      icon: Hammer,
      title: 'High-Yield Fe-550D TMT Reinforcement',
      code: 'IS 1786 COMPLIANT',
      description: 'Thermo-mechanically treated steel rebar with exceptional elongation (>16%) providing vital ductile reserves during unexpected seismic events.',
    },
    {
      icon: Cpu,
      title: 'M40/M50 Self-Compacting Concrete',
      code: 'IS 10262 DESIGN MIX',
      description: 'Automated batching plant concrete with crystalline micro-silica additives for maximum compressive strength, minimal voids, and lifelong durability.',
    },
    {
      icon: Zap,
      title: '7-Layer Monolithic Waterproofing',
      code: 'ASTM C836 STANDARDS',
      description: 'Elastomeric polyurethane membrane coats on podiums, sunken slabs, and terraces backed by a certified 10-year anti-seepage guarantee.',
    },
  ];

  return (
    <section id="engineering" className="py-24 bg-[#070b14] text-slate-100 relative overflow-hidden">
      {/* Blueprint background grid lines */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #38bdf8 1px, transparent 1px),
            linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>प्रगत बांधकाम तंत्रज्ञान &bull; ADVANCED CONSTRUCTION TECHNOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Cinzel'] text-white">
            Uncompromising Civil Engineering
          </h2>

          <p className="mt-4 text-slate-400 font-light text-sm sm:text-base leading-relaxed">
            While others build merely for appearances, Adityaraj Builders designs from the subsoil up. Our licensed structural engineers and project directors enforce stringent Bureau of Indian Standards (BIS) specifications at every pour.
          </p>
        </div>

        {/* 6 Engineering Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineeringPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all group backdrop-blur-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-800/80 text-sky-400 group-hover:text-amber-400 group-hover:bg-amber-400/10 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {pillar.code}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-['Cinzel'] text-white group-hover:text-amber-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified & Certified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Callout Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/30 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-amber-400 tracking-wider uppercase font-semibold">
              TRANSPARENCY IN CIVIL INFRASTRUCTURE
            </span>
            <h3 className="text-2xl font-bold font-['Cinzel'] text-white mt-1">
              Want to inspect the structural blueprint & concrete cube test reports?
            </h3>
            <p className="text-sm text-slate-300 mt-2 font-light">
              We provide full structural verification sheets, cube strength crush reports, and soil bore certificates to every homebuyer and investor.
            </p>
          </div>

          <a
            href="#blueprint"
            className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono tracking-wider uppercase transition-all shadow-lg shrink-0 flex items-center gap-2"
          >
            <span>Open Blueprint Studio</span>
          </a>
        </div>

      </div>
    </section>
  );
};
