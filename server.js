import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── MongoDB ─────────────────────────────────────────────────────────
mongoose.connect('mongodb://localhost:27017/hackathon26')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// ─── Multer (file uploads) ────────────────────────────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ['image/jpeg','image/png','application/pdf'].includes(file.mimetype);
    cb(ok ? null : new Error('Unsupported file type'), ok);
  }
});

// ─── Schemas & Models ────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  role:      { type: String, required: true },
  password:  { type: String, required: true },
  phone:     { type: String, default: '' },
  location:  { type: String, default: '' },
  farmName:  { type: String, default: '' },
  farmArea:  { type: String, default: '' }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

const soilAnalysisSchema = new mongoose.Schema({
  userEmail:      { type: String, required: true },
  fieldName:      { type: String, required: true },
  location:       { type: String, default: '' },
  date:           { type: String, required: true },
  parameters:     { ph: Number, n: Number, p: Number, k: Number, moisture: Number, organicMatter: Number },
  healthScore:    { type: Number, default: 0 },
  recommendation: { type: String, default: '' },
  status:         { type: String, default: 'Completed' }
}, { timestamps: true });
const SoilAnalysis = mongoose.model('SoilAnalysis', soilAnalysisSchema);

const listingSchema = new mongoose.Schema({
  farmerEmail: { type: String, required: true },
  farmerName:  { type: String, default: 'Farmer' },
  crop:        { type: String, required: true },
  quantity:    { type: Number, required: true },
  unit:        { type: String, default: 'Quintals' },
  grade:       { type: String, default: 'Standard' },
  price:       { type: Number, required: true },
  location:    { type: String, default: '' },
  status:      { type: String, default: 'Active' }
}, { timestamps: true });
const Listing = mongoose.model('Listing', listingSchema);

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
}, { timestamps: true });
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// ═══════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, role, password } = req.body;
    if (await User.findOne({ email }))
      return res.status(400).json({ error: 'User with this email already exists' });
    await new User({ firstName, lastName, email, role, password }).save();
    res.status(201).json({ message: 'User created successfully', user: { email, role, firstName, lastName } });
  } catch (e) { res.status(500).json({ error: 'Server error during signup' }); }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(400).json({ error: 'Invalid credentials' });
    res.json({
      message: 'Login successful',
      user: { email: user.email, role: user.role, name: `${user.firstName} ${user.lastName}`,
              phone: user.phone, location: user.location, farmName: user.farmName, farmArea: user.farmArea }
    });
  } catch (e) { res.status(500).json({ error: 'Server error during login' }); }
});

app.patch('/api/profile', async (req, res) => {
  try {
    const { email, firstName, lastName, phone, location, farmName, farmArea } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { firstName, lastName, phone, location, farmName, farmArea },
      { new: true }
    );
    // For the hackathon demo, if the dummy user doesn't exist in DB, still return success to update UI
    if (!user) {
      return res.json({ message: 'Profile updated (mock)',
        user: { email, role: 'farmer', name: `${firstName} ${lastName}`,
                phone, location, farmName, farmArea }
      });
    }
    res.json({ message: 'Profile updated',
      user: { email: user.email, role: user.role, name: `${user.firstName} ${user.lastName}`,
              phone: user.phone, location: user.location, farmName: user.farmName, farmArea: user.farmArea }
    });
  } catch (e) { res.status(500).json({ error: 'Failed to update profile' }); }
});

// ═══════════════════════════════════════════════════════════════
// MARKET
// ═══════════════════════════════════════════════════════════════
app.get('/api/market-active', (req, res) => {
  res.json({
    data: [
      { district: 'Ahmednagar', commodity: 'Wheat',       modal_price: 2450 },
      { district: 'Pune',       commodity: 'Onion',       modal_price: 1800 },
      { district: 'Nashik',     commodity: 'Grapes',      modal_price: 4500 },
      { district: 'Nagpur',     commodity: 'Orange',      modal_price: 3200 },
      { district: 'Satara',     commodity: 'Milk',        modal_price: 55   },
      { district: 'Jalgaon',    commodity: 'Banana',      modal_price: 1200 },
      { district: 'Kolhapur',   commodity: 'Sugarcane',   modal_price: 3100 },
      { district: 'Aurangabad', commodity: 'Maize',       modal_price: 2100 },
      { district: 'Solapur',    commodity: 'Pomegranate', modal_price: 6000 },
      { district: 'Ratnagiri',  commodity: 'Mango',       modal_price: 8000 }
    ],
    history: { labels: ['Jan','Feb','Mar','Apr'], rice: [2100,2250,2340,2410] }
  });
});

