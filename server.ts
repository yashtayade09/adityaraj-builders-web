import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { db, verifyPassword } from './src/backend/db';
import { renderOwnerLoginPage, renderOwnerDashboardPage } from './src/backend/dashboardView';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '12mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files from public directory
app.use(express.static(path.resolve(process.cwd(), 'public')));

// Active session token store
const activeSessions = new Set<string>();

function generateSessionToken(): string {
  return 'adityaraj_sess_' + crypto.randomBytes(24).toString('hex');
}

// Authentication middleware for Owner Dashboard
function checkOwnerAuth(req: express.Request): boolean {
  const token = req.cookies['adityaraj_session_token'];
  return !!(token && activeSessions.has(token));
}

// ==========================================
// 1. OWNER AUTHENTICATION & DASHBOARD ROUTES
// ==========================================

app.get('/owner/login/', (req, res) => {
  if (checkOwnerAuth(req)) {
    return res.redirect('/owner/dashboard/');
  }
  res.send(renderOwnerLoginPage());
});

app.post('/owner/login/', (req, res) => {
  const { username, password } = req.body;
  const owner = db.get().owner;

  if (username === owner.username && verifyPassword(password, owner.passwordHash, owner.salt)) {
    const token = generateSessionToken();
    activeSessions.add(token);
    res.cookie('adityaraj_session_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'lax',
    });
    return res.redirect('/owner/dashboard/');
  }

  res.send(renderOwnerLoginPage('Incorrect username or password. Please try again.'));
});

app.get('/owner/dashboard/', (req, res) => {
  if (!checkOwnerAuth(req)) {
    return res.redirect('/owner/login/');
  }
  res.send(renderOwnerDashboardPage());
});

app.get('/owner/logout/', (req, res) => {
  const token = req.cookies['adityaraj_session_token'];
  if (token) {
    activeSessions.delete(token);
    res.clearCookie('adityaraj_session_token');
  }
  res.redirect('/owner/login/');
});

// ==========================================
// 2. PUBLIC API ENDPOINTS (For Website)
// ==========================================

// Get published data for public website rendering
app.get('/api/public/data', (req, res) => {
  const data = db.get();
  const completedProjects = data.projects.filter(p => p.published && p.status === 'Completed');
  const activeProjects = data.projects.filter(p => p.published && p.status === 'Active');
  const upcomingProjects = data.projects.filter(p => p.published && p.status === 'Upcoming');
  const approvedReviews = data.reviews.filter(r => r.status === 'Approved');
  const publishedGallery = data.gallery.filter(g => g.published);
  const publishedServices = data.services.filter(s => s.published);

  res.json({
    company: data.company,
    content: data.content,
    services: publishedServices,
    projects: {
      done: completedProjects,
      active: activeProjects,
      soon: upcomingProjects,
    },
    reviews: approvedReviews,
    gallery: publishedGallery,
  });
});

// Submit customer enquiry (#enqForm)
app.post('/api/enquiries', (req, res) => {
  const { name, phone, email, projectType, budget, message } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: 'Please enter your full name.' });
  }
  if (!phone || !/^[+\d][\d\s-]{7,}$/.test(phone.trim())) {
    return res.status(400).json({ error: 'Please enter a valid phone number.' });
  }

  const current = db.get();
  const newEnq = {
    id: 'enq_' + Date.now(),
    name: name.trim(),
    phone: phone.trim(),
    email: (email || '').trim(),
    projectType: (projectType || 'Residential construction').trim(),
    budget: (budget || 'Not decided yet').trim(),
    message: (message || '').trim(),
    createdAt: new Date().toISOString(),
    status: 'New' as const,
  };

  current.enquiries.unshift(newEnq);
  db.save(current);

  res.json({ success: true, id: newEnq.id });
});

// Submit customer review (#reviewForm)
app.post('/api/reviews', (req, res) => {
  const { name, rating, message } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: 'Please enter your name.' });
  }
  if (!message || message.trim().length < 5) {
    return res.status(400).json({ error: 'Please write a short review.' });
  }

  const star = Math.max(1, Math.min(5, parseInt(rating) || 5));
  const current = db.get();
  const newRev = {
    id: 'rev_' + Date.now(),
    name: name.trim(),
    projectType: 'Verified Customer',
    rating: star,
    message: message.trim(),
    createdAt: new Date().toISOString(),
    status: 'Pending' as const, // Pending owner approval
  };

  current.reviews.unshift(newRev);
  db.save(current);

  res.json({ success: true, id: newRev.id });
});

