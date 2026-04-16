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
  _soilGauge: null,
  _soilBar: null,
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
      <!-- ═══ HERO SECTION ═══ -->
      <section class="home-hero-section">
        <div class="home-hero-bg-image"></div>
        <div class="home-hero-overlay"></div>
        <div class="home-hero-inner container fade-in">
          <div class="home-hero-badge">
            <span id="live-weather-value">🛰️ AI-Powered Agricultural Intelligence</span>
          </div>
          <h1 class="home-hero-title">Smart Farming<br>Starts Here</h1>
          <p class="home-hero-sub">Harness AI to optimize your crop yields, soil health, and market profits — all in one platform.</p>
          <div class="home-hero-ctas">
            <button class="home-cta-primary" onclick="window.navigate('form')" id="cta-get-started">Get Started →</button>
            <button class="home-cta-ghost" onclick="window.navigate('market')" id="cta-explore-market">Explore Market</button>
          </div>
        </div>
        <div class="home-hero-scroll-hint">
          <div class="scroll-chevron">&#8964;</div>
        </div>
      </section>

      <!-- ═══ ANIMATED STATS ROW ═══ -->
      <section class="home-stats-row" id="home-stats">
        <div class="home-stats-inner container">
          <div class="home-stat-item" data-target="50000" data-suffix="+" data-prefix="">
            <div class="home-stat-icon">👩‍🌾</div>
            <div class="home-stat-number" id="stat-0">0</div>
            <div class="home-stat-label">Total Farmers</div>
          </div>
          <div class="home-stat-item" data-target="200" data-suffix="+" data-prefix="">
            <div class="home-stat-icon">🌾</div>
            <div class="home-stat-number" id="stat-1">0</div>
            <div class="home-stat-label">Crops Monitored</div>
          </div>
          <div class="home-stat-item" data-target="1.2" data-suffix="M+" data-prefix="">
            <div class="home-stat-icon">🧪</div>
            <div class="home-stat-number" id="stat-2">0</div>
            <div class="home-stat-label">Soil Reports</div>
          </div>
          <div class="home-stat-item" data-target="800" data-suffix="K+" data-prefix="">
            <div class="home-stat-icon">🤖</div>
            <div class="home-stat-number" id="stat-3">0</div>
            <div class="home-stat-label">AI Diagnoses Done</div>
          </div>
        </div>
      </section>

      <!-- ═══ FEATURE HIGHLIGHTS GRID ═══ -->
      <section class="home-features-section">
        <div class="container">
          <div class="home-section-header">
            <div class="home-section-badge">🌿 Platform Features</div>
            <h2 class="home-section-title">Everything You Need to Farm Smarter</h2>
            <p class="home-section-sub">One unified platform combining AI, satellite data, and market intelligence for modern agriculture.</p>
          </div>
          <div class="home-features-grid" id="features">
            <div class="home-feature-card" onclick="window.navigate('landing')">
              <div class="home-feature-icon">🏠</div>
              <h3 class="home-feature-title">Home</h3>
              <p class="home-feature-desc">Your central command center — see weather, alerts, and crop status at a glance every morning.</p>
            </div>
            <div class="home-feature-card" onclick="window.navigate('dashboard')">
              <div class="home-feature-icon">📊</div>
              <h3 class="home-feature-title">Dashboard</h3>
              <p class="home-feature-desc">Visualize farm performance with real-time charts, predictive analytics, and field summaries.</p>
            </div>
            <div class="home-feature-card" onclick="window.navigate('form')">
              <div class="home-feature-icon">🌱</div>
              <h3 class="home-feature-title">Soil Analysis</h3>
              <p class="home-feature-desc">Deep-dive into nutrient profiles and moisture levels with satellite-assisted mapping technology.</p>
            </div>
            <div class="home-feature-card" onclick="window.navigate('diagnosis')">
              <div class="home-feature-icon">🤖</div>
              <h3 class="home-feature-title">AI Diagnosis</h3>
              <p class="home-feature-desc">Upload a leaf photo — get instant pest & disease identification with treatment guidance.</p>
            </div>
            <div class="home-feature-card" onclick="window.navigate('market')">
              <div class="home-feature-icon">📈</div>
              <h3 class="home-feature-title">Market</h3>
              <p class="home-feature-desc">Access live mandi prices, wholesale trends, and best-time-to-sell recommendations.</p>
            </div>
            <div class="home-feature-card" onclick="window.navigate('f2b')">
              <div class="home-feature-icon">🤝</div>
              <h3 class="home-feature-title">F2B / B2F</h3>
              <p class="home-feature-desc">Bridge farmers and agri-businesses with direct bulk contracts and verified supply chains.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ TESTIMONIALS CAROUSEL ═══ -->
      <section class="home-testimonials-section">
        <div class="container">
          <div class="home-section-header">
            <div class="home-section-badge" style="background: rgba(255,193,7,0.15); color: #7a5c00;">⭐ Farmer Stories</div>
            <h2 class="home-section-title">Trusted by Farmers Across India</h2>
            <p class="home-section-sub">Real results from real farmers who transformed their operations with AgroFarm AI.</p>
          </div>
          <div class="home-testimonials-track" id="testimonials-track">
            <div class="home-testimonial-card">
              <div class="home-testimonial-stars">★★★★★</div>
              <p class="home-testimonial-quote">"The AI diagnosis tool saved my entire wheat crop this season. I identified a rust infection 2 weeks before it became critical — that's ₹3 lakh saved."</p>
              <div class="home-testimonial-author">
                <div class="home-testimonial-avatar">RK</div>
                <div>
                  <div class="home-testimonial-name">Ramesh Kumar</div>
                  <div class="home-testimonial-role">🌾 Wheat Farmer, Punjab</div>
                </div>
              </div>
            </div>
            <div class="home-testimonial-card">
              <div class="home-testimonial-stars">★★★★★</div>
              <p class="home-testimonial-quote">"Switching to AgroFarm AI helped us reduce fertilizer costs by 30% while increasing our yield. The soil analysis precision is truly unmatched in my experience."</p>
              <div class="home-testimonial-author">
                <div class="home-testimonial-avatar">PD</div>
                <div>
                  <div class="home-testimonial-name">Priya Deshpande</div>
                  <div class="home-testimonial-role">🌿 Organic Farmer, Maharashtra</div>
                </div>
              </div>
            </div>
            <div class="home-testimonial-card">
              <div class="home-testimonial-stars">★★★★★</div>
              <p class="home-testimonial-quote">"The Market module gives me real-time prices from different mandis. I finally feel I have the power to negotiate fairly and sell at peak value."</p>
              <div class="home-testimonial-author">
                <div class="home-testimonial-avatar">AS</div>
                <div>
                  <div class="home-testimonial-name">Arjun Singh</div>
                  <div class="home-testimonial-role">🧅 Vegetable Grower, UP</div>
                </div>
              </div>
            </div>
            <div class="home-testimonial-card">
              <div class="home-testimonial-stars">★★★★★</div>
              <p class="home-testimonial-quote">"As an agri-business, the F2B/B2F portal has connected us to 120+ verified farms. Procurement is now faster, traceable, and 25% cheaper."</p>
              <div class="home-testimonial-author">
                <div class="home-testimonial-avatar">MG</div>
                <div>
                  <div class="home-testimonial-name">Meera Gupta</div>
                  <div class="home-testimonial-role">🏢 Agri-Business, Gujarat</div>
                </div>
              </div>
            </div>
          </div>
          <div class="home-testimonials-nav">
            <button class="home-nav-btn" id="testimonial-prev" onclick="window.scrollTestimonials(-1)">&#8592;</button>
            <div class="home-testimonials-dots" id="testimonials-dots">
              <span class="home-dot active" onclick="window.goToTestimonial(0)"></span>
              <span class="home-dot" onclick="window.goToTestimonial(1)"></span>
              <span class="home-dot" onclick="window.goToTestimonial(2)"></span>
              <span class="home-dot" onclick="window.goToTestimonial(3)"></span>
            </div>
            <button class="home-nav-btn" id="testimonial-next" onclick="window.scrollTestimonials(1)">&#8594;</button>
          </div>
        </div>
      </section>

      <!-- ═══ NEWSLETTER + FOOTER ═══ -->
      <section class="home-newsletter-section">
        <div class="container" style="text-align:center;">
          <div class="home-section-badge" style="background: rgba(255,193,7,0.2); color: #ffc107; margin: 0 auto 1rem auto;">📬 Stay Updated</div>
          <h2 style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">Stay Ahead of the Season</h2>
          <p style="color: rgba(255,255,255,0.7); margin-bottom: 2rem; font-size: 1.05rem;">Get AI insights, market forecasts & farming tips delivered to your inbox.</p>
          <form class="home-newsletter-form" onsubmit="return false;">
            <input type="email" class="home-newsletter-input" placeholder="Enter your email address..." id="newsletter-email">
            <button type="submit" class="home-newsletter-btn" onclick="window.handleNewsletterSignup()">Subscribe</button>
          </form>
        </div>
      </section>

      <footer class="home-footer">
        <div class="container">
          <div class="home-footer-grid">
            <div class="home-footer-brand">
              <div class="home-footer-logo">🌿 AgroFarm AI</div>
              <p class="home-footer-tagline">Empowering the world's most vital industry with the precision of AI and the wisdom of tradition.</p>
              <div class="home-footer-socials">
                <a href="#" class="home-social-btn" title="Twitter">𝕏</a>
                <a href="#" class="home-social-btn" title="Facebook">f</a>
                <a href="#" class="home-social-btn" title="Instagram">📷</a>
                <a href="#" class="home-social-btn" title="LinkedIn">in</a>
              </div>
            </div>
            <div class="home-footer-col">
              <h4 class="home-footer-heading">Platform</h4>
              <a href="#" class="home-footer-link" onclick="window.navigate('form'); return false;">Soil Analysis</a>
              <a href="#" class="home-footer-link" onclick="window.navigate('diagnosis'); return false;">AI Diagnosis</a>
              <a href="#" class="home-footer-link" onclick="window.navigate('market'); return false;">Market Intelligence</a>
              <a href="#" class="home-footer-link" onclick="window.navigate('f2b'); return false;">F2B Portal</a>
            </div>
            <div class="home-footer-col">
              <h4 class="home-footer-heading">Resources</h4>
              <a href="#" class="home-footer-link" onclick="window.navigate('knowledge'); return false;">Knowledge Hub</a>
              <a href="#" class="home-footer-link">Case Studies</a>
              <a href="#" class="home-footer-link">Govt. Schemes</a>
              <a href="#" class="home-footer-link">Help Center</a>
            </div>
            <div class="home-footer-col">
              <h4 class="home-footer-heading">Company</h4>
              <a href="#" class="home-footer-link">About Us</a>
              <a href="#" class="home-footer-link">Careers</a>
              <a href="#" class="home-footer-link">Privacy Policy</a>
              <a href="#" class="home-footer-link">Contact</a>
            </div>
          </div>
          <div class="home-footer-bottom">
            <span>© 2026 AgroFarm AI. All rights reserved.</span>
            <span style="color: rgba(255,255,255,0.4);">support@agrofarmai.com | +91 800 123 4567</span>
          </div>
        </div>
      </footer>
    `;
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
    const name = appState.user?.name || 'Ramesh Kumar';
    const initials = name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    const hour = now.getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    return `
      <div class="db-wrapper spacer-y fade-in" id="db-content">
        <!-- Top Title Area -->
        <div class="spacer-bottom" style="display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap;">
          <div>
            <h2 class="display-font" style="font-size:2.8rem; margin-bottom:0.4rem;">Farmer Dashboard</h2>
            <div style="color:var(--color-primary); font-weight:600; display:flex; align-items:center; gap:0.5rem;">
              <span id="db-weather-pill" style="background:rgba(46,125,50,0.1); padding:0.25rem 0.75rem; border-radius:99px; font-size:0.85rem;">🌤️ Fetching weather...</span> 
              <span style="color:#ccc;">|</span> 
              <span style="color:#888; font-size:0.85rem;">${dateStr}</span>
            </div>
          </div>
          <button class="btn-primary" style="padding:0.8rem 1.8rem; font-size:0.95rem;" onclick="window.navigate('form')">+ New Soil Report</button>
        </div>

        <!-- Welcome Banner -->
        <div class="db-welcome-banner" style="margin-top:0;">
          <div class="db-welcome-left">
            <div class="db-welcome-subtitle">FARM INTELLIGENCE CENTER</div>
            <h2 class="db-welcome-title">${greeting}, ${name.split(' ')[0]} 👋</h2>
            <p class="db-welcome-desc">Your 3 fields are being monitored. <strong>1 alert</strong> needs your attention today.</p>
            <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:0.25rem;">
              <button class="db-banner-btn" onclick="document.getElementById('db-alerts-panel').scrollIntoView({behavior:'smooth'})">View Alerts →</button>
              <button class="db-banner-btn-ghost" onclick="window.navigate('diagnosis')">Run AI Diagnosis</button>
            </div>
          </div>
          <div class="db-welcome-illustration">🌾</div>
        </div>

        <!-- KPI Cards -->
        <div class="db-kpi-row">
          <div class="db-kpi-card" style="--kpi-color:#2E7D32;">
            <div class="db-kpi-icon">🌾</div>
            <div class="db-kpi-label">TOTAL FIELDS</div>
            <div class="db-kpi-value">3</div>
            <div class="db-kpi-trend up">↑ Added 1 last month</div>
            <div class="db-kpi-sparkline"><canvas id="spark-0" width="80" height="28"></canvas></div>
          </div>
          <div class="db-kpi-card" style="--kpi-color:#F57F17;">
            <div class="db-kpi-icon">⚠️</div>
            <div class="db-kpi-label">ACTIVE ALERTS</div>
            <div class="db-kpi-value">1 <span class="db-kpi-badge">!</span></div>
            <div class="db-kpi-trend down">↓ Down from 4 last week</div>
            <div class="db-kpi-sparkline"><canvas id="spark-1" width="80" height="28"></canvas></div>
          </div>
          <div class="db-kpi-card" style="--kpi-color:#1565C0;">
            <div class="db-kpi-icon">📋</div>
            <div class="db-kpi-label">PENDING REPORTS</div>
            <div class="db-kpi-value">2</div>
            <div class="db-kpi-trend neutral">→ No change this week</div>
            <div class="db-kpi-sparkline"><canvas id="spark-2" width="80" height="28"></canvas></div>
          </div>
          <div class="db-kpi-card" style="--kpi-color:#6A1B9A;">
            <div class="db-kpi-icon">📊</div>
            <div class="db-kpi-label">MARKET PRICE INDEX</div>
            <div class="db-kpi-value">₹2,340</div>
            <div class="db-kpi-trend up">↑ +5.2% this week</div>
            <div class="db-kpi-sparkline"><canvas id="spark-3" width="80" height="28"></canvas></div>
          </div>
        </div>

        <!-- Two-column layout -->
        <div class="db-two-col">
          <div class="db-col-left">
            <div class="db-panel">
              <div class="db-panel-header">
                <div>
                  <div class="db-panel-title">Crop Health Score</div>
                  <div class="db-panel-sub">Last 30 days — Field average</div>
                </div>
                <div class="db-panel-actions">
                  <span class="db-filter-pill active">30D</span>
                  <span class="db-filter-pill">7D</span>
                  <span class="db-filter-pill">90D</span>
                </div>
              </div>
              <div style="height:220px; position:relative;">
                <canvas id="db-health-chart"></canvas>
              </div>
            </div>
            <div class="db-panel" style="margin-top:1.5rem;">
              <div class="db-panel-header">
                <div>
                  <div class="db-panel-title">Field Location Map</div>
                  <div class="db-panel-sub">Health status by field</div>
                </div>
                <button class="db-panel-btn" onclick="window.navigate('form')">+ New Report</button>
              </div>
              <div id="db-field-map" style="height:260px; border-radius:12px; overflow:hidden; background:#e8f5e9;"></div>
              <div class="db-map-legend">
                <span class="db-legend-item"><span class="db-legend-dot" style="background:#4CAF50"></span>Healthy (Field A)</span>
                <span class="db-legend-item"><span class="db-legend-dot" style="background:#FFC107"></span>Monitor (Field B)</span>
                <span class="db-legend-item"><span class="db-legend-dot" style="background:#F44336"></span>Alert (Field C)</span>
              </div>
            </div>
          </div>
          <div class="db-col-right">
            <div class="db-panel" id="db-alerts-panel">
              <div class="db-panel-header">
                <div class="db-panel-title">Recent Alerts</div>
                <button class="db-text-btn" onclick="window.dbMarkAllRead()">Mark All Read</button>
              </div>
              <div id="db-notifications-list">
                <div class="db-notif" data-id="n1" style="--notif-color:#F44336;">
                  <span class="db-notif-icon">🔴</span>
                  <div class="db-notif-body">
                    <div class="db-notif-msg">Leaf Rust Detected on Field C</div>
                    <div class="db-notif-time">2 hours ago</div>
                  </div>
                  <button class="db-notif-dismiss" onclick="window.dbDismissNotif('n1')" title="Dismiss">✕</button>
                </div>
                <div class="db-notif" data-id="n2" style="--notif-color:#F57F17;">
                  <span class="db-notif-icon">🟡</span>
                  <div class="db-notif-body">
                    <div class="db-notif-msg">Soil pH too low in Field B (5.2)</div>
                    <div class="db-notif-time">Yesterday</div>
                  </div>
                  <button class="db-notif-dismiss" onclick="window.dbDismissNotif('n2')" title="Dismiss">✕</button>
                </div>
              </div>
            </div>
            <div class="db-panel" style="margin-top:1.5rem;">
              <div class="db-panel-header"><div class="db-panel-title">Upcoming Tasks</div></div>
              <div class="db-task-filters" id="db-task-filters">
                <span class="db-filter-pill active" onclick="window.dbFilterTasks('all', this)">All</span>
                <span class="db-filter-pill" onclick="window.dbFilterTasks('pending', this)">Pending</span>
                <span class="db-filter-pill" onclick="window.dbFilterTasks('done', this)">Done</span>
              </div>
              <div class="db-task-table-wrap">
                <table class="db-task-table">
                  <thead><tr><th>Task</th><th>Field</th><th>Due Date</th><th>Status</th></tr></thead>
                  <tbody id="db-task-tbody">
                    <tr data-status="pending"><td>Apply fertilizer</td><td>Field A</td><td>Apr 18</td><td><span class="db-status-pill pending">Pending</span></td></tr>
                    <tr data-status="inprogress"><td>Irrigation check</td><td>Field B</td><td>Apr 17</td><td><span class="db-status-pill inprogress">In Progress</span></td></tr>
                    <tr data-status="done"><td>Soil sample sent</td><td>Field A</td><td>Apr 15</td><td><span class="db-status-pill done">Done</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Chat Floating Button + Panel -->
      <button class="db-ai-fab" id="db-ai-fab" onclick="window.dbToggleAiChat()" title="Ask AI">
        <span class="db-ai-fab-icon">🤖</span>
        <span class="db-ai-fab-label">Ask AI</span>
        <div class="db-ai-pulse"></div>
      </button>

      <div class="db-ai-chat-panel" id="db-ai-chat-panel">
        <div class="db-ai-chat-header">
          <div style="display:flex;align-items:center;gap:0.75rem;"><span style="font-size:1.5rem;">🤖</span><div><div style="font-weight:800;font-size:0.95rem;">Kisan AI Assistant</div><div style="font-size:0.72rem;opacity:0.8;">Online · Farming Expert</div></div></div>
          <button onclick="window.dbToggleAiChat()" style="background:rgba(255,255,255,0.15);border:none;color:white;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:0.9rem;">✕</button>
        </div>
        <div class="db-ai-chat-body" id="db-ai-chat-body">
          <div class="db-ai-msg bot">Namaste! I'm your AI farming assistant. Ask me about your crops, diseases, market prices, or soil health!</div>
        </div>
        <div class="db-ai-chat-footer">
          <input type="text" id="db-ai-input" class="db-ai-input" placeholder="Ask anything about your farm..." onkeypress="if(event.key==='Enter') window.dbAiSend()">
          <button onclick="window.dbAiSend()" class="db-ai-send">➔</button>
        </div>
      </div>
    `;
  },
  'buyer-dashboard': function() {
    const name = appState.user?.name || 'Meera Gupta';
    const initials = name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    const hour = now.getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    return `
      <div class="db-wrapper spacer-y fade-in" id="db-content">
        <!-- Top Title Area -->
        <div class="spacer-bottom" style="display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap;">
          <div>
            <h2 class="display-font" style="font-size:2.8rem; margin-bottom:0.4rem;">Procurement Dashboard</h2>
            <div style="color:var(--color-primary); font-weight:600; display:flex; align-items:center; gap:0.5rem;">
              <span style="background:rgba(21,101,192,0.1); color:#1565C0; padding:0.25rem 0.75rem; border-radius:99px; font-size:0.85rem;">📦 Business Intelligence Hub</span> 
              <span style="color:#ccc;">|</span> 
              <span style="color:#888; font-size:0.85rem;">${dateStr}</span>
            </div>
          </div>
          <button class="btn-primary" style="padding:0.8rem 1.8rem; font-size:0.95rem; background:#1565C0;" onclick="window.navigate('market')">Explore Market</button>
        </div>

        <!-- Welcome Banner (blue theme for buyer) -->
        <div class="db-welcome-banner" style="margin-top:0; background:linear-gradient(135deg,#1565C0,#1976D2,#42A5F5);">
          <div class="db-welcome-left">
            <div class="db-welcome-subtitle">PROCUREMENT INTELLIGENCE</div>
            <h2 class="db-welcome-title">${greeting}, ${name.split(' ')[0]} 👋</h2>
            <p class="db-welcome-desc">5 active procurement orders. <strong>2 bids</strong> awaiting your response.</p>
            <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:0.25rem;">
              <button class="db-banner-btn" onclick="window.navigate('b2f')">View Orders →</button>
              <button class="db-banner-btn-ghost" onclick="window.navigate('market')">Market Prices</button>
            </div>
          </div>
          <div class="db-welcome-illustration">🏭</div>
        </div>

        <!-- KPI Cards -->
        <div class="db-kpi-row">
          <div class="db-kpi-card" style="--kpi-color:#1565C0;">
            <div class="db-kpi-icon">📦</div>
            <div class="db-kpi-label">ACTIVE ORDERS</div>
            <div class="db-kpi-value">5</div>
            <div class="db-kpi-trend up">↑ +2 this month</div>
            <div class="db-kpi-sparkline"><canvas id="spark-0" width="80" height="28"></canvas></div>
          </div>
          <div class="db-kpi-card" style="--kpi-color:#2E7D32;">
            <div class="db-kpi-icon">🌾</div>
            <div class="db-kpi-label">VERIFIED FARMS</div>
            <div class="db-kpi-value">120</div>
            <div class="db-kpi-trend up">↑ +14 farms added</div>
            <div class="db-kpi-sparkline"><canvas id="spark-1" width="80" height="28"></canvas></div>
          </div>
          <div class="db-kpi-card" style="--kpi-color:#F57F17;">
            <div class="db-kpi-icon">🤝</div>
            <div class="db-kpi-label">PENDING BIDS</div>
            <div class="db-kpi-value">2 <span class="db-kpi-badge">!</span></div>
            <div class="db-kpi-trend neutral">→ Awaiting response</div>
            <div class="db-kpi-sparkline"><canvas id="spark-2" width="80" height="28"></canvas></div>
          </div>
          <div class="db-kpi-card" style="--kpi-color:#6A1B9A;">
            <div class="db-kpi-icon">💰</div>
            <div class="db-kpi-label">SPEND THIS MONTH</div>
            <div class="db-kpi-value">₹8.4L</div>
            <div class="db-kpi-trend down">↓ -3% vs last month</div>
            <div class="db-kpi-sparkline"><canvas id="spark-3" width="80" height="28"></canvas></div>
          </div>
        </div>
      </div>

      <!-- AI Chat Floating Button + Panel -->
      <button class="db-ai-fab" id="db-ai-fab" onclick="window.dbToggleAiChat()" title="Ask AI">
        <span class="db-ai-fab-icon">🤖</span>
        <span class="db-ai-fab-label">Ask AI</span>
        <div class="db-ai-pulse"></div>
      </button>

      <div class="db-ai-chat-panel" id="db-ai-chat-panel">
        <div class="db-ai-chat-header" style="background: linear-gradient(135deg, #1565C0, #1976D2);">
          <div style="display:flex;align-items:center;gap:0.75rem;"><span style="font-size:1.5rem;">🤖</span><div><div style="font-weight:800;font-size:0.95rem;">Business AI Assistant</div><div style="font-size:0.72rem;opacity:0.8;">Online · Procurement Expert</div></div></div>
          <button onclick="window.dbToggleAiChat()" style="background:rgba(255,255,255,0.15);border:none;color:white;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:0.9rem;">✕</button>
        </div>
        <div class="db-ai-chat-body" id="db-ai-chat-body">
          <div class="db-ai-msg bot">Hello! I'm your procurement AI assistant. I can help you with vendor checks, market trends, and quality verification.</div>
        </div>
        <div class="db-ai-chat-footer">
          <input type="text" id="db-ai-input" class="db-ai-input" placeholder="Ask about market trends..." onkeypress="if(event.key==='Enter') window.dbAiSend()">
          <button onclick="window.dbAiSend()" class="db-ai-send" style="background:#1565C0;">➔</button>
        </div>
      </div>
    `;
  },
  diagnosis: function() {
    return `<div class="db-wrapper spacer-y fade-in"><h2 class="display-font">AI Diagnosis</h2><div id="diagnosis-dropzone" class="card" style="padding:4rem; text-align:center; border: 2px dashed #ccc; cursor:pointer;" onclick="document.getElementById('file-upload').click()"><input type="file" id="file-upload" style="display:none;" onchange="window.handleImageUpload(this)">📸 Upload Leaf</div><div id="diagnosis-scanning" class="card" style="display:none; text-align:center; padding:4rem;">🧬 Scanning Pathogens...</div><div id="diagnosis-results" class="card" style="display:none; padding:2rem;"><h3>Wheat Rust Identified</h3><p>Treatment: Neem oil application suggested.</p></div></div>`;
  },
  login: function() {
    return `<div class="container spacer-y" style="display:flex; justify-content:center;"><div class="card" style="width:400px; padding:3rem;"><h2 class="display-font" style="text-align:center;">Sign In</h2><div class="input-group"><label>Email</label><input type="email" id="login-email" class="input-field"></div><div class="input-group"><label>Password</label><input type="password" id="login-pass" class="input-field"></div><button class="btn btn-primary" style="width:100%; margin-top:2rem;" onclick="window.loginUser()">Login</button></div></div>`;
  },
  signup: function() {
    return `
      <div class="container spacer-y" style="display:flex; justify-content:center;">
        <div class="card" style="width:450px; padding:3rem;">
          <h2 class="display-font" style="text-align:center; margin-bottom:2rem;">Join AgroFarm AI</h2>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
            <div class="input-group"><label>First Name</label><input type="text" id="signup-fname" class="input-field" placeholder="Ramesh"></div>
            <div class="input-group"><label>Last Name</label><input type="text" id="signup-lname" class="input-field" placeholder="Kumar"></div>
          </div>
          <div class="input-group"><label>Email</label><input type="email" id="signup-email" class="input-field" placeholder="ramesh@example.com"></div>
          <div class="input-group"><label>Password</label><input type="password" id="signup-pass" class="input-field" placeholder="••••••••"></div>
          <div class="input-group">
            <label style="margin-bottom:0.75rem; display:block;">Select Your Role:</label>
            <div style="display:flex; gap:1.5rem; align-items:center;">
              <label style="cursor:pointer; display:flex; align-items:center; gap:0.5rem;"><input type="radio" name="signup-role" value="farmer" checked> Farmer</label>
              <label style="cursor:pointer; display:flex; align-items:center; gap:0.5rem;"><input type="radio" name="signup-role" value="buyer"> Buyer / Business</label>
            </div>
          </div>
          <button class="btn btn-primary" style="width:100%; margin-top:1.5rem;" onclick="window.registerUser()">Create Account</button>
          <div style="text-align:center; margin-top:1.5rem; font-size:0.9rem; color:#666;">
            Already have an account? <a href="#" onclick="window.navigate('login')" style="color:var(--color-primary); font-weight:700;">Sign In</a>
          </div>
        </div>
      </div>`;
  },
  f2b: function() {
    return `<div class="db-wrapper spacer-y fade-in"><h2 class="display-font" style="font-size:2.5rem;">Farm-to-Business Hub</h2><p style="color:#666; margin-bottom:2rem;">Direct bulk supply channels for corporate procurement.</p><div class="grid-3"><div class="card"><h3>Active Contracts</h3><div class="stat-number">03</div></div><div class="card"><h3>Bids Received</h3><div class="stat-number">08</div></div><div class="card"><h3>Logistics</h3><div class="stat-number">Ready</div></div></div></div>`;
  },
  b2f: function() {
    return `<div class="db-wrapper spacer-y fade-in"><h2 class="display-font" style="font-size:2.5rem;">Business-to-Farm Portal</h2><p style="color:#666; margin-bottom:2rem;">Source raw materials and produce directly from verified growers.</p><div class="grid-3"><div class="card"><h3>Active Requests</h3><div class="stat-number">04</div></div><div class="card"><h3>Verified Farms</h3><div class="stat-number">120</div></div><div class="card"><h3>Processing</h3><div class="stat-number">Active</div></div></div></div>`;
  },
  knowledge: function() {
    return `<div class="container spacer-y fade-in"><h2 class="display-font" style="font-size:2.5rem;">Resource Center</h2><p>Agri-Intelligence and latest government schemes.</p><div class="grid-3"><div class="card"><h3>Schemes</h3><p>PM-KISAN dashboard links.</p></div><div class="card"><h3>Techniques</h3><p>Hydroponics and drip irrigation guides.</p></div><div class="card"><h3>Pests</h3><p>Comprehensive identification guide.</p></div></div></div>`;
  },
  community: function() {
    return `<div class="container spacer-y fade-in"><h2 class="display-font">Farmer Community</h2><div class="card" style="padding:4rem; text-align:center;"><p>Discussion forums and community expert panels are syncing...</p></div></div>`;
  },
  'soil-analysis': function() {
    return `
      <div class="db-wrapper spacer-y fade-in">
        <div class="soil-header">
          <div>
            <div class="soil-breadcrumb">Analytics / Intelligence</div>
            <h1 class="display-font" style="margin:0; font-size:2.5rem; letter-spacing:-1px;">Soil Intelligence Hub</h1>
          </div>
          <div style="display:flex; gap:1rem;">
             <button class="premium-btn-ai" onclick="document.getElementById('soil-form-card').scrollIntoView({behavior:'smooth'})">
                <span style="font-size:1.2rem;">✨</span> NEW SCAN
             </button>
          </div>
        </div>

        <div class="grid-3" style="grid-template-columns: 320px 1fr 380px; gap: 2rem; align-items: start;">
          
          <!-- Column 1: Configurator -->
          <div class="glass-card-premium" id="soil-form-card" style="padding:2rem;">
            <h3 class="display-font" style="margin-top:0; font-size:1.1rem; color:var(--color-primary);">FIELD CONFIG</h3>
            <div class="input-group"><label>Field Identifier</label><input type="text" id="soil-field" class="input-field" placeholder="North Wheat Plot"></div>
            <div class="input-group">
              <label>Geo-Location</label>
              <select id="soil-location" class="input-field">
                <option value="Kolhapur">Kolhapur Central</option>
                <option value="Sangli">Sangli East</option>
                <option value="Satara">Satara North</option>
              </select>
            </div>
            <div class="input-group"><label>Sampling Date</label><input type="date" id="soil-date" class="input-field"></div>
            
            <div class="soil-scan-container" onclick="document.getElementById('soil-file').click()">
              <div class="soil-scanner-line" id="scanner-line"></div>
              <div class="soil-dropzone" id="soil-upload" style="margin-bottom:0; border-style:dotted;">
                <input type="file" id="soil-file" style="display:none;" onchange="window.handleSoilUpload(this)">
                <div id="upload-placeholder">
                  <div style="font-size:2rem; margin-bottom:0.5rem;">📷</div>
                  <strong style="font-size:0.85rem;">SAMPLE SCAN</strong>
                </div>
                <img id="soil-preview" style="display:none; width:100%; border-radius:12px;">
              </div>
            </div>

            <h4 style="margin: 1.5rem 0 1rem; font-size:0.8rem; color:#888; letter-spacing:1px;">NUTRIENT PROFILE</h4>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="input-group" style="margin:0;"><label>pH</label><input type="number" step="0.1" id="soil-ph" class="input-field" value="6.5"></div>
              <div class="input-group" style="margin:0;"><label>N</label><input type="number" id="soil-n" class="input-field" value="40"></div>
              <div class="input-group" style="margin:0;"><label>P</label><input type="number" id="soil-p" class="input-field" value="25"></div>
              <div class="input-group" style="margin:0;"><label>K</label><input type="number" id="soil-k" class="input-field" value="30"></div>
              <div class="input-group" style="margin:0;"><label>Moist %</label><input type="number" id="soil-moisture" class="input-field" value="15"></div>
              <div class="input-group" style="margin:0;"><label>O.M %</label><input type="number" id="soil-om" class="input-field" value="2.5"></div>
            </div>

            <button class="premium-btn-ai" style="width:100%; margin-top:2rem;" onclick="window.runSoilAnalysis()">RUN AI DIAGNOSIS</button>
          </div>

          <!-- Column 2: The Heart (Visualizer) -->
          <div style="display:flex; flex-direction:column; gap:2rem;">
            <div class="glass-card-premium" id="soil-results-panel" style="display:none; padding:2.5rem; text-align:center;">
                <div class="soil-gauge-container" style="width:400px; height:220px; margin: 0 auto; position: relative;">
                  <canvas id="soilGaugeChart"></canvas>
                  <div class="soil-gauge-score" style="bottom:10px;">
                    <div class="soil-gauge-value" id="res-score" style="font-size:4rem;">--</div>
                    <div class="soil-gauge-label">HEALTH INDEX</div>
                  </div>
                </div>
                
                <div class="stat-chip-grid">
                    <div class="stat-chip"><div class="stat-chip-val" id="chip-ph">--</div><div class="stat-chip-label">pH Level</div></div>
                    <div class="stat-chip"><div class="stat-chip-val" id="chip-n">--</div><div class="stat-chip-label">Nitrogen</div></div>
                    <div class="stat-chip"><div class="stat-chip-val" id="chip-p">--</div><div class="stat-chip-label">Phosphor</div></div>
                    <div class="stat-chip"><div class="stat-chip-val" id="chip-k">--</div><div class="stat-chip-label">Potassium</div></div>
                    <div class="stat-chip"><div class="stat-chip-val" id="chip-moist">--</div><div class="stat-chip-label">Moisture</div></div>
                    <div class="stat-chip"><div class="stat-chip-val" id="chip-om">--</div><div class="stat-chip-label">Org. Matt</div></div>
                </div>
                
                <div style="margin-top:2.5rem; height:180px;">
                  <canvas id="soilNutrientChart"></canvas>
                </div>
            </div>
            
            <div id="soil-placeholder-card" class="glass-card-premium" style="padding:5rem; text-align:center; color:#ccc; border:2px dashed #eee;">
               <div style="font-size:4rem; margin-bottom:1.5rem; opacity:0.3;">📡</div>
               <h2 style="margin:0; opacity:0.5;">Awaiting Data Input</h2>
               <p style="opacity:0.4;">Complete the form and upload a sample to initiate AI perception.</p>
            </div>
          </div>

          <!-- Column 3: Intelligence & History -->
          <div style="display:flex; flex-direction:column; gap:2rem;">
             <div class="ai-recommendation-panel" id="ai-rec-card" style="display:none;">
                <h3 style="margin-top:0; font-size:1.2rem; display:flex; align-items:center; gap:0.5rem;">
                   <span style="font-size:1.5rem;">💡</span> AI INSIGHTS
                </h3>
                <p id="res-recommendation" style="line-height:1.7; font-size:1rem; opacity:0.95;">Analyzing your soil data to generate customized agronomic advice...</p>
                <div style="margin-top:1.5rem; display:flex; gap:0.5rem;">
                   <button class="nav-link" style="background:rgba(255,255,255,0.1); border:none; color:white; padding:0.5rem 1rem; border-radius:8px; font-size:0.8rem;" onclick="window.print()">EXPORT PDF</button>
                </div>
             </div>

             <div class="glass-card-premium" style="padding:1.5rem;">
                <h3 class="display-font" style="margin-top:0; font-size:1rem; color:#333;">CHRONOLOGY</h3>
                <div id="soil-history-tbody" style="display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem;">
                   <div style="text-align:center; padding:2rem; color:#999;">Syncing history...</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    `;
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
    if (route === 'soil-analysis') {
      window.fetchSoilHistory();
      document.getElementById('soil-date').valueAsDate = new Date();
    }
    if (route === 'landing') setTimeout(window.initLandingPage, 80);
    if (route === 'farmer-dashboard' || route === 'buyer-dashboard') {
      setTimeout(window.initDashboard, 80);
    }
  }
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.route === route || (route === 'landing' && l.dataset.route === 'landing')));
}

window.navigate = function(r) { renderRoute(r); window.scrollTo({ top: 0, behavior: 'smooth' }); };

document.addEventListener('click', (e) => {
  const l = e.target.closest('.nav-link, .dropdown-link');
  if (!l) return;
  
  if (l.dataset.route) {
    e.preventDefault();
    window.navigate(l.dataset.route);
  } else if (l.getAttribute('href')?.startsWith('#')) {
    e.preventDefault();
    const targetId = l.getAttribute('href').substring(1);
    if (appState.currentRoute !== 'landing') {
      window.navigate('landing');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// ─── Auth ───────────────────────────────────────────────────────────
window.updateNavbarUI = function() {
  const auth = document.getElementById('nav-auth-buttons');
  const user = document.getElementById('nav-user-menu');
  const publicLinks = document.querySelectorAll('.public-link');
  const protectedLinks = document.querySelectorAll('.protected-link');

  if (appState.isAuthenticated) {
    if (auth) auth.style.display = 'none';
    if (user) {
      user.style.display = 'flex';
      const n = document.getElementById('user-menu-name'); if (n) n.textContent = appState.user?.name || 'Farmer'; getInitials();
    }
    // Show protected, hide public
    publicLinks.forEach(l => l.style.display = 'none');
    protectedLinks.forEach(l => {
      // Role-based visibility
      if (l.id === 'nav-diag-link' || l.id === 'nav-f2b-link') {
        l.style.display = (appState.role === 'farmer') ? 'block' : 'none';
      } else if (l.id === 'nav-b2f-link') {
        l.style.display = (appState.role === 'buyer') ? 'block' : 'none';
      } else {
        l.style.display = 'block';
      }
    });
  } else {
    if (auth) auth.style.display = 'flex';
    if (user) user.style.display = 'none';
    // Show public, hide protected
    publicLinks.forEach(l => l.style.display = 'block');
    protectedLinks.forEach(l => l.style.display = 'none');
  }
};

function getInitials() {
  const avatar = document.getElementById('user-avatar-initials');
  if (avatar && appState.user) {
    const name = appState.user.name || 'Farmer';
    avatar.textContent = name.split(' ').map(n=>n[0]).join('').toUpperCase();
  }
}

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
  const f = document.getElementById('signup-fname')?.value;
  const l = document.getElementById('signup-lname')?.value;
  const e = document.getElementById('signup-email')?.value;
  const p = document.getElementById('signup-pass')?.value;
  const r = document.querySelector('input[name="signup-role"]:checked')?.value;
  
  if (!f || !l || !e || !p) { alert('Please fill in all fields'); return; }

  try {
    const res = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: f, lastName: l, email: e, password: p, role: r })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');
    
    appState.isAuthenticated = true;
    appState.user = data.user;
    appState.role = data.user.role;
    _saveSession();
    window.updateNavbarUI();
    window.navigate('dashboard');
    setTimeout(() => window.requestSatelliteSync(), 1000);
  } catch(err) {
    alert(err.message);
  }
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

// ─── Home Page — Stat Counters ──────────────────────────────────────
window.initLandingPage = function() {
  // Animated stat counters with IntersectionObserver
  const statData = [
    { id: 'stat-0', end: 50000, suffix: '+', isFloat: false },
    { id: 'stat-1', end: 200, suffix: '+', isFloat: false },
    { id: 'stat-2', end: 1.2, suffix: 'M+', isFloat: true },
    { id: 'stat-3', end: 800, suffix: 'K+', isFloat: false }
  ];

  function animateCounter(el, endVal, suffix, isFloat, duration = 1800) {
    let start = 0;
    const step = 16;
    const steps = duration / step;
    const inc = endVal / steps;
    const timer = setInterval(() => {
      start = Math.min(start + inc, endVal);
      el.textContent = isFloat ? start.toFixed(1) + suffix : Math.floor(start).toLocaleString('en-IN') + suffix;
      if (start >= endVal) clearInterval(timer);
    }, step);
  }

  const statsSection = document.getElementById('home-stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statData.forEach((s) => {
          const el = document.getElementById(s.id);
          if (el) animateCounter(el, s.end, s.suffix, s.isFloat);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);

  // Testimonial Carousel
  let currentTestimonial = 0;
  const track = document.getElementById('testimonials-track');
  const cards = track ? track.querySelectorAll('.home-testimonial-card') : [];
  const dots = document.querySelectorAll('.home-dot');

  function showTestimonial(idx) {
    if (!track || cards.length === 0) return;
    currentTestimonial = ((idx % cards.length) + cards.length) % cards.length;
    track.style.transform = `translateX(-${currentTestimonial * (100 / cards.length)}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentTestimonial));
  }

  window.scrollTestimonials = function(dir) { showTestimonial(currentTestimonial + dir); };
  window.goToTestimonial = function(idx) { showTestimonial(idx); };

  // Auto-advance testimonials every 5s
  const testimonialTimer = setInterval(() => { showTestimonial(currentTestimonial + 1); }, 5000);
  // Clear timer if user navigates away
  const mainEl = document.getElementById('main-content');
  if (mainEl) {
    const mo = new MutationObserver(() => { clearInterval(testimonialTimer); mo.disconnect(); });
    mo.observe(mainEl, { childList: true });
  }
};

