import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/hackathon26')
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema & Model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  password: { type: String, required: true } // Storing plain text for hackathon speed as discussed, can easily add bcrypt later
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Routes
// POST /api/signup
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, role, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser = new User({ firstName, lastName, email, role, password });
    await newUser.save();
    
    res.status(201).json({ message: 'User created successfully', user: { email, role, firstName, lastName } });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// POST /api/login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    res.status(200).json({ 
      message: 'Login successful', 
      user: { email: user.email, role: user.role, name: `${user.firstName} ${user.lastName}` } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// GET /api/market-active - Mock Market Data
app.get('/api/market-active', (req, res) => {
  res.status(200).json({
    data: [
      { district: 'Ahmednagar', commodity: 'Wheat', modal_price: 2450 },
      { district: 'Pune', commodity: 'Onion', modal_price: 1800 },
      { district: 'Nashik', commodity: 'Grapes', modal_price: 4500 },
      { district: 'Nagpur', commodity: 'Orange', modal_price: 3200 },
      { district: 'Satara', commodity: 'Milk', modal_price: 55 },
      { district: 'Jalgaon', commodity: 'Banana', modal_price: 1200 },
      { district: 'Kolhapur', commodity: 'Sugarcane', modal_price: 3100 },
      { district: 'Aurangabad', commodity: 'Maize', modal_price: 2100 },
      { district: 'Solapur', commodity: 'Pomegranate', modal_price: 6000 },
      { district: 'Ratnagiri', commodity: 'Mango', modal_price: 8000 }
    ],
    history: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      rice: [2100, 2250, 2340, 2410]
    }
  });
});

// GET /api/geocoding - Mock Location
app.get('/api/geocoding', (req, res) => {
  const { lat, lon } = req.query;
  res.status(200).json({
    district: 'Kolhapur',
    state: 'Maharashtra',
    lat, lon
  });
});

// GET /api/weather - Mock Weather
app.get('/api/weather', (req, res) => {
  res.status(200).json({
    current: {
      temp: 28,
      humidity: 65,
      rainfall: 120,
      condition: 'Partly Cloudy'
    }
  });
});

// Soil Analysis Schema
const soilAnalysisSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  fieldName: { type: String, required: true },
  location: { type: String },
  date: { type: String, required: true },
  parameters: {
    ph: Number,
    n: Number,
    p: Number,
    k: Number,
    moisture: Number,
    organicMatter: Number
  },
  healthScore: { type: Number, default: 0 },
  recommendation: { type: String },
  status: { type: String, default: 'Completed' }
}, { timestamps: true });

const SoilAnalysis = mongoose.model('SoilAnalysis', soilAnalysisSchema);

// Soil Analysis Routes
app.post('/api/soil-analysis', async (req, res) => {
  try {
    const { userEmail, fieldName, location, date, parameters } = req.body;
    
    // Simple "AI" Logic for Health Score
    let score = 85; 
    if (parameters.ph < 6 || parameters.ph > 7.5) score -= 15;
    if (parameters.n < 30) score -= 10;
    if (parameters.moisture > 60 || parameters.moisture < 10) score -= 10;
    
    let rec = "Your soil is in good condition. We recommend standard organic compost.";
    if (score < 70) rec = "Nitrogen levels are low. Apply Urea or Ammonium Nitrate. Increase irrigation frequency.";
    if (score < 50) rec = "Critical deficiency detected. Immediate application of NPK 19-19-19 and lime treatment required to balance pH.";

    const newAnalysis = new SoilAnalysis({
      userEmail, fieldName, location, date, parameters,
      healthScore: Math.max(0, score),
      recommendation: rec
    });
    
    await newAnalysis.save();
    res.status(201).json(newAnalysis);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save analysis' });
  }
});

app.get('/api/soil-analyses', async (req, res) => {
  try {
    const { email } = req.query;
    const records = await SoilAnalysis.find({ userEmail: email }).sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});
