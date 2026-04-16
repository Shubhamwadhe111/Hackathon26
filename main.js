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
    sat_sync_title: "Satellite Sync", linking: "Linking...",
    hero_badge: "🛰️ AI-Powered Agricultural Intelligence",
    hero_main_title: "Smart Farming", hero_main_sub: "Starts Here",
    hero_sub: "Harness AI to optimize your crop yields, soil health, and market profits — all in one platform.",
    stat_farmers: "Total Farmers", stat_crops: "Crops Monitored", stat_soil: "Soil Reports", stat_ai: "AI Diagnoses Done",
    feat_title: "Everything You Need to Farm Smarter",
    feat_home_title: "Home", feat_home_desc: "Your central command center — see weather, alerts, and crop status at a glance every morning.",
    feat_dash_title: "Dashboard", feat_dash_desc: "Visualize farm performance with real-time charts, predictive analytics, and field summaries.",
    feat_soil_title: "Soil Analysis", feat_soil_desc: "Deep-dive into nutrient profiles and moisture levels with satellite-assisted mapping technology.",
    feat_diag_title: "AI Diagnosis", feat_diag_desc: "Upload a leaf photo — get instant pest & disease identification with treatment guidance.",
    feat_market_title: "Market", feat_market_desc: "Access live mandi prices, wholesale trends, and best-time-to-sell recommendations.",
    news_title: "Stay Ahead of the Season", news_sub: "Get AI insights, market forecasts & farming tips delivered to your inbox.", news_btn: "Subscribe",
    db_ask_ai: "Ask AI", db_welcome_farmer: "Namaste! I'm your AI farming assistant. Ask me about your crops, diseases, market prices, or soil health!",
    db_welcome_buyer: "Hello! I'm your procurement AI assistant. I can help you with vendor checks, market trends, and quality verification.",
    db_ai_placeholder_farmer: "Ask anything about your farm...", db_ai_placeholder_buyer: "Ask about market trends...",
    db_farmer_title: "Farmer Dashboard", db_weather_fetching: "🌤️ Fetching weather...", db_new_report: "New Soil Report", db_farm_center: "FARM INTELLIGENCE CENTER",
    db_monitoring: "Your fields are being monitored.", db_alerts_needed: "alert needs attention.", db_view_alerts: "View Alerts",
    db_kpi_fields: "TOTAL FIELDS", db_kpi_alerts: "ACTIVE ALERTS", db_kpi_pending: "PENDING REPORTS", db_kpi_market: "MARKET PRICE INDEX",
    db_health_score: "Crop Health Score", db_last_30d: "Last 30 days — Field average", db_field_map: "Field Location Map", db_map_sub: "Health status by field",
    db_recent_alerts: "Recent Alerts", db_mark_read: "Mark All Read", db_tasks: "Upcoming Tasks", db_task_all: "All", db_task_pending: "Pending", db_task_done: "Done",
    db_th_task: "Task", db_th_field: "Field", db_th_due: "Due Date", db_th_status: "Status",
    db_proc_title: "Procurement Dashboard", db_biz_hub: "📦 Business Intelligence Hub", db_explore_market: "Explore Market", db_proc_intel: "PROCUREMENT INTELLIGENCE",
    db_orders_desc: "active procurement orders.", db_view_orders: "View Orders", db_kpi_orders: "ACTIVE ORDERS", db_kpi_farms: "VERIFIED FARMS", db_kpi_bids: "PENDING BIDS", db_kpi_spend: "SPEND THIS MONTH",
    soil_intel_hub: "Soil Intelligence Hub", soil_analytics: "Analytics / Intelligence", soil_new_scan: "NEW SCAN", soil_field_config: "FIELD CONFIG",
    soil_field_id: "Field Identifier", soil_geo: "Geo-Location", soil_date: "Sampling Date", soil_sample_scan: "SAMPLE SCAN", soil_nutrient_prof: "NUTRIENT PROFILE",
    soil_health_index: "HEALTH INDEX", soil_awaiting: "Awaiting Data Input", soil_awaiting_sub: "Complete the form and upload a sample to initiate AI perception.",
    soil_ai_insights: "AI INSIGHTS", soil_analyzing: "Analyzing your soil data to generate customized agronomic advice...", soil_export_pdf: "EXPORT PDF", soil_chronology: "CHRONOLOGY",
    diag_wheat_rust: "Wheat Rust Identified", diag_treatment: "Treatment: Neem oil application suggested.",
    auth_join: "Join AgroFarm AI", auth_fname: "First Name", auth_lname: "Last Name", auth_role_select: "Select Your Role:", auth_role_farmer_opt: "Farmer", auth_role_buyer_opt: "Buyer / Business",
    auth_create: "Create Account", auth_have_acc: "Already have an account?",
    nav_feat: "Features", nav_about: "About", nav_f2b: "F2B Hub", nav_b2f: "B2F Hub",
    home_stories_badge: "⭐ Farmer Stories", home_stories_title: "Trusted by Farmers Across India", home_stories_sub: "Real results from real farmers who transformed their operations with AgroFarm AI.",
    home_testimonial_1: "The AI diagnosis tool saved my entire wheat crop this season. I identified a rust infection 2 weeks before it became critical — that's ₹3 lakh saved.",
    home_testimonial_2: "Switching to AgroFarm AI helped us reduce fertilizer costs by 30% while increasing our yield. The soil analysis precision is truly unmatched.",
    home_testimonial_3: "The Market module gives me real-time prices from different mandis. I finally feel I have the power to negotiate fairly.",
    home_testimonial_4: "As an agri-business, the F2B/B2F portal has connected us to 120+ verified farms. Procurement is now faster and cheaper.",
    home_auth_1: "Ramesh Kumar", home_role_1: "🌾 Wheat Farmer, Punjab",
    home_auth_2: "Priya Deshpande", home_role_2: "🌿 Organic Farmer, Maharashtra",
    home_auth_3: "Arjun Singh", home_role_3: "🧅 Vegetable Grower, UP",
    home_auth_4: "Meera Gupta", home_role_4: "🏢 Agri-Business, Gujarat",
    footer_tagline: "Empowering the world's most vital industry with the precision of AI and the wisdom of tradition.",
    footer_platform: "Platform", footer_resources: "Resources", footer_company: "Company", footer_contact: "Contact",
    chat_kisan_welcome: "Namaste! I am your AI farming assistant. How can I help you today?",
    chat_kisan_placeholder: "Ask anything...", chat_kisan_tooltip: "Ask Kisan Assistant",
    chat_suggest_1: "🌾 Rice diseases", chat_suggest_2: "📈 Market prices", chat_suggest_3: "🌤️ Weather check",
    chat_suggest_1: "🌾 Rice diseases", chat_suggest_2: "📈 Market prices", chat_suggest_3: "🌤️ Weather check",
    chat_kisan_name: "Kisan AI Assistant", chat_kisan_sub: "Online · Farming Expert", chat_biz_name: "Business AI Assistant", chat_biz_sub: "Online · Procurement Expert",
    news_placeholder: "Enter your email address...", nav_careers: "Careers", nav_privacy: "Privacy Policy", nav_cases: "Case Studies", nav_govt: "Govt. Schemes", nav_help: "Help Center",
    chat_typing: "Typing...", chat_error: "Failed to connect to server.", chat_error_api: "Error connecting to AI."
  },
};

const appState = {
  currentRoute: 'landing',
  isAuthenticated: !!(_savedSession && _savedSession.user),
  user: _savedSession?.user || null,
  role: _savedSession?.role || null, // 'farmer' | 'buyer'
  fieldConditions: null,
  lang: 'en',
  _soilGauge: null,
  _soilBar: null,
  _fdSection: 'home',
  _bdSection: 'home'
};

function t(key) {
  return i18n.en[key] || key;
}