// ─── Newsletter Signup ───────────────────────────────────────────────
// ─── Soil Analysis Logic ──────────────────────────────────────────────
window.handleSoilUpload = function(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('soil-preview');
      const placeholder = document.getElementById('upload-placeholder');
      if (preview && placeholder) {
        preview.src = e.target.result;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
};

window.runSoilAnalysis = async function() {
  const btn = document.querySelector('button[onclick="window.runSoilAnalysis()"]');
  const scanner = document.getElementById('scanner-line');
  const placeholder = document.getElementById('soil-placeholder-card');
  const results = document.getElementById('soil-results-panel');
  const recCard = document.getElementById('ai-rec-card');
  
  if (!btn) return;
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '⚡ PERCEIVING...';
  
  // Start Scanning effect
  if (scanner) scanner.style.display = 'block';

  const data = {
    userEmail: appState.user?.email || 'guest@example.com',
    fieldName: document.getElementById('soil-field').value || 'Unnamed Field',
    location: document.getElementById('soil-location').value,
    date: document.getElementById('soil-date').value,
    parameters: {
      ph: parseFloat(document.getElementById('soil-ph').value),
      n: parseInt(document.getElementById('soil-n').value),
      p: parseInt(document.getElementById('soil-p').value),
      k: parseInt(document.getElementById('soil-k').value),
      moisture: parseInt(document.getElementById('soil-moisture').value),
      organicMatter: parseFloat(document.getElementById('soil-om').value)
    }
  };

  try {
    // Artificial delay for "WOW" effect
    await new Promise(r => setTimeout(r, 2000));
    
    const res = await fetch('http://localhost:5000/api/soil-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    
    // Hide placeholder, show panels
    if (placeholder) placeholder.style.display = 'none';
    if (results) results.style.display = 'block';
    if (recCard) recCard.style.display = 'block';

    // Update Scores & Chips
    document.getElementById('res-score').textContent = result.healthScore;
    document.getElementById('res-recommendation').textContent = result.recommendation;
    document.getElementById('chip-ph').textContent = data.parameters.ph;
    document.getElementById('chip-n').textContent = data.parameters.n;
    document.getElementById('chip-p').textContent = data.parameters.p;
    document.getElementById('chip-k').textContent = data.parameters.k;
    document.getElementById('chip-moist').textContent = data.parameters.moisture + '%';
    document.getElementById('chip-om').textContent = data.parameters.organicMatter + '%';
    
    // Init Charts
    window.initSoilCharts(result.healthScore, data.parameters);
    
    // Refresh History & Notify
    window.fetchSoilHistory();
    window.showNotification('✨ Intelligence Sync Complete');
    
    // Scroll to results
    results.scrollIntoView({ behavior: 'smooth' });
    
  } catch(e) {
    alert('Analysis Failed: ' + e.message);
  } finally {
    if (scanner) scanner.style.display = 'none';
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
};

window.initSoilCharts = function(score, params) {
  const gaugeCtx = document.getElementById('soilGaugeChart')?.getContext('2d');
  const barCtx = document.getElementById('soilNutrientChart')?.getContext('2d');
  if (!gaugeCtx || !barCtx || !window.Chart) return;

  // Cleanup existing charts
  if (appState._soilGauge) appState._soilGauge.destroy();
  if (appState._soilBar) appState._soilBar.destroy();

  // Gauge Chart (Semi-circle)
  const scoreColor = score > 70 ? '#76FF03' : (score > 40 ? '#FFD600' : '#FF1744');
  const glowColor = score > 70 ? 'rgba(118, 255, 3, 0.3)' : (score > 40 ? 'rgba(255, 214, 0, 0.3)' : 'rgba(255, 23, 68, 0.3)');
  
  appState._soilGauge = new Chart(gaugeCtx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [score, 100 - score],
        backgroundColor: [scoreColor, 'rgba(0,0,0,0.05)'],
        borderWidth: 0,
        hoverOffset: 0
      }]
    },
    options: {
      circumference: 180,
      rotation: 270,
      cutout: '85%',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { display: false }, 
        tooltip: { enabled: false }
      }
    }
  });

  // Apply a subtle shadow/glow effect to the gauge via the container
  gaugeCtx.canvas.parentElement.style.filter = `drop-shadow(0 0 10px ${glowColor})`;

  // Nutrient Bar Chart
  appState._soilBar = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['pH', 'N', 'P', 'K', 'Moist %'],
      datasets: [{
        label: 'Level',
        data: [params.ph * 10, params.n, params.p, params.k, params.moisture],
        backgroundColor: 'rgba(118, 255, 3, 0.6)',
        borderColor: '#76FF03',
        borderWidth: 1,
        borderRadius: 20,
        barThickness: 12
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { 
        x: { max: 100, display: false }, 
        y: { 
          grid: { display: false },
          ticks: { color: '#666', font: { weight: 'bold' } }
        } 
      }
    }
  });
};