// Register interest for upcoming project (#intForm)
app.post('/api/registrations', (req, res) => {
  const { projectId, projectName, phone } = req.body;

  if (!phone || !/^[+\d][\d\s-]{7,}$/.test(phone.trim())) {
    return res.status(400).json({ error: 'Please enter a valid phone number.' });
  }

  const current = db.get();
  const cleanPhone = phone.trim();

  // Prevent duplicate within 24 hours
  const existing = current.registrations.find(
    r => r.phone === cleanPhone && (r.projectId === projectId || r.projectName === projectName)
  );

  if (existing) {
    return res.json({ success: true, message: 'Already registered' });
  }

  const newReg = {
    id: 'reg_' + Date.now(),
    projectId: projectId || '',
    projectName: projectName || 'Upcoming Project',
    phone: cleanPhone,
    createdAt: new Date().toISOString(),
    status: 'New' as const,
  };

  current.registrations.unshift(newReg);
  db.save(current);

  res.json({ success: true, id: newReg.id });
});

// ==========================================
// 3. OWNER DASHBOARD API ENDPOINTS
// ==========================================

function requireOwnerApi(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!checkOwnerAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized. Please login.' });
  }
  next();
}


// Photo upload (dashboard sends the image as a data URL)
app.post('/api/owner/upload', requireOwnerApi, (req, res) => {
  const m = /^data:image\/(png|jpeg|webp|gif);base64,(.+)$/.exec(String(req.body?.data || ''));
  if (!m) return res.status(400).json({ error: 'Please choose a PNG, JPG, WEBP or GIF image.' });
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > 8 * 1024 * 1024) return res.status(400).json({ error: 'Image is too big (max 8 MB).' });
  const dir = path.resolve(process.cwd(), 'public', 'uploads');
  fs.mkdirSync(dir, { recursive: true });
  const name = crypto.randomBytes(8).toString('hex') + '.' + (m[1] === 'jpeg' ? 'jpg' : m[1]);
  fs.writeFileSync(path.join(dir, name), buf);
  res.json({ success: true, url: '/uploads/' + name });
});

app.get('/api/owner/data', requireOwnerApi, (req, res) => {
  // Never send the owner's password hash/salt to the browser.
  const { owner, ...safe } = db.get();
  res.json(safe);
});

// Update Enquiry status or reply notes
app.patch('/api/owner/enquiries/:id', requireOwnerApi, (req, res) => {
  const current = db.get();
  const enq = current.enquiries.find(e => e.id === req.params.id);
  if (!enq) return res.status(404).json({ error: 'Enquiry not found' });

  if (req.body.status) enq.status = req.body.status;
  if (req.body.replyNotes) enq.replyNotes = req.body.replyNotes;
  db.save(current);

  res.json({ success: true, enquiry: enq });
});

// Log WhatsApp reply
app.post('/api/owner/enquiries/:id/reply', requireOwnerApi, (req, res) => {
  const current = db.get();
  const enq = current.enquiries.find(e => e.id === req.params.id);
  if (!enq) return res.status(404).json({ error: 'Enquiry not found' });

  enq.status = 'Replied';
  enq.repliedAt = new Date().toISOString();
  enq.lastReplyMessage = req.body.message || '';
  enq.replyNotes = req.body.notes || 'Replied via WhatsApp Click-to-Chat';
  db.save(current);

  res.json({ success: true, enquiry: enq });
});

