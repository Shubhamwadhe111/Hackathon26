/**
 * AgroFarm AI - Core Logic Terminal
 * (c) 2026 Hackathon Team
 */

// ─── Global State & Session ──────────────────────────────────────────
const _savedSession = JSON.parse(localStorage.getItem('agro_session') || 'null');

const i18n = {
  en: {
    nav_home: "Home", nav_dashboard: "Dashboard", nav_soil: "Soil Analysis", nav_market: "Market", nav_resources: "Resources",
    nav_login: "Log in", nav_signup: "Sign up", profile_title: "Farmer Profile", profile_my: "My Profile", profile_logout: "Logout",
    hero_title: "Your Digital Agronomist", hero_subtitle: "AI-powered insights for crop selection, weather prediction, and soil analysis.",
    btn_get_started: "Get Started", btn_market_view: "Market View",
    soil_title: "Soil Analysis", soil_subtitle: "Sync with field satellites or enter parameters manually.",
    nutritional_mapping: "Nutritional Mapping", nitrogen: "Nitrogen (N)", phosphorus: "Phosphorus (P)", potassium: "Potassium (K)",
    climate_vectors: "Climate Vectors", sync_refresh: "Refresh", sync_satellites: "Sync Satellites",
    temp: "Temp (°C)", humidity: "Humidity (%)", rainfall: "Rainfall (mm)",
    generate_matrix: "Generate Recommendation Matrix",
    intel_report: "Intelligence Report", recalculate: "Recalculate",
    market_values: "Market Values", save_analysis: "Save Analysis",
    market_intel: "Market Intelligence", syncing_mandi: "Syncing mandi rates...",
    district: "District", commodity: "Commodity", price: "Price",
    linking_agmarknet: "Linking to AGMARKNET...",
    ops_center: "Operations Center", ops_welcome: "Welcome back", ops_health: "Your farm vectors are healthy.",
    listings: "Listings", buyers: "Buyers", health: "Health", normal: "Normal",
    procurement_hub: "Procurement Hub", active_orders: "Active Orders",
    ai_diagnosis: "AI Diagnosis", upload_leaf: "Upload Leaf", scanning: "Scanning Pathogens...",
    sign_in: "Sign In", email: "Email", password: "Password", login: "Login",
    register: "Register", role: "Role", role_farmer: "Farmer", role_buyer: "Buyer", create_account: "Create Account",
    auth_sync: "Authorize connection to agricultural satellites?", authorize: "Authorize", cancel: "Cancel",
    sat_sync_title: "Satellite Sync", linking: "Linking..."
  },
  hi: {
    nav_home: "मुख्य पृष्ठ", nav_dashboard: "डैशबोर्ड", nav_soil: "मृदा विश्लेषण", nav_market: "बाज़ार", nav_resources: "संसाधन",
    nav_login: "लॉग इन", nav_signup: "साइन अप", profile_title: "किसान प्रोफ़ाइल", profile_my: "मेरी प्रोफ़ाइल", profile_logout: "लॉग आउट",
    hero_title: "आपका डिजिटल कृषिविज्ञानी", hero_subtitle: "फसल चयन, मौसम की भविष्यवाणी और मृदा विश्लेषण के लिए AI-संचालित सूक्ष्म-दृष्टि।",
    btn_get_started: "प्रारंभ करें", btn_market_view: "बाज़ार दृश्य",
    soil_title: "मृदा विश्लेषण", soil_subtitle: "उपग्रहों से सिंक करें या मैन्युअल रूप से पैरामीटर दर्ज करें।",
    nutritional_mapping: "पोषण मानचित्रण", nitrogen: "नाइट्रोजन (N)", phosphorus: "फास्फोरस (P)", potassium: "पोटेशियम (K)",
    climate_vectors: "जलवायु संकेतक", sync_refresh: "ताज़ा करें", sync_satellites: "उपग्रह सिंक करें",
    temp: "तापमान (°C)", humidity: "आर्द्रता (%)", rainfall: "वर्षा (mm)",
    generate_matrix: "अनुशंसा उत्पन्न करें",
    intel_report: "इंटेलिजेंस रिपोर्ट", recalculate: "पुनर्गणना करें",
    market_values: "बाज़ार मूल्य", save_analysis: "विश्लेषण सहेजें",
    market_intel: "बाज़ार इंटेलिजेंस", syncing_mandi: "मंडी दरें सिंक हो रही हैं...",
    district: "ज़िला", commodity: "सामग्री", price: "मूल्य",
    linking_agmarknet: "AGMARKNET से लिंक हो रहा है...",
    ops_center: "ऑपरेशन केंद्र", ops_welcome: "वापसी पर स्वागत है", ops_health: "आपके खेत के वेक्टर स्वस्थ हैं।",
    listings: "लिस्टिंग", buyers: "खरीदार", health: "स्वास्थ्य", normal: "सामान्य",
    procurement_hub: "खरीद हब", active_orders: "सक्रिय ऑर्डर",
    ai_diagnosis: "AI निदान", upload_leaf: "पत्ती अपलोड करें", scanning: "रोगजनकों को स्कैन किया जा रहा है...",
    sign_in: "साइन इन", email: "ईमेल", password: "पासवर्ड", login: "लॉगिन",
    register: "पंजीकरण", role: "भूमिका", role_farmer: "किसान", role_buyer: "खरीदार", create_account: "खाता बनाएँ",
    auth_sync: "कृषि उपग्रहों से कनेक्शन अधिकृत करें?", authorize: "अधिकृत करें", cancel: "रद्द करें",
    sat_sync_title: "उपग्रह सिंक", linking: "लिंक हो रहा है..."
  },
  mr: {
    nav_home: "मुखपृष्ठ", nav_dashboard: "डॅशबोर्ड", nav_soil: "माती विश्लेषण", nav_market: "बाजार", nav_resources: "संसाधने",
    nav_login: "लॉग इन", nav_signup: "साइन अप", profile_title: "शेतकरी प्रोफाइल", profile_my: "माझी प्रोफाइल", profile_logout: "लॉग आउट",
    hero_title: "तुमचा डिजिटल कृषीतज्ञ", hero_subtitle: "पीक निवड, हवामान अंदाज आणि माती विश्लेषणासाठी एआय-समर्थित माहिती.",
    btn_get_started: "सुरू करा", btn_market_view: "बाजार दृश्य",
    soil_title: "माती विश्लेषण", soil_subtitle: "उपग्रहांशी सिंक करा किंवा स्वतः पॅरामीटर्स प्रविष्ट करा.",
    nutritional_mapping: "पोषण मॅपिंग", nitrogen: "नायट्रोजन (N)", phosphorus: "फॉस्फरस (P)", potassium: "पोटॅशियम (K)",
    climate_vectors: "हवामान घटक", sync_refresh: "रिफ्रेश करा", sync_satellites: "उपग्रह सिंक करा",
    temp: "तापमान (°C)", humidity: "आर्द्रता (%)", rainfall: "पाऊस (mm)",
    generate_matrix: "शिफारस व्युत्पन्न करा",
    intel_report: "इंटेलिजन्स रिपोर्ट", recalculate: "पुन्हा गणना करा",
    market_values: "बाजार मूल्य", save_analysis: "विश्लेषण जतन करा",
    market_intel: "बाजार इंटेलिजन्स", syncing_mandi: "मंडी दर सिंक होत आहेत...",
    district: "जिल्हा", commodity: "कमोडिटी", price: "किंमत",
    linking_agmarknet: "AGMARKNET शी लिंक होत आहे...",
    ops_center: "ऑपरेशन केंद्र", ops_welcome: "पुन्हा स्वागत आहे", ops_health: "तूमच्या शेतातील व्हेक्टर्स निरोगी आहेत.",
    listings: "लिस्टिंग", buyers: "खरेदीदार", health: "आरोग्य", normal: "सामान्य",
    procurement_hub: "खरेदी केंद्र", active_orders: "सक्रिय ऑर्डर्स",
    ai_diagnosis: "AI निदान", upload_leaf: "पान अपलोड करा", scanning: "रोगजनकांचे स्कॅनिंग...",
    sign_in: "साइन इन", email: "ईमेल", password: "पासवर्ड", login: "लॉगिन",
    register: "नोंदणी", role: "भूमिका", role_farmer: "शेतकरी", role_buyer: "खरेदीदार", create_account: "खाते तयार करा",
    auth_sync: "कृषी उपग्रहांशी कनेक्शन अधिकृत करावे?", authorize: "अधिकृत करा", cancel: "रद्द करा",
    sat_sync_title: "उपग्रह सिंक", linking: "लिंक होत आहे..."
  }
};

