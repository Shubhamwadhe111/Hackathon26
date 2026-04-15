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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
