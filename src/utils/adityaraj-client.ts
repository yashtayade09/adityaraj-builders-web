/**
 * Client-side script engine for Adityaraj Builders website.
 * Implements:
 * - Real API integration for enquiries, reviews, project registrations
 * - Dynamic data population from database
 * - Canvas 2-tower cranes live construction site animation
 * - Architectural drawing doodles and parallax
 * - 3D card tilt & hover spotlight
 * - Review slider and star rating
 * - Sticky nav, progress ruler, mobile menu
 */

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function initAdityarajWebsite(liveData: any, onReplayIntro: () => void) {
  const $ = (s: string, r?: HTMLElement | Document) => (r || document).querySelector(s) as any;
  const $$ = (s: string, r?: HTMLElement | Document) => Array.from((r || document).querySelectorAll(s)) as any[];
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('js');

  const ic = (d: string, s?: number) =>
    `<svg width="${s || 26}" height="${s || 26}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;

  const star = (on: boolean, sz: number) =>
    `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="${on ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>`;

  // 1. Merge Live Backend Data or use defaults
  initDoodles();

  const CONFIG = {
    phoneDisplay: liveData?.company?.phoneDisplay || '+91 724 245 8899',
    phoneLink: liveData?.company?.phoneLink || '+917242458899',
    whatsapp: liveData?.company?.whatsapp || '919822012345',
    email: liveData?.company?.email || 'contact@adityarajbuilders.in',
    address: liveData?.company?.address || 'Adityaraj House, Near Civil Lines Square, Murtizapur Road, Akola, Maharashtra 444001',
  };

  const DATA = {
    stats: liveData?.content?.stats || [
      { v: 15, s: '+', l: 'Years of engineering experience' },
      { v: 86, s: '+', l: 'Completed landmark projects' },
      { v: 7, s: '', l: 'Active ongoing projects' },
      { v: 250, s: '+', l: 'Happy customer families' },
    ],
    trust: liveData?.content?.trust || [
      'Quality work (IS 456 RCC Standards)',
      'Transparent pricing (Zero hidden charges)',
      'Timely delivery (Contractual possession guarantee)',
    ],
    pairs: liveData?.content?.pairs || [
      ['Projects that slip by months', 'On-time delivery', 'Milestone schedule agreed before work starts.'],
      ['Poor workmanship and cracks that appear early', 'Skilled engineers on every stage', 'Qualified supervision from foundation to finishing.'],
      ['Hidden costs and surprise bills', 'Transparent pricing', 'Itemised estimate with no unexplained additions.'],
      ['Substituted or low-grade materials', 'Quality materials', 'Approved primary Fe-550D TMT and M40 concrete.'],
      ['No news from the site for weeks', 'Regular updates', 'Site visits and progress reports you can rely on.'],
    ],
    usps: liveData?.content?.usps || [
      ['Premium quality construction', 'Structural strength and clean finishing, checked at every stage.', 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4'],
      ['Experienced engineers and skilled workers', 'A trained team that reads drawings and builds exactly to them.', 'M9 11a3 3 0 100-6 3 3 0 000 6z M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M16 5.2a3 3 0 010 5.6 M18 14.3c1.8.8 3 2.6 3 5.7'],
      ['Transparent cost estimation', 'A detailed estimate up front, and a clear explanation of any change.', 'M6 3h12v18H6z M9 7h6 M9 11h2 M13 11h2 M9 15h2 M13 15h2'],
      ['On-time project delivery', 'Planned timelines, tracked weekly, and honest about delays.', 'M12 21a9 9 0 100-18 9 9 0 000 18z M12 7v5l3 2'],
      ['High-quality materials', 'Cement, steel and finishes from reliable suppliers.', 'M3 7h18v4H3z M3 13h8v4H3z M13 13h8v4h-8z'],
      ['Personal project monitoring', 'Direct oversight from the proprietor, not just remote site team.', 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 15a3 3 0 100-6 3 3 0 000 6z'],
    ],
    services: (liveData?.services || []).map((s: any) => [
      s.title,
      s.description,
      s.tag,
      s.icon || 'M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-6h4v6',
    ]),
    spec: liveData?.content?.spec || [
      ['Specialization', 'Luxury homes, bungalows, residential buildings and commercial spaces.'],
      ['Target market', 'Homeowners, plot owners, commercial investors and businesses.'],
      ['Customization', 'Designs shaped around your requirements, not a fixed catalogue.'],
      ['Quality focus', 'Structural strength, safety, materials and finishing.'],
      ['Customer engagement', 'Direct WhatsApp updates, site visits and transparent communication.'],
    ],
    art: [
      'M8 108 H192 M18 108 V62 H88 V108 M88 108 V38 H172 V108 M12 62 H94 M82 38 H178 M28 74 H48 V92 H28 Z M100 52 H122 V72 H100 Z M136 52 H158 V72 H136 Z M104 108 V88 H134 V108 M146 108 V88 H162 V108',
      'M8 108 H192 M70 108 V14 H130 V108 M70 30 H130 M70 46 H130 M70 62 H130 M70 78 H130 M70 94 H130 M90 14 V108 M110 14 V108 M40 108 V64 H70 M130 108 V50 H160 V108 M140 66 H150 M140 82 H150',
      'M8 108 H192 M30 108 V64 H170 V108 M22 66 L100 24 L178 66 M60 108 V84 H84 V108 M110 78 H146 V98 H110 Z M128 78 V98 M40 74 H54 V86 H40 Z M150 74 H164 V86 H150 Z M150 40 V22 H162 V48',
      'M8 108 H192 M28 108 V30 H172 V108 M28 48 H172 M28 66 H172 M28 84 H172 M56 30 V108 M84 30 V108 M112 30 V108 M140 30 V108 M86 108 V92 H114 V108 M20 30 H180',
    ],
    done: (liveData?.projects?.done || []).map((p: any) => ({
      n: p.name,
      loc: p.location,
      t: p.type,
      cat: p.category,
      y: p.year || '2024',
      img: p.coverImage || '',
      a: p.artIndex || 0,
      desc: p.description || '',
    })),
    active: (liveData?.projects?.active || []).map((p: any) => ({
      n: p.name,
      loc: p.location,
      t: p.type,
      p: p.progress ?? 50,
      due: p.due || '2027',
      stage: p.stage || 'Structure',
      img: p.coverImage || '',
      a: p.artIndex || 1,
    })),
    soon: (liveData?.projects?.soon || []).map((p: any) => ({
      n: p.name,
      loc: p.location,
      when: p.launchWhen || 'Q1 2027',
      d: p.description,
    })),
    reviews: (liveData?.reviews || []).map((r: any) => ({
      n: r.name,
      p: r.projectType || 'Verified Client',
      s: r.rating || 5,
      t: r.message,
    })),
    gallery: (liveData?.gallery || []).map((g: any) => [
      g.title,
      g.artIndex || 0,
      g.image,
    ]),
    socials: [
      ['Facebook', 'M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z'],
      ['Instagram', 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z M12 8a4 4 0 100 8 4 4 0 000-8z M17.5 6.5h.01'],
      ['LinkedIn', 'M4 9h4v12H4z M6 3a2 2 0 110 4 2 2 0 010-4z M10 9h4v2c1-1.5 2.5-2.2 4-2.2 3 0 4 2 4 5V21h-4v-6c0-1.4-.5-2.3-1.8-2.3S14 13.6 14 15v6h-4z'],
      ['YouTube', 'M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3z M10 9l5 3-5 3z'],
    ],
    nav: [
      ['Home', '#home'],
      ['About', '#about'],
      ['Projects', '#projects'],
      ['Services', '#services'],
      ['Reviews', '#reviews'],
      ['Contact', '#contact'],
    ],
  };

  // 2. Render Page Elements
  const navEl = $('#navLinks');
  if (navEl) navEl.innerHTML = DATA.nav.map(n => `<a href="${n[1]}">${n[0]}</a>`).join('');

  const mmenuEl = $('#mmenu');
  if (mmenuEl) {
    mmenuEl.innerHTML =
      DATA.nav.map(n => `<a class="ml" href="${n[1]}">${n[0]}</a>`).join('') +
      '<a class="btn btn-primary" href="#contact">Get Free Enquiry</a>' +
      '<a class="btn btn-ghost" href="/owner/dashboard/">🔐 Owner Dashboard</a>' +
      '<button class="btn btn-ghost" id="mReplay" type="button">🎬 Replay Intro</button>';
    const mReplay = $('#mReplay');
    if (mReplay) mReplay.addEventListener('click', () => onReplayIntro());
  }

  const trustEl = $('#trust');
  if (trustEl) {
    trustEl.innerHTML = DATA.trust
      .map((t: any) => `<li><span class="tick">${ic('M5 12.5l4.5 4.5L19 7.5', 16).replace('stroke-width="1.5"', 'stroke-width="2.2"')}</span>${t}</li>`)
      .join('');
  }

  const statsEl = $('#stats');
  if (statsEl) {
    statsEl.innerHTML = DATA.stats
      .map((s: any) => `<div class="stat"><b><span data-count="${s.v}">${s.v}</span><i>${s.s}</i></b><span>${s.l}</span></div>`)
      .join('');
  }

  const pairsEl = $('#pairs');
  if (pairsEl) {
    pairsEl.innerHTML = DATA.pairs
      .map(
        (p: any) =>
          `<div class="cmp-row"><div class="bad"><span class="mk x">${ic('M6 6l12 12M18 6L6 18', 14)}</span><span>${p[0]}</span></div><div class="good"><span class="mk v">${ic('M5 12.5l4.5 4.5L19 7.5', 14)}</span><span><strong>${p[1]}</strong><small>${p[2]}</small></span></div></div>`
      )
      .join('');
  }

  const uspsEl = $('#usps');
  if (uspsEl) {
    uspsEl.innerHTML = DATA.usps
      .map((u: any) => `<article class="card tilt glow pad rv"><div class="ico">${ic(u[2])}</div><h3>${u[0]}</h3><p>${u[1]}</p></article>`)
      .join('');
  }

  const srvEl = $('#services-grid');
  if (srvEl) {
    srvEl.innerHTML = DATA.services
      .map((s: any) => `<article class="card tilt glow pad rv"><div class="ico">${ic(s[3])}</div><h3>${s[0]}</h3><p>${s[1]}</p><span class="tag">${s[2]}</span></article>`)
      .join('');
  }

  const specEl = $('#spec-rows');
  if (specEl) {
    specEl.innerHTML = DATA.spec.map((r: any) => `<div class="trow"><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join('');
  }

  const fLinks = $('#fLinks');
  if (fLinks) fLinks.innerHTML = DATA.nav.map((n: any) => `<li><a href="${n[1]}">${n[0]}</a></li>`).join('');

  const fServices = $('#fServices');
  if (fServices) fServices.innerHTML = DATA.services.map((s: any) => `<li><a href="#services">${s[0]}</a></li>`).join('');

  const fContact = $('#fContact');
  if (fContact) {
    fContact.innerHTML = `<li>${CONFIG.address}</li><li>${CONFIG.phoneDisplay}</li><li>${CONFIG.email}</li><li><a href="/owner/dashboard/" style="color:var(--accent)">Owner Login / Dashboard</a></li>`;
  }

  const socEl = $('#soc');
  if (socEl) {
    socEl.innerHTML = DATA.socials
      .map((s: any) => `<a href="#" aria-label="${s[0]}">${ic(s[1], 19).replace('stroke-width="1.5"', 'stroke-width="1.6"')}</a>`)
      .join('');
  }

  // Contact details
  if ($('#cAddr')) $('#cAddr').textContent = CONFIG.address;
  if ($('#cPhone')) $('#cPhone').textContent = CONFIG.phoneDisplay;
  if ($('#cMail')) $('#cMail').textContent = CONFIG.email;
  if ($('#callBtn')) $('#callBtn').href = 'tel:' + CONFIG.phoneLink;
  if ($('#waBtn')) $('#waBtn').href = 'https://wa.me/' + CONFIG.whatsapp;

  // Proprietor details
  if (liveData?.company) {
    const c = liveData.company;
    if ($('#propNameDisplay')) $('#propNameDisplay').textContent = c.proprietorName;
    if ($('#propRoleDisplay')) $('#propRoleDisplay').textContent = c.proprietorRole;
    if ($('#propVisionDisplay')) $('#propVisionDisplay').textContent = `“${c.proprietorVision}”`;
    if ($('#propExpDisplay')) $('#propExpDisplay').textContent = c.proprietorExp;
    if ($('#propFocusDisplay')) $('#propFocusDisplay').textContent = c.proprietorFocus;
    if ($('#propAchieveDisplay')) $('#propAchieveDisplay').textContent = c.proprietorAchieve;
    if ($('#propPhotoImg') && c.proprietorPhoto) $('#propPhotoImg').src = c.proprietorPhoto;
  }

  // 3. Completed Projects with filters & detail modal
  let filter = 'All';
  const cats = ['All', 'Residential', 'Commercial'];

  function renderChips() {
    const chipsEl = $('#chips');
    if (!chipsEl) return;
    chipsEl.innerHTML = cats
      .map(c => `<button class="chip${c === filter ? ' on' : ''}" type="button" data-c="${c}" aria-pressed="${c === filter}">${c}</button>`)
      .join('');
  }

  function renderDone() {
    const doneGrid = $('#done-grid');
    if (!doneGrid) return;
    const list = DATA.done.map((p: any, i: number) => ({ ...p, i })).filter((p: any) => filter === 'All' || p.cat === filter);
    doneGrid.innerHTML = list
      .map(
        (p: any) =>
          `<article class="card tilt glow proj rv in" tabindex="0" role="button" data-i="${p.i}" aria-label="${p.n}, view details"><div class="pimg${p.img ? ' has-img' : ''}">${p.img ? `<img class="pcover" src="${p.img}" alt="${p.n}" loading="lazy" />` : ''}<svg viewBox="0 0 200 120" aria-hidden="true"><path d="${DATA.art[p.a % 4]}"/></svg><span class="badge">${p.y}</span><div class="ov"><span>View details</span><span>${p.t}</span></div></div><div class="pbody"><h3>${p.n}</h3><div class="meta"><span><b>${p.loc}</b></span><span>${p.t}</span><span>Completed ${p.y}</span></div></div></article>`
      )
      .join('');
    bindTilt(doneGrid);
  }

  renderChips();
  renderDone();

  const chipsEl = $('#chips');
  if (chipsEl) {
    chipsEl.addEventListener('click', (e: any) => {
      const b = e.target.closest('.chip');
      if (!b) return;
      filter = b.dataset.c;
      renderChips();
      renderDone();
    });
  }

  // 4. Active Projects
  const activeGrid = $('#active-grid');
  if (activeGrid) {
    activeGrid.innerHTML = DATA.active
      .map((p: any) => {
        const st = [
          ['Foundation', 25],
          ['Structure', 55],
          ['Brickwork', 80],
          ['Finishing', 100],
        ];
        const now = st.findIndex(s => p.p < s[1]);
        const chips = st.map((s, i) => `<span class="stage${i < now || now === -1 ? ' done' : i === now ? ' now' : ''}">${s[0]}</span>`).join('');
        return `<article class="card tilt glow proj rv"><div class="pimg${p.img ? ' has-img' : ''}">${p.img ? `<img class="pcover" src="${p.img}" alt="${p.n}" loading="lazy" />` : ''}<svg viewBox="0 0 200 120" aria-hidden="true"><path d="${DATA.art[p.a % 4]}"/></svg><span class="badge">Under construction</span></div><div class="pbody"><h3>${p.n}</h3><div class="meta"><span><b>${p.loc}</b></span><span>${p.t}</span></div><div class="pbar" style="--w:${p.p}%" role="progressbar" aria-valuenow="${p.p}" aria-valuemin="0" aria-valuemax="100" aria-label="Construction progress"><i></i></div><div class="bar-l"><span><span data-count="${p.p}">${p.p}</span>% complete</span><span>Due ${p.due}</span></div><div class="stages">${chips}</div></div></article>`;
      })
      .join('');
  }

  // 5. Upcoming Projects
  const soonGrid = $('#soon-grid');
  if (soonGrid) {
    soonGrid.innerHTML = DATA.soon
      .map(
        (p: any, i: number) =>
          `<article class="card tilt glow pad rv soon"><span class="badge">Coming soon</span><h3>${p.n}</h3><div class="meta"><span><b>${p.loc}</b></span><span>Launch ${p.when}</span></div><p style="margin-top:14px">${p.d}</p><button class="btn btn-ghost" type="button" data-soon="${i}" style="margin-top:22px;width:100%">Register Interest</button></article>`
      )
      .join('');
  }

  // 6. Reviews Slider
  const rtrack = $('#rtrack');
  if (rtrack) {
    rtrack.innerHTML = DATA.reviews
      .map(
        (r: any) =>
          `<figure class="card tilt glow pad" style="margin:0"><div class="stars" role="img" aria-label="${r.s} out of 5 stars">${[1, 2, 3, 4, 5].map(i => star(i <= r.s, 18)).join('')}</div><blockquote class="quote" style="margin-inline:0">${r.t}</blockquote><figcaption class="who"><span class="av">${r.n[0]}</span><span><b>${r.n}</b><small>${r.p}</small></span></figcaption></figure>`
      )
      .join('');
  }

  // 7. Gallery
  const galHtml = DATA.gallery
    .map(
      (g: any) =>
        `<figure class="tile">${g[2] ? `<img src="${g[2]}" alt="${g[0]}" style="width:100%;height:100%;object-fit:cover" />` : `<svg viewBox="0 0 200 120" aria-hidden="true"><path d="${DATA.art[g[1] % 4]}"/></svg>`}<figcaption>${g[0]}</figcaption></figure>`
    )
    .join('');
  const trackEl = $('#track');
  if (trackEl) trackEl.innerHTML = galHtml + galHtml.replace(/<figure/g, '<figure aria-hidden="true"');

  // 8. 3D Card Tilt binding
  function bindTilt(root: HTMLElement | Document) {
    $$('.tilt', root).forEach(el => {
      if (el._tilt) return;
      el._tilt = true;
      el.addEventListener('pointermove', (e: any) => {
        if (e.pointerType === 'touch' || reduce) return;
        const r = el.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width,
          y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', x * 100 + '%');
        el.style.setProperty('--my', y * 100 + '%');
        el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 9}deg) translateY(-4px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });
    });
  }
  bindTilt(document);

  // 9. Number Counter Animations
  function countUp(el: any) {
    const target = parseFloat(el.dataset.count);
    if (el._c) return;
    el._c = 1;
    if (reduce) {
      el.textContent = target;
      return;
    }
    const t0 = performance.now(),
      dur = 1800;
    (function tick(n) {
      const p = Math.min(1, (n - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  const io =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (es, o) => {
            es.forEach(e => {
              if (e.isIntersecting) {
                e.target.classList.add('in');
                $$('[data-count]', e.target as any).forEach(countUp);
                o.unobserve(e.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
        )
      : null;

  $$('.rv, .pbar, #stats').forEach((el: any) => {
    if (io) {
      el.style.transitionDelay = '';
      io.observe(el);
    } else el.classList.add('in');
  });

  // 10. Header scroll, active link, progress ruler
  const navHeader = $('#nav');
  const bar = $('#progBar');
  const links = $$('#navLinks a');
  const secIds = ['home', 'about', 'services', 'projects', 'reviews', 'contact'];

  function onScroll() {
    const y = window.scrollY,
      h = document.documentElement.scrollHeight - window.innerHeight;
    if (navHeader) navHeader.classList.toggle('sm', y > 30);
    if (bar) bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    let cur = 'home';
    secIds.forEach(id => {
      const s = document.getElementById(id);
      if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
    });
    links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  const burger = $('#burger');
  const mm = $('#mmenu');
  if (burger && mm) {
    burger.addEventListener('click', () => {
      const o = mm.classList.toggle('open');
      burger.setAttribute('aria-expanded', o);
    });
    mm.addEventListener('click', (e: any) => {
      if (e.target.closest('a')) {
        mm.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 11. Hero pointer spotlight
  const hero = $('#home');
  const spot = $('#heroSpot');
  if (hero && spot) {
    hero.addEventListener('pointermove', (e: any) => {
      const r = hero.getBoundingClientRect();
      spot.style.setProperty('--hx', e.clientX - r.left + 'px');
      spot.style.setProperty('--hy', e.clientY - r.top + 'px');
    });
  }

  // 12. Review slider controls
  const rt = $('#rtrack');
  function slideBy(dir: number) {
    if (!rt) return;
    const first = rt.firstElementChild as HTMLElement;
    if (!first) return;
    const w = first.getBoundingClientRect().width + 24;
    if (dir > 0 && rt.scrollLeft + rt.clientWidth >= rt.scrollWidth - 6) rt.scrollTo({ left: 0, behavior: 'smooth' });
    else if (dir < 0 && rt.scrollLeft < 6) rt.scrollTo({ left: rt.scrollWidth, behavior: 'smooth' });
    else rt.scrollBy({ left: dir * w, behavior: 'smooth' });
  }

  if ($('#rPrev')) $('#rPrev').addEventListener('click', () => slideBy(-1));
  if ($('#rNext')) $('#rNext').addEventListener('click', () => slideBy(1));

  let auto = setInterval(() => slideBy(1), 5500);
  if (rt) {
    ['pointerenter', 'focusin'].forEach(ev => rt.addEventListener(ev, () => clearInterval(auto)));
    ['pointerleave', 'focusout'].forEach(ev =>
      rt.addEventListener(ev, () => {
        clearInterval(auto);
        auto = setInterval(() => slideBy(1), 5500);
      })
    );
  }

  // 13. Star Rating
  let rating = 0;
  const rate = $('#rate');
  if (rate) {
    rate.innerHTML = [1, 2, 3, 4, 5]
      .map(i => `<button type="button" data-n="${i}" aria-label="${i} stars" aria-pressed="false">${star(false, 30)}</button>`)
      .join('');

    function drawRate(h?: number) {
      $$('button', rate).forEach((b: any, k: number) => {
        const on = k + 1 <= (h || rating);
        b.querySelector('svg').setAttribute('fill', on ? 'currentColor' : 'none');
        b.setAttribute('aria-pressed', k + 1 <= rating);
      });
    }

    rate.addEventListener('click', (e: any) => {
      const b = e.target.closest('button');
      if (b) {
        rating = +b.dataset.n;
        drawRate();
      }
    });
    rate.addEventListener('pointerover', (e: any) => {
      const b = e.target.closest('button');
      if (b) drawRate(+b.dataset.n);
    });
    rate.addEventListener('pointerleave', () => drawRate());
  }

  // 14. REAL DATABASE-BACKED FORM SUBMISSIONS
  function field(id: string, test: (v: string) => boolean): boolean {
    const el = $(id);
    if (!el) return false;
    const w = el.closest('.field');
    const bad = !test(el.value.trim());
    if (w) w.classList.toggle('bad', bad);
    return !bad;
  }

  // Submit Review Form -> POST /api/reviews
  const reviewForm = $('#reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e: any) => {
      e.preventDefault();
      const a = field('#rv-name', v => v.length > 1);
      const b = field('#rv-msg', v => v.length > 5);

      if (a && b) {
        const payload = {
          name: ($('#rv-name') as HTMLInputElement).value.trim(),
          rating: rating || 5,
          message: ($('#rv-msg') as HTMLTextAreaElement).value.trim(),
        };

        try {
          const res = await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (res.ok) {
            reviewForm.style.display = 'none';
            if ($('#reviewOk')) $('#reviewOk').classList.add('show');
          } else {
            alert('Failed to save review. Please check your details.');
          }
        } catch {
          alert('Network connection error. Please try again.');
        }
      }
    });
  }

  // Submit Customer Enquiry Form -> POST /api/enquiries
  const enqForm = $('#enqForm');
  if (enqForm) {
    enqForm.addEventListener('submit', async (e: any) => {
      e.preventDefault();
      const a = field('#q-name', v => v.length > 1);
      const b = field('#q-phone', v => /^[+\d][\d\s-]{7,}$/.test(v));

      if (a && b) {
        const payload = {
          name: ($('#q-name') as HTMLInputElement).value.trim(),
          phone: ($('#q-phone') as HTMLInputElement).value.trim(),
          email: ($('#q-email') as HTMLInputElement)?.value.trim() || '',
          projectType: ($('#q-type') as HTMLSelectElement)?.value || 'Residential construction',
          budget: ($('#q-budget') as HTMLSelectElement)?.value || 'Not decided yet',
          message: ($('#q-msg') as HTMLTextAreaElement)?.value.trim() || '',
        };

        try {
          const res = await fetch('/api/enquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (res.ok) {
            enqForm.style.display = 'none';
            if ($('#enqOk')) $('#enqOk').classList.add('show');
          } else {
            const errData = await res.json();
            alert(errData.error || 'Server validation failed. Please check your phone number.');
          }
        } catch {
          alert('Could not send enquiry. Please check your internet connection.');
        }
      }
    });
  }

  // Input listener resets
  ['#rv-name', '#rv-msg', '#q-name', '#q-phone'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('input', () => el.closest('.field')?.classList.remove('bad'));
  });

  // 15. Project Details Modal & Register Interest in Upcoming Projects
  const modal = $('#modal');
  const mb = $('#mbody');

  function openModal(html: string) {
    if (mb) mb.innerHTML = html;
    if (modal) {
      if (modal.showModal) modal.showModal();
      else modal.setAttribute('open', '');
    }
  }

  if ($('#mx')) $('#mx').addEventListener('click', () => modal?.close());
  if (modal) {
    modal.addEventListener('click', (e: any) => {
      if (e.target === modal) modal.close();
    });
  }

  function toContact(type?: string) {
    if (modal) modal.close();
    if (type && $('#q-type')) $('#q-type').value = type;
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  const doneGridEl = $('#done-grid');
  if (doneGridEl) {
    doneGridEl.addEventListener('click', (e: any) => {
      const c = e.target.closest('.proj');
      if (!c) return;
      const p = DATA.done[+c.dataset.i];
      if (!p) return;
      openModal(
        `<div class="mhead"><svg viewBox="0 0 200 120" aria-hidden="true"><path d="${DATA.art[p.a % 4]}"/></svg></div><div class="mtxt"><h3>${p.n}</h3><p>${p.desc || 'Planned on paper, checked on site and handed over with complete civil engineering precision.'}</p><div class="mfacts"><div><small>Location</small>${p.loc}</div><div><small>Type</small>${p.t}</div><div><small>Completed</small>${p.y}</div><div><small>Status</small>Handed over</div></div><button class="btn btn-primary" id="mEnq" type="button" style="margin-top:22px;width:100%">Enquire about this project</button></div>`
      );
      $('#mEnq')?.addEventListener('click', () =>
        toContact(p.cat === 'Commercial' ? 'Commercial construction' : 'Residential construction')
      );
    });
  }

  // Upcoming project click -> Register Interest
  const soonGridEl = $('#soon-grid');
  if (soonGridEl) {
    soonGridEl.addEventListener('click', (e: any) => {
      const b = e.target.closest('[data-soon]');
      if (!b) return;
      const p = DATA.soon[+b.dataset.soon];
      if (!p) return;

      openModal(
        `<div class="mtxt" style="padding-top:34px"><p class="eyebrow">Register interest</p><h3>${p.n}</h3><p>${p.loc} · Launch ${p.when}. Leave your number and our team will connect with you before public launch.</p><form class="form" id="intForm" novalidate style="margin-top:20px"><div class="field"><label for="int-phone">Phone number</label><input id="int-phone" type="tel" placeholder="+91" autocomplete="tel"><div class="err">Enter a valid phone number.</div></div><button class="btn btn-primary" type="submit">Register Interest</button></form><div class="ok" id="intOk" style="margin-top:18px">Thank you. We will contact you before the launch.</div></div>`
      );

      $('#intForm')?.addEventListener('submit', async (ev: any) => {
        ev.preventDefault();
        const w = $('#int-phone')?.closest('.field');
        const phoneVal = ($('#int-phone') as HTMLInputElement)?.value.trim() || '';
        const ok = /^[+\d][\d\s-]{7,}$/.test(phoneVal);
        w?.classList.toggle('bad', !ok);

        if (ok) {
          try {
            await fetch('/api/registrations', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                projectName: p.n,
                phone: phoneVal,
              }),
            });
            if ($('#intForm')) $('#intForm').style.display = 'none';
            if ($('#intOk')) $('#intOk').classList.add('show');
          } catch {
            alert('Failed to register interest. Please try again.');
          }
        }
      });
    });
  }

  // 16. LIVE TWO-TOWER CRANES CONSTRUCTION SITE CANVAS SIMULATION
  const stopCanvas = initLiveSiteCanvas();

  return () => {
    clearInterval(auto);
    if (stopCanvas) stopCanvas();
  };
}

// Attach to window so it is accessible
if (typeof window !== 'undefined') {
  (window as any).__initAdityarajWebsite = initAdityarajWebsite;
}

// 2-Cranes Construction Canvas
function initLiveSiteCanvas(): (() => void) | undefined {
  const cvEl = document.getElementById('siteCanvas') as HTMLCanvasElement | null;
  if (!cvEl) return;
  const cv: HTMLCanvasElement = cvEl;
  const ctx = cv.getContext('2d') as CanvasRenderingContext2D;
  if (!ctx) return;

  const W = 640,
    H = 420,
    G = 372;
  const BG = '#0e1626',
    AC = '#f2a63b',
    BL = '#7fb0ea',
    INK = '#f1ede4',
    RED = '#e0483e';
  let sc = 1;

  function size() {
    const r = cv.getBoundingClientRect(),
      d = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.max(2, Math.round(r.width * d));
    cv.height = Math.round((cv.width * H) / W);
    sc = cv.width / W;
  }

  const HX = 250,
    HW = 170,
    WALL = 56,
    SL = 8,
    FD = 8;
  const y1 = G - FD,
    yw1 = y1 - WALL,
    ys1 = yw1 - SL,
    yw2 = ys1 - WALL,
    ys2 = yw2 - SL,
    apex = ys2 - 44;

  const P = [
    { k: 'slab', x: HX - 6, y: y1, w: HW + 12, h: FD, n: 'Foundation' },
    { k: 'wall', x: HX, y: yw1, w: 85, h: WALL, n: 'Ground floor walls' },
    { k: 'wall', x: HX + 85, y: yw1, w: 85, h: WALL, n: 'Ground floor walls' },
    { k: 'slab', x: HX - 6, y: ys1, w: HW + 12, h: SL, n: 'First floor slab' },
    { k: 'wall', x: HX, y: yw2, w: 85, h: WALL, n: 'First floor walls' },
    { k: 'wall', x: HX + 85, y: yw2, w: 85, h: WALL, n: 'First floor walls' },
    { k: 'slab', x: HX - 6, y: ys2, w: HW + 12, h: SL, n: 'Roof slab' },
    { k: 'roofL', x: HX - 10, y: apex, w: 95, h: 44, n: 'Roof framing' },
    { k: 'roofR', x: HX + 85, y: apex, w: 95, h: 44, n: 'Roof framing' },
  ];
  P.forEach((p: any, i: number) => {
    p.i = i;
    p.st = 'wait';
  });

  const cranes = [
    { id: 'A', mx: 105, jy: 50, jx0: 52, jx1: 446, cw: 'l', tmin: 140, tmax: 440, pile: 190, tx: 300, hy: 84, st: 'idle', pc: null as any, t: 0, vel: 0, off: 0 },
    { id: 'B', mx: 585, jy: 92, jx0: 250, jx1: 628, cw: 'r', tmin: 262, tmax: 560, pile: 505, tx: 420, hy: 126, st: 'idle', pc: null as any, t: 0, vel: 0, off: 0 },
  ];

  const TRAVEL = 34;
  let placed = 0,
    assigned = 0,
    phase = 'build',
    doneT = 0,
    fadeT = 0,
    fin = 0,
    elapsed = 0,
    paused = false,
    speed = 1,
    parts: any[] = [];
  const workers = [
    { x: 214, min: 196, max: 238, dir: 1, sp: 16 },
    { x: 470, min: 440, max: 500, dir: -1, sp: 13 },
  ];
  const clouds = [
    { x: 60, y: 96, s: 1 },
    { x: 380, y: 62, s: 0.8 },
    { x: 560, y: 130, s: 0.9 },
  ];

  function approach(v: number, t: number, s: number) {
    const d = t - v;
    return Math.abs(d) <= s ? t : v + Math.sign(d) * s;
  }

  function place(c: any) {
    const p = c.pc;
    p.st = 'placed';
    placed++;
    c.pc = null;
    c.st = 'raise';
    for (let i = 0; i < 9; i++) parts.push({ x: p.x + Math.random() * p.w, y: p.y + p.h, vx: (Math.random() - 0.5) * 50, vy: -Math.random() * 26, l: 1 });
    hud();
  }

  function upd(c: any, dt: number) {
    const ts = 170 * dt,
      hs = 200 * dt,
      trav = c.jy + TRAVEL,
      ptx = c.tx;
    switch (c.st) {
      case 'idle':
        c.tx = approach(c.tx, (c.tmin + c.tmax) / 2, ts * 0.6);
        c.hy = approach(c.hy, trav, hs);
        if (assigned < P.length && assigned - placed < 2) {
          c.pc = P[assigned++];
          c.pc.st = 'pile';
          c.pc.own = c;
          c.st = 'toPile';
        }
        break;
      case 'toPile':
        c.hy = approach(c.hy, trav, hs);
        c.tx = approach(c.tx, c.pile, ts);
        if (c.tx === c.pile) c.st = 'lowerPick';
        break;
      case 'lowerPick': {
        const ty = G - c.pc.h - 18;
        c.hy = approach(c.hy, ty, hs);
        if (c.hy === ty) {
          c.t += dt;
          if (c.t > 0.4) {
            c.t = 0;
            c.pc.st = 'carry';
            c.st = 'hoist';
          }
        }
        break;
      }
      case 'hoist':
        c.hy = approach(c.hy, trav, hs);
        if (c.hy === trav) c.st = 'toTarget';
        break;
      case 'toTarget': {
        const tt = clamp(c.pc.x + c.pc.w / 2, c.tmin, c.tmax);
        c.tx = approach(c.tx, tt, ts);
        if (c.tx === tt) c.st = 'waitTurn';
        break;
      }
      case 'waitTurn':
        if (c.pc.i === placed) c.st = 'lowerPlace';
        break;
      case 'lowerPlace': {
        const ty = c.pc.y - 18;
        c.hy = approach(c.hy, ty, hs);
        if (c.hy === ty) {
          c.t += dt;
          if (c.t > 0.35) {
            c.t = 0;
            place(c);
          }
        }
        break;
      }
      case 'raise':
        c.hy = approach(c.hy, trav, hs);
        if (c.hy === trav) c.st = 'idle';
        break;
    }
    if (dt > 0) {
      const vx = (c.tx - ptx) / dt;
      c.vel += (vx - c.vel) * Math.min(1, dt * 6);
      c.off += (-c.vel * 0.05 - c.off) * Math.min(1, dt * 5);
    }
  }

  function reset() {
    P.forEach((p: any) => {
      p.st = 'wait';
      p.own = null;
    });
    placed = 0;
    assigned = 0;
    phase = 'build';
    fin = 0;
    doneT = 0;
    fadeT = 0;
    cranes.forEach((c: any) => {
      c.st = 'idle';
      c.pc = null;
      c.t = 0;
    });
    hud();
  }

  function step(dt: number) {
    elapsed += dt;
    if (phase === 'build') {
      cranes.forEach((c: any) => upd(c, dt));
      if (placed === P.length) {
        phase = 'done';
        doneT = 0;
        hud();
      }
    } else if (phase === 'done') {
      doneT += dt;
      fin = Math.min(1, doneT / 1.4);
      cranes.forEach((c: any) => upd(c, dt));
      if (doneT > 5.5) {
        phase = 'fade';
        fadeT = 0;
      }
    } else {
      fadeT += dt;
      cranes.forEach((c: any) => upd(c, dt));
      if (fadeT > 1) {
        reset();
      }
    }
    parts.forEach(q => {
      q.x += q.vx * dt;
      q.y += q.vy * dt;
      q.vy += 60 * dt;
      q.l -= dt * 1.4;
    });
    parts = parts.filter(q => q.l > 0);
    workers.forEach(w => {
      w.x += w.dir * w.sp * dt;
      if (w.x > w.max) {
        w.x = w.max;
        w.dir = -1;
      }
      if (w.x < w.min) {
        w.x = w.min;
        w.dir = 1;
      }
    });
    clouds.forEach(c => {
      c.x += 4 * dt;
      if (c.x > W + 50) c.x = -60;
    });
  }

  function line(a: number, b: number, c: number, d: number) {
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(c, d);
    ctx.stroke();
  }

  function drawPiece(p: any, x: number, y: number, f: number) {
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = BL;
    ctx.fillStyle = BG;
    if (p.k === 'wall') {
      ctx.fillRect(x, y, p.w, p.h);
      ctx.strokeRect(x, y, p.w, p.h);
      ctx.save();
      ctx.globalAlpha *= 0.35;
      ctx.lineWidth = 0.8;
      for (let r = 8; r < p.h; r += 8) line(x, y + r, x + p.w, y + r);
      for (let r = 0; r < p.h; r += 8) {
        const o = (r / 8) % 2 ? 0 : 6;
        for (let cx = x + o + 12; cx < x + p.w; cx += 12) line(cx, y + r, cx, y + r + 8);
      }
      ctx.restore();
      if (f > 0) {
        ctx.save();
        ctx.globalAlpha *= f * 0.92;
        ctx.fillStyle = '#f1dcae';
        ctx.fillRect(x + 1, y + 1, p.w - 2, p.h - 2);
        ctx.restore();
      }
    } else if (p.k === 'slab') {
      ctx.fillStyle = '#1a2a44';
      ctx.fillRect(x, y, p.w, p.h);
      ctx.strokeRect(x, y, p.w, p.h);
      ctx.save();
      ctx.globalAlpha *= 0.4;
      ctx.lineWidth = 0.8;
      for (let i = 4; i < p.w; i += 10) line(x + i, y + p.h, x + i + p.h, y);
      ctx.restore();
      if (f > 0) {
        ctx.save();
        ctx.globalAlpha *= f * 0.7;
        ctx.fillStyle = '#b9bcc6';
        ctx.fillRect(x + 1, y + 1, p.w - 2, p.h - 2);
        ctx.restore();
      }
    } else {
      ctx.beginPath();
      if (p.k === 'roofL') {
        ctx.moveTo(x, y + p.h);
        ctx.lineTo(x + p.w, y);
        ctx.lineTo(x + p.w, y + p.h);
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(x + p.w, y + p.h);
        ctx.lineTo(x, y + p.h);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      if (f > 0) {
        ctx.save();
        ctx.globalAlpha *= f * 0.95;
        ctx.fillStyle = RED;
        ctx.fill();
        ctx.restore();
        ctx.stroke();
      }
    }
  }

  function drawCrane(c: any) {
    ctx.strokeStyle = AC;
    ctx.lineWidth = 1.5;
    ctx.fillStyle = BG;
    const x0 = c.mx - 8,
      x1 = c.mx + 8,
      top = c.jy - 4;
    ctx.beginPath();
    ctx.moveTo(x0, G);
    ctx.lineTo(x0, top);
    ctx.moveTo(x1, G);
    ctx.lineTo(x1, top);
    for (let y = G, i = 0; y - 16 >= top; y -= 16, i++) {
      const a = i % 2 ? x1 : x0,
        b = i % 2 ? x0 : x1;
      ctx.moveTo(a, y);
      ctx.lineTo(b, y - 16);
    }
    ctx.stroke();
    ctx.strokeRect(x0 - 10, G - 6, 36, 6);
    const ax = c.mx,
      ay = c.jy - 42;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(c.jx0, c.jy);
    ctx.moveTo(ax, ay);
    ctx.lineTo(c.jx1, c.jy);
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax, top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(c.jx0, c.jy);
    ctx.lineTo(c.jx1, c.jy);
    ctx.moveTo(c.jx0, c.jy + 9);
    ctx.lineTo(c.jx1, c.jy + 9);
    for (let x = c.jx0, i = 0; x + 14 <= c.jx1; x += 14, i++) {
      ctx.moveTo(i % 2 ? x + 14 : x, c.jy + (i % 2 ? 0 : 9));
      ctx.lineTo(i % 2 ? x : x + 14, c.jy + (i % 2 ? 9 : 0));
    }
    ctx.stroke();
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = AC;
    const cwx = c.cw === 'l' ? c.jx0 : c.jx1 - 26;
    ctx.fillRect(cwx, c.jy + 9, 26, 16);
    ctx.restore();
    ctx.strokeRect(cwx, c.jy + 9, 26, 16);
    ctx.fillRect(c.mx - 3, c.jy + 10, 16, 12);
    ctx.strokeRect(c.mx - 3, c.jy + 10, 16, 12);
    const on = Math.floor(elapsed * 2) % 2 === 0;
    ctx.fillStyle = on ? RED : '#5a2a2a';
    ctx.beginPath();
    ctx.arc(ax, ay - 3, 2.5, 0, 6.3);
    ctx.fill();

    const hx = c.tx + c.off;
    ctx.fillStyle = AC;
    ctx.fillRect(c.tx - 7, c.jy + 9, 14, 6);
    ctx.lineWidth = 1;
    line(c.tx, c.jy + 15, hx, c.hy - 6);
    ctx.fillStyle = AC;
    ctx.fillRect(hx - 5, c.hy - 6, 10, 10);
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(hx, c.hy + 6, 3.2, 0, Math.PI);
    ctx.stroke();
    if (c.pc && c.pc.st === 'carry') {
      const p = c.pc;
      ctx.lineWidth = 1;
      ctx.strokeStyle = AC;
      line(hx, c.hy + 4, hx - p.w / 2 + 3, c.hy + 18);
      line(hx, c.hy + 4, hx + p.w / 2 - 3, c.hy + 18);
    }
  }

  function drawWorker(w: any) {
    const x = w.x,
      y = G,
      s = Math.sin(elapsed * 8 + w.min) * 4;
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.3;
    ctx.fillStyle = BG;
    ctx.beginPath();
    ctx.arc(x, y - 26, 3, 0, 6.3);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = AC;
    ctx.beginPath();
    ctx.arc(x, y - 27, 4, Math.PI, 0);
    ctx.fill();
    line(x, y - 23, x, y - 11);
    line(x, y - 20, x + w.dir * 3 + s * 0.4, y - 14);
    line(x, y - 11, x + s, y);
    line(x, y - 11, x - s, y);
  }

  function cloud(c: any) {
    ctx.save();
    ctx.strokeStyle = BL;
    ctx.globalAlpha = 0.3;
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    const x = c.x,
      y = c.y,
      s = c.s;
    ctx.beginPath();
    ctx.arc(x, y, 10 * s, Math.PI, 0);
    ctx.moveTo(x + 4 * s, y - 8 * s);
    ctx.arc(x + 14 * s, y - 4 * s, 12 * s, Math.PI, 0);
    ctx.moveTo(x + 31 * s, y);
    ctx.arc(x + 30 * s, y, 9 * s, Math.PI * 1.1, 0);
    ctx.moveTo(x - 10 * s, y);
    ctx.lineTo(x + 39 * s, y);
    ctx.stroke();
    ctx.restore();
  }

  function txt(s: string, x: number, y: number, col: string, al?: number) {
    ctx.save();
    ctx.fillStyle = col;
    ctx.globalAlpha = al || 0.8;
    ctx.font = '500 10px "IBM Plex Mono",monospace';
    ctx.fillText(s, x, y);
    ctx.restore();
  }

  function render() {
    ctx.setTransform(sc, 0, 0, sc, 0, 0);
    ctx.clearRect(0, 0, W, H);
    clouds.forEach(cloud);

    ctx.strokeStyle = AC;
    ctx.lineWidth = 1.6;
    line(0, G, W, G);
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = BL;
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 1;
    line(0, G + 10, W, G + 10);
    line(0, G + 22, W, G + 22);
    ctx.restore();

    txt('±0.00', 14, G - 8, BL, 0.8);
    ctx.strokeStyle = BL;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(14, G - 1);
    ctx.lineTo(20, G - 9);
    ctx.lineTo(26, G - 1);
    ctx.stroke();

    ctx.save();
    ctx.strokeStyle = BL;
    ctx.globalAlpha = 0.7;
    ctx.lineWidth = 0.9;
    line(HX - 6, G + 34, HX + HW + 6, G + 34);
    line(HX - 6, G + 29, HX - 6, G + 39);
    line(HX + HW + 6, G + 29, HX + HW + 6, G + 39);
    ctx.restore();
    txt('17.0 M', HX + HW / 2 - 18, G + 31, BL, 0.85);
    txt('SECTION A–A', W - 100, G + 34, BL, 0.6);

    cranes.forEach(c => {
      ctx.strokeStyle = BL;
      ctx.lineWidth = 1;
      ctx.strokeRect(c.pile - 40, G - 5, 80, 5);
      ctx.save();
      ctx.globalAlpha = 0.5;
      for (let i = 0; i < 6; i++) line(c.pile - 34 + i * 13, G - 5, c.pile - 34 + i * 13, G);
      ctx.restore();
    });

    ctx.save();
    ctx.globalAlpha = phase === 'fade' ? Math.max(0, 1 - fadeT) : 1;
    P.forEach((p: any) => {
      if (p.st === 'placed') drawPiece(p, p.x, p.y, fin);
    });
    if (fin > 0) {
      ctx.save();
      ctx.globalAlpha *= fin;
      ctx.fillStyle = BL;
      ctx.strokeStyle = '#0e1626';
      ctx.lineWidth = 1;
      ctx.fillRect(HX + 18, yw1 + 16, 28, 22);
      ctx.fillRect(HX + HW - 46, yw1 + 16, 28, 22);
      ctx.fillRect(HX + 18, yw2 + 16, 28, 22);
      ctx.fillRect(HX + HW - 46, yw2 + 16, 28, 22);
      ctx.fillStyle = AC;
      ctx.fillRect(HX + HW / 2 - 12, y1 - 34, 24, 34);
      ctx.fillStyle = BG;
      ctx.fillRect(HX + HW / 2 + 5, y1 - 18, 3, 3);
      ctx.fillStyle = '#7cc24a';
      ctx.beginPath();
      ctx.arc(HX - 22, G - 8, 8, 0, 6.3);
      ctx.arc(HX + HW + 24, G - 8, 10, 0, 6.3);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();

    P.forEach((p: any) => {
      if (p.st === 'pile') {
        drawPiece(p, p.own.pile - p.w / 2, G - p.h - 5, 0);
      } else if (p.st === 'carry') {
        const c = p.own;
        drawPiece(p, c.tx + c.off - p.w / 2, c.hy + 18, 0);
      }
    });

    workers.forEach(drawWorker);
    cranes.forEach(drawCrane);

    ctx.fillStyle = 'rgba(241,237,228,.5)';
    parts.forEach(q => {
      ctx.globalAlpha = Math.max(0, q.l) * 0.6;
      ctx.beginPath();
      ctx.arc(q.x, q.y, 2.2 * q.l + 0.6, 0, 6.3);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (phase !== 'build') {
      ctx.save();
      ctx.globalAlpha = phase === 'fade' ? Math.max(0, 1 - fadeT) : Math.min(1, doneT / 1.2);
      ctx.fillStyle = 'rgba(11,17,29,.86)';
      ctx.fillRect(W / 2 - 96, 34, 192, 30);
      ctx.strokeStyle = AC;
      ctx.lineWidth = 1;
      ctx.strokeRect(W / 2 - 96, 34, 192, 30);
      ctx.fillStyle = AC;
      ctx.font = '500 12px "IBM Plex Mono",monospace';
      ctx.textAlign = 'center';
      ctx.fillText('HANDED OVER  ✓', W / 2, 54);
      ctx.restore();
    }
  }

  function hud() {
    const pct = Math.round((placed / P.length) * 100);
    const hudPct = document.getElementById('hudPct');
    const hudBar = document.getElementById('hudBar');
    const hudStage = document.getElementById('hudStage');
    if (hudPct) hudPct.textContent = pct + '%';
    if (hudBar) hudBar.style.width = pct + '%';
    if (hudStage) hudStage.textContent = placed >= P.length ? 'Handed over' : placed === 0 ? 'Site setup' : (P[placed - 1] as any).n;
  }

  const btnPause = document.getElementById('btnPause');
  const btnSpeed = document.getElementById('btnSpeed');
  const btnRestart = document.getElementById('btnRestart');

  if (btnPause) {
    btnPause.addEventListener('click', (e: any) => {
      paused = !paused;
      e.currentTarget.textContent = paused ? 'Resume' : 'Pause';
    });
  }
  if (btnSpeed) {
    btnSpeed.addEventListener('click', (e: any) => {
      speed = speed === 1 ? 2.5 : 1;
      e.currentTarget.textContent = speed === 1 ? '2× speed' : '1× speed';
    });
  }
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      reset();
      parts = [];
    });
  }
  cv.addEventListener('click', () => {
    speed = speed === 1 ? 2.5 : 1;
    if (btnSpeed) btnSpeed.textContent = speed === 1 ? '2× speed' : '1× speed';
  });

  window.addEventListener('resize', size);
  size();

  let last = performance.now();
  let rafId = 0;
  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (document.visibilityState === 'visible') {
      step(paused ? 0 : dt * speed);
      render();
    }
    rafId = requestAnimationFrame(frame);
  }
  hud();
  rafId = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', size);
  };
}

function initDoodles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('doodle-svg-sprite')) return;

  const ticks = (n: number, x0: number, step: number, y0: number, long: number, short: number, every: number) => {
    let d = '';
    for (let i = 0; i < n; i++) {
      d += 'M' + (x0 + i * step) + ' ' + y0 + 'v' + (i % every === 0 ? long : short);
    }
    return d;
  };

  const S: Record<string, [string, string]> = {
    compass: ['0 0 100 100', '<circle cx="50" cy="11" r="5"/><path d="M50 16v12M44 28h12"/><path d="M50 28L27 88M50 28L73 88"/><path d="M27 88l-3 10M73 88l4 10"/><path d="M38 58q12 7 24 0"/><circle cx="50" cy="28" r="2.5"/>'],
    ruler: ['0 0 220 44', '<rect x="2" y="2" width="216" height="40" rx="4"/><path d="' + ticks(21, 12, 10, 2, 16, 9, 5) + '"/><path d="M12 30h6M62 30h6M112 30h6M162 30h6" opacity=".6"/>'],
    pencil: ['0 0 220 40', '<path d="M40 8H168V32H40L8 20Z"/><path d="M40 8V32M168 8V32M168 14H186M168 26H186"/><path d="M8 20h8"/><path d="M186 8h22a4 4 0 014 4v16a4 4 0 01-4 4h-22z"/><path d="M40 16H168M40 24H168" opacity=".45"/>'],
    eraser: ['0 0 110 64', '<rect x="6" y="10" width="98" height="44" rx="8"/><path d="M62 10V54"/><path d="M14 20l10-8M14 34l22-22M14 48l36-36M24 54l36-36" opacity=".4"/>'],
    sheet: ['0 0 130 100', '<path d="M14 10H122V90H14Z"/><path d="M20 16H116V84H20Z" opacity=".5"/><path d="M14 10q-10 0-10 10t10 10"/><path d="M70 66H116V84H70Z M70 72H116 M92 66V84"/><path d="M28 24H62V50H28Z M28 37H62 M45 24V50 M70 24H108 M70 32H100 M70 40H104" /><path d="M28 60H60" opacity=".6"/>'],
    tape: ['0 0 120 100', '<circle cx="42" cy="52" r="32"/><circle cx="42" cy="52" r="14"/><circle cx="42" cy="52" r="3"/><path d="M72 72H112V86H64"/><path d="M112 72v14"/><path d="' + ticks(8, 76, 4.5, 72, 6, 3, 2) + '"/><path d="M42 20V10h14"/>'],
    setsquare: ['0 0 100 100', '<path d="M8 92V8L92 92Z"/><path d="M26 74V44L56 74Z"/><path d="M8 24h6M8 40h6M8 56h6M8 72h6M24 92v-6M40 92v-6M56 92v-6M72 92v-6"/>'],
    protractor: ['0 0 120 70', '<path d="M6 62a54 54 0 01108 0Z"/><path d="M26 62a34 34 0 0168 0"/><path d="M60 62V54M60 8V14M6 62h14M100 62h14M24 24l6 6M96 24l-6 6"/>'],
    tsquare: ['0 0 170 100', '<rect x="6" y="6" width="22" height="88" rx="3"/><rect x="28" y="40" width="136" height="20" rx="2"/><path d="' + ticks(13, 40, 10, 60, -8, -4, 5).replace(/v-/g, 'v-') + '"/>'],
    helmet: ['0 0 100 100', '<path d="M14 64a36 36 0 0172 0"/><path d="M8 64h84v12H8z"/><path d="M50 28v36M36 36v28M64 36v28"/><path d="M44 22h12" />'],
    level: ['0 0 220 44', '<rect x="2" y="6" width="216" height="32" rx="6"/><rect x="84" y="12" width="52" height="20" rx="10"/><circle cx="110" cy="22" r="5"/><path d="M96 12v20M124 12v20"/><path d="' + ticks(6, 18, 10, 12, 8, 8, 1) + 'M160 12v8M170 12v8M180 12v8M190 12v8M200 12v8"/>'],
  };

  let h = '<svg id="doodle-svg-sprite" xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0" aria-hidden="true">';
  Object.keys(S).forEach(k => {
    h += `<symbol id="d-${k}" viewBox="${S[k][0]}"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${S[k][1]}</g></symbol>`;
  });
  document.body.insertAdjacentHTML('afterbegin', h + '</svg>');

  const DOODLES: Array<[string, string, string, number, number, number, string]> = [
    ['#home', 'compass', 'top:6%;right:3%', 96, -14, 0.05, 'keep'],
    ['#home', 'helmet', 'top:9%;left:47%', 62, 8, 0.04, 'b'],
    ['#home', 'ruler', 'bottom:7%;left:44%', 210, -5, 0.06, 'b'],
    ['#about', 'sheet', 'top:7%;right:3%', 140, 10, 0.05, ''],
    ['#about', 'pencil', 'bottom:6%;left:2%', 200, -24, 0.08, 'b'],
    ['#compare', 'eraser', 'top:9%;right:5%', 100, 14, 0.05, 'keep'],
    ['#compare', 'pencil', 'bottom:5%;right:8%', 190, -8, 0.07, 'b'],
    ['#why', 'setsquare', 'bottom:5%;right:3%', 120, -8, 0.06, ''],
    ['#why', 'compass', 'top:5%;left:1%', 80, 18, 0.05, 'b'],
    ['#services', 'tape', 'top:5%;right:3%', 120, -10, 0.05, ''],
    ['#services', 'ruler', 'bottom:3%;left:3%', 230, -3, 0.06, 'b'],
    ['#spec', 'protractor', 'top:7%;right:6%', 130, 6, 0.05, 'b'],
    ['#spec', 'tsquare', 'bottom:4%;right:2%', 180, -7, 0.06, ''],
    ['#projects', 'sheet', 'top:5%;right:2%', 130, -8, 0.05, 'keep'],
    ['#projects', 'helmet', 'bottom:3%;left:2%', 80, -10, 0.05, ''],
    ['#active', 'level', 'top:6%;right:4%', 220, -6, 0.06, 'b'],
    ['#active', 'tape', 'bottom:4%;left:2%', 100, 12, 0.05, ''],
    ['#upcoming', 'pencil', 'top:5%;right:5%', 210, 12, 0.06, ''],
    ['#upcoming', 'ruler', 'bottom:4%;left:2%', 230, 4, 0.05, 'b'],
    ['#reviews', 'setsquare', 'top:5%;left:1%', 100, 14, 0.05, 'b'],
    ['#reviews', 'eraser', 'bottom:5%;right:3%', 90, -12, 0.05, ''],
    ['#addreview', 'compass', 'bottom:5%;left:3%', 90, -8, 0.05, ''],
    ['#addreview', 'pencil', 'top:6%;right:3%', 190, -20, 0.06, 'b'],
    ['#owner', 'tape', 'top:6%;right:3%', 120, 8, 0.05, 'b'],
    ['#owner', 'compass', 'bottom:4%;left:1%', 90, 16, 0.05, ''],
    ['#gallery', 'ruler', 'top:3%;left:40%', 220, 0, 0.04, ''],
    ['#contact', 'pencil', 'top:4%;right:3%', 200, 18, 0.06, ''],
    ['#contact', 'eraser', 'bottom:3%;left:44%', 90, 10, 0.05, 'b'],
    ['#contact', 'sheet', 'bottom:6%;right:3%', 130, -8, 0.05, ''],
  ];

  DOODLES.forEach((d, i) => {
    const sec = document.querySelector(d[0]);
    if (!sec) return;
    const el = document.createElement('span');
    el.className = 'dd ' + d[6];
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = d[2] + ';width:' + d[3] + 'px;--r:' + d[4] + 'deg;--dl:-' + ((i * 1.3) % 8).toFixed(1) + 's';
    el.dataset.sp = String(d[5]);
    el.innerHTML = '<svg viewBox="' + S[d[1]][0] + '"><use href="#d-' + d[1] + '"/></svg>';
    sec.appendChild(el);
  });
}