const appState = {
  currentRoute: 'landing',
  isAuthenticated: !!(_savedSession && _savedSession.user),
  user: _savedSession?.user || null,
  role: _savedSession?.role || null, // 'farmer' | 'buyer'
  fieldConditions: null,
  lang: _savedSession?.lang || 'en',
  _fdSection: 'home',
  _bdSection: 'home'
};

function t(key) {
  return i18n[appState.lang]?.[key] || i18n['en'][key] || key;
}

function _saveSession() {
  if (appState.isAuthenticated) {
    localStorage.setItem('agro_session', JSON.stringify({ user: appState.user, role: appState.role, lang: appState.lang }));
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
              <h1 class="hero-title display-font" style="font-size: 5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem;">${t('hero_title')}</h1>
              <p class="hero-subtitle" style="font-size: 1.3rem; margin-bottom: 3rem; opacity: 0.9;">${t('hero_subtitle')}</p>
              <div style="display: flex; gap: 1.5rem; justify-content: center;">
                <button class="btn btn-primary" style="padding: 1.2rem 2.8rem; border-radius: 50px; background: #fff; color: var(--color-primary); font-weight: 700;" onclick="window.navigate('form')">${t('btn_get_started')}</button>
                <button class="btn btn-secondary glass" style="padding: 1.2rem 2.8rem; border-radius: 50px; color: #fff;" onclick="window.navigate('dashboard')">${t('btn_market_view')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  },
  form: function() {
    return `
      <div class="container fade-in spacer-y">
        <h2 class="display-font" style="font-size: 2.5rem; margin-bottom: 0.5rem;">${t('soil_title')}</h2>
        <p style="color: var(--color-on-surface-variant); margin-bottom: 2rem;">${t('soil_subtitle')}</p>
        <div style="max-width: 800px; display: flex; flex-direction: column; gap: 2rem;">
          <div class="card" style="border-top: 3px solid var(--color-primary);">
            <h3 class="display-font" style="margin-bottom: 1.5rem;">🌱 ${t('nutritional_mapping')}</h3>
            <div class="grid-3" style="margin: 0; gap: 1rem;">
              <div class="input-group"><label>${t('nitrogen')}</label><input type="number" id="field-N" class="input-field" placeholder="90"></div>
              <div class="input-group"><label>${t('phosphorus')}</label><input type="number" id="field-P" class="input-field" placeholder="42"></div>
              <div class="input-group"><label>${t('potassium')}</label><input type="number" id="field-K" class="input-field" placeholder="43"></div>
            </div>
          </div>
          <div class="card" style="border-top: 3px solid #0060a8;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
               <h3 class="display-font">⛅ ${t('climate_vectors')}</h3>
               <button class="btn btn-secondary" onclick="window.requestSatelliteSync()">🛰️ ${appState.fieldConditions ? t('sync_refresh') : t('sync_satellites')}</button>
            </div>
            <div class="grid-3" style="margin: 0; gap: 1rem;">
              <div class="input-group"><label>${t('temp')}</label><input type="number" id="field-temp" class="input-field" value="${appState.fieldConditions?.temp || ''}"></div>
              <div class="input-group"><label>${t('humidity')}</label><input type="number" id="field-humidity" class="input-field" value="${appState.fieldConditions?.humidity || ''}"></div>
              <div class="input-group"><label>${t('rainfall')}</label><input type="number" id="field-rainfall" class="input-field" value="${appState.fieldConditions?.rainfall || ''}"></div>
            </div>
          </div>
          <button class="btn btn-primary" style="width: 100%; padding: 1.2rem;" onclick="window.navigate('results')">${t('generate_matrix')}</button>
        </div>
      </div>`;
  },
  results: function() {
    return `
      <div class="container fade-in spacer-y">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
          <div><h2 class="display-font" style="font-size: 2.5rem;">${t('intel_report')}</h2></div>
          <button class="btn btn-secondary" onclick="window.navigate('form')">${t('recalculate')}</button>
        </div>
        <div class="card" style="border-top: 4px solid var(--color-primary); display: flex; gap: 2rem; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 300px;">
            <span class="insight-chip">✨ 95% Match</span>
            <h1 class="display-font" style="font-size: 3.5rem; color: var(--color-primary);">Rice (Paddy)</h1>
            <p style="margin-bottom: 2rem;">Your region shows optimal humidity for Rice cultivation this season.</p>
            <div style="display: flex; gap: 1rem;">
              <button class="btn btn-primary" onclick="window.navigate('market')">${t('market_values')}</button>
              <button class="btn btn-secondary">${t('save_analysis')}</button>
            </div>
          </div>
          <div style="flex: 1; min-width: 300px; border-radius: 12px; height: 250px; background: url('https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=800&auto=format&fit=crop') center/cover;"></div>
        </div>
      </div>`;
  },
  market: function() {
    return `
      <div class="container fade-in spacer-y">
        <h2 class="display-font" style="font-size: 2.5rem; margin-bottom: 2rem;">${t('market_intel')}</h2>
        <div class="card" style="margin-bottom: 2rem; height: 350px;">
          <canvas id="marketChart"></canvas>
          <div id="chart-loader" style="text-align:center; padding-top:100px;">${t('syncing_mandi')}</div>
        </div>
        <div class="card" style="padding: 0; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: var(--color-surface-container-low);"><tr><th style="padding:1.2rem;">${t('district')}</th><th style="padding:1.2rem;">${t('commodity')}</th><th style="padding:1.2rem; text-align:right;">${t('price')}</th></tr></thead>
            <tbody id="market-tbody"><tr><td colspan="3" style="padding:2rem; text-align:center;">${t('linking_agmarknet')}</td></tr></tbody>
          </table>
        </div>
      </div>`;
  },
  'farmer-dashboard': function() {
    const name = appState.user?.name || 'Farmer';
    return `<div class="container spacer-y"><h2 class="display-font">${t('ops_center')}</h2><p>${t('ops_welcome')}, ${name}. ${t('ops_health')}</p><div class="grid-3"><div class="card"><h3>${t('listings')}</h3><div class="stat-number">12</div></div><div class="card"><h3>${t('buyers')}</h3><div class="stat-number">08</div></div><div class="card"><h3>${t('health')}</h3><div class="stat-number">${t('normal')}</div></div></div></div>`;
  },
  'buyer-dashboard': function() {
    return `<div class="container spacer-y"><h2 class="display-font">${t('procurement_hub')}</h2><div class="card"><h3>${t('active_orders')}</h3><div class="stat-number">05</div></div></div>`;
  },
  diagnosis: function() {
    return `<div class="container spacer-y"><h2 class="display-font">${t('ai_diagnosis')}</h2><div id="diagnosis-dropzone" class="card" style="padding:4rem; text-align:center; border: 2px dashed #ccc; cursor:pointer;" onclick="document.getElementById('file-upload').click()"><input type="file" id="file-upload" style="display:none;" onchange="window.handleImageUpload(this)">📸 ${t('upload_leaf')}</div><div id="diagnosis-scanning" class="card" style="display:none; text-align:center; padding:4rem;">🧬 ${t('scanning')}</div><div id="diagnosis-results" class="card" style="display:none; padding:2rem;"><h3>Wheat Rust Identified</h3><p>Treatment: Neem oil application suggested.</p></div></div>`;
  },
  login: function() {
    return `<div class="container spacer-y" style="display:flex; justify-content:center;"><div class="card" style="width:400px; padding:3rem;"><h2 class="display-font" style="text-align:center;">${t('sign_in')}</h2><div class="input-group"><label>${t('email')}</label><input type="email" id="login-email" class="input-field"></div><div class="input-group"><label>${t('password')}</label><input type="password" id="login-pass" class="input-field"></div><button class="btn btn-primary" style="width:100%; margin-top:2rem;" onclick="window.loginUser()">${t('login')}</button></div></div>`;
  },
  signup: function() {
    return `<div class="container spacer-y" style="display:flex; justify-content:center;"><div class="card" style="width:400px; padding:3rem;"><h2 class="display-font" style="text-align:center;">${t('register')}</h2><div class="input-group"><label>${t('email')}</label><input type="email" id="signup-email" class="input-field"></div><div class="input-group">${t('role')}: <label><input type="radio" name="signup-role" value="farmer" checked> ${t('role_farmer')}</label><label><input type="radio" name="signup-role" value="buyer"> ${t('role_buyer')}</label></div><button class="btn btn-primary" style="width:100%;" onclick="window.registerUser()">${t('create_account')}</button></div></div>`;
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
  const t_el = document.getElementById('market-tbody');
  const l = document.getElementById('chart-loader');
  try {
    const res = await fetch('http://localhost:5000/api/market-active');
    const data = await res.json();
    if (t_el) t_el.innerHTML = data.data.slice(0,10).map(r => `<tr><td style="padding:1rem;">${r.district}</td><td style="padding:1rem;">${r.commodity}</td><td style="padding:1rem; text-align:right;">₹${r.modal_price}</td></tr>`).join('');
    if (l) l.style.display = 'none';
    if (data.data) window.initMarketChart(data.data);
  } catch(e) { 
    if (t_el) t_el.innerHTML = `<tr><td colspan="3">${t('Failed to load market data.')}</td></tr>`; 
    if (l) {
        l.innerText = "Error loading chart data.";
        l.style.color = "red";
    }
  }
};

window.initMarketChart = function(apiData) {
  const ctx = document.getElementById('marketChart')?.getContext('2d');
  if (!ctx || !window.Chart) return;
  
  if (window._agriMarketChart) {
    window._agriMarketChart.destroy();
  }

  const items = apiData.slice(0, 10);
  const labels = items.map(item => item.commodity);
  const prices = items.map(item => Number(item.modal_price) || 0);

  window._agriMarketChart = new Chart(ctx, { 
    type: 'bar', 
    data: { 
      labels: labels, 
      datasets: [{ 
        label: t('price') + ' (₹)', 
        data: prices, 
        backgroundColor: 'rgba(46, 125, 50, 0.8)',
        borderColor: '#2e7d32',
        borderWidth: 1,
        borderRadius: 4
      }] 
    }, 
    options: { 
      responsive: true, 
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true }
      }
    } 
  });
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
    m.innerHTML = `<div class="grand-modal-card"><h2>${t('sat_sync_title')}</h2><p>${t('auth_sync')}</p><button class="btn btn-primary" onclick="window.authorizeSync()" id="sync-btn">${t('authorize')}</button><button class="btn btn-secondary" onclick="document.getElementById('sync-modal').classList.remove('active')">${t('cancel')}</button></div>`;
    document.body.appendChild(m);
  } else {
    // If modal already exists, we should update translations (though re-creation is better for changing lang, but simpler for now)
    const m = document.getElementById('sync-modal');
    m.innerHTML = `<div class="grand-modal-card"><h2>${t('sat_sync_title')}</h2><p>${t('auth_sync')}</p><button class="btn btn-primary" onclick="window.authorizeSync()" id="sync-btn">${t('authorize')}</button><button class="btn btn-secondary" onclick="document.getElementById('sync-modal').classList.remove('active')">${t('cancel')}</button></div>`;
  }
  document.getElementById('sync-modal').classList.add('active');
};

