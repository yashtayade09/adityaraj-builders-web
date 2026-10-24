import React, { useState } from 'react';
import { Compass, Eye, Maximize2, Layers, Download, Check, Ruler, Info } from 'lucide-react';

export const InteractiveBlueprintViewer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'structural' | 'architectural' | 'mep'>('all');
  const [blueprintStyle, setBlueprintStyle] = useState<'blueprint' | 'dark_cad' | 'monochrome'>('blueprint');
  const [selectedElement, setSelectedElement] = useState<string | null>('C1');
  const [showDimensions, setShowDimensions] = useState<boolean>(true);

  const elementDetails: Record<string, { title: string; spec: string; steel: string; load: string }> = {
    C1: {
      title: 'Corner Column C1 (600mm x 600mm)',
      spec: 'Grade M40 Concrete & 12 nos. 25mm Fe-550D TMT Main Bars',
      steel: 'Ductile ties @ 100mm c/c with 135° seismic hooks (IS 13920)',
      load: 'Design Axial Load: 4,850 kN',
    },
    SW1: {
      title: 'Core Shear Wall SW1 (300mm Thickness)',
      spec: 'Reinforced concrete core resisting 65% of lateral wind & earthquake load',
      steel: 'Dual curtain 16mm rebars @ 150mm spacing',
      load: 'Lateral Shear Capacity: 8,200 kN',
    },
    B1: {
      title: 'Primary Transfer Beam B1 (350mm x 750mm)',
      spec: 'Clear span 6.8m carrying podium slab with zero mid-span deflection',
      steel: '6 nos. 25mm bottom bars + 4 nos. 20mm top bars',
      load: 'Design Moment Capacity: 620 kN-m',
    },
    SLAB: {
      title: 'Two-Way RCC Floor Slab (150mm)',
      spec: 'M30 ready mix concrete with synthetic polypropylene micro-fibers',
      steel: '10mm Tor steel @ 125mm c/c both directions',
      load: 'Superimposed Live Load: 3.0 kN/m²',
    },
  };

  return (
    <section id="blueprint" className="py-24 bg-[#050811] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-2">
              <Compass className="w-4 h-4" />
              <span>INTERACTIVE CAD DRAFTING TABLE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Cinzel'] text-white">
              Architectural & Structural Studio
            </h2>
            <p className="mt-2 text-sm text-slate-400 font-light max-w-xl">
              Inspect real structural drafting layouts, column load paths, and engineering specifications designed for Adityaraj residential towers.
            </p>
          </div>

          {/* Style Mode Switcher */}
          <div className="mt-4 md:mt-0 flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
            <span className="text-slate-400 px-2">Theme:</span>
            <button
              onClick={() => setBlueprintStyle('blueprint')}
              className={`px-3 py-1 rounded-lg transition-all ${
                blueprintStyle === 'blueprint'
                  ? 'bg-sky-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Classic Blueprint
            </button>
            <button
              onClick={() => setBlueprintStyle('dark_cad')}
              className={`px-3 py-1 rounded-lg transition-all ${
                blueprintStyle === 'dark_cad'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Dark CAD
            </button>
            <button
              onClick={() => setBlueprintStyle('monochrome')}
              className={`px-3 py-1 rounded-lg transition-all ${
                blueprintStyle === 'monochrome'
                  ? 'bg-slate-200 text-slate-900 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Paper Drafting
            </button>
          </div>
        </div>

        {/* Blueprint Studio Workbench Container */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Main SVG Blueprint Canvas */}
          <div
            className={`flex-1 p-6 sm:p-10 relative overflow-hidden transition-colors duration-500 min-h-[460px] flex items-center justify-center ${
              blueprintStyle === 'blueprint'
                ? 'bg-[#0f284e]'
                : blueprintStyle === 'dark_cad'
                ? 'bg-[#090d16]'
                : 'bg-[#f1f5f9] text-slate-900'
            }`}
          >
            {/* Grid background texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  blueprintStyle === 'monochrome'
                    ? 'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)'
                    : 'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
                backgroundSize: '25px 25px',
              }}
            />

            {/* Corner Blueprint Stamp */}
            <div
              className={`absolute top-4 left-4 text-[10px] font-mono tracking-widest ${
                blueprintStyle === 'monochrome' ? 'text-slate-600' : 'text-sky-300/70'
              }`}
            >
              <div>ADITYARAJ BUILDERS &bull; STRUCTURAL SHEET S-04</div>
              <div>TYPICAL RESIDENTIAL FLOOR PLATE (IS-456)</div>
            </div>

            {/* Interactive Blueprint SVG Plan */}
            <svg
              viewBox="0 0 800 500"
              className="w-full h-auto max-h-[440px] overflow-visible select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Building Structural Perimeter Wall */}
              <rect
                x="80"
                y="60"
                width="640"
                height="380"
                stroke={blueprintStyle === 'monochrome' ? '#0f172a' : '#38bdf8'}
                strokeWidth="2.5"
                strokeDasharray="none"
              />

              {/* Grid Lines (Columns A, B, C, D / Rows 1, 2, 3) */}
              {showDimensions && (
                <g stroke={blueprintStyle === 'monochrome' ? '#94a3b8' : '#38bdf8'} strokeWidth="0.5" strokeDasharray="4 4" strokeOpacity="0.6">
                  {/* Vertical grids */}
                  <line x1="80" y1="40" x2="80" y2="460" />
                  <line x1="280" y1="40" x2="280" y2="460" />
                  <line x1="500" y1="40" x2="500" y2="460" />
                  <line x1="720" y1="40" x2="720" y2="460" />

                  {/* Horizontal grids */}
                  <line x1="60" y1="60" x2="740" y2="60" />
                  <line x1="60" y1="220" x2="740" y2="220" />
                  <line x1="60" y1="440" x2="740" y2="440" />

                  {/* Grid Labels */}
                  <text x="80" y="32" fill={blueprintStyle === 'monochrome' ? '#0f172a' : '#38bdf8'} fontSize="11" fontFamily="monospace" textAnchor="middle">GRID A</text>
                  <text x="280" y="32" fill={blueprintStyle === 'monochrome' ? '#0f172a' : '#38bdf8'} fontSize="11" fontFamily="monospace" textAnchor="middle">GRID B</text>
                  <text x="500" y="32" fill={blueprintStyle === 'monochrome' ? '#0f172a' : '#38bdf8'} fontSize="11" fontFamily="monospace" textAnchor="middle">GRID C</text>
                  <text x="720" y="32" fill={blueprintStyle === 'monochrome' ? '#0f172a' : '#38bdf8'} fontSize="11" fontFamily="monospace" textAnchor="middle">GRID D</text>

                  <text x="46" y="64" fill={blueprintStyle === 'monochrome' ? '#0f172a' : '#38bdf8'} fontSize="11" fontFamily="monospace">01</text>
                  <text x="46" y="224" fill={blueprintStyle === 'monochrome' ? '#0f172a' : '#38bdf8'} fontSize="11" fontFamily="monospace">02</text>
                  <text x="46" y="444" fill={blueprintStyle === 'monochrome' ? '#0f172a' : '#38bdf8'} fontSize="11" fontFamily="monospace">03</text>
                </g>
              )}

              {/* BEAMS B1-B6 */}
              {(activeLayer === 'all' || activeLayer === 'structural') && (
                <g
                  stroke={blueprintStyle === 'monochrome' ? '#334155' : '#7dd3fc'}
                  strokeWidth="1.5"
                  className="cursor-pointer"
                  onClick={() => setSelectedElement('B1')}
                >
                  <line x1="80" y1="220" x2="720" y2="220" strokeDasharray="6 3" />
                  <line x1="280" y1="60" x2="280" y2="440" strokeDasharray="6 3" />
                  <line x1="500" y1="60" x2="500" y2="440" strokeDasharray="6 3" />
                  <text x="390" y="212" fill={blueprintStyle === 'monochrome' ? '#334155' : '#7dd3fc'} fontSize="9" fontFamily="monospace">
                    BEAM B1 (350x750)
                  </text>
                </g>
              )}

              {/* CENTRAL CORE SHEAR WALL (SW1) */}
              {(activeLayer === 'all' || activeLayer === 'structural') && (
                <g
                  className="cursor-pointer"
                  onClick={() => setSelectedElement('SW1')}
                >
                  <rect
                    x="370"
                    y="180"
                    width="60"
                    height="80"
                    fill={selectedElement === 'SW1' ? '#f59e0b' : blueprintStyle === 'monochrome' ? '#475569' : '#0284c7'}
                    stroke={blueprintStyle === 'monochrome' ? '#0f172a' : '#e0f2fe'}
                    strokeWidth="1.5"
                  />
                  <text
                    x="400"
                    y="225"
                    fill="#ffffff"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    SW1 (CORE)
                  </text>
                </g>
              )}

              {/* RCC COLUMNS (C1 through C8) */}
              {(activeLayer === 'all' || activeLayer === 'structural') && (
                <g className="cursor-pointer">
                  {[
                    { id: 'C1', x: 70, y: 50, label: 'C1' },
                    { id: 'C2', x: 270, y: 50, label: 'C2' },
                    { id: 'C3', x: 490, y: 50, label: 'C3' },
                    { id: 'C4', x: 710, y: 50, label: 'C4' },
                    { id: 'C5', x: 70, y: 430, label: 'C5' },
                    { id: 'C6', x: 270, y: 430, label: 'C6' },
                    { id: 'C7', x: 490, y: 430, label: 'C7' },
                    { id: 'C8', x: 710, y: 430, label: 'C8' },
                  ].map((col) => {
                    const isSelected = selectedElement === col.id || (selectedElement === 'C1' && col.id === 'C1');
                    return (
                      <g key={col.id} onClick={() => setSelectedElement('C1')}>
                        <rect
                          x={col.x}
                          y={col.y}
                          width="20"
                          height="20"
                          fill={isSelected ? '#f59e0b' : blueprintStyle === 'monochrome' ? '#0f172a' : '#38bdf8'}
                          stroke="#ffffff"
                          strokeWidth="1"
                        />
                        <text
                          x={col.x + 10}
                          y={col.y + 14}
                          fill={isSelected ? '#0f172a' : '#ffffff'}
                          fontSize="8"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {col.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* ARCHITECTURAL ROOM LAYOUT LABELS */}
              {(activeLayer === 'all' || activeLayer === 'architectural') && (
                <g fill={blueprintStyle === 'monochrome' ? '#1e293b' : '#f8fafc'} fontSize="11" fontFamily="'Rajdhani', sans-serif" fontWeight="600">
                  <text x="180" y="140" textAnchor="middle">GRAND LIVING LOUNGE</text>
                  <text x="180" y="155" fill={blueprintStyle === 'monochrome' ? '#64748b' : '#94a3b8'} fontSize="9" fontFamily="monospace" textAnchor="middle">5.80m x 4.20m</text>

                  <text x="610" y="140" textAnchor="middle">MASTER BEDROOM SUITE</text>
                  <text x="610" y="155" fill={blueprintStyle === 'monochrome' ? '#64748b' : '#94a3b8'} fontSize="9" fontFamily="monospace" textAnchor="middle">4.60m x 4.00m</text>

                  <text x="180" y="340" textAnchor="middle">MODULAR KITCHEN & DINING</text>
                  <text x="180" y="355" fill={blueprintStyle === 'monochrome' ? '#64748b' : '#94a3b8'} fontSize="9" fontFamily="monospace" textAnchor="middle">4.20m x 3.60m</text>

                  <text x="610" y="340" textAnchor="middle">GUEST BEDROOM 02</text>
                  <text x="610" y="355" fill={blueprintStyle === 'monochrome' ? '#64748b' : '#94a3b8'} fontSize="9" fontFamily="monospace" textAnchor="middle">4.00m x 3.80m</text>
                </g>
              )}

              {/* Dimension Annotations */}
              {showDimensions && (
                <g stroke={blueprintStyle === 'monochrome' ? '#0f172a' : '#38bdf8'} strokeWidth="1">
                  {/* Top overall dimension */}
                  <line x1="80" y1="465" x2="720" y2="465" />
                  <line x1="80" y1="460" x2="80" y2="470" />
                  <line x1="720" y1="460" x2="720" y2="470" />
                  <text
                    x="400"
                    y="480"
                    fill={blueprintStyle === 'monochrome' ? '#0f172a' : '#38bdf8'}
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    OVERALL SPAN: 24,000 mm (24.00 M)
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Sidebar Inspector Controls */}
          <div className="w-full lg:w-80 bg-slate-900/90 border-t lg:border-t-0 lg:border-l border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-amber-400">STRUCTURAL ELEMENT INSPECTOR</span>
                <Info className="w-4 h-4 text-slate-500" />
              </div>

              {/* Layer Visibility Toggles */}
              <div className="mt-4">
                <label className="block text-xs font-mono text-slate-400 mb-2">FILTER CAD LAYERS</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {(['all', 'structural', 'architectural'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setActiveLayer(l)}
                      className={`p-2 rounded-lg border capitalize transition-all ${
                        activeLayer === l
                          ? 'bg-sky-950 border-sky-400 text-sky-200 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowDimensions(!showDimensions)}
                    className={`p-2 rounded-lg border transition-all ${
                      showDimensions
                        ? 'bg-amber-950/60 border-amber-500/60 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    Grid Dims
                  </button>
                </div>
              </div>

              {/* Inspected Element Details */}
              {selectedElement && elementDetails[selectedElement] && (
                <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-3">
                  <div className="text-amber-400 font-bold text-sm">
                    {elementDetails[selectedElement].title}
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">CONCRETE & SIZE</span>
                    <span className="text-slate-200">{elementDetails[selectedElement].spec}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">STEEL REINFORCEMENT</span>
                    <span className="text-emerald-400">{elementDetails[selectedElement].steel}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">LOAD PARAMETER</span>
                    <span className="text-sky-300">{elementDetails[selectedElement].load}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Download Spec Sheet */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => alert('Architectural Structural Specification Sheet (IS:456 & IS:1893) ready for verified project review.')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Technical Spec Sheet</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