// Projects Management
app.post('/api/owner/projects', requireOwnerApi, (req, res) => {
  const current = db.get();
  const newProj = {
    id: 'p_' + Date.now(),
    name: req.body.name || 'New Project',
    location: req.body.location || 'Akola',
    type: req.body.type || 'Residential',
    category: req.body.category || 'Residential',
    status: req.body.status || 'Active',
    year: req.body.year || '',
    progress: req.body.progress || 0,
    due: req.body.due || '',
    stage: req.body.stage || 'Foundation',
    launchWhen: req.body.launchWhen || '',
    description: req.body.description || '',
    coverImage: req.body.coverImage || '',
    artIndex: Math.floor(Math.random() * 4),
    order: current.projects.length + 1,
    published: true,
  };
  current.projects.unshift(newProj);
  db.save(current);
  res.json({ success: true, project: newProj });
});

app.put('/api/owner/projects/:id', requireOwnerApi, (req, res) => {
  const current = db.get();
  const idx = current.projects.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Project not found' });

  current.projects[idx] = { ...current.projects[idx], ...req.body };
  db.save(current);
  res.json({ success: true, project: current.projects[idx] });
});

app.delete('/api/owner/projects/:id', requireOwnerApi, (req, res) => {
  const current = db.get();
  current.projects = current.projects.filter(p => p.id !== req.params.id);
  db.save(current);
  res.json({ success: true });
});

// Registrations update
app.patch('/api/owner/registrations/:id', requireOwnerApi, (req, res) => {
  const current = db.get();
  const reg = current.registrations.find(r => r.id === req.params.id);
  if (!reg) return res.status(404).json({ error: 'Registration not found' });
  if (req.body.status) reg.status = req.body.status;
  db.save(current);
  res.json({ success: true, registration: reg });
});

// Reviews Management
app.patch('/api/owner/reviews/:id', requireOwnerApi, (req, res) => {
  const current = db.get();
  const rev = current.reviews.find(r => r.id === req.params.id);
  if (!rev) return res.status(404).json({ error: 'Review not found' });
  if (req.body.status) rev.status = req.body.status;
  db.save(current);
  res.json({ success: true, review: rev });
});

app.delete('/api/owner/reviews/:id', requireOwnerApi, (req, res) => {
  const current = db.get();
  current.reviews = current.reviews.filter(r => r.id !== req.params.id);
  db.save(current);
  res.json({ success: true });
});

// Gallery Management
app.post('/api/owner/gallery', requireOwnerApi, (req, res) => {
  const current = db.get();
  const item = {
    id: 'gal_' + Date.now(),
    title: req.body.title || 'Site photo',
    image: req.body.image || '',
    artIndex: Math.floor(Math.random() * 4),
    order: current.gallery.length + 1,
    published: true,
  };
  current.gallery.unshift(item);
  db.save(current);
  res.json({ success: true, item });
});

app.delete('/api/owner/gallery/:id', requireOwnerApi, (req, res) => {
  const current = db.get();
  current.gallery = current.gallery.filter(g => g.id !== req.params.id);
  db.save(current);
  res.json({ success: true });
});

// Services Management
app.post('/api/owner/services', requireOwnerApi, (req, res) => {
  const current = db.get();
  const srv = {
    id: 'srv_' + Date.now(),
    title: req.body.title || 'New Service',
    description: req.body.description || '',
    tag: req.body.tag || '',
    icon: 'M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-6h4v6',
    order: current.services.length + 1,
    published: true,
  };
  current.services.push(srv);
  db.save(current);
  res.json({ success: true, service: srv });
});

app.put('/api/owner/services/:id', requireOwnerApi, (req, res) => {
  const current = db.get();
  const idx = current.services.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Service not found' });
  current.services[idx] = { ...current.services[idx], ...req.body };
  db.save(current);
  res.json({ success: true, service: current.services[idx] });
});

app.delete('/api/owner/services/:id', requireOwnerApi, (req, res) => {
  const current = db.get();
  current.services = current.services.filter(s => s.id !== req.params.id);
  db.save(current);
  res.json({ success: true });
});

// Company Details update
app.put('/api/owner/company', requireOwnerApi, (req, res) => {
  const current = db.get();
  current.company = { ...current.company, ...req.body };
  db.save(current);
  res.json({ success: true, company: current.company });
});

// ==========================================
// 4. FRONTEND SERVING (Vite in Dev Mode)
// ==========================================

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Owner Dashboard: http://localhost:${PORT}/owner/dashboard/`);
  });
}

startServer();