window.authorizeSync = function() {
  const b = document.getElementById('sync-btn'); b.disabled = true; b.textContent = t('linking');
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

document.addEventListener('DOMContentLoaded', () => { 
  window.updateNavbarUI(); 
  
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.value = appState.lang;
    langToggle.addEventListener('change', (e) => {
      appState.lang = e.target.value;
      _saveSession();
      updateStaticUI();
      renderRoute(appState.currentRoute);
    });
  }
  updateStaticUI();
  renderRoute(appState.currentRoute); 
});

function updateStaticUI() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerText = t(key);
  });
}

// ─── Chatbot Logic ──────────────────────────────────────────────────
window.toggleKisanChat = function() {
  const win = document.getElementById('kisan-chatbot-window');
  if (win.style.display === 'none' || !win.style.display) {
    win.style.display = 'flex';
  } else {
    win.style.display = 'none';
  }
};

window.sendKisanMessage = async function(msgText) {
  const input = document.getElementById('kisan-input');
  let text = msgText || input.value.trim();
  if (!text) return;
  
  if (!msgText) input.value = ''; // clear input if reading from it
  
  const body = document.getElementById('kisan-chat-body');
  
  // Create user bubble
  const userBubble = document.createElement('div');
  userBubble.style.cssText = 'align-self: flex-end; background: var(--color-primary); color: white; padding: 0.75rem 1rem; border-radius: 16px 16px 4px 16px; font-size: 0.9rem; max-width: 85%; margin-bottom: 1rem; box-shadow: var(--shadow-glass);';
  userBubble.innerText = text;
  body.appendChild(userBubble);
  body.scrollTop = body.scrollHeight;

  // Add temp loader
  const loader = document.createElement('div');
  loader.className = 'ai-typing-loader';
  loader.style.cssText = 'align-self: flex-start; background: white; color: var(--color-on-surface); padding: 0.5rem 1rem; border-radius: 4px 16px 16px 16px; font-size: 0.9rem; border: 1px solid var(--color-outline-variant); margin-bottom: 1rem;';
  loader.innerHTML = '<span style="font-size:0.8rem;opacity:0.6;">Typing... <div class="pulse-ring" style="display:inline-block; position:relative; top:auto; left:auto; width:10px; height:10px; margin-left:5px;"></div></span>';
  body.appendChild(loader);
  body.scrollTop = body.scrollHeight;
  
  try {
    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, lang: appState.lang })
    });
    const data = await res.json();
    loader.remove();
    
    // Convert newlines to breaks or implement simple bolding formatting
    const formattedReply = (data.reply || '').replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    const botBubble = document.createElement('div');
    botBubble.style.cssText = 'align-self: flex-start; background: white; color: var(--color-on-surface); padding: 0.75rem 1rem; border-radius: 4px 16px 16px 16px; font-size: 0.9rem; max-width: 85%; margin-bottom: 1rem; border: 1px solid var(--color-outline-variant); box-shadow: var(--shadow-glass);';
    botBubble.innerHTML = formattedReply;
    body.appendChild(botBubble);
    
  } catch(e) {
    loader.remove();
    const errBubble = document.createElement('div');
    errBubble.style.cssText = 'align-self: flex-start; background: #fff0f0; color: #ba1a1a; padding: 0.75rem 1rem; border-radius: 4px 16px 16px 16px; font-size: 0.9rem; margin-bottom: 1rem; border: 1px solid #ffcdcf;';
    errBubble.innerText = 'Failed to connect to the assistant server.';
    body.appendChild(errBubble);
  }
  
  body.scrollTop = body.scrollHeight;
};

window.kisanSuggest = function(text) {
  window.sendKisanMessage(text);
};
