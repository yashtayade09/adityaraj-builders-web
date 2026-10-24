import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Compass, Layers, ShieldCheck, MapPin, Check, ExternalLink, ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: 'residential' | 'commercial' | 'luxury';
  location: string;
  configuration: string;
  image: string;
  structuralSpec: string;
  concreteGrade: string;
  steelGrade: string;
  reraNumber: string;
  status: 'Under Construction' | 'Ready Possession' | 'New Launch';
  highlights: string[];
}

const projectsData: Project[] = [
  {
    id: 'adityaraj-gateway',
    name: 'Adityaraj Gateway Towers',
    category: 'luxury',
    location: 'National Highway Corridor, Akola',
    configuration: '2, 3 & 4 BHK Sky Residences',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    structuralSpec: 'Heavy RCC framed structure designed for Seismic Zone III with deep pile foundations.',
    concreteGrade: 'M40 High-Performance Concrete',
    steelGrade: 'Fe-550D Corrosion Resistant TMT',
    reraNumber: 'MAHARERA: P51800048291',
    status: 'Under Construction',
    highlights: ['Double height entrance lobby', '3-tier digital surveillance', 'Rooftop infinity swimming pool', 'Electric vehicle charging bays'],
  },
  {
    id: 'adityaraj-platinum',
    name: 'Adityaraj Platinum Heights',
    category: 'residential',
    location: 'Civil Lines Extension, Akola',
    configuration: '2 & 3 BHK Premium Apartments',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    structuralSpec: 'Shear wall system engineered for wind turbulence and dynamic lateral load distribution.',
    concreteGrade: 'M35 Ready Mix with Micro-silica',
    steelGrade: 'High ductility Fe-500D',
    reraNumber: 'MAHARERA: P51800039104',
    status: 'Ready Possession',
    highlights: ['Vastu compliant layout', 'Soundproof UPVC French windows', 'Rainwater harvesting well', 'Solar powered common lighting'],
  },
  {
    id: 'adityaraj-central',
    name: 'Adityaraj Central Business Park',
    category: 'commercial',
    location: 'Commercial Hub, Station Road, Akola',
    configuration: 'Grade-A Corporate Offices & Retail Showrooms',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    structuralSpec: 'Post-tensioned slab construction allowing expansive 12-meter column-free flexible floor plates.',
    concreteGrade: 'M50 High Early Strength Mix',
    steelGrade: 'Low relaxation pre-stressing strands',
    reraNumber: 'MAHARERA: P51800051280',
    status: 'New Launch',
    highlights: ['Energy-efficient double glazed facade', 'High-speed automated elevators', 'Multi-level basement parking', 'Fire-sprinkler grid to NBC standards'],
  },
  {
    id: 'adityaraj-sahyadri',
    name: 'Adityaraj Sahyadri Enclave',
    category: 'residential',
    location: 'Green Valley, Akola',
    configuration: '1, 2 & 3 BHK Smart Living Homes',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    structuralSpec: 'Monolithic aluminum formwork (Mivan tech) ensuring mirror-finish walls and zero leakage.',
    concreteGrade: 'Self-compacting M30 concrete',
    steelGrade: 'Fe-550D Thermo-mechanically treated',
    reraNumber: 'MAHARERA: P51800034912',
    status: 'Ready Possession',
    highlights: ['Designer clubhouse & gymnasium', 'Landscaped zen gardens', 'Jogging track & amphitheater', '24x7 treated water supply'],
  },
];

interface ProjectsShowcaseProps {
  onOpenBlueprint: (projectId?: string) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onOpenBlueprint }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial' | 'luxury'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeTab === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="py-24 bg-[#0a0f1d] text-slate-100 relative">
      {/* Background Blueprint Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase mb-2">
              <Building2 className="w-4 h-4" />
              <span>CIVIL ENGINEERING PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Cinzel'] text-white">
              Landmark Developments
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl font-light">
              Built with precision engineering, premium materials, and certified structural integrity across Akola and surrounding regions.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            {(['all', 'luxury', 'residential', 'commercial'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono tracking-wide capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Landmarks' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Image with Blueprint Overlay on hover */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase border backdrop-blur-md shadow-md ${
                    project.status === 'Ready Possession'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                      : project.status === 'New Launch'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                      : 'bg-sky-950/80 text-sky-300 border-sky-500/50'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Blueprint Dimension HUD Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{project.location}</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-amber-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700/60">
                    {project.configuration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-['Cinzel'] text-white group-hover:text-amber-400 transition-colors">
                    {project.name}
                  </h3>

                  {/* Civil Engineering Structural Specs */}
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-sky-400 font-semibold min-w-[70px]">RCC SPEC:</span>
                      <span className="text-slate-300 font-light">{project.structuralSpec}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60">
                      <div>
                        <span className="text-slate-500 block text-[10px]">CONCRETE GRADE</span>
                        <span className="text-emerald-400 font-semibold">{project.concreteGrade}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">STEEL REINFORCEMENT</span>
                        <span className="text-amber-400 font-semibold">{project.steelGrade}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities Highlights */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    {project.reraNumber}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenBlueprint(project.id)}
                      className="px-3 py-1.5 rounded-lg bg-sky-950/60 hover:bg-sky-900/60 border border-sky-500/40 text-sky-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                      title="Inspect architectural blueprint"
                    >
                      <Compass className="w-3 h-3 text-sky-400" />
                      <span>Blueprint</span>
                    </button>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Inquiry Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative overflow-hidden">
            <div className="relative h-48 w-full mb-6 rounded-xl overflow-hidden border border-slate-800">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-mono text-amber-400">SCHEDULE SITE VISIT & CONSULTATION</span>
                <h3 className="text-xl font-bold font-['Cinzel'] mt-1">{selectedProject.name}</h3>
                <p className="text-xs text-slate-400">{selectedProject.location}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white p-1 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Thank you! Our senior civil engineering counselor will contact you regarding ${selectedProject.name}.`);
                setSelectedProject(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Er. / Mr. / Ms. Name"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98XXX XXXXX"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Interested Unit Type</label>
                <select className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400">
                  <option>2 BHK Luxury Residence</option>
                  <option>3 BHK Sky Suite</option>
                  <option>4 BHK Penthouse</option>
                  <option>Commercial Retail / Office</option>
                </select>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 inline mr-1" />
                Direct developer pricing with zero brokerage. Complete structural blueprint & soil testing reports provided upon site visit.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono shadow-lg"
                >
                  Confirm Site Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