window.fetchSoilHistory = async function() {
  const container = document.getElementById('soil-history-tbody');
  if (!container) return;
  
  try {
    const res = await fetch(`http://localhost:5000/api/soil-analyses?email=${appState.user?.email || 'guest@example.com'}`);
    const records = await res.json();
    
    if (records.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:2rem; color:#999;">No past analyses found. Start your first one!</div>';
      return;
    }

    container.innerHTML = records.map(r => `
      <div class="glass-card-premium" style="padding:1rem; display:flex; justify-content:space-between; align-items:center; border-radius:12px;">
         <div>
            <div style="font-weight:700; font-size:0.9rem;">${r.fieldName}</div>
            <div style="font-size:0.7rem; color:#888;">${new Date(r.date).toLocaleDateString()} • pH ${r.parameters.ph}</div>
         </div>
         <div style="display:flex; align-items:center; gap:1rem;">
            <span class="health-badge ${r.healthScore > 70 ? 'health-healthy' : (r.healthScore > 40 ? 'health-alert' : 'health-critical')}">
              ${r.healthScore}%
            </span>
            <button class="nav-link" style="color:var(--color-primary); font-weight:700; font-size:0.75rem;" onclick="window.viewSoilResult('${r._id}')">RE-SCAN</button>
         </div>
      </div>
    `).join('');
  } catch(e) {
    container.innerHTML = '<div style="text-align:center; padding:2rem; color:#c62828;">Failed to load sync.</div>';
  }
};

window.showNotification = function(msg) {
  const toast = document.createElement('div');
  toast.className = 'notification-toast';
  toast.innerHTML = `<span style="font-size:1.2rem;">🔔</span> <span>${msg}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};

window.viewSoilResult = function(id) {
  // Simple mock: just alert or scroll to results if it's the current one
  alert('Viewing detailed historical report ID: ' + id);
};