app.get('/api/geocoding', (req, res) => {
  const { lat, lon } = req.query;
  res.json({ district: 'Kolhapur', state: 'Maharashtra', lat, lon });
});

app.get('/api/weather', (req, res) => {
  res.json({ current: { temp: 28, humidity: 65, rainfall: 120, condition: 'Partly Cloudy' } });
});

// ═══════════════════════════════════════════════════════════════
// SOIL ANALYSIS
// ═══════════════════════════════════════════════════════════════
app.post('/api/soil-analysis', async (req, res) => {
  try {
    const { userEmail, fieldName, location, date, parameters } = req.body;
    let score = 85;
    const p = parameters || {};
    if (p.ph < 6.0 || p.ph > 7.5)                         score -= 15;
    if (p.n  < 30)                                          score -= 10;
    if (p.moisture > 60 || p.moisture < 10)                 score -= 10;
    if (p.p  < 15)                                          score -= 5;
    if (p.k  < 100)                                         score -= 5;
    score = Math.max(0, Math.min(100, score));

    const cropMap = [
      { min: 75, name: 'Wheat',  icon: '🌾', reason: 'Optimal N/P/K levels' },
      { min: 60, name: 'Maize',  icon: '🌽', reason: 'Good moisture & potassium' },
      { min: 40, name: 'Pulses', icon: '🫘', reason: 'Suitable for moderate conditions' },
      { min: 0,  name: 'Sorghum',icon: '🌿', reason: 'Hardy under difficult conditions' }
    ];
    const recommendedCrops = cropMap.filter(c => score >= c.min).slice(0, 3).map(c => ({ ...c, score: score }));
    const rec = score >= 75 ? 'Your soil is healthy. Continue current practices and add organic compost each season.'
              : score >= 60 ? 'Nitrogen is slightly low. Apply Urea 25 kg/ha within 5 days. Maintain irrigation schedule.'
              : score >= 40 ? 'Multiple deficiencies detected. Apply NPK 19-19-19 @ 50 kg/ha. Add lime if pH < 6.'
              : 'Critical soil condition. Immediate amendment required. Contact your local KVK for urgent assistance.';

    const analysis = await new SoilAnalysis({
      userEmail, fieldName, location, date, parameters: p, healthScore: score, recommendation: rec
    }).save();

    res.status(201).json({ ...analysis.toObject(), recommendedCrops });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to save analysis' });
  }
});

// Get all analyses for user
app.get('/api/soil-analyses', async (req, res) => {
  try {
    const { email } = req.query;
    const records = await SoilAnalysis.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(records);
  } catch (e) { res.status(500).json({ error: 'Failed to fetch history' }); }
});

// Get single analysis by ID
app.get('/api/soil-analyses/:id', async (req, res) => {
  try {
    const rec = await SoilAnalysis.findById(req.params.id);
    if (!rec) return res.status(404).json({ error: 'Not found' });
    res.json(rec);
  } catch (e) { res.status(500).json({ error: 'Failed to fetch analysis' }); }
});