function _saveSession() {
  // Always persist language preference regardless of auth state
  localStorage.setItem('agro_lang', appState.lang);
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
      <!-- ═══ HERO SECTION ═══ -->
      <section class="home-hero-section">
        <div class="home-hero-bg-image"></div>
        <div class="home-hero-overlay"></div>
        <div class="home-hero-inner container fade-in">
          <div class="home-hero-badge">
            <span id="live-weather-value">${t('hero_badge')}</span>
          </div>
          <h1 class="home-hero-title">${t('hero_main_title')}<br>${t('hero_main_sub')}</h1>
          <p class="home-hero-sub">${t('hero_sub')}</p>
          <div class="home-hero-ctas">
            <button class="home-cta-primary" onclick="window.navigate('soil-analysis')" id="cta-get-started">${t('btn_get_started')} →</button>
            <button class="home-cta-ghost" onclick="window.navigate('market')" id="cta-explore-market">${t('btn_market_view')}</button>
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
            <div class="home-stat-label">${t('stat_farmers')}</div>
          </div>
          <div class="home-stat-item" data-target="200" data-suffix="+" data-prefix="">
            <div class="home-stat-icon">🌾</div>
            <div class="home-stat-number" id="stat-1">0</div>
            <div class="home-stat-label">${t('stat_crops')}</div>
          </div>
          <div class="home-stat-item" data-target="1.2" data-suffix="M+" data-prefix="">
            <div class="home-stat-icon">🧪</div>
            <div class="home-stat-number" id="stat-2">0</div>
            <div class="home-stat-label">${t('stat_soil')}</div>
          </div>
          <div class="home-stat-item" data-target="800" data-suffix="K+" data-prefix="">
            <div class="home-stat-icon">🤖</div>
            <div class="home-stat-number" id="stat-3">0</div>
            <div class="home-stat-label">${t('stat_ai')}</div>
          </div>
        </div>
      </section>

      <!-- ═══ FEATURE HIGHLIGHTS GRID ═══ -->
      <section class="home-features-section">
        <div class="container">
          <div class="home-section-header">
            <div class="home-section-badge">🌿 ${t('feat_title')}</div>
            <h2 class="home-section-title">${t('feat_title')}</h2>
          </div>
          <div class="home-features-grid" id="features">
            <div class="home-feature-card" onclick="window.navigate('landing')">
              <div class="home-feature-icon">🏠</div>
              <h3 class="home-feature-title">${t('feat_home_title')}</h3>
              <p class="home-feature-desc">${t('feat_home_desc')}</p>
            </div>
            <div class="home-feature-card" onclick="window.navigate('dashboard')">
              <div class="home-feature-icon">📊</div>
              <h3 class="home-feature-title">${t('feat_dash_title')}</h3>
              <p class="home-feature-desc">${t('feat_dash_desc')}</p>
            </div>
            <div class="home-feature-card" onclick="window.navigate('soil-analysis')">
              <div class="home-feature-icon">🌱</div>
              <h3 class="home-feature-title">${t('feat_soil_title')}</h3>
              <p class="home-feature-desc">${t('feat_soil_desc')}</p>
            </div>
            <div class="home-feature-card" onclick="window.navigate('diagnosis')">
              <div class="home-feature-icon">🤖</div>
              <h3 class="home-feature-title">${t('feat_diag_title')}</h3>
              <p class="home-feature-desc">${t('feat_diag_desc')}</p>
            </div>
            <div class="home-feature-card" onclick="window.navigate('market')">
              <div class="home-feature-icon">📈</div>
              <h3 class="home-feature-title">${t('feat_market_title')}</h3>
              <p class="home-feature-desc">${t('feat_market_desc')}</p>
            </div>
            <div class="home-feature-card" onclick="window.navigate('f2b')">
              <div class="home-feature-icon">🤝</div>
              <h3 class="home-feature-title">${t('feat_f2b_title')}</h3>
              <p class="home-feature-desc">${t('feat_f2b_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ TESTIMONIALS CAROUSEL ═══ -->
      <section id="kisan-ai" class="home-ai-section">
        <div class="container">
          <div class="home-section-header">
            <div class="home-section-badge" style="background: rgba(46,125,50,0.1); color: var(--color-primary);" data-i18n="chat_kisan_name">Kisan AI Knowledge Hub</div>
            <h2 class="home-section-title">Ask our AI Agronomist</h2>
            <p class="home-section-sub">Get instant answers for crops, soil, and weather from our local agricultural database.</p>
          </div>
          
          <div id="chatbox" class="glass-card-premium home-chat-box">
             <div id="messages" class="home-chat-messages">
                <div class="ai-msg bot">Namaste! I am the Kisan AI Assistant. Ask me anything about farming!</div>
             </div>
             <div class="home-chat-input-wrapper">
                <input id="userInput" type="text" placeholder="Ask about wheat, soil, PM-Kisan..." class="home-chat-input" onkeypress="if(event.key==='Enter') window.sendMessage()">
                <button class="btn-modern-signup home-chat-btn" onclick="window.sendMessage()">Send</button>
             </div>
          </div>
        </div>
      </section>

      <section class="home-testimonials-section">
        <div class="container">
          <div class="home-section-header">
            <div class="home-section-badge" style="background: rgba(255,193,7,0.15); color: #7a5c00;" data-i18n="home_stories_badge">${t('home_stories_badge')}</div>
            <h2 class="home-section-title" data-i18n="home_stories_title">${t('home_stories_title')}</h2>
            <p class="home-section-sub" data-i18n="home_stories_sub">${t('home_stories_sub')}</p>
          </div>
          <div class="home-testimonials-track" id="testimonials-track">
            <div class="home-testimonial-card">
              <div class="home-testimonial-stars">★★★★★</div>
              <p class="home-testimonial-quote">${t('home_testimonial_1')}</p>
              <div class="home-testimonial-author">
                <div class="home-testimonial-avatar">RK</div>
                <div>
                  <div class="home-testimonial-name">${t('home_auth_1')}</div>
                  <div class="home-testimonial-role">${t('home_role_1')}</div>
                </div>
              </div>
            </div>
            <div class="home-testimonial-card">
              <div class="home-testimonial-stars">★★★★★</div>
              <p class="home-testimonial-quote">${t('home_testimonial_2')}</p>
              <div class="home-testimonial-author">
                <div class="home-testimonial-avatar">PD</div>
                <div>
                  <div class="home-testimonial-name">${t('home_auth_2')}</div>
                  <div class="home-testimonial-role">${t('home_role_2')}</div>
                </div>
              </div>
            </div>
            <div class="home-testimonial-card">
              <div class="home-testimonial-stars">★★★★★</div>
              <p class="home-testimonial-quote">${t('home_testimonial_3')}</p>
              <div class="home-testimonial-author">
                <div class="home-testimonial-avatar">AS</div>
                <div>
                  <div class="home-testimonial-name">${t('home_auth_3')}</div>
                  <div class="home-testimonial-role">${t('home_role_3')}</div>
                </div>
              </div>
            </div>
            <div class="home-testimonial-card">
              <div class="home-testimonial-stars">★★★★★</div>
              <p class="home-testimonial-quote">${t('home_testimonial_4')}</p>
              <div class="home-testimonial-author">
                <div class="home-testimonial-avatar">MG</div>
                <div>
                  <div class="home-testimonial-name">${t('home_auth_4')}</div>
                  <div class="home-testimonial-role">${t('home_role_4')}</div>
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
          <div class="home-section-badge" style="background: rgba(255,193,7,0.2); color: #ffc107; margin: 0 auto 1rem auto;">📬 ${t('news_title')}</div>
          <h2 style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">${t('news_title')}</h2>
          <p style="color: rgba(255,255,255,0.7); margin-bottom: 2rem; font-size: 1.05rem;">${t('news_sub')}</p>
          <form class="home-newsletter-form" onsubmit="return false;">
            <input type="email" class="home-newsletter-input" placeholder="${t('news_placeholder')}" id="newsletter-email">
            <button type="submit" class="home-newsletter-btn" onclick="window.handleNewsletterSignup()">${t('news_btn')}</button>
          </form>
        </div>
      </section>

      <footer class="home-footer">
        <div class="container">
          <div class="home-footer-grid">
            <div class="home-footer-brand">
              <div class="home-footer-logo">🌿 AgroFarm AI</div>
              <p class="home-footer-tagline">${t('footer_tagline')}</p>
              <div class="home-footer-socials">
                <a href="#" class="home-social-btn" title="Twitter">𝕏</a>
                <a href="#" class="home-social-btn" title="Facebook">f</a>
                <a href="#" class="home-social-btn" title="Instagram">📷</a>
                <a href="#" class="home-social-btn" title="LinkedIn">in</a>
              </div>
            </div>
            <div class="home-footer-col">
              <h4 class="home-footer-heading">${t('footer_platform')}</h4>
              <a href="#" class="home-footer-link" onclick="window.navigate('soil-analysis'); return false;">${t('nav_soil')}</a>
              <a href="#" class="home-footer-link" onclick="window.navigate('diagnosis'); return false;">${t('ai_diagnosis')}</a>
              <a href="#" class="home-footer-link" onclick="window.navigate('market'); return false;">${t('nav_market')}</a>
              <a href="#" class="home-footer-link" onclick="window.navigate('f2b'); return false;">${t('nav_f2b')}</a>
            </div>
            <div class="home-footer-col">
              <h4 class="home-footer-heading">${t('footer_resources')}</h4>
              <a href="#" class="home-footer-link" onclick="window.navigate('knowledge'); return false;">${t('nav_resources')}</a>
              <a href="#" class="home-footer-link">${t('nav_cases')}</a>
              <a href="#" class="home-footer-link">${t('nav_govt')}</a>
              <a href="#" class="home-footer-link">${t('nav_help')}</a>
            </div>
            <div class="home-footer-col">
              <h4 class="home-footer-heading">${t('footer_company')}</h4>
              <a href="#" class="home-footer-link" data-i18n="nav_about">${t('nav_about')}</a>
              <a href="#" class="home-footer-link">${t('nav_careers')}</a>
              <a href="#" class="home-footer-link">${t('nav_privacy')}</a>
              <a href="#" class="home-footer-link" data-i18n="footer_contact">${t('footer_contact')}</a>
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
  results: function() {
    return `
      <div class="container fade-in spacer-y">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
          <div><h2 class="display-font" style="font-size: 2.5rem;">${t('intel_report')}</h2></div>
          <button class="btn btn-secondary" onclick="window.navigate('soil-analysis')">${t('recalculate')}</button>
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
      <div class="mkt-wrapper">

        <!-- Header -->
        <header class="mkt-header">
          <div class="mkt-header-left">
            <h1 class="mkt-title">Market Intelligence</h1>
            <p class="mkt-subtitle">Real-time Mandi price monitoring &amp; predictive AI analysis</p>
          </div>
          <div class="mkt-header-right">
            <select class="mkt-select">
              <option>Maharashtra</option>
              <option>Madhya Pradesh</option>
              <option>Uttar Pradesh</option>
            </select>
            <select class="mkt-select">
              <option>Nashik</option>
              <option>Indore</option>
              <option>Agra</option>
            </select>
            <div class="mkt-date-pill">
              <span class="material-symbols-outlined" style="font-size:1rem;">calendar_today</span>
              <span id="mkt-date">24 May, 2024</span>
            </div>
            <button class="mkt-notif-btn">
              <span class="material-symbols-outlined">notifications</span>
              <span class="mkt-notif-dot"></span>
            </button>
          </div>
        </header>

        <!-- Live Ticker -->
        <section class="mkt-ticker">
          <div class="mkt-ticker-badge">
            <span class="mkt-live-dot"></span>
            <span>LIVE MANDI</span>
          </div>
          <div class="mkt-ticker-track">
            <div class="mkt-ticker-scroll">
              <span class="mkt-tick-item">Wheat <strong>₹2,450</strong> <em class="mkt-up">▲ 1.2%</em></span>
              <span class="mkt-tick-item">Rice (Basmati) <strong>₹6,800</strong> <em class="mkt-down">▼ 0.5%</em></span>
              <span class="mkt-tick-item">Onion <strong>₹1,850</strong> <em class="mkt-up">▲ 4.8%</em></span>
              <span class="mkt-tick-item">Tomato <strong>₹2,200</strong> <em class="mkt-up">▲ 12.3%</em></span>
              <span class="mkt-tick-item">Maize <strong>₹2,100</strong> <em class="mkt-neutral">● 0.0%</em></span>
              <span class="mkt-tick-item">Mustard <strong>₹5,400</strong> <em class="mkt-up">▲ 0.8%</em></span>
              <span class="mkt-tick-item">Wheat <strong>₹2,450</strong> <em class="mkt-up">▲ 1.2%</em></span>
              <span class="mkt-tick-item">Rice (Basmati) <strong>₹6,800</strong> <em class="mkt-down">▼ 0.5%</em></span>
              <span class="mkt-tick-item">Onion <strong>₹1,850</strong> <em class="mkt-up">▲ 4.8%</em></span>
              <span class="mkt-tick-item">Tomato <strong>₹2,200</strong> <em class="mkt-up">▲ 12.3%</em></span>
              <span class="mkt-tick-item">Maize <strong>₹2,100</strong> <em class="mkt-neutral">● 0.0%</em></span>
              <span class="mkt-tick-item">Mustard <strong>₹5,400</strong> <em class="mkt-up">▲ 0.8%</em></span>
            </div>
          </div>
        </section>

        <!-- KPI Cards -->
        <section class="mkt-kpi-grid">
          <div class="mkt-kpi-card">
            <p class="mkt-kpi-label">Total Arrivals Today</p>
            <h3 class="mkt-kpi-value">42.5K <span class="mkt-kpi-unit">MT</span></h3>
            <div class="mkt-kpi-bar"><div class="mkt-kpi-bar-fill" style="width:65%"></div></div>
          </div>
          <div class="mkt-kpi-card">
            <p class="mkt-kpi-label">Top Commodity</p>
            <div class="mkt-kpi-row">
              <h3 class="mkt-kpi-value">Onion</h3>
              <span style="font-size:2rem;">🧅</span>
            </div>
            <p class="mkt-kpi-share">22% Vol Share</p>
          </div>
          <div class="mkt-kpi-card mkt-kpi-gainer">
            <p class="mkt-kpi-label">Biggest Gainer</p>
            <h3 class="mkt-kpi-value">Tomato</h3>
            <p class="mkt-kpi-change mkt-pos">
              <span class="material-symbols-outlined" style="font-size:1rem;">trending_up</span> +12.3% Today
            </p>
          </div>
          <div class="mkt-kpi-card mkt-kpi-loser">
            <p class="mkt-kpi-label">Biggest Loser</p>
            <h3 class="mkt-kpi-value">Garlic</h3>
            <p class="mkt-kpi-change mkt-neg">
              <span class="material-symbols-outlined" style="font-size:1rem;">trending_down</span> -4.2% Today
            </p>
          </div>
          <div class="mkt-kpi-card">
            <div class="mkt-kpi-row" style="align-items:center;">
              <div>
                <p class="mkt-kpi-label">Sentiment</p>
                <h3 class="mkt-kpi-value mkt-bullish">Bullish</h3>
              </div>
              <div class="mkt-gauge-wrap">
                <svg class="mkt-gauge-svg" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e8e8e8" stroke-width="3"/>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#16A34A" stroke-dasharray="75,100" stroke-width="3"/>
                </svg>
                <span class="mkt-gauge-val">75%</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Chart + Movers -->
        <section class="mkt-chart-grid">
          <div class="mkt-chart-card">
            <div class="mkt-chart-head">
              <h2 class="mkt-section-title">Price Trend Analysis</h2>
              <div class="mkt-tab-group">
                <button class="mkt-tab active" onclick="window.mktSetTab(this,'7D')">7D</button>
                <button class="mkt-tab" onclick="window.mktSetTab(this,'1M')">1M</button>
                <button class="mkt-tab" onclick="window.mktSetTab(this,'3M')">3M</button>
              </div>
            </div>
            <div class="mkt-canvas-wrap">
              <canvas id="marketChart"></canvas>
            </div>
            <div class="mkt-legend">
              <label class="mkt-legend-item"><input type="checkbox" checked> Onion (Red)</label>
              <label class="mkt-legend-item"><input type="checkbox"> Wheat</label>
              <label class="mkt-legend-item"><input type="checkbox"> Tomato</label>
            </div>
          </div>

          <div class="mkt-movers-card">
            <h2 class="mkt-section-title">Top Movers</h2>
            <div class="mkt-movers-section">
              <h4 class="mkt-movers-label mkt-pos">Daily Gainers</h4>
              <div class="mkt-mover-row">
                <div class="mkt-mover-left"><span class="mkt-mover-emoji">🍅</span><div><p class="mkt-mover-name">Tomato</p><p class="mkt-mover-var">Hybrid</p></div></div>
                <div class="mkt-mover-right"><p class="mkt-mover-pct mkt-pos">+12.3%</p><p class="mkt-mover-price">₹2,200</p></div>
              </div>
              <div class="mkt-mover-row">
                <div class="mkt-mover-left"><span class="mkt-mover-emoji">🥔</span><div><p class="mkt-mover-name">Potato</p><p class="mkt-mover-var">Jyoti</p></div></div>
                <div class="mkt-mover-right"><p class="mkt-mover-pct mkt-pos">+4.5%</p><p class="mkt-mover-price">₹1,450</p></div>
              </div>
            </div>
            <div class="mkt-movers-section mkt-movers-divider">
              <h4 class="mkt-movers-label mkt-neg">Daily Losers</h4>
              <div class="mkt-mover-row">
                <div class="mkt-mover-left"><span class="mkt-mover-emoji">🧄</span><div><p class="mkt-mover-name">Garlic</p><p class="mkt-mover-var">Local</p></div></div>
                <div class="mkt-mover-right"><p class="mkt-mover-pct mkt-neg">-4.2%</p><p class="mkt-mover-price">₹12,400</p></div>
              </div>
              <div class="mkt-mover-row">
                <div class="mkt-mover-left"><span class="mkt-mover-emoji">🍋</span><div><p class="mkt-mover-name">Lemon</p><p class="mkt-mover-var">Seedless</p></div></div>
                <div class="mkt-mover-right"><p class="mkt-mover-pct mkt-neg">-2.8%</p><p class="mkt-mover-price">₹8,100</p></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Mandi Price Table -->
        <section class="mkt-table-section">
          <div class="mkt-table-head">
            <h2 class="mkt-section-title">Daily Mandi Prices</h2>
            <div class="mkt-table-actions">
              <div class="mkt-search-box">
                <span class="material-symbols-outlined">search</span>
                <input type="text" placeholder="Search Mandi or Commodity..." id="mkt-search" oninput="window.mktSearch(this.value)">
              </div>
              <button class="mkt-action-btn" title="Export"><span class="material-symbols-outlined">file_download</span></button>
              <button class="mkt-action-btn" title="Filter"><span class="material-symbols-outlined">filter_list</span></button>
            </div>
          </div>
          <div class="mkt-table-wrap">
            <table class="mkt-table">
              <thead>
                <tr>
                  <th>Commodity</th><th>Variety</th><th>Market / District</th>
                  <th>Min / Max</th><th>Modal Price</th><th>Arrivals (MT)</th>
                  <th>Change</th><th></th>
                </tr>
              </thead>
              <tbody id="mkt-tbody">
                <tr>
                  <td><div class="mkt-comm-cell"><span>🧅</span><strong>Onion</strong></div></td>
                  <td>Red</td>
                  <td><div class="mkt-loc-cell"><span>Lasalgaon</span><small>Nashik, MH</small></div></td>
                  <td class="mkt-range">₹1,650 – ₹2,100</td>
                  <td class="mkt-modal">₹1,850</td>
                  <td><div class="mkt-arr-cell"><span>1,240</span><div class="mkt-arr-bar"><div style="width:80%"></div></div></div></td>
                  <td><span class="mkt-badge mkt-badge-pos">+4.8%</span></td>
                  <td><button class="mkt-more-btn"><span class="material-symbols-outlined">more_vert</span></button></td>
                </tr>
                <tr>
                  <td><div class="mkt-comm-cell"><span>🌾</span><strong>Wheat</strong></div></td>
                  <td>LOK-1</td>
                  <td><div class="mkt-loc-cell"><span>Indore Mandi</span><small>Indore, MP</small></div></td>
                  <td class="mkt-range">₹2,300 – ₹2,600</td>
                  <td class="mkt-modal">₹2,450</td>
                  <td><div class="mkt-arr-cell"><span>2,850</span><div class="mkt-arr-bar"><div style="width:60%"></div></div></div></td>
                  <td><span class="mkt-badge mkt-badge-pos">+1.2%</span></td>
                  <td><button class="mkt-more-btn"><span class="material-symbols-outlined">more_vert</span></button></td>
                </tr>
                <tr>
                  <td><div class="mkt-comm-cell"><span>🍅</span><strong>Tomato</strong></div></td>
                  <td>Hybrid</td>
                  <td><div class="mkt-loc-cell"><span>Azadpur</span><small>Delhi, NCR</small></div></td>
                  <td class="mkt-range">₹1,900 – ₹2,500</td>
                  <td class="mkt-modal">₹2,200</td>
                  <td><div class="mkt-arr-cell"><span>640</span><div class="mkt-arr-bar"><div style="width:35%"></div></div></div></td>
                  <td><span class="mkt-badge mkt-badge-pos">+12.3%</span></td>
                  <td><button class="mkt-more-btn"><span class="material-symbols-outlined">more_vert</span></button></td>
                </tr>
                <tr>
                  <td><div class="mkt-comm-cell"><span>🧄</span><strong>Garlic</strong></div></td>
                  <td>Local</td>
                  <td><div class="mkt-loc-cell"><span>Mahuva Mandi</span><small>Surat, GJ</small></div></td>
                  <td class="mkt-range">₹11,800 – ₹13,000</td>
                  <td class="mkt-modal">₹12,400</td>
                  <td><div class="mkt-arr-cell"><span>420</span><div class="mkt-arr-bar"><div style="width:25%"></div></div></div></td>
                  <td><span class="mkt-badge mkt-badge-neg">-4.2%</span></td>
                  <td><button class="mkt-more-btn"><span class="material-symbols-outlined">more_vert</span></button></td>
                </tr>
                <tr>
                  <td><div class="mkt-comm-cell"><span>🌽</span><strong>Maize</strong></div></td>
                  <td>Yellow</td>
                  <td><div class="mkt-loc-cell"><span>Gulbarga</span><small>Kalaburagi, KA</small></div></td>
                  <td class="mkt-range">₹1,980 – ₹2,200</td>
                  <td class="mkt-modal">₹2,100</td>
                  <td><div class="mkt-arr-cell"><span>1,100</span><div class="mkt-arr-bar"><div style="width:50%"></div></div></div></td>
                  <td><span class="mkt-badge mkt-badge-neu">0.0%</span></td>
                  <td><button class="mkt-more-btn"><span class="material-symbols-outlined">more_vert</span></button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mkt-pagination">
            <p class="mkt-page-info">Showing 1–5 of 124 Mandis</p>
            <div class="mkt-page-btns">
              <button class="mkt-page-btn">1</button>
              <button class="mkt-page-btn mkt-page-active">2</button>
              <button class="mkt-page-btn">3</button>
            </div>
          </div>
        </section>

        <!-- Map + Queue Status -->
        <section class="mkt-map-grid">
          <div class="mkt-map-card">
            <div class="mkt-map-overlay-label">
              <h3>Nearby Markets</h3>
              <p>Showing results for 50 km radius</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d120000!2d73.7898!3d20.0059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%" height="100%" style="border:0;border-radius:16px;" allowfullscreen loading="lazy">
            </iframe>
          </div>

          <div class="mkt-queue-card">
            <h2 class="mkt-section-title">Market Queue Status</h2>
            <div class="mkt-queue-list">
              <div class="mkt-queue-item">
                <div class="mkt-queue-icon mkt-qi-green"><span class="material-symbols-outlined">location_on</span></div>
                <div class="mkt-queue-info">
                  <h4>Pimpalgaon Baswant</h4>
                  <p><span class="material-symbols-outlined" style="font-size:0.75rem;">directions_car</span> 12.4 km away</p>
                </div>
                <div class="mkt-queue-status">
                  <span class="mkt-queue-badge mkt-qb-green">Fast Moving</span>
                  <small>Arrival: 12,000 MT</small>
                </div>
              </div>
              <div class="mkt-queue-item">
                <div class="mkt-queue-icon mkt-qi-yellow"><span class="material-symbols-outlined">location_on</span></div>
                <div class="mkt-queue-info">
                  <h4>Yeola Mandi</h4>
                  <p><span class="material-symbols-outlined" style="font-size:0.75rem;">directions_car</span> 34.8 km away</p>
                </div>
                <div class="mkt-queue-status">
                  <span class="mkt-queue-badge mkt-qb-yellow">Moderate Delay</span>
                  <small>Arrival: 8,400 MT</small>
                </div>
              </div>
              <div class="mkt-queue-item">
                <div class="mkt-queue-icon mkt-qi-red"><span class="material-symbols-outlined">location_on</span></div>
                <div class="mkt-queue-info">
                  <h4>Manmad Sub-Mandi</h4>
                  <p><span class="material-symbols-outlined" style="font-size:0.75rem;">directions_car</span> 42.1 km away</p>
                </div>
                <div class="mkt-queue-status">
                  <span class="mkt-queue-badge mkt-qb-red">Congested</span>
                  <small>Arrival: 15,200 MT</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Weather + AI Insights + Forecast -->
        <section class="mkt-bottom-grid">
          <div class="mkt-weather-card">
            <div class="mkt-weather-head">
              <div>
                <h2 class="mkt-section-title">Weather</h2>
                <p class="mkt-weather-loc">Nashik, Maharashtra</p>
              </div>
              <span class="material-symbols-outlined mkt-weather-icon">light_mode</span>
            </div>
            <div class="mkt-temp-row">
              <h3 class="mkt-temp">32°</h3>
              <p class="mkt-condition">Clear Skies</p>
            </div>
            <div class="mkt-weather-details">
              <div class="mkt-weather-detail"><p class="mkt-detail-label">Humidity</p><p class="mkt-detail-val">45%</p></div>
              <div class="mkt-weather-detail"><p class="mkt-detail-label">Wind</p><p class="mkt-detail-val">12 km/h</p></div>
            </div>
          </div>

          <div class="mkt-ai-card">
            <div class="mkt-ai-head">
              <span class="material-symbols-outlined" style="color:var(--color-primary);">auto_awesome</span>
              <h2 class="mkt-ai-title">AI Impact Insights</h2>
            </div>
            <div class="mkt-ai-alert mkt-ai-warn">
              <p class="mkt-ai-alert-title">🌧️ Rain Alert: Supply Risk</p>
              <p>Forecasted rainfall in Nashik belt (May 26–28) may delay harvest. Expect <strong>8–15% spike</strong> in Onion prices.</p>
            </div>
            <div class="mkt-ai-alert mkt-ai-success">
              <p class="mkt-ai-alert-title">📈 Market Opportunity</p>
              <p>High demand for Basmati in export terminals. Current modal prices are 5% below peak. <strong>Optimal hold period: 10 days</strong>.</p>
            </div>
          </div>

          <div class="mkt-forecast-card">
            <h2 class="mkt-section-title">5-Day Forecast</h2>
            <div class="mkt-forecast-list">
              <div class="mkt-forecast-row"><span class="mkt-fday">Fri</span><span class="material-symbols-outlined mkt-ficon">cloud</span><div class="mkt-ftemps"><span>31°</span><span class="mkt-flow">22°</span></div></div>
              <div class="mkt-forecast-row"><span class="mkt-fday">Sat</span><span class="material-symbols-outlined mkt-ficon mkt-frain">rainy</span><div class="mkt-ftemps"><span>28°</span><span class="mkt-flow">20°</span></div></div>
              <div class="mkt-forecast-row"><span class="mkt-fday">Sun</span><span class="material-symbols-outlined mkt-ficon mkt-fstorm">thunderstorm</span><div class="mkt-ftemps"><span>26°</span><span class="mkt-flow">19°</span></div></div>
              <div class="mkt-forecast-row"><span class="mkt-fday">Mon</span><span class="material-symbols-outlined mkt-ficon">partly_cloudy_day</span><div class="mkt-ftemps"><span>29°</span><span class="mkt-flow">21°</span></div></div>
              <div class="mkt-forecast-row"><span class="mkt-fday">Tue</span><span class="material-symbols-outlined mkt-ficon">light_mode</span><div class="mkt-ftemps"><span>33°</span><span class="mkt-flow">23°</span></div></div>
            </div>
          </div>
        </section>

      </div>
    `;
  },
  diagnosis: function() {
    return `
      <div class="diagnosis-page-wrapper">
        <!-- Hero Header -->
        <header class="diagnosis-hero">
          <div class="hero-content">
            <span class="hero-badge">
              <span class="material-symbols-outlined">verified</span>
              Precision Diagnostics
            </span>
            <h1 class="hero-title">AI Crop Diagnosis</h1>
            <p class="hero-subtitle">Advanced neural networks processing multi-spectral imagery and sensor fusion to protect your harvest.</p>
          </div>
          <button class="hero-btn" onclick="document.getElementById('diag-file-upload').click()">
            <span class="material-symbols-outlined">upload_file</span>
            <span>Analyze New Sample</span>
          </button>
          <input type="file" id="diag-file-upload" style="display:none;" accept="image/*" onchange="window.handleDiagnosisUpload(this)">
        </header>

        <!-- Main Bento Grid -->
        <div class="diagnosis-grid">
          
          <!-- Left Column: Field Analytics -->
          <aside class="analytics-panel">
            <div class="analytics-card">
              <div class="analytics-header">
                <h2 class="analytics-title">Field Analytics</h2>
                <span class="live-badge">Live Feed</span>
              </div>

              <!-- Soil Moisture -->
              <div class="metric-card">
                <div class="metric-header">
                  <span class="metric-label">Soil Moisture</span>
                  <span class="material-symbols-outlined metric-icon icon-primary">water_drop</span>
                </div>
                <div class="metric-value-row">
                  <span class="metric-value">42%</span>
                  <span class="metric-trend trend-up">
                    <span class="material-symbols-outlined">trending_up</span>
                    2%
                  </span>
                </div>
                <div class="metric-bar">
                  <div class="metric-bar-fill bar-primary" style="width: 42%"></div>
                </div>
              </div>

              <!-- Nitrogen -->
              <div class="metric-card">
                <div class="metric-header">
                  <span class="metric-label">Nitrogen Level</span>
                  <span class="material-symbols-outlined metric-icon icon-secondary">science</span>
                </div>
                <div class="metric-value-row">
                  <span class="metric-value">18<span class="metric-unit">mg/kg</span></span>
                  <span class="metric-trend trend-down">
                    <span class="material-symbols-outlined">trending_down</span>
                    5%
                  </span>
                </div>
                <div class="metric-bar">
                  <div class="metric-bar-fill bar-secondary" style="width: 65%"></div>
                </div>
              </div>

              <!-- Temperature -->
              <div class="metric-card">
                <div class="metric-header">
                  <span class="metric-label">Ambient Temp</span>
                  <span class="material-symbols-outlined metric-icon icon-error">thermostat</span>
                </div>
                <div class="metric-value-row">
                  <span class="metric-value">24°C</span>
                  <span class="metric-trend trend-stable">Stable</span>
                </div>
                <div class="metric-bar">
                  <div class="metric-bar-fill bar-error" style="width: 48%"></div>
                </div>
              </div>
            </div>

            <!-- Expert Consult CTA -->
            <div class="consult-cta">
              <div class="consult-content">
                <h3 class="consult-title">Need a human eye?</h3>
                <p class="consult-text">Talk to an agronomist about this diagnosis to confirm treatment protocols.</p>
                <button class="consult-btn">Schedule Call</button>
              </div>
              <span class="material-symbols-outlined consult-icon">support_agent</span>
            </div>
          </aside>

          <!-- Right Column: AI Diagnosis Results -->
          <section class="results-panel">
            <div class="results-card">
              <div class="results-main">
                <!-- Image Preview -->
                <div class="image-preview">
                  <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop" alt="Corn leaf with disease symptoms" class="preview-img">
                </div>

                <!-- Result Header -->
                <div class="result-header">
                  <div class="result-title-row">
                    <h2 class="result-title">Corn Northern Leaf Blight</h2>
                    <span class="severity-badge badge-critical">CRITICAL</span>
                  </div>
                  <div class="confidence-row">
                    <span class="material-symbols-outlined confidence-icon">verified</span>
                    <span class="confidence-text">98.4% Confidence Score</span>
                  </div>
                  <p class="result-description">
                    Identified large, cigar-shaped necrotic lesions. This pathogen thrives in high humidity and moderate temperatures (18-27°C). Immediate action required to prevent spore dispersal to adjacent North-West fields.
                  </p>
                </div>
              </div>

              <!-- Impact Metrics -->
              <div class="impact-metrics">
                <!-- Sustainability -->
                <div class="impact-card impact-primary">
                  <div class="impact-header">
                    <span class="material-symbols-outlined impact-icon">eco</span>
                    <span class="impact-label">Sustainability Impact</span>
                  </div>
                  <div class="impact-value">82<span class="impact-max">/100</span></div>
                  <p class="impact-text">Bio-fungicide recommendation reduces chemical runoff by 40% vs. traditional methods.</p>
                </div>

                <!-- Yield Projection -->
                <div class="impact-card impact-critical">
                  <div class="impact-header">
                    <span class="material-symbols-outlined impact-icon">trending_down</span>
                    <span class="impact-label">Yield Projection</span>
                  </div>
                  <div class="impact-value impact-negative">-15%<span class="impact-note">if untreated</span></div>
                  <p class="impact-text">Estimated loss of 32 bushels per acre based on current infection rate.</p>
                </div>
              </div>

              <!-- Treatment Protocol -->
              <div class="protocol-section">
                <h3 class="protocol-title">Next Steps & Treatment Protocol</h3>
                <div class="protocol-steps">
                  <div class="protocol-step">
                    <div class="step-number">01</div>
                    <div class="step-content">
                      <h4 class="step-title">Targeted Fungicide Application</h4>
                      <p class="step-text">Apply Prothioconazole (Group 3) specifically to Field A4 and B2 within 48 hours.</p>
                    </div>
                  </div>
                  <div class="protocol-step">
                    <div class="step-number">02</div>
                    <div class="step-content">
                      <h4 class="step-title">Optimize Irrigation</h4>
                      <p class="step-text">Reduce night-time overhead irrigation to decrease leaf wetness duration.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        <!-- Historical Records Table -->
        <section class="history-section">
          <div class="history-header">
            <h2 class="history-title">Historical Records</h2>
            <div class="history-actions">
              <button class="history-btn">Filter By Crop</button>
              <button class="history-btn">Export PDF</button>
            </div>
          </div>

          <div class="history-table-wrapper">
            <table class="history-table">
              <thead>
                <tr>
                  <th>Sample Date</th>
                  <th>Crop Variety</th>
                  <th>Detected Issue</th>
                  <th>Confidence</th>
                  <th>Severity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td-date">May 12, 2024</td>
                  <td>Hybrid Maize V3</td>
                  <td>Leaf Blight</td>
                  <td>98.4%</td>
                  <td><span class="severity-pill pill-critical">CRITICAL</span></td>
                  <td class="td-status status-resolved">Resolved</td>
                </tr>
                <tr>
                  <td class="td-date">May 05, 2024</td>
                  <td>Soybean Elite 2</td>
                  <td>Nitrogen Deficiency</td>
                  <td>92.1%</td>
                  <td><span class="severity-pill pill-medium">MEDIUM</span></td>
                  <td class="td-status status-progress">In Progress</td>
                </tr>
                <tr>
                  <td class="td-date">Apr 28, 2024</td>
                  <td>Hybrid Maize V3</td>
                  <td>No Issues Detected</td>
                  <td>99.8%</td>
                  <td><span class="severity-pill pill-none">NONE</span></td>
                  <td class="td-status status-archived">Archived</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `;
  },
  'buyer-dashboard': function() {
    const name = appState.user?.name || 'Meera Gupta';
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    const hour = now.getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    return `
      <div class="bdb-page">

        <!-- ── Buyer Navbar ── -->
        <div class="bdb-nav-outer">
          <nav class="bdb-nav">

            <!-- Hamburger checkbox (CSS-only mobile) -->
            <input type="checkbox" id="bdb-menu-toggle" class="bdb-menu-checkbox" />

            <!-- Logo -->
            <div class="bdb-logo">
              <span class="bdb-logo-icon">🌿</span>
              <span class="bdb-logo-text">AgroFarm AI</span>
            </div>

            <!-- Nav Links -->
            <ul class="bdb-nav-links" id="bdb-nav-links">
              <li><a href="#" class="bdb-nav-item bdb-active" onclick="return false;">Home</a></li>
              <li><a href="#" class="bdb-nav-item" onclick="window.navigate('market'); return false;">Browse Produce</a></li>
              <li><a href="#" class="bdb-nav-item" onclick="window.navigate('market'); return false;">Market</a></li>
              <li><a href="#" class="bdb-nav-item" onclick="window.navigate('f2b'); return false;">Connect with Farmers</a></li>
              <li><a href="#" class="bdb-nav-item" onclick="return false;">My Orders</a></li>
              <li><a href="#" class="bdb-nav-item" onclick="return false;">Messages</a></li>
            </ul>

            <!-- Right Controls -->
            <div class="bdb-nav-right">

              <!-- Language Switcher (pure CSS hover dropdown) -->
              <div class="bdb-lang-wrap">
                <div class="bdb-lang-pill">
                  <span class="bdb-globe">🌐</span>
                  <span class="bdb-lang-code">EN</span>
                  <span class="bdb-chevron">▾</span>
                </div>
                <ul class="bdb-lang-dropdown">
                  <li class="bdb-lang-opt bdb-lang-selected">English</li>
                  <li class="bdb-lang-opt">हिंदी</li>
                  <li class="bdb-lang-opt">मराठी</li>
                </ul>
              </div>

              <!-- Cart -->
              <button class="bdb-icon-btn" title="Cart">
                <span class="bdb-icon">🛒</span>
                <span class="bdb-badge">3</span>
              </button>

              <!-- Notifications -->
              <button class="bdb-icon-btn" title="Notifications">
                <span class="bdb-icon">🔔</span>
              </button>

              <!-- Avatar -->
              <div class="bdb-avatar" title="${name}">${name.charAt(0).toUpperCase()}</div>

              <!-- Hamburger label -->
              <label for="bdb-menu-toggle" class="bdb-hamburger" aria-label="Menu">
                <span></span><span></span><span></span>
              </label>
            </div>
          </nav>
        </div>

        <!-- ── Dashboard Content ── -->
        <div class="bdb-content" id="db-content">
          <div class="db-wrapper spacer-y fade-in">

            <!-- Header -->
            <div class="spacer-bottom" style="display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap;">
              <div>
                <h2 class="display-font" style="font-size:2.8rem; margin-bottom:0.4rem;">${t('db_proc_title')}</h2>
                <div style="color:var(--color-primary); font-weight:600; display:flex; align-items:center; gap:0.5rem;">
                  <span style="background:rgba(46,125,50,0.1); padding:0.25rem 0.75rem; border-radius:99px; font-size:0.85rem;">${dateStr}</span>
                </div>
              </div>
              <button class="btn-primary" style="padding:0.8rem 1.8rem; font-size:0.95rem;" onclick="window.navigate('b2f')">${t('db_biz_hub')}</button>
            </div>

            <!-- Welcome Banner -->
            <div class="db-welcome-banner" style="margin-top:0; background:linear-gradient(135deg,#1565C0,#1976D2);">
              <div class="db-welcome-left">
                <div class="db-welcome-subtitle">${t('db_proc_intel')}</div>
                <h2 class="db-welcome-title">${greeting}, ${name.split(' ')[0]} 👋</h2>
                <p class="db-welcome-desc">You have <strong>4 ${t('db_orders_desc')}</strong></p>
                <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:0.25rem;">
                  <button class="db-banner-btn" onclick="window.navigate('b2f')">${t('db_view_orders')} →</button>
                  <button class="db-banner-btn-ghost" onclick="window.navigate('market')">${t('db_explore_market')}</button>
                </div>
              </div>
              <div class="db-welcome-illustration">📦</div>
            </div>

            <!-- KPI Cards -->
            <div class="db-kpi-row">
              <div class="db-kpi-card" style="--kpi-color:#1565C0;">
                <div class="db-kpi-icon">📋</div>
                <div class="db-kpi-label">${t('db_kpi_orders')}</div>
                <div class="db-kpi-value">4</div>
                <div class="db-kpi-trend up">↑ +2 this week</div>
              </div>
              <div class="db-kpi-card" style="--kpi-color:#2E7D32;">
                <div class="db-kpi-icon">✅</div>
                <div class="db-kpi-label">${t('db_kpi_farms')}</div>
                <div class="db-kpi-value">120</div>
                <div class="db-kpi-trend up">↑ 8 new this month</div>
              </div>
              <div class="db-kpi-card" style="--kpi-color:#F57F17;">
                <div class="db-kpi-icon">⏳</div>
                <div class="db-kpi-label">${t('db_kpi_bids')}</div>
                <div class="db-kpi-value">7</div>
                <div class="db-kpi-trend neutral">→ Awaiting response</div>
              </div>
              <div class="db-kpi-card" style="--kpi-color:#6A1B9A;">
                <div class="db-kpi-icon">💰</div>
                <div class="db-kpi-label">${t('db_kpi_spend')}</div>
                <div class="db-kpi-value">₹4.2L</div>
                <div class="db-kpi-trend up">↑ +12% vs last month</div>
              </div>
            </div>

            <!-- AI Chat Panel -->
            <div class="db-ai-chat-panel" id="db-ai-chat-panel">
              <div class="db-ai-chat-header">
                <div style="display:flex;align-items:center;gap:0.75rem;"><span style="font-size:1.5rem;">🤖</span><div><div style="font-weight:800;font-size:0.95rem;">Business AI Assistant</div><div style="font-size:0.72rem;opacity:0.8;">Online · Procurement Expert</div></div></div>
                <button onclick="window.dbToggleAiChat()" style="background:rgba(255,255,255,0.15);border:none;color:white;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:0.9rem;">✕</button>
              </div>
              <div class="db-ai-chat-body" id="db-ai-chat-body">
                <div class="db-ai-msg bot">${t('db_welcome_buyer')}</div>
              </div>
              <div class="db-ai-chat-footer">
                <input type="text" id="db-ai-input" class="db-ai-input" placeholder="${t('db_ai_placeholder_buyer')}" onkeypress="if(event.key==='Enter') window.dbAiSend()">
                <button onclick="window.dbAiSend()" class="db-ai-send" style="background:#1565C0;">➔</button>
              </div>
            </div>

            <button class="db-ai-fab" id="db-ai-fab" onclick="window.dbToggleAiChat()" title="${t('db_ask_ai')}">
              <span class="db-ai-fab-icon">🤖</span>
              <span class="db-ai-fab-label">${t('db_ask_ai')}</span>
              <div class="db-ai-pulse"></div>
            </button>

          </div>
        </div>
      </div>
    `;
  },

  login: function() {
    return `<div class="container spacer-y" style="display:flex; justify-content:center;">
      <div class="card" style="width:420px; padding:3rem;">
        <h2 class="display-font" style="text-align:center; margin-bottom:0.5rem;">${t('sign_in')}</h2>
        <p style="text-align:center; color:#888; font-size:0.9rem; margin-bottom:2rem;">Sign in to your account</p>

        <!-- Demo Quick Access -->
        <div style="background:#f0faf0; border:1.5px solid #c8e6c9; border-radius:14px; padding:1.25rem; margin-bottom:1.75rem;">
          <p style="font-size:0.78rem; font-weight:700; color:#2e7d32; text-transform:uppercase; letter-spacing:0.06em; margin:0 0 0.75rem;">⚡ Quick Demo Access</p>
          <div style="display:flex; gap:0.75rem;">
            <button onclick="window.demoLogin('farmer')" style="flex:1; padding:0.65rem; background:#2e7d32; color:white; border:none; border-radius:10px; font-weight:700; font-size:0.875rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:0.4rem;">
              🌾 Farmer Panel
            </button>
            <button onclick="window.demoLogin('buyer')" style="flex:1; padding:0.65rem; background:#1565c0; color:white; border:none; border-radius:10px; font-weight:700; font-size:0.875rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:0.4rem;">
              📦 Buyer Panel
            </button>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.5rem;">
          <div style="flex:1; height:1px; background:#e5e7eb;"></div>
          <span style="font-size:0.8rem; color:#9ca3af; font-weight:500;">or sign in with email</span>
          <div style="flex:1; height:1px; background:#e5e7eb;"></div>
        </div>

        <div class="input-group"><label>${t('email')}</label><input type="email" id="login-email" class="input-field" placeholder="you@example.com"></div>
        <div class="input-group"><label>${t('password')}</label><input type="password" id="login-pass" class="input-field" placeholder="••••••••"></div>
        <button class="btn btn-primary" style="width:100%; margin-top:2rem;" onclick="window.loginUser()">${t('login')}</button>
        <p style="text-align:center; margin-top:1.25rem; font-size:0.85rem; color:#888;">
          Don't have an account? <a href="#" onclick="window.navigate('signup')" style="color:var(--color-primary); font-weight:700;">Sign up</a>
        </p>
      </div>
    </div>`;
  },
  signup: function() {
    return `
      <div class="container spacer-y" style="display:flex; justify-content:center;">
        <div class="card" style="width:450px; padding:3rem;">
          <h2 class="display-font" style="text-align:center; margin-bottom:2rem;">${t('auth_join')}</h2>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
            <div class="input-group"><label>${t('auth_fname')}</label><input type="text" id="signup-fname" class="input-field" placeholder="Ramesh"></div>
            <div class="input-group"><label>${t('auth_lname')}</label><input type="text" id="signup-lname" class="input-field" placeholder="Kumar"></div>
          </div>
          <div class="input-group"><label>${t('email')}</label><input type="email" id="signup-email" class="input-field" placeholder="ramesh@example.com"></div>
          <div class="input-group"><label>${t('password')}</label><input type="password" id="signup-pass" class="input-field" placeholder="••••••••"></div>
          <div class="input-group">
            <label style="margin-bottom:0.75rem; display:block;">${t('auth_role_select')}</label>
            <div style="display:flex; gap:1.5rem; align-items:center;">
              <label style="cursor:pointer; display:flex; align-items:center; gap:0.5rem;"><input type="radio" name="signup-role" value="farmer" checked> ${t('auth_role_farmer_opt')}</label>
              <label style="cursor:pointer; display:flex; align-items:center; gap:0.5rem;"><input type="radio" name="signup-role" value="buyer"> ${t('auth_role_buyer_opt')}</label>
            </div>
          </div>
          <button class="btn btn-primary" style="width:100%; margin-top:1.5rem;" onclick="window.registerUser()">${t('auth_create')}</button>
          <div style="text-align:center; margin-top:1.5rem; font-size:0.9rem; color:#666;">
            ${t('auth_have_acc')} <a href="#" onclick="window.navigate('login')" style="color:var(--color-primary); font-weight:700;">${t('nav_login')}</a>
          </div>
        </div>
      </div>`;
  },

  f2b: function() {
    return `
      <div class="f2b-wrapper">

        <!-- F2B Panel -->
        <div id="f2b-panel" class="f2b-main-grid">

          <!-- Left: List Your Produce -->
          <section class="f2b-form-card">
            <div class="f2b-form-header">
              <h2 class="f2b-form-title">List Your Produce</h2>
              <span class="f2b-listing-id">New Listing ID: #8821-X</span>
            </div>

            <form class="f2b-form" onsubmit="return false;">
              <!-- Crop Variety + Quantity -->
              <div class="f2b-form-row">
                <div class="f2b-field">
                  <label class="f2b-label">Crop Variety</label>
                  <div class="f2b-select-wrap">
                    <select class="f2b-select">
                      <option>Select variety...</option>
                      <option>Golden Durum Wheat</option>
                      <option>Organic Arabica Coffee</option>
                      <option>Non-GMO Soybeans</option>
                      <option>High-Yield Maize</option>
                      <option>Basmati Rice</option>
                      <option>Red Onion</option>
                    </select>
                    <span class="material-symbols-outlined f2b-select-icon">expand_more</span>
                  </div>
                </div>
                <div class="f2b-field">
                  <label class="f2b-label">Quantity Available</label>
                  <div class="f2b-qty-row">
                    <input class="f2b-input" type="number" placeholder="0.00" min="0" />
                    <select class="f2b-select f2b-unit-select">
                      <option>Metric Tons</option>
                      <option>Bushels</option>
                      <option>Kilograms</option>
                      <option>Quintals</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Grade -->
              <div class="f2b-field">
                <label class="f2b-label">Quality Grade</label>
                <div class="f2b-grade-group">
                  <label class="f2b-grade-option">
                    <input type="radio" name="f2b-grade" value="premium" checked />
                    <span class="f2b-grade-pill">
                      <span class="material-symbols-outlined">verified</span> Premium
                    </span>
                  </label>
                  <label class="f2b-grade-option">
                    <input type="radio" name="f2b-grade" value="standard" />
                    <span class="f2b-grade-pill">
                      <span class="material-symbols-outlined">check_circle</span> Standard
                    </span>
                  </label>
                  <label class="f2b-grade-option">
                    <input type="radio" name="f2b-grade" value="industrial" />
                    <span class="f2b-grade-pill">
                      <span class="material-symbols-outlined">factory</span> Industrial
                    </span>
                  </label>
                </div>
              </div>

              <!-- Target Price -->
              <div class="f2b-field">
                <label class="f2b-label">Target Price per Unit (₹)</label>
                <div class="f2b-price-wrap">
                  <span class="f2b-price-prefix">₹</span>
                  <input class="f2b-input f2b-price-input" type="text" placeholder="0.00" />
                </div>
              </div>

              <!-- Upload -->
              <div class="f2b-field">
                <label class="f2b-label">Batch Imagery / Crop Photos</label>
                <div class="f2b-upload-zone" onclick="document.getElementById('f2b-file-input').click()">
                  <input type="file" id="f2b-file-input" accept="image/*" multiple style="display:none" />
                  <span class="material-symbols-outlined f2b-upload-icon">cloud_upload</span>
                  <h3 class="f2b-upload-title">Drag &amp; Drop or Click to Upload</h3>
                  <p class="f2b-upload-sub">Upload high-resolution photos of crop samples and soil condition.</p>
                </div>
              </div>

              <!-- Submit -->
              <button class="f2b-submit-btn" type="submit">
                Publish Listing
                <span class="material-symbols-outlined">send</span>
              </button>
            </form>
          </section>

          <!-- Right: Buyer Open Requirements -->
          <aside class="f2b-aside">
            <div class="f2b-aside-header">
              <h3 class="f2b-aside-title">Buyer Open Requirements</h3>
              <button class="f2b-refresh-btn" title="Refresh">
                <span class="material-symbols-outlined">refresh</span>
              </button>
            </div>

            <!-- Requirement Card 1 -->
            <div class="f2b-req-card">
              <div class="f2b-req-urgent">
                <span class="material-symbols-outlined" style="font-size:0.8rem;">bolt</span> Urgent Supply
              </div>
              <div class="f2b-req-top">
                <div class="f2b-req-icon"><span class="material-symbols-outlined">agriculture</span></div>
                <div>
                  <h4 class="f2b-req-name">Hard Red Winter Wheat</h4>
                  <p class="f2b-req-id">Req ID: BAY-992-K</p>
                </div>
              </div>
              <div class="f2b-req-details">
                <div class="f2b-req-row"><span>Needed Volume</span><strong>500 MT</strong></div>
                <div class="f2b-req-row"><span>Offered Price</span><strong class="f2b-price-green">₹51,250 / MT</strong></div>
              </div>
              <button class="f2b-fulfill-btn">
                Fulfill Order <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            <!-- Requirement Card 2 -->
            <div class="f2b-req-card">
              <div class="f2b-req-top">
                <div class="f2b-req-icon"><span class="material-symbols-outlined">spa</span></div>
                <div>
                  <h4 class="f2b-req-name">High-Oleic Soybeans</h4>
                  <p class="f2b-req-id">Req ID: BAY-811-S</p>
                </div>
              </div>
              <div class="f2b-req-details">
                <div class="f2b-req-row"><span>Needed Volume</span><strong>1,200 MT</strong></div>
                <div class="f2b-req-row"><span>Offered Price</span><strong class="f2b-price-green">₹42,500 / MT</strong></div>
              </div>
              <button class="f2b-fulfill-btn">
                Fulfill Order <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            <!-- Requirement Card 3 -->
            <div class="f2b-req-card">
              <div class="f2b-req-top">
                <div class="f2b-req-icon"><span class="material-symbols-outlined">grass</span></div>
                <div>
                  <h4 class="f2b-req-name">Organic Basmati Rice</h4>
                  <p class="f2b-req-id">Req ID: BAY-774-R</p>
                </div>
              </div>
              <div class="f2b-req-details">
                <div class="f2b-req-row"><span>Needed Volume</span><strong>300 MT</strong></div>
                <div class="f2b-req-row"><span>Offered Price</span><strong class="f2b-price-green">₹68,000 / MT</strong></div>
              </div>
              <button class="f2b-fulfill-btn">
                Fulfill Order <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            <!-- Upgrade Banner -->
            <div class="f2b-upgrade-banner">
              <p class="f2b-upgrade-text">Want prioritized bidding?</p>
              <a href="#" class="f2b-upgrade-link">Upgrade to AgroFarm Pro →</a>
            </div>
          </aside>
        </div>

        <!-- My Active Listings Table -->
        <section class="f2b-listings-section">
          <div class="f2b-listings-header">
            <h3 class="f2b-listings-title">My Active Listings</h3>
            <div class="f2b-listings-actions">
              <button class="f2b-icon-btn"><span class="material-symbols-outlined">filter_list</span></button>
              <button class="f2b-icon-btn"><span class="material-symbols-outlined">search</span></button>
            </div>
          </div>
          <div class="f2b-table-wrap">
            <table class="f2b-table">
              <thead>
                <tr>
                  <th>Listing Details</th>
                  <th>Quantity &amp; Grade</th>
                  <th>Status</th>
                  <th>Inquiries</th>
                  <th style="text-align:right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="f2b-listing-cell">
                      <div class="f2b-listing-thumb">🌾</div>
                      <div>
                        <div class="f2b-listing-name">Golden Harvest Wheat</div>
                        <div class="f2b-listing-id">#LS-7721-B</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="f2b-listing-qty">150 MT</div>
                    <div class="f2b-listing-grade">Premium Grade</div>
                  </td>
                  <td><span class="f2b-status-badge f2b-status-active">Active</span></td>
                  <td>
                    <div class="f2b-inq-cell">
                      <span class="material-symbols-outlined" style="font-size:1rem;color:#ca8a04;">forum</span>
                      <span class="f2b-inq-count">12 Inquiries</span>
                    </div>
                  </td>
                  <td style="text-align:right;">
                    <button class="f2b-more-btn"><span class="material-symbols-outlined">more_horiz</span></button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="f2b-listing-cell">
                      <div class="f2b-listing-thumb">☕</div>
                      <div>
                        <div class="f2b-listing-name">Highland Arabica</div>
                        <div class="f2b-listing-id">#LS-8891-C</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="f2b-listing-qty">45 MT</div>
                    <div class="f2b-listing-grade">Premium Grade</div>
                  </td>
                  <td><span class="f2b-status-badge f2b-status-negotiation">Negotiation</span></td>
                  <td>
                    <div class="f2b-inq-cell">
                      <span class="material-symbols-outlined" style="font-size:1rem;color:#ca8a04;">forum</span>
                      <span class="f2b-inq-count">3 Inquiries</span>
                    </div>
                  </td>
                  <td style="text-align:right;">
                    <button class="f2b-more-btn"><span class="material-symbols-outlined">more_horiz</span></button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="f2b-listing-cell">
                      <div class="f2b-listing-thumb">🧅</div>
                      <div>
                        <div class="f2b-listing-name">Red Onion Batch</div>
                        <div class="f2b-listing-id">#LS-9012-O</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="f2b-listing-qty">90 MT</div>
                    <div class="f2b-listing-grade">Standard Grade</div>
                  </td>
                  <td><span class="f2b-status-badge f2b-status-pending">Pending</span></td>
                  <td>
                    <div class="f2b-inq-cell">
                      <span class="material-symbols-outlined" style="font-size:1rem;color:#ca8a04;">forum</span>
                      <span class="f2b-inq-count">1 Inquiry</span>
                    </div>
                  </td>
                  <td style="text-align:right;">
                    <button class="f2b-more-btn"><span class="material-symbols-outlined">more_horiz</span></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="f2b-listings-footer">
            <button class="f2b-view-all-btn">View All Archive</button>
          </div>
        </section>

      </div>
    `;
  },
  b2f: function() {
    return `
      <div class="b2f-wrapper">

        <!-- Page Title -->
        <div class="b2f-page-header">
          <h2 class="b2f-page-title">Bayer Strategic Sourcing</h2>
          <div class="b2f-page-tags">
            <span class="b2f-tag">Global Overview</span>
            <span class="b2f-tag b2f-tag-primary">B2F — Buyer Focus</span>
            <span class="b2f-tag">Regional Bids</span>
          </div>
        </div>

        <!-- Main Grid -->
        <div class="b2f-main-grid">

          <!-- LEFT: Main Content -->
          <div class="b2f-left">

            <!-- Stats Row -->
            <div class="b2f-stats-row">
              <div class="b2f-stat-card">
                <h3 class="b2f-stat-label">Active Requirements</h3>
                <div class="b2f-stat-value">24</div>
                <p class="b2f-stat-trend b2f-trend-up">
                  <span class="material-symbols-outlined">trending_up</span> +3 this week
                </p>
              </div>
              <div class="b2f-stat-card">
                <h3 class="b2f-stat-label">Pending Offers</h3>
                <div class="b2f-stat-value">142</div>
                <p class="b2f-stat-trend b2f-trend-warn">
                  <span class="material-symbols-outlined">schedule</span> Requires review
                </p>
              </div>
              <div class="b2f-stat-card b2f-stat-green">
                <h3 class="b2f-stat-label">Procured Vol (Q3)</h3>
                <div class="b2f-stat-value b2f-stat-white">4.2k</div>
                <p class="b2f-stat-trend b2f-trend-light">Metric Tons</p>
              </div>
            </div>

            <!-- Active Requirements Table -->
            <div class="b2f-table-card">
              <div class="b2f-table-head">
                <h3 class="b2f-section-title">My Active Buying Requirements</h3>
                <button class="b2f-view-all-btn">
                  View All <span class="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
              <div class="b2f-table-wrap">
                <table class="b2f-table">
                  <thead>
                    <tr>
                      <th>Crop / Grade</th>
                      <th>Target Price (₹/Quintal)</th>
                      <th>Vol Required</th>
                      <th>Offers</th>
                      <th style="text-align:right;">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="b2f-crop-cell">
                          <div class="b2f-crop-icon b2f-icon-green"><span class="material-symbols-outlined">grass</span></div>
                          <div>
                            <p class="b2f-crop-name">Wheat — Sharbati</p>
                            <p class="b2f-crop-sub">Grade A+ · MP Region</p>
                          </div>
                        </div>
                      </td>
                      <td class="b2f-price-cell">₹3,200</td>
                      <td class="b2f-vol-cell">500 MT</td>
                      <td><span class="b2f-offers-badge">12 New</span></td>
                      <td style="text-align:right;"><span class="b2f-status-active">Active</span></td>
                    </tr>
                    <tr>
                      <td>
                        <div class="b2f-crop-cell">
                          <div class="b2f-crop-icon b2f-icon-yellow"><span class="material-symbols-outlined">spa</span></div>
                          <div>
                            <p class="b2f-crop-name">Soybean — Yellow</p>
                            <p class="b2f-crop-sub">Standard · MH Region</p>
                          </div>
                        </div>
                      </td>
                      <td class="b2f-price-cell">₹4,850</td>
                      <td class="b2f-vol-cell">1,200 MT</td>
                      <td><span class="b2f-offers-badge b2f-offers-urgent">3 Urgent</span></td>
                      <td style="text-align:right;"><span class="b2f-status-active">Active</span></td>
                    </tr>
                    <tr>
                      <td>
                        <div class="b2f-crop-cell">
                          <div class="b2f-crop-icon b2f-icon-green"><span class="material-symbols-outlined">agriculture</span></div>
                          <div>
                            <p class="b2f-crop-name">Basmati Rice</p>
                            <p class="b2f-crop-sub">Premium · UP Region</p>
                          </div>
                        </div>
                      </td>
                      <td class="b2f-price-cell">₹6,800</td>
                      <td class="b2f-vol-cell">300 MT</td>
                      <td><span class="b2f-offers-badge">7 New</span></td>
                      <td style="text-align:right;"><span class="b2f-status-active">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Incoming Farmer Offers -->
            <div>
              <h3 class="b2f-section-title" style="margin-bottom:1.25rem;">Incoming Farmer Offers</h3>
              <div class="b2f-offers-grid">

                <!-- Offer Card 1 -->
                <div class="b2f-offer-card">
                  <span class="b2f-top-match">Top Match</span>
                  <div class="b2f-offer-farmer">
                    <div class="b2f-farmer-avatar">RK</div>
                    <div>
                      <h4 class="b2f-farmer-name">Rajesh Kumar</h4>
                      <p class="b2f-farmer-loc">
                        <span class="material-symbols-outlined">location_on</span> Sehore, MP
                      </p>
                    </div>
                  </div>
                  <div class="b2f-offer-details">
                    <div class="b2f-offer-row"><span>Offering</span><strong>Wheat (Sharbati)</strong></div>
                    <div class="b2f-offer-row"><span>Volume</span><strong>50 MT</strong></div>
                    <div class="b2f-offer-row"><span>Asking Price</span><strong class="b2f-ask-price">₹3,250<small>/q</small></strong></div>
                  </div>
                  <div class="b2f-offer-actions">
                    <button class="b2f-btn-accept">Accept</button>
                    <button class="b2f-btn-counter">Counter</button>
                  </div>
                </div>

                <!-- Offer Card 2 -->
                <div class="b2f-offer-card">
                  <div class="b2f-offer-farmer">
                    <div class="b2f-farmer-avatar b2f-avatar-yellow">SP</div>
                    <div>
                      <h4 class="b2f-farmer-name">Suresh Patel</h4>
                      <p class="b2f-farmer-loc">
                        <span class="material-symbols-outlined">location_on</span> Latur, MH
                      </p>
                    </div>
                  </div>
                  <div class="b2f-offer-details">
                    <div class="b2f-offer-row"><span>Offering</span><strong>Soybean</strong></div>
                    <div class="b2f-offer-row"><span>Volume</span><strong>120 MT</strong></div>
                    <div class="b2f-offer-row"><span>Asking Price</span><strong class="b2f-ask-price">₹4,900<small>/q</small></strong></div>
                  </div>
                  <div class="b2f-offer-actions">
                    <button class="b2f-btn-accept">Accept</button>
                    <button class="b2f-btn-counter">Counter</button>
                  </div>
                </div>

                <!-- Offer Card 3 -->
                <div class="b2f-offer-card">
                  <div class="b2f-offer-farmer">
                    <div class="b2f-farmer-avatar b2f-avatar-blue">AM</div>
                    <div>
                      <h4 class="b2f-farmer-name">Anita Mishra</h4>
                      <p class="b2f-farmer-loc">
                        <span class="material-symbols-outlined">location_on</span> Lucknow, UP
                      </p>
                    </div>
                  </div>
                  <div class="b2f-offer-details">
                    <div class="b2f-offer-row"><span>Offering</span><strong>Basmati Rice</strong></div>
                    <div class="b2f-offer-row"><span>Volume</span><strong>80 MT</strong></div>
                    <div class="b2f-offer-row"><span>Asking Price</span><strong class="b2f-ask-price">₹6,750<small>/q</small></strong></div>
                  </div>
                  <div class="b2f-offer-actions">
                    <button class="b2f-btn-accept">Accept</button>
                    <button class="b2f-btn-counter">Counter</button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- RIGHT: Sidebar -->
          <div class="b2f-right">

            <!-- AI Insight -->
            <div class="b2f-ai-card">
              <div class="b2f-ai-head">
                <div class="b2f-ai-icon"><span class="material-symbols-outlined">psychology</span></div>
                <h3 class="b2f-ai-title">AgroFarm AI Insight</h3>
              </div>
              <p class="b2f-ai-text">
                Historical data suggests Wheat prices in MP region will peak in 2 weeks.
                Recommend securing required volumes for <strong>Sharbati Grade A+</strong>
                now at current ₹3,200/q levels.
              </p>
              <button class="b2f-ai-link">
                View Price Forecast <span class="material-symbols-outlined">trending_up</span>
              </button>
            </div>

            <!-- Quick Post Requirement -->
            <div class="b2f-form-card">
              <h3 class="b2f-section-title" style="margin-bottom:1.5rem;">Quick Post Requirement</h3>
              <form class="b2f-quick-form" onsubmit="return false;">
                <div class="b2f-qfield">
                  <label class="b2f-qlabel">Crop Category</label>
                  <select class="b2f-qselect">
                    <option>Select Crop...</option>
                    <option>Wheat</option>
                    <option>Soybean</option>
                    <option>Rice</option>
                    <option>Maize</option>
                    <option>Onion</option>
                  </select>
                </div>
                <div class="b2f-qrow">
                  <div class="b2f-qfield">
                    <label class="b2f-qlabel">Volume (MT)</label>
                    <input class="b2f-qinput" type="number" placeholder="e.g. 100" min="0" />
                  </div>
                  <div class="b2f-qfield">
                    <label class="b2f-qlabel">Target (₹/q)</label>
                    <input class="b2f-qinput" type="number" placeholder="e.g. 3000" min="0" />
                  </div>
                </div>
                <div class="b2f-upload-zone">
                  <span class="material-symbols-outlined">upload_file</span>
                  <p>Attach Specs (Optional)</p>
                </div>
                <button class="b2f-broadcast-btn" type="submit">
                  Broadcast to Network
                </button>
              </form>
            </div>

            <!-- Q3 Buying Goals -->
            <div class="b2f-goals-card">
              <h3 class="b2f-section-title" style="margin-bottom:1.5rem;">Q3 Buying Goals</h3>
              <div class="b2f-goals-list">
                <div class="b2f-goal-item">
                  <div class="b2f-goal-head">
                    <div>
                      <span class="b2f-goal-name">Wheat Procurement</span>
                      <span class="b2f-goal-sub">2.1k / 3.0k MT</span>
                    </div>
                    <span class="b2f-goal-pct b2f-pct-green">70%</span>
                  </div>
                  <div class="b2f-progress-bar">
                    <div class="b2f-progress-fill b2f-fill-green" style="width:70%"></div>
                  </div>
                </div>
                <div class="b2f-goal-item">
                  <div class="b2f-goal-head">
                    <div>
                      <span class="b2f-goal-name">Soybean Procurement</span>
                      <span class="b2f-goal-sub">1.8k / 4.0k MT</span>
                    </div>
                    <span class="b2f-goal-pct b2f-pct-yellow">45%</span>
                  </div>
                  <div class="b2f-progress-bar">
                    <div class="b2f-progress-fill b2f-fill-yellow" style="width:45%"></div>
                  </div>
                </div>
                <div class="b2f-goal-item">
                  <div class="b2f-goal-head">
                    <div>
                      <span class="b2f-goal-name">Rice Procurement</span>
                      <span class="b2f-goal-sub">0.9k / 2.0k MT</span>
                    </div>
                    <span class="b2f-goal-pct b2f-pct-green">45%</span>
                  </div>
                  <div class="b2f-progress-bar">
                    <div class="b2f-progress-fill b2f-fill-green" style="width:45%"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },
  knowledge: function() {
    return `
      <div class="res-wrapper">

        <!-- Page Header -->
        <header class="res-header">
          <h1 class="res-title">Resources</h1>
          <p class="res-subtitle">Everything you need to farm smarter</p>
          <div class="res-search-wrap">
            <span class="material-symbols-outlined res-search-icon">search</span>
            <input class="res-search-input" type="text" placeholder="Search guides, videos, schemes..." oninput="window.resSearch(this.value)" />
          </div>
        </header>

        <!-- Category Tabs -->
        <div class="res-tabs" id="res-tabs">
          <button class="res-tab res-tab-active" onclick="window.resFilter('all', this)">All</button>
          <button class="res-tab" onclick="window.resFilter('video', this)">Videos</button>
          <button class="res-tab" onclick="window.resFilter('article', this)">Articles</button>
          <button class="res-tab" onclick="window.resFilter('guide', this)">Guides</button>
          <button class="res-tab" onclick="window.resFilter('scheme', this)">Government Schemes</button>
          <button class="res-tab" onclick="window.resFilter('weather', this)">Weather Advisories</button>
          <button class="res-tab" onclick="window.resFilter('tool', this)">Tools &amp; Calculators</button>
        </div>

        <!-- Featured Hero -->
        <section class="res-hero">
          <div class="res-hero-overlay"></div>
          <div class="res-hero-content">
            <span class="res-hero-badge">Guide</span>
            <h2 class="res-hero-title">Mastering Soil Health for 2024</h2>
            <p class="res-hero-desc">A comprehensive approach to increasing organic matter, managing pH levels, and optimizing microbiome vitality for peak yield.</p>
            <button class="res-hero-btn">
              Read Guide <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </section>

        <!-- Main Layout -->
        <div class="res-main-grid">

          <!-- Left: Resource Cards -->
          <div class="res-left">
            <h3 class="res-section-title">Latest Resources</h3>
            <div class="res-cards-grid" id="res-cards-grid">

              <!-- Article Card -->
              <article class="res-card" data-type="article">
                <div class="res-card-img-wrap">
                  <div class="res-card-img res-img-wheat"></div>
                  <span class="res-card-badge res-badge-article">Article</span>
                  <button class="res-bookmark-btn"><span class="material-symbols-outlined">bookmark_border</span></button>
                </div>
                <div class="res-card-body">
                  <div class="res-card-meta">
                    <span>12 Min Read</span><span>•</span><span>Oct 24, 2023</span>
                  </div>
                  <h4 class="res-card-title">Optimizing Water Usage in Drought Conditions</h4>
                  <p class="res-card-desc">Learn advanced drip irrigation techniques and scheduling models to maximize crop survival during extended dry periods.</p>
                  <div class="res-card-author">
                    <div class="res-author-avatar">JS</div>
                    <span>Dr. James Smith</span>
                  </div>
                </div>
              </article>

              <!-- Video Card -->
              <article class="res-card" data-type="video">
                <div class="res-card-img-wrap">
                  <div class="res-card-img res-img-tractor"></div>
                  <div class="res-play-overlay">
                    <div class="res-play-btn"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">play_arrow</span></div>
                  </div>
                  <span class="res-card-badge res-badge-video">Video</span>
                  <span class="res-duration-badge">18:45</span>
                  <button class="res-bookmark-btn"><span class="material-symbols-outlined">bookmark_border</span></button>
                </div>
                <div class="res-card-body">
                  <div class="res-card-meta"><span>Oct 20, 2023</span></div>
                  <h4 class="res-card-title">Equipment Maintenance: Pre-Harvest Checklist</h4>
                  <p class="res-card-desc">A step-by-step video guide to preparing your combine and tractors for the demanding harvest season.</p>
                  <div class="res-card-author">
                    <div class="res-author-avatar">EM</div>
                    <span>Elena Martinez</span>
                  </div>
                </div>
              </article>

              <!-- Scheme Card -->
              <article class="res-card" data-type="scheme">
                <div class="res-card-body" style="padding-top:1.5rem;">
                  <div class="res-scheme-top">
                    <span class="res-card-badge res-badge-scheme" style="position:static;">Scheme</span>
                    <button class="res-bookmark-btn" style="position:static;background:none;color:var(--color-on-surface-variant);"><span class="material-symbols-outlined">bookmark_border</span></button>
                  </div>
                  <h4 class="res-card-title" style="margin-top:0.75rem;">Sustainable Agriculture Subsidy 2024</h4>
                  <p class="res-card-desc">Financial support for transitioning to organic farming practices and implementing water-saving technologies.</p>
                  <div class="res-scheme-details">
                    <div class="res-scheme-row"><span>Benefit</span><strong>Up to ₹5,00,000</strong></div>
                    <div class="res-scheme-row"><span>Deadline</span><strong class="res-deadline">Dec 15, 2024</strong></div>
                  </div>
                  <button class="res-eligibility-btn">Check Eligibility</button>
                </div>
              </article>

              <!-- Guide Card -->
              <article class="res-card" data-type="guide">
                <div class="res-card-img-wrap">
                  <div class="res-card-img res-img-drone"></div>
                  <span class="res-card-badge res-badge-guide">Guide</span>
                  <button class="res-bookmark-btn"><span class="material-symbols-outlined">bookmark_border</span></button>
                </div>
                <div class="res-card-body">
                  <div class="res-card-meta">
                    <span>30 Min Read</span><span>•</span><span>Oct 18, 2023</span>
                  </div>
                  <h4 class="res-card-title">Precision Agriculture Mapping Techniques</h4>
                  <p class="res-card-desc">Utilizing drone imagery and satellite data to create detailed prescription maps for variable rate application.</p>
                  <div class="res-card-author">
                    <div class="res-author-avatar">AA</div>
                    <span>AgroFarm AI Team</span>
                  </div>
                </div>
              </article>

              <!-- Article Card 2 -->
              <article class="res-card" data-type="article">
                <div class="res-card-img-wrap">
                  <div class="res-card-img res-img-soil"></div>
                  <span class="res-card-badge res-badge-article">Article</span>
                  <button class="res-bookmark-btn"><span class="material-symbols-outlined">bookmark_border</span></button>
                </div>
                <div class="res-card-body">
                  <div class="res-card-meta">
                    <span>8 Min Read</span><span>•</span><span>Nov 2, 2023</span>
                  </div>
                  <h4 class="res-card-title">Understanding NPK Ratios for Different Crops</h4>
                  <p class="res-card-desc">A practical breakdown of nitrogen, phosphorus, and potassium requirements across major Indian crops.</p>
                  <div class="res-card-author">
                    <div class="res-author-avatar">PD</div>
                    <span>Prof. P. Desai</span>
                  </div>
                </div>
              </article>

              <!-- Scheme Card 2 -->
              <article class="res-card" data-type="scheme">
                <div class="res-card-body" style="padding-top:1.5rem;">
                  <div class="res-scheme-top">
                    <span class="res-card-badge res-badge-scheme" style="position:static;">Scheme</span>
                    <button class="res-bookmark-btn" style="position:static;background:none;color:var(--color-on-surface-variant);"><span class="material-symbols-outlined">bookmark_border</span></button>
                  </div>
                  <h4 class="res-card-title" style="margin-top:0.75rem;">PM-KISAN Direct Benefit Transfer</h4>
                  <p class="res-card-desc">₹6,000 per year direct income support to all farmer families across India in three equal installments.</p>
                  <div class="res-scheme-details">
                    <div class="res-scheme-row"><span>Benefit</span><strong>₹6,000 / year</strong></div>
                    <div class="res-scheme-row"><span>Status</span><strong style="color:#16a34a;">Open</strong></div>
                  </div>
                  <button class="res-eligibility-btn">Check Eligibility</button>
                </div>
              </article>

            </div>
          </div>

          <!-- Right: Sidebar -->
          <aside class="res-sidebar">

            <!-- Quick Tools -->
            <div class="res-tools-card">
              <div class="res-tools-head">
                <h3 class="res-section-title">Quick Tools</h3>
                <a href="#" class="res-view-all">View All</a>
              </div>
              <div class="res-tools-grid">
                <div class="res-tool-item res-tool-green">
                  <div class="res-tool-icon res-ti-green"><span class="material-symbols-outlined">science</span></div>
                  <span>Fertilizer<br/>Calculator</span>
                </div>
                <div class="res-tool-item res-tool-yellow">
                  <div class="res-tool-icon res-ti-yellow"><span class="material-symbols-outlined">grass</span></div>
                  <span>Crop Yield<br/>Estimator</span>
                </div>
                <div class="res-tool-item res-tool-blue">
                  <div class="res-tool-icon res-ti-blue"><span class="material-symbols-outlined">account_balance_wallet</span></div>
                  <span>Profit/Loss<br/>Calculator</span>
                </div>
                <div class="res-tool-item res-tool-sky">
                  <div class="res-tool-icon res-ti-sky"><span class="material-symbols-outlined">water_drop</span></div>
                  <span>Irrigation<br/>Planner</span>
                </div>
              </div>
            </div>

            <!-- Weather Alert -->
            <div class="res-alert-card">
              <div class="res-alert-bg-icon"><span class="material-symbols-outlined">warning</span></div>
              <div class="res-alert-content">
                <div class="res-alert-head">
                  <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">storm</span>
                  <span class="res-alert-label">High Alert</span>
                </div>
                <h4 class="res-alert-title">Frost Warning — Region B</h4>
                <p class="res-alert-desc">Temperatures expected to drop below freezing tonight. Deploy protective measures for sensitive crops.</p>
                <button class="res-alert-btn">Read Advisory</button>
              </div>
            </div>

            <!-- Govt Schemes Quick Links -->
            <div class="res-schemes-card">
              <h3 class="res-section-title" style="margin-bottom:1rem;">Govt. Schemes</h3>
              <div class="res-scheme-links">
                <a href="#" class="res-scheme-link">
                  <span class="material-symbols-outlined">account_balance</span>
                  <span>PM-KISAN Portal</span>
                  <span class="material-symbols-outlined res-link-arrow">chevron_right</span>
                </a>
                <a href="#" class="res-scheme-link">
                  <span class="material-symbols-outlined">water</span>
                  <span>Pradhan Mantri Krishi Sinchayee</span>
                  <span class="material-symbols-outlined res-link-arrow">chevron_right</span>
                </a>
                <a href="#" class="res-scheme-link">
                  <span class="material-symbols-outlined">shield</span>
                  <span>Fasal Bima Yojana</span>
                  <span class="material-symbols-outlined res-link-arrow">chevron_right</span>
                </a>
                <a href="#" class="res-scheme-link">
                  <span class="material-symbols-outlined">eco</span>
                  <span>Paramparagat Krishi Vikas</span>
                  <span class="material-symbols-outlined res-link-arrow">chevron_right</span>
                </a>
              </div>
            </div>

          </aside>
        </div>
      </div>
    `;
  },
  community: function() {
    return `<div class="container spacer-y fade-in"><h2 class="display-font">Farmer Community</h2><div class="card" style="padding:4rem; text-align:center;"><p>${t('market_intel')}</p></div></div>`;
  },
  'farmer-dashboard': function() {
    const name = appState.user?.name || 'Ramesh Kumar';
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    const hour = now.getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    return `
      <div class="db-wrapper spacer-y fade-in" id="db-content">
        <!-- Top Title Area -->
        <div class="spacer-bottom" style="display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap;">
          <div>
            <h2 class="display-font" style="font-size:2.8rem; margin-bottom:0.4rem;">${t('db_farmer_title')}</h2>
            <div style="color:var(--color-primary); font-weight:600; display:flex; align-items:center; gap:0.5rem;">
              <span id="db-weather-pill" style="background:rgba(46,125,50,0.1); padding:0.25rem 0.75rem; border-radius:99px; font-size:0.85rem;">${t('db_weather_fetching')}</span>
              <span style="color:#ccc;">|</span>
              <span style="color:#888; font-size:0.85rem;">${dateStr}</span>
            </div>
          </div>
          <button class="btn-primary" style="padding:0.8rem 1.8rem; font-size:0.95rem;" onclick="window.navigate('soil-analysis')">${t('db_new_report')}</button>
        </div>

        <!-- Welcome Banner -->
        <div class="db-welcome-banner" style="margin-top:0;">
          <div class="db-welcome-left">
            <div class="db-welcome-subtitle">${t('db_farm_center')}</div>
            <h2 class="db-welcome-title">${greeting}, ${name.split(' ')[0]} 👋</h2>
            <p class="db-welcome-desc">${t('db_monitoring')} <strong>1 ${t('db_alerts_needed')}</strong></p>
            <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:0.25rem;">
              <button class="db-banner-btn" onclick="document.getElementById('db-alerts-panel')?.scrollIntoView({behavior:'smooth'})">${t('db_view_alerts')} →</button>
              <button class="db-banner-btn-ghost" onclick="window.navigate('diagnosis')">${t('feat_diag_title')}</button>
            </div>
          </div>
          <div class="db-welcome-illustration">🌾</div>
        </div>

        <!-- KPI Cards -->
        <div class="db-kpi-row">
          <div class="db-kpi-card" style="--kpi-color:#2E7D32;">
            <div class="db-kpi-icon">🌾</div>
            <div class="db-kpi-label">${t('db_kpi_fields')}</div>
            <div class="db-kpi-value">3</div>
            <div class="db-kpi-trend up">↑ Added 1 last month</div>
            <div class="db-kpi-sparkline"><canvas id="spark-0" width="80" height="28"></canvas></div>
          </div>
          <div class="db-kpi-card" style="--kpi-color:#F57F17;">
            <div class="db-kpi-icon">⚠️</div>
            <div class="db-kpi-label">${t('db_kpi_alerts')}</div>
            <div class="db-kpi-value">1 <span class="db-kpi-badge">!</span></div>
            <div class="db-kpi-trend down">↓ Down from 4 last week</div>
            <div class="db-kpi-sparkline"><canvas id="spark-1" width="80" height="28"></canvas></div>
          </div>
          <div class="db-kpi-card" style="--kpi-color:#1565C0;">
            <div class="db-kpi-icon">📋</div>
            <div class="db-kpi-label">${t('db_kpi_pending')}</div>
            <div class="db-kpi-value">2</div>
            <div class="db-kpi-trend neutral">→ No change this week</div>
            <div class="db-kpi-sparkline"><canvas id="spark-2" width="80" height="28"></canvas></div>
          </div>
          <div class="db-kpi-card" style="--kpi-color:#6A1B9A;">
            <div class="db-kpi-icon">📊</div>
            <div class="db-kpi-label">${t('db_kpi_market')}</div>
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
                  <div class="db-panel-title">${t('db_health_score')}</div>
                  <div class="db-panel-sub">${t('db_last_30d')}</div>
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
                  <div class="db-panel-title">${t('db_field_map')}</div>
                  <div class="db-panel-sub">${t('db_map_sub')}</div>
                </div>
                <button class="db-panel-btn" onclick="window.navigate('soil-analysis')">${t('db_new_report')}</button>
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
                <div class="db-panel-title">${t('db_recent_alerts')}</div>
                <button class="db-text-btn" onclick="window.dbMarkAllRead()">${t('db_mark_read')}</button>
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
              <div class="db-panel-header"><div class="db-panel-title">${t('db_tasks')}</div></div>
              <div class="db-task-filters" id="db-task-filters">
                <span class="db-filter-pill active" onclick="window.dbFilterTasks('all', this)">${t('db_task_all')}</span>
                <span class="db-filter-pill" onclick="window.dbFilterTasks('pending', this)">${t('db_task_pending')}</span>
                <span class="db-filter-pill" onclick="window.dbFilterTasks('done', this)">${t('db_task_done')}</span>
              </div>
              <div class="db-task-table-wrap">
                <table class="db-task-table">
                  <thead><tr><th>${t('db_th_task')}</th><th>${t('db_th_field')}</th><th>${t('db_th_due')}</th><th>${t('db_th_status')}</th></tr></thead>
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

        <!-- AI Chat -->
        <button class="db-ai-fab" id="db-ai-fab" onclick="window.dbToggleAiChat()" title="${t('db_ask_ai')}">
          <span class="db-ai-fab-icon">🤖</span>
          <span class="db-ai-fab-label">${t('db_ask_ai')}</span>
          <div class="db-ai-pulse"></div>
        </button>
        <div class="db-ai-chat-panel" id="db-ai-chat-panel">
          <div class="db-ai-chat-header">
            <div style="display:flex;align-items:center;gap:0.75rem;"><span style="font-size:1.5rem;">🤖</span><div><div style="font-weight:800;font-size:0.95rem;">Kisan AI Assistant</div><div style="font-size:0.72rem;opacity:0.8;">Online · Farming Expert</div></div></div>
            <button onclick="window.dbToggleAiChat()" style="background:rgba(255,255,255,0.15);border:none;color:white;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:0.9rem;">✕</button>
          </div>
          <div class="db-ai-chat-body" id="db-ai-chat-body">
            <div class="db-ai-msg bot">${t('db_welcome_farmer')}</div>
          </div>
          <div class="db-ai-chat-footer">
            <input type="text" id="db-ai-input" class="db-ai-input" placeholder="${t('db_ai_placeholder_farmer')}" onkeypress="if(event.key==='Enter') window.dbAiSend()">
            <button onclick="window.dbAiSend()" class="db-ai-send">➔</button>
          </div>
        </div>
      </div>
    `;
  },
  profile: function() {
    const name = appState.user?.name || 'Ramesh Kumar';
    const email = appState.user?.email || 'ramesh@example.com';
    const role = appState.role === 'buyer' ? 'Buyer / Business' : 'Farmer';
    const initials = name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
    const joinDate = 'January 2024';
    
    return `
      <div class="profile-wrapper">
        
        <!-- Profile Header -->
        <div class="profile-header">
          <div class="profile-avatar-large">${initials}</div>
          <div class="profile-header-info">
            <h1 class="profile-name">${name}</h1>
            <p class="profile-role">${role}</p>
            <p class="profile-email">${email}</p>
            <p class="profile-joined">Member since ${joinDate}</p>
          </div>
          <button class="profile-edit-btn" onclick="alert('Edit profile coming soon!')">
            <span class="material-symbols-outlined">edit</span> Edit Profile
          </button>
        </div>

        <!-- Profile Content Grid -->
        <div class="profile-grid">

          <!-- Left Column -->
          <div class="profile-left">

            <!-- Personal Information -->
            <div class="profile-card">
              <h3 class="profile-card-title">Personal Information</h3>
              <div class="profile-info-grid">
                <div class="profile-info-item">
                  <span class="profile-info-label">Full Name</span>
                  <span class="profile-info-value">${name}</span>
                </div>
                <div class="profile-info-item">
                  <span class="profile-info-label">Email Address</span>
                  <span class="profile-info-value">${email}</span>
                </div>
                <div class="profile-info-item">
                  <span class="profile-info-label">Phone Number</span>
                  <span class="profile-info-value">+91 98765 43210</span>
                </div>
                <div class="profile-info-item">
                  <span class="profile-info-label">Location</span>
                  <span class="profile-info-value">${role === 'Farmer' ? 'Nashik, Maharashtra' : 'Mumbai, Maharashtra'}</span>
                </div>
                <div class="profile-info-item">
                  <span class="profile-info-label">Account Type</span>
                  <span class="profile-info-value">${role}</span>
                </div>
                <div class="profile-info-item">
                  <span class="profile-info-label">Language</span>
                  <span class="profile-info-value">English</span>
                </div>
              </div>
            </div>

            ${role === 'Farmer' ? `
            <!-- Farm Details (Farmer only) -->
            <div class="profile-card">
              <h3 class="profile-card-title">Farm Details</h3>
              <div class="profile-info-grid">
                <div class="profile-info-item">
                  <span class="profile-info-label">Farm Name</span>
                  <span class="profile-info-value">Green Valley Farms</span>
                </div>
                <div class="profile-info-item">
                  <span class="profile-info-label">Total Area</span>
                  <span class="profile-info-value">12.5 Acres</span>
                </div>
                <div class="profile-info-item">
                  <span class="profile-info-label">Primary Crops</span>
                  <span class="profile-info-value">Wheat, Onion, Tomato</span>
                </div>
                <div class="profile-info-item">
                  <span class="profile-info-label">Farming Type</span>
                  <span class="profile-info-value">Organic</span>
                </div>
              </div>
            </div>
            ` : `
            <!-- Business Details (Buyer only) -->
            <div class="profile-card">
              <h3 class="profile-card-title">Business Details</h3>
              <div class="profile-info-grid">
                <div class="profile-info-item">
                  <span class="profile-info-label">Company Name</span>
                  <span class="profile-info-value">Gupta Agri Enterprises</span>
                </div>
                <div class="profile-info-item">
                  <span class="profile-info-label">Business Type</span>
                  <span class="profile-info-value">Wholesale Procurement</span>
                </div>
                <div class="profile-info-item">
                  <span class="profile-info-label">GST Number</span>
                  <span class="profile-info-value">27XXXXX1234X1ZX</span>
                </div>
                <div class="profile-info-item">
                  <span class="profile-info-label">Annual Volume</span>
                  <span class="profile-info-value">5,000+ MT</span>
                </div>
              </div>
            </div>
            `}

          </div>

          <!-- Right Column -->
          <div class="profile-right">

            <!-- Account Settings -->
            <div class="profile-card">
              <h3 class="profile-card-title">Account Settings</h3>
              <div class="profile-settings-list">
                <button class="profile-setting-item">
                  <span class="material-symbols-outlined">lock</span>
                  <span>Change Password</span>
                  <span class="material-symbols-outlined profile-chevron">chevron_right</span>
                </button>
                <button class="profile-setting-item">
                  <span class="material-symbols-outlined">notifications</span>
                  <span>Notification Preferences</span>
                  <span class="material-symbols-outlined profile-chevron">chevron_right</span>
                </button>
                <button class="profile-setting-item">
                  <span class="material-symbols-outlined">language</span>
                  <span>Language & Region</span>
                  <span class="material-symbols-outlined profile-chevron">chevron_right</span>
                </button>
                <button class="profile-setting-item">
                  <span class="material-symbols-outlined">security</span>
                  <span>Privacy & Security</span>
                  <span class="material-symbols-outlined profile-chevron">chevron_right</span>
                </button>
              </div>
            </div>

            <!-- Activity Stats -->
            <div class="profile-card">
              <h3 class="profile-card-title">Activity Overview</h3>
              <div class="profile-stats-grid">
                <div class="profile-stat">
                  <div class="profile-stat-value">${role === 'Farmer' ? '24' : '18'}</div>
                  <div class="profile-stat-label">${role === 'Farmer' ? 'Reports Generated' : 'Orders Placed'}</div>
                </div>
                <div class="profile-stat">
                  <div class="profile-stat-value">${role === 'Farmer' ? '8' : '42'}</div>
                  <div class="profile-stat-label">${role === 'Farmer' ? 'Active Listings' : 'Connections'}</div>
                </div>
                <div class="profile-stat">
                  <div class="profile-stat-value">156</div>
                  <div class="profile-stat-label">Days Active</div>
                </div>
              </div>
            </div>

            <!-- Danger Zone -->
            <div class="profile-card profile-danger">
              <h3 class="profile-card-title">Danger Zone</h3>
              <button class="profile-danger-btn" onclick="if(confirm('Are you sure you want to delete your account? This cannot be undone.')) alert('Account deletion requested')">
                <span class="material-symbols-outlined">delete_forever</span>
                Delete Account
              </button>
            </div>

          </div>
        </div>

      </div>
    `;
  },
    'soil-analysis': function() {
    return `
      <div class="soil-page-wrapper">
        <!-- Hero Header -->
        <div class="soil-hero-header">
          <div class="soil-hero-content">
            <div class="soil-breadcrumb">
              <span>Analytics</span>
              <span class="breadcrumb-sep">/</span>
              <span>Intelligence</span>
            </div>
            <h1 class="soil-hero-title">Soil Intelligence Hub</h1>
            <p class="soil-hero-subtitle">AI-powered soil monitoring and nutrient analysis for smarter farming</p>
          </div>
          <button class="soil-new-scan-btn" onclick="document.getElementById('soil-config-panel').scrollIntoView({behavior:'smooth'})">
            <span class="btn-icon">✦</span>
            <span>NEW SCAN</span>
          </button>
        </div>

        <!-- Main 3-Column Grid -->
        <div class="soil-main-grid">
          
          <!-- LEFT: Field Configuration -->
          <div class="soil-panel soil-config-panel" id="soil-config-panel">
            <div class="panel-header">
              <span class="panel-icon">⚙️</span>
              <h3 class="panel-title">FIELD CONFIG</h3>
            </div>
            
            <div class="form-group">
              <label class="form-label">Field Identifier</label>
              <input type="text" id="soil-field" class="form-input" placeholder="North Wheat Plot" value="North Wheat Plot">
            </div>

            <div class="form-group">
              <label class="form-label">Geo-Location</label>
              <div class="custom-select-wrapper">
                <span class="select-icon">📍</span>
                <select id="soil-location" class="form-select">
                  <option value="Kolhapur">Kolhapur Central</option>
                  <option value="Sangli">Sangli East</option>
                  <option value="Satara">Satara North</option>
                  <option value="Pune">Pune West</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Sampling Date</label>
              <input type="date" id="soil-date" class="form-input">
            </div>

            <div class="upload-section">
              <label class="form-label">Sample Scan</label>
              <div class="upload-zone" onclick="document.getElementById('soil-file').click()">
                <input type="file" id="soil-file" style="display:none;" accept="image/*" onchange="window.handleSoilUpload(this)">
                <div id="upload-placeholder" class="upload-placeholder">
                  <div class="upload-icon">📷</div>
                  <div class="upload-text">Drop soil image or click to upload</div>
                  <div class="upload-subtext">JPG, PNG up to 10MB</div>
                </div>
                <img id="soil-preview" class="upload-preview" style="display:none;">
              </div>
            </div>

            <div class="nutrient-section">
              <h4 class="section-label">NUTRIENT PROFILE</h4>
              <div class="nutrient-grid">
                <div class="form-group-mini">
                  <label class="form-label-mini">pH Level</label>
                  <input type="number" step="0.1" id="soil-ph" class="form-input-mini" value="6.8">
                </div>
                <div class="form-group-mini">
                  <label class="form-label-mini">Nitrogen (N)</label>
                  <input type="number" id="soil-n" class="form-input-mini" value="42">
                </div>
                <div class="form-group-mini">
                  <label class="form-label-mini">Phosphorus (P)</label>
                  <input type="number" id="soil-p" class="form-input-mini" value="28">
                </div>
                <div class="form-group-mini">
                  <label class="form-label-mini">Potassium (K)</label>
                  <input type="number" id="soil-k" class="form-input-mini" value="195">
                </div>
                <div class="form-group-mini">
                  <label class="form-label-mini">Moisture %</label>
                  <input type="number" id="soil-moisture" class="form-input-mini" value="34">
                </div>
              </div>
            </div>

            <button class="soil-analyze-btn" onclick="window.runSoilAnalysis()">
              <span>Run AI Analysis</span>
              <span class="btn-arrow">→</span>
            </button>
          </div>

          <!-- CENTER: AI Perception / Results -->
          <div class="soil-panel soil-results-panel">
            <div class="panel-header">
              <span class="panel-icon">🧠</span>
              <h3 class="panel-title">AI PERCEPTION</h3>
            </div>

            <!-- Show Results by Default with Mock Data -->
            <div id="soil-results-content" class="results-content">
              <!-- Gauge Chart -->
              <div class="gauge-section">
                <div class="gauge-container">
                  <canvas id="soilGaugeChart"></canvas>
                </div>
                <div class="gauge-score">
                  <div class="score-value" id="res-score">74</div>
                  <div class="score-label">GOOD</div>
                </div>
              </div>

              <!-- Metric Pills -->
              <div class="metric-pills">
                <div class="metric-pill pill-green">
                  <div class="pill-value" id="chip-ph">6.8</div>
                  <div class="pill-label">pH</div>
                </div>
                <div class="metric-pill pill-amber">
                  <div class="pill-value" id="chip-n">42</div>
                  <div class="pill-label">N kg/ha</div>
                </div>
                <div class="metric-pill pill-green">
                  <div class="pill-value" id="chip-p">28</div>
                  <div class="pill-label">P kg/ha</div>
                </div>
                <div class="metric-pill pill-blue">
                  <div class="pill-value" id="chip-k">195</div>
                  <div class="pill-label">K kg/ha</div>
                </div>
              </div>

              <!-- Nutrient Bars -->
              <div class="nutrient-bars">
                <h4 class="bars-title">Nutrient Levels vs Optimal Range</h4>
                <div class="bar-item">
                  <div class="bar-label">Nitrogen</div>
                  <div class="bar-track">
                    <div class="bar-fill bar-amber" style="width: 65%;" id="bar-n"></div>
                  </div>
                  <div class="bar-value" id="val-n">42</div>
                </div>
                <div class="bar-item">
                  <div class="bar-label">Phosphorus</div>
                  <div class="bar-track">
                    <div class="bar-fill bar-green" style="width: 80%;" id="bar-p"></div>
                  </div>
                  <div class="bar-value" id="val-p">28</div>
                </div>
                <div class="bar-item">
                  <div class="bar-label">Potassium</div>
                  <div class="bar-track">
                    <div class="bar-fill bar-blue" style="width: 95%;" id="bar-k"></div>
                  </div>
                  <div class="bar-value" id="val-k">195</div>
                </div>
                <div class="bar-item">
                  <div class="bar-label">pH Level</div>
                  <div class="bar-track">
                    <div class="bar-fill bar-green" style="width: 85%;" id="bar-ph"></div>
                  </div>
                  <div class="bar-value" id="val-ph">6.8</div>
                </div>
                <div class="bar-item">
                  <div class="bar-label">Moisture</div>
                  <div class="bar-track">
                    <div class="bar-fill bar-amber" style="width: 68%;" id="bar-moist"></div>
                  </div>
                  <div class="bar-value" id="val-moist">34%</div>
                </div>
              </div>

              <!-- AI Recommendation -->
              <div class="ai-recommendation" id="ai-rec-card">
                <div class="rec-icon">💡</div>
                <div class="rec-content">
                  <div class="rec-title">AI Recommendation</div>
                  <div class="rec-text" id="res-recommendation">
                    <strong>Apply 25kg/ha of Urea</strong> — Nitrogen levels below optimal for wheat cultivation.
                    <br><br>
                    <strong>Irrigate within 48 hours</strong> — Moisture at 34%, increase to 40-45% for optimal growth.
                  </div>
                </div>
              </div>

              <button class="download-report-btn">
                <span>📄</span>
                <span>Download Report</span>
              </button>
            </div>
          </div>

          <!-- RIGHT: Chronology / History -->
          <div class="soil-panel soil-history-panel">
            <div class="panel-header">
              <span class="panel-icon">🕐</span>
              <h3 class="panel-title">CHRONOLOGY</h3>
            </div>

            <!-- Device Status -->
            <div class="device-status">
              <div class="device-info">
                <span class="device-icon">📡</span>
                <div>
                  <div class="device-name">e-Agribot V2</div>
                  <div class="device-model">Field Sensor</div>
                </div>
              </div>
              <div class="status-badge status-connected">
                <span class="status-dot"></span>
                <span>Connected</span>
              </div>
            </div>

            <!-- Timeline with Mock Data -->
            <div class="timeline" id="soil-history-tbody">
              <div class="timeline-item">
                <span class="timeline-dot dot-green"></span>
                <div class="timeline-content">
                  <div class="timeline-date">10 Apr 2026</div>
                  <div class="timeline-field">North Wheat Plot</div>
                </div>
                <span class="timeline-score score-green">74</span>
                <a href="#" class="timeline-view">View</a>
              </div>
              <div class="timeline-item">
                <span class="timeline-dot dot-amber"></span>
                <div class="timeline-content">
                  <div class="timeline-date">05 Apr 2026</div>
                  <div class="timeline-field">South Rice Field</div>
                </div>
                <span class="timeline-score score-amber">62</span>
                <a href="#" class="timeline-view">View</a>
              </div>
              <div class="timeline-item">
                <span class="timeline-dot dot-green"></span>
                <div class="timeline-content">
                  <div class="timeline-date">28 Mar 2026</div>
                  <div class="timeline-field">North Wheat Plot</div>
                </div>
                <span class="timeline-score score-green">78</span>
                <a href="#" class="timeline-view">View</a>
              </div>
              <div class="timeline-item">
                <span class="timeline-dot dot-amber"></span>
                <div class="timeline-content">
                  <div class="timeline-date">20 Mar 2026</div>
                  <div class="timeline-field">East Corn Field</div>
                </div>
                <span class="timeline-score score-amber">58</span>
                <a href="#" class="timeline-view">View</a>
              </div>
              <div class="timeline-item">
                <span class="timeline-dot dot-green"></span>
                <div class="timeline-content">
                  <div class="timeline-date">12 Mar 2026</div>
                  <div class="timeline-field">South Rice Field</div>
                </div>
                <span class="timeline-score score-green">81</span>
                <a href="#" class="timeline-view">View</a>
              </div>
            </div>

            <button class="view-all-btn">View All Analyses</button>
          </div>

        </div>

        <!-- Analysis History Table -->
        <div class="history-table-section">
          <div class="table-header">
            <div>
              <h2 class="table-title">Analysis History</h2>
              <p class="table-subtitle">Complete record of all soil analyses</p>
            </div>
            <div class="table-filters">
              <input type="text" class="filter-input" placeholder="Search field...">
              <select class="filter-select">
                <option>All Status</option>
                <option>Completed</option>
                <option>Processing</option>
              </select>
            </div>
          </div>

          <div class="table-wrapper">
            <table class="history-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Date</th>
                  <th>pH</th>
                  <th>N</th>
                  <th>P</th>
                  <th>K</th>
                  <th>Moisture</th>
                  <th>Health Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="field-name">North Wheat Plot</td>
                  <td>10 Apr 2026</td>
                  <td>6.8</td>
                  <td>42</td>
                  <td>28</td>
                  <td>195</td>
                  <td>34%</td>
                  <td><span class="score-badge badge-green">74</span></td>
                  <td><span class="status-pill status-completed">Completed</span></td>
                  <td class="actions">
                    <button class="action-btn" title="View">👁️</button>
                    <button class="action-btn" title="Download">📥</button>
                    <button class="action-btn action-danger" title="Delete">🗑️</button>
                  </td>
                </tr>
                <tr>
                  <td class="field-name">South Rice Field</td>
                  <td>05 Apr 2026</td>
                  <td>6.2</td>
                  <td>38</td>
                  <td>22</td>
                  <td>180</td>
                  <td>42%</td>
                  <td><span class="score-badge badge-amber">62</span></td>
                  <td><span class="status-pill status-completed">Completed</span></td>
                  <td class="actions">
                    <button class="action-btn" title="View">👁️</button>
                    <button class="action-btn" title="Download">📥</button>
                    <button class="action-btn action-danger" title="Delete">🗑️</button>
                  </td>
                </tr>
                <tr>
                  <td class="field-name">North Wheat Plot</td>
                  <td>28 Mar 2026</td>
                  <td>7.0</td>
                  <td>45</td>
                  <td>30</td>
                  <td>200</td>
                  <td>38%</td>
                  <td><span class="score-badge badge-green">78</span></td>
                  <td><span class="status-pill status-completed">Completed</span></td>
                  <td class="actions">
                    <button class="action-btn" title="View">👁️</button>
                    <button class="action-btn" title="Download">📥</button>
                    <button class="action-btn action-danger" title="Delete">🗑️</button>
                  </td>
                </tr>
                <tr>
                  <td class="field-name">East Corn Field</td>
                  <td>20 Mar 2026</td>
                  <td>5.8</td>
                  <td>35</td>
                  <td>20</td>
                  <td>165</td>
                  <td>28%</td>
                  <td><span class="score-badge badge-amber">58</span></td>
                  <td><span class="status-pill status-completed">Completed</span></td>
                  <td class="actions">
                    <button class="action-btn" title="View">👁️</button>
                    <button class="action-btn" title="Download">📥</button>
                    <button class="action-btn action-danger" title="Delete">🗑️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="table-pagination">
            <button class="page-btn" disabled>← Previous</button>
            <div class="page-numbers">
              <span class="page-num active">1</span>
              <span class="page-num">2</span>
              <span class="page-num">3</span>
            </div>
            <button class="page-btn">Next →</button>
          </div>
        </div>
      </div>
    `;
  }
};

// ─── Routing ────────────────────────────────────────────────────────
function renderRoute(route) {
  // Redirect old 'form' route to new 'soil-analysis'
  if (route === 'form') route = 'soil-analysis';
  
  if (route === 'dashboard') {
    route = appState.isAuthenticated ? (appState.role === 'buyer' ? 'buyer-dashboard' : 'farmer-dashboard') : 'login';
  }
  if (!screens[route]) route = 'landing';
  appState.currentRoute = route;
  const main = document.getElementById('main-content');
  if (main) {
    main.innerHTML = typeof screens[route] === 'function' ? screens[route]() : screens[route];
    if (route === 'market') {
      window.fetchMarketData();
      setTimeout(() => window.initMarketChart(null), 150);
      // Set today's date
      const d = document.getElementById('mkt-date');
      if (d) d.textContent = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });
    }
    if (route === 'soil-analysis') {
      document.getElementById('soil-date').valueAsDate = new Date();
      // Initialize with mock data by default
      setTimeout(() => {
        window.initSoilChartsWithMockData();
      }, 100);
    }
    if (route === 'landing') setTimeout(window.initLandingPage, 80);
    if (route === 'b2f') { /* B2F has its own panel */ }
    if (route === 'farmer-dashboard' || route === 'buyer-dashboard') {
      setTimeout(window.initDashboard, 80);
    }
  }
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.route === route || (route === 'landing' && l.dataset.route === 'landing')));
}

window.navigate = function(r) { renderRoute(r); window.scrollTo({ top: 0, behavior: 'smooth' }); };

document.addEventListener('click', (e) => {
  const l = e.target.closest('.nav-link, .dropdown-link, .profile-dropdown-link');
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
  const publicLinks  = document.querySelectorAll('.public-link');
  const farmerLinks  = document.querySelectorAll('.farmer-link');
  const buyerLinks   = document.querySelectorAll('.buyer-link');

  if (appState.isAuthenticated) {
    if (auth) auth.style.display = 'none';
    if (user) {
      user.style.display = 'flex';
      const n = document.getElementById('user-menu-name');
      if (n) n.textContent = appState.user?.name || (appState.role === 'buyer' ? 'Buyer' : 'Farmer');
      getInitials();
    }

    // Hide public links
    publicLinks.forEach(l => l.style.display = 'none');

    if (appState.role === 'buyer') {
      // Show buyer links, hide farmer links
      farmerLinks.forEach(l => l.style.display = 'none');
      buyerLinks.forEach(l => l.style.display = 'block');
    } else {
      // Show farmer links, hide buyer links
      buyerLinks.forEach(l => l.style.display = 'none');
      farmerLinks.forEach(l => l.style.display = 'block');
    }

  } else {
    if (auth) auth.style.display = 'flex';
    if (user) user.style.display = 'none';
    publicLinks.forEach(l => l.style.display = 'block');
    farmerLinks.forEach(l => l.style.display = 'none');
    buyerLinks.forEach(l => l.style.display = 'none');
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

  // ── Demo bypass (no server needed) ──────────────
  if (e === 'farmer@demo.com' && p === 'demo123') {
    appState.isAuthenticated = true;
    appState.user = { email: 'farmer@demo.com', role: 'farmer', name: 'Ramesh Kumar' };
    appState.role = 'farmer';
    _saveSession(); window.updateNavbarUI(); window.navigate('dashboard');
    return;
  }
  if (e === 'buyer@demo.com' && p === 'demo123') {
    appState.isAuthenticated = true;
    appState.user = { email: 'buyer@demo.com', role: 'buyer', name: 'Meera Gupta' };
    appState.role = 'buyer';
    _saveSession(); window.updateNavbarUI(); window.navigate('dashboard');
    return;
  }
  // ────────────────────────────────────────────────

  try {
    const res = await fetch('http://localhost:5000/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: e, password: p }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    appState.isAuthenticated = true; appState.user = data.user; appState.role = data.user.role;
    _saveSession(); window.updateNavbarUI(); window.navigate('dashboard');
    setTimeout(() => window.requestSatelliteSync(), 1000);
  } catch(err) { alert(err.message); }
};

// Quick demo login — called directly from demo buttons
window.demoLogin = function(role) {
  const demos = {
    farmer: { email: 'farmer@demo.com', role: 'farmer', name: 'Ramesh Kumar' },
    buyer:  { email: 'buyer@demo.com',  role: 'buyer',  name: 'Meera Gupta'  }
  };
  const u = demos[role];
  appState.isAuthenticated = true;
  appState.user = u;
  appState.role = u.role;
  _saveSession(); window.updateNavbarUI(); window.navigate('dashboard');
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

  const items = apiData ? apiData.slice(0, 7) : [];
  const labels = items.length ? items.map(item => item.commodity) : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const prices = items.length ? items.map(item => Number(item.modal_price) || 0) : [1800,2100,1950,2300,2450,2200,2600];

  window._agriMarketChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Onion (Red) ₹',
        data: prices,
        backgroundColor: 'rgba(0,108,12,0.08)',
        borderColor: '#006c0c',
        borderWidth: 2.5,
        pointBackgroundColor: '#006c0c',
        pointRadius: 4,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: false, grid: { color: '#f3f3f3' } },
        x: { grid: { display: false } }
      }
    }
  });
};

// Market tab switcher
window.mktSetTab = function(btn, period) {
  btn.closest('.mkt-tab-group').querySelectorAll('.mkt-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Simulate different data per period
  const datasets = {
    '7D':  [1800,2100,1950,2300,2450,2200,2600],
    '1M':  [1600,1750,1900,2100,2000,2200,2350,2100,2400,2600,2450,2300,2500,2650,2400,2550,2700,2600,2800,2750,2900,2850,3000,2950,3100,3050,3200,3150,3300,3250],
    '3M':  [1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600]
  };
  const labels7D  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const labels1M  = Array.from({length:30}, (_,i) => `D${i+1}`);
  const labels3M  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const labelsMap = { '7D': labels7D, '1M': labels1M, '3M': labels3M };
  if (window._agriMarketChart) {
    window._agriMarketChart.data.labels = labelsMap[period];
    window._agriMarketChart.data.datasets[0].data = datasets[period];
    window._agriMarketChart.update();
  }
};

// Market table search
window.mktSearch = function(val) {
  const rows = document.querySelectorAll('#mkt-tbody tr');
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(val.toLowerCase()) ? '' : 'none';
  });
};

// Resources filter by category
window.resFilter = function(type, btn) {
  document.querySelectorAll('.res-tab').forEach(b => b.classList.remove('res-tab-active'));
  btn.classList.add('res-tab-active');
  document.querySelectorAll('.res-card').forEach(card => {
    card.style.display = (type === 'all' || card.dataset.type === type) ? '' : 'none';
  });
};

// Resources search
window.resSearch = function(val) {
  const q = val.toLowerCase();
  document.querySelectorAll('.res-card').forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
};

// F2B tab switcher removed - single panel only

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

window.handleDiagnosisUpload = function(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Update the preview image
      const previewImg = document.querySelector('.preview-img');
      if (previewImg) {
        previewImg.src = e.target.result;
      }
      
      // Show notification
      window.showNotification('🔬 Image uploaded! Analyzing...');
      
      // Simulate AI analysis
      setTimeout(() => {
        window.showNotification('✅ Analysis complete!');
      }, 2000);
    };
    reader.readAsDataURL(input.files[0]);
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

// Restore language even for unauthenticated users
if (!_savedSession) {
  const savedLang = localStorage.getItem('agro_lang');
  if (savedLang) appState.lang = savedLang;
}

document.addEventListener('DOMContentLoaded', () => { 
  window.updateNavbarUI(); 
  
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.value = appState.lang;
    langToggle.addEventListener('change', (e) => {
      appState.lang = e.target.value;
      localStorage.setItem('agro_lang', appState.lang); // save immediately
      _saveSession();
      updateStaticUI();
      renderRoute(appState.currentRoute);
    });
  }
  updateStaticUI();
  
  // If user is already authenticated, navigate to dashboard instead of landing
  if (appState.isAuthenticated) {
    renderRoute('dashboard');
  } else {
    renderRoute(appState.currentRoute);
  }
});

window.getBotReply = function(userInput) {
    if (!window.chatbotData) return "Sorry, data is not loaded.";
    
    // Clean and tokenize input
    const cleanInput = userInput.toLowerCase().replace(/[^\w\s]/gi, '');
    const userWords = cleanInput.split(/\s+/).filter(w => w.length > 2);
    const stopWords = ['what', 'how', 'the', 'best', 'can', 'grow', 'which', 'will', 'is', 'are', 'for', 'you', 'give', 'tell', 'more', 'about'];
    const keywords = userWords.filter(w => !stopWords.includes(w));

    if (keywords.length === 0) return "Please ask a specific agricultural question (e.g., 'summer crops' or 'NPK for wheat').";

    let bestMatch = { item: null, score: 0 };

    for (const item of window.chatbotData) {
        let currentScore = 0;
        const qWords = item.question.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/);
        const aWords = item.answer.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/);

        keywords.forEach(word => {
            // High weight for question matches
            if (qWords.includes(word)) currentScore += 2.0;
            // Lower weight for answer matches
            if (aWords.includes(word)) currentScore += 0.5;
        });

        if (currentScore > bestMatch.score) {
            bestMatch = { item, score: currentScore };
        }
    }

    // Threshold for a valid answer
    if (bestMatch.score >= 1.5) {
        return bestMatch.item.answer;
    }

    return "I'm not quite sure about that specific topic. Try asking about crops, fertilizers, pest control, or government schemes.";
};

function updateStaticUI() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    
    let attrHandled = false;
    // Handle special attributes
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (el.hasAttribute('placeholder')) {
        el.setAttribute('placeholder', translated);
        attrHandled = true;
      }
    }
    if (el.hasAttribute('title')) {
      el.setAttribute('title', translated);
      attrHandled = true;
    }
    
    // Update text content only if:
    // 1. It wasn't just an attribute update OR
    // 2. The element doesn't have complex children (preserving icons/spans)
    if (!attrHandled || (el.children.length === 0 && el.innerText.trim() !== "")) {
      // Only overwrite if it's a simple text-carrying element or wasn't handled as an attribute
      if (el.children.length === 0) {
        el.innerText = translated;
      }
    }
  });
}

// ─── Chatbot Logic ──────────────────────────────────────────────────
window.toggleKisanChat = function() {
  const win = document.getElementById('kisan-chatbot-window');
  if (win) win.style.display = (win.style.display === 'none' || !win.style.display) ? 'flex' : 'none';
};

window.dbToggleAiChat = function() {
  const win = document.getElementById('db-ai-chat-panel');
  if (win) win.classList.toggle('active');
};

window.dbAiSend = async function() {
  const input = document.getElementById('db-ai-input');
  const text = input?.value.trim();
  if (!text) return;
  input.value = '';

  const body = document.getElementById('db-ai-chat-body');
  const userMsg = document.createElement('div');
  userMsg.className = 'db-ai-msg user';
  userMsg.textContent = text;
  body.appendChild(userMsg);
  body.scrollTop = body.scrollHeight;

  const loader = document.createElement('div');
  loader.className = 'db-ai-msg bot typing';
  loader.textContent = '...';
  body.appendChild(loader);

  // ─── Try Local Data First ───
  const localReply = window.getBotReply(text);
  if (localReply) {
    setTimeout(() => {
      loader.remove();
      const botMsg = document.createElement('div');
      botMsg.className = 'db-ai-msg bot';
      botMsg.innerHTML = localReply.replace(/\n/g, '<br>');
      body.appendChild(botMsg);
      body.scrollTop = body.scrollHeight;
    }, 500); // Small delay for UX
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, lang: appState.lang })
    });
    const data = await res.json();
    loader.remove();
    const botMsg = document.createElement('div');
    botMsg.className = 'db-ai-msg bot';
    botMsg.innerHTML = data.reply.replace(/\n/g, '<br>');
    body.appendChild(botMsg);
  } catch (e) {
    loader.textContent = t('chat_error_api');
  }
  body.scrollTop = body.scrollHeight;
};

window.sendKisanMessage = async function(msgText) {
  const input = document.getElementById('kisan-input');
  let text = msgText || input.value.trim();
  if (!text) return;
  
  if (!msgText) input.value = '';
  
  const body = document.getElementById('kisan-chat-body');
  
  const userBubble = document.createElement('div');
  userBubble.style.cssText = 'align-self: flex-end; background: var(--color-primary); color: white; padding: 0.75rem 1rem; border-radius: 16px 16px 4px 16px; font-size: 0.9rem; max-width: 85%; margin-bottom: 1rem; box-shadow: var(--shadow-glass);';
  userBubble.innerText = text;
  body.appendChild(userBubble);
  body.scrollTop = body.scrollHeight;

  const loader = document.createElement('div');
  loader.className = 'ai-typing-loader';
  loader.style.cssText = 'align-self: flex-start; background: white; color: var(--color-on-surface); padding: 0.5rem 1rem; border-radius: 4px 16px 16px 16px; font-size: 0.9rem; border: 1px solid var(--color-outline-variant); margin-bottom: 1rem;';
  loader.innerHTML = `<span style="font-size:0.8rem;opacity:0.6;">${t('chat_typing')} <div class="pulse-ring" style="display:inline-block; position:relative; top:auto; left:auto; width:10px; height:10px; margin-left:5px;"></div></span>`;
  body.appendChild(loader);

  // ─── Try Local Data First ───
  const localReply = window.getBotReply(text);
  if (localReply) {
    setTimeout(() => {
      loader.remove();
      const botBubble = document.createElement('div');
      botBubble.style.cssText = 'align-self: flex-start; background: white; color: var(--color-on-surface); padding: 0.75rem 1rem; border-radius: 4px 16px 16px 16px; font-size: 0.9rem; max-width: 85%; margin-bottom: 1rem; border: 1px solid var(--color-outline-variant); box-shadow: var(--shadow-glass);';
      botBubble.innerHTML = localReply.replace(/\n/g, '<br>');
      body.appendChild(botBubble);
      body.scrollTop = body.scrollHeight;
    }, 600);
    return;
  }
  body.scrollTop = body.scrollHeight;
  
  try {
    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, lang: appState.lang })
    });
    const data = await res.json();
    loader.remove();
    const formattedReply = (data.reply || '').replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const botBubble = document.createElement('div');
    botBubble.style.cssText = 'align-self: flex-start; background: white; color: var(--color-on-surface); padding: 0.75rem 1rem; border-radius: 4px 16px 16px 16px; font-size: 0.9rem; max-width: 85%; margin-bottom: 1rem; border: 1px solid var(--color-outline-variant); box-shadow: var(--shadow-glass);';
    botBubble.innerHTML = formattedReply;
    body.appendChild(botBubble);
  } catch(e) {
    loader.remove();
    const errBubble = document.createElement('div');
    errBubble.style.cssText = 'align-self: flex-start; background: #fff0f0; color: #ba1a1a; padding: 0.75rem 1rem; border-radius: 4px 16px 16px 16px; font-size: 0.9rem; margin-bottom: 1rem; border: 1px solid #ffcdcf;';
    errBubble.innerText = t('chat_error');
    body.appendChild(errBubble);
  }
  body.scrollTop = body.scrollHeight;
};

window.kisanSuggest = function(text) {
  window.sendKisanMessage(text);
};

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

  window.sendMessage = function() {
    const input = document.getElementById('userInput');
    const messages = document.getElementById('messages');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    
    // User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'ai-msg user';
    userDiv.innerText = text;
    messages.appendChild(userDiv);
    
    // Typing indicator
    const loader = document.createElement('div');
    loader.className = 'ai-msg bot typing';
    loader.innerText = '...';
    messages.appendChild(loader);
    messages.scrollTop = messages.scrollHeight;

    // Process Reply
    setTimeout(() => {
        loader.remove();
        const reply = window.getBotReply(text);
        const botDiv = document.createElement('div');
        botDiv.className = 'ai-msg bot';
        botDiv.innerText = reply;
        messages.appendChild(botDiv);
        messages.scrollTop = messages.scrollHeight;
    }, 600);
};

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
  const btn = document.querySelector('.soil-analyze-btn');
  if (!btn) return;
  
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span>⚡ ANALYZING...</span>';

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
      organicMatter: 2.5
    }
  };

  try {
    // Artificial delay for effect
    await new Promise(r => setTimeout(r, 2000));
    
    const res = await fetch('http://localhost:5000/api/soil-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();

    // Update UI with results
    document.getElementById('res-score').textContent = result.healthScore;
    document.getElementById('res-recommendation').innerHTML = `<strong>Apply 25kg/ha of Urea</strong> — ${result.recommendation}`;
    
    // Update metric pills
    document.getElementById('chip-ph').textContent = data.parameters.ph;
    document.getElementById('chip-n').textContent = data.parameters.n;
    document.getElementById('chip-p').textContent = data.parameters.p;
    document.getElementById('chip-k').textContent = data.parameters.k;
    
    // Update bars
    document.getElementById('val-n').textContent = data.parameters.n;
    document.getElementById('val-p').textContent = data.parameters.p;
    document.getElementById('val-k').textContent = data.parameters.k;
    document.getElementById('val-ph').textContent = data.parameters.ph;
    document.getElementById('val-moist').textContent = data.parameters.moisture + '%';
    
    // Update bar widths
    document.getElementById('bar-n').style.width = Math.min(100, (data.parameters.n / 50) * 100) + '%';
    document.getElementById('bar-p').style.width = Math.min(100, (data.parameters.p / 35) * 100) + '%';
    document.getElementById('bar-k').style.width = Math.min(100, (data.parameters.k / 200) * 100) + '%';
    document.getElementById('bar-ph').style.width = Math.min(100, (data.parameters.ph / 8) * 100) + '%';
    document.getElementById('bar-moist').style.width = Math.min(100, (data.parameters.moisture / 50) * 100) + '%';
    
    // Update gauge chart
    window.initSoilCharts(result.healthScore, data.parameters);
    
    // Show notification
    window.showNotification('✨ Analysis Complete');
    
    // Scroll to results
    document.getElementById('soil-results-content').scrollIntoView({ behavior: 'smooth' });
    
  } catch(e) {
    alert('Analysis Failed: ' + e.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
};

window.initSoilCharts = function(score, params) {
  const gaugeCtx = document.getElementById('soilGaugeChart')?.getContext('2d');
  const barCtx = document.getElementById('soilNutrientChart')?.getContext('2d');
  if (!gaugeCtx || !window.Chart) return;

  // Cleanup existing charts
  if (appState._soilGauge) appState._soilGauge.destroy();

  // Gauge Chart (Semi-circle)
  const scoreColor = score > 70 ? '#4CAF50' : (score > 40 ? '#FFC107' : '#EF5350');
  
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
};

// Initialize with mock data on page load
window.initSoilChartsWithMockData = function() {
  const score = 74;
  const params = {
    ph: 6.8,
    n: 42,
    p: 28,
    k: 195,
    moisture: 34
  };
  
  window.initSoilCharts(score, params);
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
  alert('Viewing detailed historical report ID: ' + id);
};
