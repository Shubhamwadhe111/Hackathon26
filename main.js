/**
 * AgroFarm AI - Core Logic Terminal
 * (c) 2026 Hackathon Team
 */

// ─── Global State & Session ──────────────────────────────────────────
const _savedSession = JSON.parse(localStorage.getItem('agro_session') || 'null');

const appState = {
  currentRoute: 'landing',
  isAuthenticated: !!(_savedSession && _savedSession.user),
  user: _savedSession?.user || null,
  role: _savedSession?.role || null, // 'farmer' | 'buyer'
  fieldConditions: null,
  _fdSection: 'home',
  _bdSection: 'home'
};

function _saveSession() {
  if (appState.isAuthenticated) {
    localStorage.setItem('agro_session', JSON.stringify({ user: appState.user, role: appState.role }));
  } else {
    localStorage.removeItem('agro_session');
  }
}

// ─── Screen Templates ───────────────────────────────────────────────
const screens = {
  landing: function() {
    return `
      <div style="position: relative; min-height: 100vh; padding-top: 5rem;">
        <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-image: url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2000&auto=format&fit=crop'); background-size: cover; background-position: center; z-index: -2;"></div>
        <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: linear-gradient(to bottom, rgba(10,30,10,0.4), rgba(46,125,50,0.8)); z-index: -1;"></div>
        <div class="container fade-in" style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: calc(100vh - 5rem); padding-bottom: 4rem;">
          <div class="stitch-hero-slab">
            <div style="text-align: center; max-width: 800px; color: #fff;">
              <div class="glass" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1.2rem; border-radius: 50px; border: 1px solid rgba(255,255,255,0.4); margin-bottom: 1.5rem;">
                <span id="live-weather-value" style="font-weight: 600; font-size: 0.9rem;">🌤️ Linking to satellites...</span>
              </div>
              <h1 class="hero-title display-font" style="font-size: 5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem;">Your Digital Agronomist</h1>
              <p class="hero-subtitle" style="font-size: 1.3rem; margin-bottom: 3rem; opacity: 0.9;">AI-powered insights for crop selection, weather prediction, and soil analysis.</p>
              <div style="display: flex; gap: 1.5rem; justify-content: center;">
                <button class="btn btn-primary" style="padding: 1.2rem 2.8rem; border-radius: 50px; background: #fff; color: var(--color-primary); font-weight: 700;" onclick="window.navigate('form')">Get Started</button>
                <button class="btn btn-secondary glass" style="padding: 1.2rem 2.8rem; border-radius: 50px; color: #fff;" onclick="window.navigate('dashboard')">Market View</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  },
  form: function() {
    return `
      <div class="container fade-in spacer-y">
        <h2 class="display-font" style="font-size: 2.5rem; margin-bottom: 0.5rem;">Soil Analysis</h2>
        <p style="color: var(--color-on-surface-variant); margin-bottom: 2rem;">Sync with field satellites or enter parameters manually.</p>
        <div style="max-width: 800px; display: flex; flex-direction: column; gap: 2rem;">
          <div class="card" style="border-top: 3px solid var(--color-primary);">
            <h3 class="display-font" style="margin-bottom: 1.5rem;">🌱 Nutritional Mapping</h3>
            <div class="grid-3" style="margin: 0; gap: 1rem;">
              <div class="input-group"><label>Nitrogen (N)</label><input type="number" id="field-N" class="input-field" placeholder="90"></div>
              <div class="input-group"><label>Phosphorus (P)</label><input type="number" id="field-P" class="input-field" placeholder="42"></div>
              <div class="input-group"><label>Potassium (K)</label><input type="number" id="field-K" class="input-field" placeholder="43"></div>
            </div>
          </div>
          <div class="card" style="border-top: 3px solid #0060a8;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
               <h3 class="display-font">⛅ Climate Vectors</h3>
               <button class="btn btn-secondary" onclick="window.requestSatelliteSync()">🛰️ ${appState.fieldConditions ? 'Refresh' : 'Sync Satellites'}</button>
            </div>
            <div class="grid-3" style="margin: 0; gap: 1rem;">
              <div class="input-group"><label>Temp (°C)</label><input type="number" id="field-temp" class="input-field" value="${appState.fieldConditions?.temp || ''}"></div>
              <div class="input-group"><label>Humidity (%)</label><input type="number" id="field-humidity" class="input-field" value="${appState.fieldConditions?.humidity || ''}"></div>
              <div class="input-group"><label>Rainfall (mm)</label><input type="number" id="field-rainfall" class="input-field" value="${appState.fieldConditions?.rainfall || ''}"></div>
            </div>
          </div>
          <button class="btn btn-primary" style="width: 100%; padding: 1.2rem;" onclick="window.navigate('results')">Generate Recommendation Matrix</button>
        </div>
      </div>`;
  },
  results: function() {
    return `
      <div class="container fade-in spacer-y">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
          <div><h2 class="display-font" style="font-size: 2.5rem;">Intelligence Report</h2></div>
          <button class="btn btn-secondary" onclick="window.navigate('form')">Recalculate</button>
        </div>
        <div class="card" style="border-top: 4px solid var(--color-primary); display: flex; gap: 2rem; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 300px;">
            <span class="insight-chip">✨ 95% Match</span>
            <h1 class="display-font" style="font-size: 3.5rem; color: var(--color-primary);">Rice (Paddy)</h1>
            <p style="margin-bottom: 2rem;">Your region shows optimal humidity for Rice cultivation this season.</p>
            <div style="display: flex; gap: 1rem;">
              <button class="btn btn-primary" onclick="window.navigate('market')">Market Values</button>
              <button class="btn btn-secondary">Save Analysis</button>
            </div>
          </div>
          <div style="flex: 1; min-width: 300px; border-radius: 12px; height: 250px; background: url('https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=800&auto=format&fit=crop') center/cover;"></div>
        </div>
      </div>`;
  },
  market: function() {
    return `
      <div class="container fade-in spacer-y">
        <h2 class="display-font" style="font-size: 2.5rem; margin-bottom: 2rem;">Market Intelligence</h2>
        <div class="card" style="margin-bottom: 2rem; height: 350px;">
          <canvas id="marketChart"></canvas>
          <div id="chart-loader" style="text-align:center; padding-top:100px;">Syncing mandi rates...</div>
        </div>
        <div class="card" style="padding: 0; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: var(--color-surface-container-low);"><tr><th style="padding:1.2rem;">District</th><th style="padding:1.2rem;">Commodity</th><th style="padding:1.2rem; text-align:right;">Price</th></tr></thead>
            <tbody id="market-tbody"><tr><td colspan="3" style="padding:2rem; text-align:center;">Linking to AGMARKNET...</td></tr></tbody>
          </table>
        </div>
      </div>`;
  },
  'farmer-dashboard': function() {
    const sec = appState._fdSection || 'home';
    const name = appState.user?.name || 'Farmer';
    return `<div class="container spacer-y"><h2 class="display-font">Operations Center</h2><p>Welcome back, ${name}. Your farm vectors are healthy.</p><div class="grid-3"><div class="card"><h3>Listings</h3><div class="stat-number">12</div></div><div class="card"><h3>Buyers</h3><div class="stat-number">08</div></div><div class="card"><h3>Health</h3><div class="stat-number">Normal</div></div></div></div>`;
  },
  'buyer-dashboard': function() {
    return `<div class="container spacer-y"><h2 class="display-font">Procurement Hub</h2><div class="card"><h3>Active Orders</h3><div class="stat-number">05</div></div></div>`;
  },
  diagnosis: function() {
    return `<div class="container spacer-y"><h2 class="display-font">AI Diagnosis</h2><div id="diagnosis-dropzone" class="card" style="padding:4rem; text-align:center; border: 2px dashed #ccc; cursor:pointer;" onclick="document.getElementById('file-upload').click()"><input type="file" id="file-upload" style="display:none;" onchange="window.handleImageUpload(this)">📸 Upload Leaf</div><div id="diagnosis-scanning" class="card" style="display:none; text-align:center; padding:4rem;">🧬 Scanning Pathogens...</div><div id="diagnosis-results" class="card" style="display:none; padding:2rem;"><h3>Wheat Rust Identified</h3><p>Treatment: Neem oil application suggested.</p></div></div>`;
  },
  login: function() {
    return `<div class="container spacer-y" style="display:flex; justify-content:center;"><div class="card" style="width:400px; padding:3rem;"><h2 class="display-font" style="text-align:center;">Sign In</h2><div class="input-group"><label>Email</label><input type="email" id="login-email" class="input-field"></div><div class="input-group"><label>Password</label><input type="password" id="login-pass" class="input-field"></div><button class="btn btn-primary" style="width:100%; margin-top:2rem;" onclick="window.loginUser()">Login</button></div></div>`;
  },
  signup: function() {
    return `<div class="container spacer-y" style="display:flex; justify-content:center;"><div class="card" style="width:400px; padding:3rem;"><h2 class="display-font" style="text-align:center;">Register</h2><div class="input-group"><label>Email</label><input type="email" id="signup-email" class="input-field"></div><div class="input-group">Role: <label><input type="radio" name="signup-role" value="farmer" checked> Farmer</label><label><input type="radio" name="signup-role" value="buyer"> Buyer</label></div><button class="btn btn-primary" style="width:100%;" onclick="window.registerUser()">Create Account</button></div></div>`;
  }
};

// ─── Routing ────────────────────────────────────────────────────────
function renderRoute(route) {
  if (route === 'dashboard') {
    route = appState.isAuthenticated ? (appState.role === 'buyer' ? 'buyer-dashboard' : 'farmer-dashboard') : 'login';
  }
  if (!screens[route]) route = 'landing';
  appState.currentRoute = route;
  const main = document.getElementById('main-content');
  if (main) {
    main.innerHTML = typeof screens[route] === 'function' ? screens[route]() : screens[route];
    if (route === 'market') window.fetchMarketData();
  }
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.route === route));
}

window.navigate = function(r) { renderRoute(r); window.scrollTo({ top: 0, behavior: 'smooth' }); };

document.addEventListener('click', (e) => {
  const l = e.target.closest('.nav-link, .dropdown-link');
  if (l && l.dataset.route) { e.preventDefault(); window.navigate(l.dataset.route); }
});

// ─── Auth ───────────────────────────────────────────────────────────
window.updateNavbarUI = function() {
  const auth = document.getElementById('nav-auth-buttons');
  const user = document.getElementById('nav-user-menu');
  if (appState.isAuthenticated) {
    if (auth) auth.style.display = 'none';
    if (user) {
      user.style.display = 'flex';
      const n = document.getElementById('user-menu-name'); if (n) n.textContent = appState.user?.name || 'Farmer';
    }
  } else {
    if (auth) auth.style.display = 'flex';
    if (user) user.style.display = 'none';
  }
};

window.logoutUser = function() {
  appState.isAuthenticated = false; appState.user = null;
  _saveSession(); window.updateNavbarUI(); window.navigate('landing');
};

window.loginUser = async function() {
  const e = document.getElementById('login-email')?.value;
  const p = document.getElementById('login-pass')?.value;
  try {
    const res = await fetch('http://localhost:5000/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: e, password: p }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    appState.isAuthenticated = true; appState.user = data.user; appState.role = data.user.role;
    _saveSession(); window.updateNavbarUI(); window.navigate('dashboard');
    setTimeout(() => window.requestSatelliteSync(), 1000);
  } catch(err) { alert(err.message); }
};

window.registerUser = async function() {
  const e = document.getElementById('signup-email').value;
  const r = document.querySelector('input[name="signup-role"]:checked')?.value;
  try {
    appState.isAuthenticated = true; appState.user = { name: e.split('@')[0], email: e }; appState.role = r;
    _saveSession(); window.updateNavbarUI(); window.navigate('dashboard');
  } catch(err) { alert(err.message); }
};

// ─── Features ───────────────────────────────────────────────────────
window.fetchMarketData = async function() {
  const t = document.getElementById('market-tbody');
  const l = document.getElementById('chart-loader');
  try {
    const res = await fetch('http://localhost:5000/api/market-active');
    const data = await res.json();
    if (t) t.innerHTML = data.data.slice(0,10).map(r => `<tr><td style="padding:1rem;">${r.district}</td><td style="padding:1rem;">${r.commodity}</td><td style="padding:1rem; text-align:right;">₹${r.modal_price}</td></tr>`).join('');
    if (l) l.style.display = 'none';
    if (data.history) window.initMarketChart(data.history);
  } catch(e) { if (t) t.innerHTML = '<tr><td colspan="3">Failed to load market data.</td></tr>'; }
};

window.initMarketChart = function(h) {
  const ctx = document.getElementById('marketChart')?.getContext('2d');
  if (!ctx || !window.Chart) return;
  new Chart(ctx, { type: 'line', data: { labels: h.labels, datasets: [{ label: 'Price', data: h.rice, borderColor: '#2d5a1b' }] }, options: { responsive: true, maintainAspectRatio: false } });
};

window.handleImageUpload = function(i) {
  if (i.files && i.files[0]) {
    document.getElementById('diagnosis-dropzone').style.display = 'none';
    document.getElementById('diagnosis-scanning').style.display = 'block';
    setTimeout(() => {
      document.getElementById('diagnosis-scanning').style.display = 'none';
      document.getElementById('diagnosis-results').style.display = 'block';
    }, 2000);
  }
};

window.requestSatelliteSync = function() {
  if (!document.getElementById('sync-modal')) {
    const m = document.createElement('div'); m.id = 'sync-modal'; m.className = 'grand-modal-overlay';
    m.innerHTML = `<div class="grand-modal-card"><h2>Satellite Sync</h2><p>Authorize connection to agricultural satellites?</p><button class="btn btn-primary" onclick="window.authorizeSync()" id="sync-btn">Authorize</button><button class="btn btn-secondary" onclick="document.getElementById('sync-modal').classList.remove('active')">Cancel</button></div>`;
    document.body.appendChild(m);
  }
  document.getElementById('sync-modal').classList.add('active');
};

window.authorizeSync = function() {
  const b = document.getElementById('sync-btn'); b.disabled = true; b.textContent = 'Linking...';
  navigator.geolocation.getCurrentPosition(async (p) => {
    try {
      const { latitude, longitude } = p.coords;
      const geo = await (await fetch(`http://localhost:5000/api/geocoding?lat=${latitude}&lon=${longitude}`)).json();
      const wx = await (await fetch(`http://localhost:5000/api/weather?lat=${latitude}&lon=${longitude}`)).json();
      appState.fieldConditions = { temp: wx.current.temp, humidity: wx.current.humidity, rainfall: wx.current.rainfall, state: geo.state, district: geo.district };
      document.getElementById('sync-modal').classList.remove('active');
      renderRoute(appState.currentRoute);
      alert('Linked to Satellites: ' + geo.district);
    } catch(e) { alert('Sync Failed'); }
  }, () => alert('Location Denied'));
};

document.addEventListener('DOMContentLoaded', () => { window.updateNavbarUI(); renderRoute(appState.currentRoute); });
