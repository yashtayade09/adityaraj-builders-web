import React, { useEffect, useRef } from 'react';

interface OriginalWebsiteProps {
  onReplayIntro: () => void;
}

export const OriginalWebsite: React.FC<OriginalWebsiteProps> = ({ onReplayIntro }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Keep the latest callback in a ref so the init effect below runs only ONCE
  // (previously it re-ran on every App render and attached duplicate listeners).
  const replayRef = useRef(onReplayIntro);
  replayRef.current = onReplayIntro;

  useEffect(() => {
    let cancelled = false;
    // Dynamically inject user's website script and fetch live backend data
    let cleanupFn: (() => void) | null = null;

    const init = async () => {
      // 1. Fetch live published data from database
      let liveData: any = null;
      try {
        const res = await fetch('/api/public/data');
        if (res.ok) {
          liveData = await res.json();
        }
      } catch (err) {
        console.warn('Could not fetch live backend data, fallback to defaults:', err);
      }

      // If window script runner is available
      if (!cancelled && typeof window !== 'undefined' && containerRef.current) {
        // Execute the website initialization with live data merged
        if ((window as any).__initAdityarajWebsite) {
          cleanupFn = (window as any).__initAdityarajWebsite(liveData, () => replayRef.current());
        }
      }
    };

    init();

    return () => {
      cancelled = true;
      if (cleanupFn) cleanupFn();
    };
  }, []);

  return (
    <div ref={containerRef} className="adityaraj-portal-root">
      {/* 1. Header Navigation */}
      <header className="nav" id="nav">
        <div className="wrap">
          <div className="nav-in">
            <a className="brand" href="#home" aria-label="Adityaraj Builders &amp; Developers, Akola">
              <img className="logo-img" alt="Adityaraj Builders and Developers, Akola" width="145" height="80" src="/assets/aistudio/Glossy_3D_Marathi_Real_Estate_Logo_d7948daa.png" onError={(e) => { (e.target as HTMLImageElement).src = '/adityaraj-logo.png'; }} />
            </a>
            <nav className="nav-links" id="navLinks" aria-label="Primary"></nav>
            <div className="nav-act">
              <button
                type="button"
                className="btn btn-ghost nav-hide-sm"
                onClick={onReplayIntro}
                style={{ minHeight: '44px', padding: '0 16px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                title="Replay the Cinematic Intro"
              >
                {/* <span>🎬 Replay Intro</span> */}
              </button>
              <a
                className="btn btn-ghost nav-hide-sm"
                href="/owner/dashboard/"
                style={{ minHeight: '44px', padding: '0 16px', fontSize: '13px' }}
                title="Owner Login / Dashboard"
              >
                🔐 Owner Dashboard
              </a>
              <a className="btn btn-primary nav-cta" href="#contact">Get Free Enquiry</a>
              <button className="burger" id="burger" type="button" aria-label="Open menu" aria-expanded="false">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
              </button>
            </div>
          </div>
          <div className="mmenu" id="mmenu"></div>
        </div>
        <div className="prog"><i id="progBar"></i></div>
      </header>

      <main>
        {/* 2. HERO */}
        <section className="hero" id="home">
          <div className="gridbg"></div><div className="hero-spot" id="heroSpot"></div>
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="mr">प्रगत बांधकाम तंत्रज्ञान</p>
              <p className="eyebrow">Builders &amp; Developers · Akola</p>
              <h1>Building Dreams with <em>Strength, Trust</em> &amp; Precision.</h1>
              <p className="sub">Premium homes and commercial spaces, engineered to last. Quality materials, honest pricing and on-time delivery on every site.</p>
              <div className="hero-btns">
                <a className="btn btn-primary" href="#contact">Send Enquiry</a>
                <a className="btn btn-ghost" href="#projects">View Our Projects</a>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onReplayIntro}
                  style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                >
                  🎬 Replay Cinematic Intro
                </button>
              </div>
              <div className="hero-meta"><span>Residential</span><span>Commercial</span><span>Turnkey</span></div>
            </div>
            <div className="site" aria-label="Animated construction site: two cranes building a house">
              <div className="site-top"><span className="live">Live site · Cam 01</span><span>Plot A · Akola</span></div>
              <canvas id="siteCanvas" width="640" height="420" role="img" aria-label="Two tower cranes lifting slabs and walls to build a two-storey house"></canvas>
              <div className="site-bot">
                <div className="hud"><div className="hud-l"><span>Stage: <b id="hudStage">Site setup</b></span><b id="hudPct">0%</b></div><div className="hud-bar"><i id="hudBar"></i></div></div>
                <div className="sbtns">
                  <button className="sbtn" id="btnPause" type="button">Pause</button>
                  <button className="sbtn" id="btnSpeed" type="button">2× speed</button>
                  <button className="sbtn" id="btnRestart" type="button">Restart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="rulerline"></div>
        </section>

        {/* 3. ABOUT + STATS */}
        <section className="sec gridbg" id="about">
          <div className="wrap about">
            <div className="rv">
              <p className="eyebrow">A-02 · About the company</p>
              <h2 className="h2">Engineers first. Builders by craft.</h2>
              <p className="lead">Adityaraj Builders &amp; Developers is a civil engineering and construction company in Akola delivering homes, bungalows and commercial buildings with disciplined site management. Every project is planned on paper, checked on site and handed over finished.</p>
              <ul className="trust" id="trust"></ul>
            </div>
            <div className="stats rv" id="stats"></div>
          </div>
        </section>

        {/* 4. PROBLEM VS SOLUTION */}
        <section className="sec alt" id="compare">
          <div className="wrap">
            <div className="sec-head"><div><p className="eyebrow">A-03 · Problem vs solution</p><h2 className="h2">What goes wrong on most sites, and what we do about it.</h2></div><span className="sheet">Comparison chart</span></div>
            <div className="cmp rv">
              <div className="cmp-head"><div className="bad">Common customer problems</div><div className="good">The Adityaraj way</div></div>
              <div id="pairs"></div>
            </div>
          </div>
        </section>

        {/* 5. WHY CHOOSE US */}
        <section className="sec" id="why">
          <div className="wrap">
            <div className="sec-head"><div><p className="eyebrow">A-04 · Why choose us</p><h2 className="h2">Six reasons clients stay with us.</h2></div><span className="sheet">Specification</span></div>
            <div className="cards" id="usps"></div>
          </div>
        </section>

        {/* 6. SERVICES */}
        <section className="sec alt gridbg" id="services">
          <div className="wrap">
            <div className="sec-head"><div><p className="eyebrow">A-05 · Services</p><h2 className="h2">From foundation to final finish.</h2><p className="lead">One accountable team for the whole build, whatever the scale.</p></div><span className="sheet">Scope of work</span></div>
            <div className="cards" id="services-grid"></div>
          </div>
        </section>

        {/* 7. SPECIALIZATION */}
        <section className="sec" id="spec">
          <div className="wrap split">
            <div className="rv"><p className="eyebrow">A-06 · Specialization</p><h2 className="h2">Built around the way you want to live and work.</h2><p className="lead">We design and build to your brief, then keep you close to the work from the first excavation to the last coat of paint.</p></div>
            <dl className="tblock rv" id="spec-rows"></dl>
          </div>
        </section>

        {/* 8. COMPLETED PROJECTS */}
        <section className="sec alt" id="projects">
          <div className="wrap">
            <div className="sec-head"><div><p className="eyebrow">A-07 · Completed projects</p><h2 className="h2">Delivered, handed over, lived in.</h2></div><span className="sheet">Tap a card for details</span></div>
            <div className="chips" id="chips" role="group" aria-label="Filter projects"></div>
            <div className="cards" id="done-grid"></div>
          </div>
        </section>

        {/* 9. ACTIVE PROJECTS */}
        <section className="sec" id="active">
          <div className="wrap">
            <div className="sec-head"><div><p className="eyebrow">A-08 · Active projects</p><h2 className="h2">On site right now.</h2></div><span className="sheet">Live progress</span></div>
            <div className="cards" id="active-grid"></div>
          </div>
        </section>

        {/* 10. UPCOMING PROJECTS */}
        <section className="sec alt gridbg" id="upcoming">
          <div className="wrap">
            <div className="sec-head"><div><p className="eyebrow">A-09 · Upcoming projects</p><h2 className="h2">Next on the drawing board.</h2></div><span className="sheet">Pre-launch</span></div>
            <div className="cards" id="soon-grid"></div>
          </div>
        </section>

        {/* 11. REVIEWS */}
        <section className="sec" id="reviews">
          <div className="wrap">
            <div className="sec-head"><div><p className="eyebrow">A-10 · Customer reviews</p><h2 className="h2">In our clients' words.</h2></div>
              <div className="rnav"><button className="rbtn" id="rPrev" type="button" aria-label="Previous reviews"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><button className="rbtn" id="rNext" type="button" aria-label="Next reviews"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7"/></svg></button></div></div>
            <div className="slider-wrap"><div className="rtrack" id="rtrack" tabIndex={0} aria-label="Customer reviews"></div></div>
          </div>
        </section>

        {/* 12. ADD REVIEW */}
        <section className="sec alt" id="addreview">
          <div className="wrap rev-grid">
            <div className="rv"><p className="eyebrow">A-11 · Add your review</p><h2 className="h2">Worked with us? Tell us how it went.</h2>
              <p className="note" style={{ marginTop: '22px' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', color: 'var(--accent)', marginTop: '2px' }} aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4"/></svg><span>Reviews are displayed on the public site after verification and approval by the owner in the dashboard.</span></p></div>
            <div className="card pad rv" style={{ padding: '32px' }}>
              <div className="ok" id="reviewOk"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)', flex: 'none' }} aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg><span>Thank you. Your review is with our team and will appear once verified by the owner.</span></div>
              <form className="form" id="reviewForm" noValidate>
                <div className="field"><label htmlFor="rv-name">Name</label><input id="rv-name" type="text" placeholder="Your full name" autoComplete="name" /><div className="err">Please enter your name.</div></div>
                <div><span className="lbl">Star rating</span><div className="rate" id="rate" role="group" aria-label="Star rating"></div></div>
                <div className="field"><label htmlFor="rv-msg">Review message</label><textarea id="rv-msg" placeholder="Share your experience with Adityaraj Builders"></textarea><div className="err">Please write a short review.</div></div>
                <button className="btn btn-primary" type="submit" style={{ justifySelf: 'start' }}>Submit Review</button>
              </form>
            </div>
          </div>
        </section>

        {/* 13. PROPRIETOR */}
        <section className="sec" id="owner">
          <div className="wrap owner">
            <div className="photo rv tilt glow">
              <img id="propPhotoImg" src="/assets/aistudio/Glossy_3D_Marathi_Real_Estate_Logo_d7948daa.png" alt="Proprietor photo" onError={(e) => { (e.target as HTMLImageElement).src = '/adityaraj-logo.png'; }}  />
              <div className="cap"><span>Proprietor &bull; Founder</span><span>Site · Portrait</span></div>
            </div>
            <div className="rv">
              <p className="eyebrow">A-12 · The proprietor</p>
              <h2 className="h2" id="propNameDisplay">Er. Rameshwarji Tayade</h2>
              <p className="mono" id="propRoleDisplay" style={{ margin: '10px 0 0', fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Founder &amp; Proprietor · Civil Engineer</p>
              <p className="vision" id="propVisionDisplay">“Every building carries a family's trust. I make sure it is built the way I would build my own: strong, honest and on time.”</p>
              <div className="facts">
                <div className="fact"><span className="mono">Experience</span><span id="propExpDisplay">15+ years in civil construction</span></div>
                <div className="fact"><span className="mono">Focus</span><span id="propFocusDisplay">Structural quality, site discipline, transparent costing</span></div>
                <div className="fact"><span className="mono">Achievements</span><span id="propAchieveDisplay">MahaRERA Registered Developer, Over 12,000 residents housed</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* 14. GALLERY */}
        <section className="sec alt" id="gallery">
          <div className="wrap"><div className="sec-head"><div><p className="eyebrow">A-13 · Proprietor gallery</p><h2 className="h2">Always on site, always involved.</h2></div><span className="sheet">Hover to pause</span></div></div>
          <div className="marq" aria-label="Photo gallery"><div className="track" id="track"></div></div>
        </section>

        {/* 15. CONTACT */}
        <section className="sec gridbg" id="contact">
          <div className="wrap contact">
            <div className="rv">
              <p className="eyebrow">A-14 · Enquiry</p>
              <h2 className="h2">Let's Build Your Dream Project</h2>
              <p className="lead">Tell us about your plot, your plans and your budget. We reply with a clear next step, not a sales pitch.</p>
              <div className="cinfo">
                <div><span className="mono">Office</span><span id="cAddr"></span></div>
                <div><span className="mono">Phone</span><span id="cPhone"></span></div>
                <div><span className="mono">Email</span><span id="cMail"></span></div>
              </div>
              <div className="map" role="img" aria-label="Map placeholder for the Akola office">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d473.90222346303835!2d77.02273584911369!3d20.673998429384444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd72dcf47307e4d%3A0xfbeef1331917568e!2sAdityaRaj%20Builders%20and%20Developers%2C%20Akola!5e1!3m2!1sen!2sin!4v1792735572706!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '200px', borderRadius: '16px' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Office Location Map"
                ></iframe>
                <a 
                  href="https://maps.app.goo.gl/6yZcjVRgAZQVKKj46?g_st=aw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute inset-0 z-10" 
                  title="Open in Google Maps"
                ></a>
              </div>
            </div>
            <div className="card pad rv" style={{ padding: '32px' }}>
              <div className="ok" id="enqOk"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)', flex: 'none' }} aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg><span>Thank you. We have received your enquiry and the owner will connect with you shortly.</span></div>
              <form className="form" id="enqForm" noValidate>
                <div className="row2">
                  <div className="field"><label htmlFor="q-name">Full name</label><input id="q-name" type="text" placeholder="Your name" autoComplete="name" /><div className="err">Please enter your name.</div></div>
                  <div className="field"><label htmlFor="q-phone">Phone number</label><input id="q-phone" type="tel" placeholder="+91" autoComplete="tel" /><div className="err">Enter a valid phone number.</div></div>
                </div>
                <div className="field"><label htmlFor="q-email">Email</label><input id="q-email" type="email" placeholder="you@example.com" autoComplete="email" /></div>
                <div className="row2">
                  <div className="field"><label htmlFor="q-type">Project type</label><select id="q-type"><option>Residential construction</option><option>Commercial construction</option><option>Renovation &amp; remodeling</option><option>Interior work</option><option>Turnkey project</option><option>Construction consultancy</option></select></div>
                  <div className="field"><label htmlFor="q-budget">Budget range</label><select id="q-budget"><option>Under ₹50 lakh</option><option>₹50 lakh – ₹1 crore</option><option>₹1 – 3 crore</option><option>₹3 crore and above</option><option>Not decided yet</option></select></div>
                </div>
                <div className="field"><label htmlFor="q-msg">Message</label><textarea id="q-msg" placeholder="Plot size, location, timeline and anything else we should know"></textarea></div>
                <div className="cta-row">
                  <button className="btn btn-primary" type="submit">Send Enquiry</button>
                  <a className="btn btn-ghost" id="callBtn" href="#">Call Now</a>
                  <a className="btn btn-ghost" id="waBtn" href="#" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/></svg>WhatsApp Us</a>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 16. FOOTER */}
      <footer className="foot">
        <div className="rulerline"></div>
        <div className="wrap">
          <div className="fgrid">
            <div className="flogo">
              <img className="logo-img" alt="Adityaraj Builders and Developers, Akola" width="330" height="182" src="/assets/aistudio/Glossy_3D_Marathi_Real_Estate_Logo_d7948daa.png" onError={(e) => { (e.target as HTMLImageElement).src = '/adityaraj-logo.png'; }} />
              <p>Premium residential and commercial construction in Akola, planned with engineering discipline and delivered with care.</p>
              <div className="soc" id="soc"></div>
            </div>
            <div><h4>Quick links</h4><ul id="fLinks"></ul></div>
            <div><h4>Services</h4><ul id="fServices"></ul></div>
            <div><h4>Contact &amp; Owner</h4><ul id="fContact"></ul></div>
          </div>
          <div className="copy">
            <span>© {new Date().getFullYear()} Adityaraj Builders &amp; Developers. All rights reserved. &bull; <a href="/owner/dashboard/" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Owner Dashboard Access</a></span>
            <span className="mono" style={{ fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase' }}>प्रगत बांधकाम तंत्रज्ञान</span>
          </div>
        </div>
      </footer>

      {/* Details & Register Interest Modal */}
      <dialog id="modal" aria-label="Details"><button className="mx" id="mx" type="button" aria-label="Close">×</button><div className="mbody" id="mbody"></div></dialog>
    </div>
  );
};