// Delete analysis
app.delete('/api/soil-analyses/:id', async (req, res) => {
  try {
    await SoilAnalysis.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (e) { res.status(500).json({ error: 'Failed to delete' }); }
});

// ═══════════════════════════════════════════════════════════════
// DASHBOARD STATS
// ═══════════════════════════════════════════════════════════════
app.get('/api/dashboard-stats', async (req, res) => {
  try {
    const { email } = req.query;
    const totalAnalyses  = await SoilAnalysis.countDocuments({ userEmail: email });
    const totalListings  = await Listing.countDocuments({ farmerEmail: email });
    const recentAnalysis = await SoilAnalysis.findOne({ userEmail: email }).sort({ createdAt: -1 });
    const totalUsers     = await User.countDocuments();
    res.json({
      totalAnalyses,
      totalListings,
      totalUsers,
      lastHealthScore: recentAnalysis?.healthScore ?? '--',
      activeAlerts: totalAnalyses > 0 ? Math.max(1, Math.floor(totalAnalyses * 0.2)) : 0
    });
  } catch (e) { res.status(500).json({ error: 'Failed to fetch stats' }); }
});

// ═══════════════════════════════════════════════════════════════
// F2B LISTINGS
// ═══════════════════════════════════════════════════════════════
app.get('/api/f2b/listings', async (req, res) => {
  try {
    const listings = await Listing.find({ status: 'Active' }).sort({ createdAt: -1 }).limit(20);
    res.json(listings);
  } catch (e) { res.status(500).json({ error: 'Failed to fetch listings' }); }
});

app.post('/api/f2b/listings', async (req, res) => {
  try {
    const { farmerEmail, farmerName, crop, quantity, unit, grade, price, location } = req.body;
    if (!crop || !quantity || !price)
      return res.status(400).json({ error: 'crop, quantity and price are required' });
    const listing = await new Listing({ farmerEmail, farmerName, crop, quantity, unit, grade, price, location }).save();
    res.status(201).json({ message: 'Listing published successfully', listing });
  } catch (e) { res.status(500).json({ error: 'Failed to save listing' }); }
});

app.delete('/api/f2b/listings/:id', async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing removed' });
  } catch (e) { res.status(500).json({ error: 'Failed to remove listing' }); }
});

// ═══════════════════════════════════════════════════════════════
// AI CHAT
// ═══════════════════════════════════════════════════════════════
const farmingKB = [
  { k: ['wheat','rabi'], v: '🌾 Wheat (Rabi crop): Sow Oct–Dec. Requires 4–5 irrigations. NPK: 120:60:40 kg/ha. Harvest March–April. Use HD-2967 or GW-496 for high yield in India.' },
  { k: ['rice','paddy','kharif'], v: '🌾 Rice (Kharif crop): Transplant June–July. Requires flooded fields (5–8 cm water). NPK: 100:50:50 kg/ha. Harvest Oct–Nov. Use Swarna/BPT-5204 for best yields.' },
  { k: ['nitrogen','urea','n deficiency','yellowing'], v: '🧪 Nitrogen Deficiency: Yellowing of lower leaves. Apply Urea (46% N) at 25–50 kg/ha in 2 splits — at sowing and 30 days after. Avoid applying before heavy rain.' },
  { k: ['phosphorus','dap','p deficiency'], v: '🧪 Phosphorus Deficiency: Purple-red leaves, poor roots. Apply DAP (18:46:0) at 15–20 kg/ha at sowing time. Best absorbed in slightly acidic soil (pH 6–6.5).' },
  { k: ['potassium','mop','k deficiency'], v: '🧪 Potassium Deficiency: Brown leaf edges, weak stems. Apply MOP (60% K₂O) at 20–30 kg/ha. Improves drought tolerance, grain quality, and disease resistance.' },
  { k: ['ph','acidic','alkaline','lime'], v: '⚗️ Soil pH: Ideal range 6.0–7.5. Acidic (pH < 6): Apply agricultural lime 500–1000 kg/ha. Alkaline (pH > 8): Use gypsum or ammonium sulphate. Retest after 3 months.' },
  { k: ['irrigation','water','drip','moisture'], v: '💧 Irrigation: Optimal soil moisture 40–60%. Drip irrigation saves 40–50% water vs. flood method. Irrigate early morning (6–8 AM) to minimize evaporation. Avoid waterlogging.' },
  { k: ['pest','insect','aphid','bollworm'], v: '🐛 Pest Control: Use neem oil (5 ml/L) as organic spray. For bollworm: chlorpyrifos 20 EC @ 2 ml/L. For aphids: imidacloprid 17.8 SL @ 0.5 ml/L. Always wear protective gear.' },
  { k: ['disease','fungal','blight','rust'], v: '🍄 Fungal Diseases: For rust/blight apply Mancozeb 75% WP @ 2.5 g/L or Carbendazim @ 1 g/L. Spray every 10–14 days. Avoid overhead irrigation during outbreaks.' },
  { k: ['organic','compost','manure','fym'], v: '🌱 Organic Matter: Apply 5–10 t/ha farmyard manure (FYM) each season. Vermicompost: 2–3 t/ha. Increases water-holding capacity, microbial activity, and long-term soil fertility.' },
  { k: ['scheme','pm','kisan','government'], v: '🏛️ Key Govt Schemes: PM-KISAN (₹6,000/year), PM Fasal Bima Yojana (crop insurance), Soil Health Card (free testing), Kisan Credit Card (low-interest loans). Visit agricoop.nic.in.' },
  { k: ['market','mandi','price','sell','enam'], v: '📈 Market Prices: Check eNAM portal (enam.gov.in) for real-time mandi prices. AgroFarm AI Market tab shows prices from your district. Compare before selling.' },
  { k: ['fertilizer','npk','mix','dose'], v: '💊 NPK Guidelines: Wheat 120:60:40, Rice 100:50:50, Maize 150:75:60, Cotton 150:75:75 kg N:P:K per hectare. Split N into 3 doses — basal, CRI stage, and tillering stage.' },
  { k: ['harvest','yield','production'], v: '🌾 Crop Yields: Wheat 3–4 t/ha, Rice 2.5–3.5 t/ha, Maize 4–6 t/ha. Use certified high-yielding seeds, timely irrigation, and balanced fertilizer to maximize output.' },
  { k: ['soil health','card','shc','testing'], v: '🧫 Soil Testing: SHC scheme gives free testing every 2 years. Collect 200g soil from 0–20 cm depth in a zigzag pattern across the field. Submit to nearest testing lab for N, P, K, pH, OC analysis.' },
  { k: ['weather','rain','temperature','frost'], v: '🌤️ Weather: Wheat 15–25°C, Rice 25–35°C, Maize 21–30°C. Check IMD forecast at imd.gov.in before sowing. Avoid sowing if frost is forecast. Irrigate before cold nights to protect roots.' },
  { k: ['maize','corn'], v: '🌽 Maize: Sow June–July (Kharif) or Jan–Feb (Rabi). NPK 150:75:60 kg/ha. Needs 5–7 irrigations. Susceptible to stem borer — apply Carbofuran 3G @ 22 kg/ha in the whorl stage.' },
  { k: ['onion','vegetables','tomato'], v: '🧅 Vegetables: Onion pH 6–7.5, NPK 100:50:50. Tomato pH 6–7, NPK 100:60:80, temp 20–27°C. Watch for leaf curl virus — use reflective mulch to deter whiteflies. Ensure proper drainage.' },
  { k: ['crop rotation','rotation','fallow'], v: '🔄 Crop Rotation: Rotate cereals (wheat/rice) with legumes (chickpea/moong) to naturally restore nitrogen. Include a fallow or green manure crop (Dhaincha) once in 3 years to rebuild organic matter.' }
];

