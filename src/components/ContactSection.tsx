import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#070b14] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono tracking-widest uppercase mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>HEAD OFFICE & SALES GALLERY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Cinzel'] text-white">
              Connect With Our Civil Engineering Team
            </h2>

            <p className="mt-4 text-slate-400 font-light text-sm sm:text-base leading-relaxed">
              Whether you are looking for a luxury residence, prime commercial asset, or wish to review technical blueprint documents, our engineers and property advisors are at your service.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Corporate Headquarters</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Adityaraj House, Near Civil Lines Square, Murtizapur Road, Akola, Maharashtra 444001, India
                  </p>
                </div>
              </div>

              <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3729.123456789!2d77.03!3d20.70!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd3333333333333%3A0x1234567890abcdef!2sAdityaraj%20Builders%2C%20Akola!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                ></iframe>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Direct Project Hotlines</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
                    +91 724 245 8899 &bull; +91 98220 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Engineering & Sales Inquiries</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
                    contact@adityarajbuilders.in &bull; projects@adityarajgroup.in
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Site Visit Timings</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Monday to Sunday: 9:30 AM – 7:00 PM (Prior appointment recommended)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Form */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl relative">
            <h3 className="text-xl font-bold font-['Cinzel'] text-white">
              Schedule an On-Site Engineering Tour
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Inspect ongoing RCC construction, sample flats, and verified MahaRERA files.
            </p>

            {submitted ? (
              <div className="mt-8 p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-['Cinzel']">Inquiry Confirmed</h4>
                <p className="text-xs text-slate-300">
                  Thank you. Our project director will call you within 2 hours with the site coordinates and blueprint pack.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-mono"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Deshmukh"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9822X XXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Project Preference</label>
                    <select className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-amber-400">
                      <option>Adityaraj Gateway Towers (Luxury)</option>
                      <option>Adityaraj Platinum Heights (Residential)</option>
                      <option>Adityaraj Central (Commercial)</option>
                      <option>Adityaraj Sahyadri Enclave (Smart)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Preferred Visit Date</label>
                    <input
                      type="date"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Specific Requirements or Queries</label>
                  <textarea
                    rows={3}
                    placeholder="Inquire about carpet area, structural floor plans, home loan pre-approvals..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit & Request Site Coordination</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Your privacy is 100% protected. Zero spam.</span>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