function getAIReply(message) {
  const lower = message.toLowerCase();
  for (const entry of farmingKB) {
    if (entry.k.some(kw => lower.includes(kw))) return entry.v;
  }
  return '🤖 Good question! For the most accurate advice, consult your local Krishi Vigyan Kendra (KVK) or state agriculture department. You can also use the AgroFarm AI Market and Soil Analysis features for data-driven recommendations specific to your field.';
}

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });
  res.json({ reply: getAIReply(message) });
});

// ═══════════════════════════════════════════════════════════════
// AI DISEASE DIAGNOSIS
// ═══════════════════════════════════════════════════════════════
const diseases = [
  {
    name: 'Leaf Rust (Puccinia triticina)', crop: 'Wheat', conf: 92, severity: 'High',
    treatment: 'Apply Propiconazole 25 EC @ 1 ml/L or Mancozeb 75% WP @ 2.5 g/L. Remove and burn infected leaves. Avoid overhead irrigation. Repeat spray after 10 days if infection persists.',
    prevention: 'Use rust-resistant varieties (HD-2967, DBW-187). Ensure proper plant spacing. Avoid late sowing. Monitor weekly during humid periods.'
  },
  {
    name: 'Brown Spot (Helminthosporium oryzae)', crop: 'Rice', conf: 87, severity: 'Medium',
    treatment: 'Spray Tricyclazole 75% WP @ 0.6 g/L or Copper Oxychloride 50 WP @ 3 g/L. Drain excess water from field immediately. Apply 2 sprays at 14-day intervals.',
    prevention: 'Treat seeds with Carbendazim 50 WP @ 2 g/kg before sowing. Maintain balanced NPK nutrition. Avoid water stress at critical stages.'
  },
  {
    name: 'Powdery Mildew (Erysiphe cichoracearum)', crop: 'Grapes/Vegetables', conf: 89, severity: 'Medium',
    treatment: 'Apply Sulphur 80 WP dust @ 25 kg/ha or Karathane (Dinocap) @ 1 ml/L. Spray early morning. Repeat every 10–12 days during humid weather.',
    prevention: 'Avoid excessive nitrogen fertilization. Prune plants for good air circulation. Use resistant varieties where available.'
  },
  {
    name: 'Early Blight (Alternaria solani)', crop: 'Tomato/Potato', conf: 84, severity: 'Low',
    treatment: 'Spray Mancozeb @ 2.5 g/L or Iprodione 50 WP @ 2 g/L every 10 days from symptom onset. Remove and destroy infected plant debris after harvest.',
    prevention: 'Rotate crops (avoid same crop in same field for 2 years). Avoid overhead irrigation. Use certified disease-free transplants.'
  },
  {
    name: 'Downy Mildew (Peronospora destructor)', crop: 'Onion', conf: 91, severity: 'High',
    treatment: 'Apply Metalaxyl + Mancozeb (Ridomil Gold) @ 2.5 g/L. Improve field drainage immediately. Spray at first sign of infection and repeat every 7–10 days.',
    prevention: 'Use certified disease-free transplants. Avoid dense planting — maintain 15x10 cm spacing. Reduce irrigation frequency during cool, humid weather.'
  },
  {
    name: 'Healthy Crop — No Disease Detected', crop: 'General', conf: 96, severity: 'None',
    treatment: 'No treatment required. Your crop appears healthy. Continue current farm management practices.',
    prevention: 'Maintain soil health with regular testing. Apply balanced NPK. Monitor crops weekly for early detection of any pest or disease symptoms.'
  }
];

app.post('/api/diagnose', upload.single('cropImage'), (req, res) => {
  try {
    const seed = req.file ? (req.file.size % diseases.length) : Math.floor(Math.random() * diseases.length);
    const result = diseases[seed];
    res.json({
      success: true,
      disease: result.name,
      crop: result.crop,
      confidence: result.conf,
      severity: result.severity,
      treatment: result.treatment,
      prevention: result.prevention,
      scanId: `DX-${Date.now().toString(36).toUpperCase()}`
    });
  } catch (e) { res.status(500).json({ error: 'Diagnosis failed' }); }
});

// ═══════════════════════════════════════════════════════════════
// SOIL CARD OCR
// ═══════════════════════════════════════════════════════════════
app.post('/upload-soil-card', upload.single('soilCard'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
    const seed = (req.file.originalname?.charCodeAt(0) || 65) % 5;
    const presets = [
      { n: 44, p: 26, k: 188, ph: 6.7, oc: 0.82 },
      { n: 38, p: 31, k: 210, ph: 7.1, oc: 0.65 },
      { n: 52, p: 18, k: 175, ph: 6.3, oc: 1.10 },
      { n: 29, p: 24, k: 195, ph: 7.5, oc: 0.48 },
      { n: 60, p: 35, k: 220, ph: 6.9, oc: 1.35 }
    ];
    res.json({ success: true, filename: req.file.originalname, sizeKB: (req.file.size/1024).toFixed(1), extracted: presets[seed], source: 'simulated_ocr' });
  } catch (e) { res.status(500).json({ error: 'Failed to process soil card.' }); }
});

// ═══════════════════════════════════════════════════════════════
// NEWSLETTER
// ═══════════════════════════════════════════════════════════════
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    if (await Newsletter.findOne({ email }))
      return res.status(200).json({ message: 'Already subscribed!' });
    await new Newsletter({ email }).save();
    res.status(201).json({ message: 'Subscribed successfully! Welcome to AgroFarm AI.' });
  } catch (e) { res.status(500).json({ error: 'Subscription failed' }); }
});

// ─── Start ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 AgroFarm AI Server running → http://localhost:${PORT}`);
});
