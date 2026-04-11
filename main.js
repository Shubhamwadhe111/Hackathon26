const appState = {
  currentRoute: 'landing'
};

const screens = {
  landing: `
    <div class="hero-section fade-in">
      <img src="/public/hero.png" alt="Field" class="hero-img">
      <div class="hero-content">
        <h1 class="hero-title display-font">Maximize Your Harvest with AI.</h1>
        <p class="hero-subtitle">Personalized crop recommendations and market insights for smarter farming.</p>
        <button class="btn btn-primary" onclick="window.navigate('form')">Get Started</button>
      </div>
    </div>
    
    <div class="container fade-in" style="animation-delay: 0.1s">
      <div class="grid-3">
        <div class="card">
          <h3 class="display-font" style="margin-bottom: 1rem">🧠 Smart Recommendations</h3>
          <p style="color: var(--color-on-surface-variant)">AI-driven crop advice tailored specifically to your soil composition and micro-climate.</p>
        </div>
        <div class="card">
          <h3 class="display-font" style="margin-bottom: 1rem">📈 Real-time Markets</h3>
          <p style="color: var(--color-on-surface-variant)">Track current prices and market trends to sell your harvest at the optimal time.</p>
        </div>
        <div class="card">
          <h3 class="display-font" style="margin-bottom: 1rem">🤝 Buyer Network</h3>
          <p style="color: var(--color-on-surface-variant)">Connect directly with purchasers looking for the exact crops you are growing.</p>
        </div>
      </div>
    </div>
  `,
  form: `
    <div class="container fade-in spacer-y">
      <h2 class="display-font" style="font-size: 2.5rem; margin-bottom: 0.5rem">Assess Your Soil</h2>
      <p style="color: var(--color-on-surface-variant); margin-bottom: 2rem">Enter your field parameters to get an AI-powered crop recommendation.</p>
      
      <div class="card" style="max-width: 600px">
        <div class="input-group">
          <label class="input-label">Nitrogen (N) ratio</label>
          <input type="number" class="input-field" placeholder="e.g. 90">
        </div>
        <div class="input-group">
          <label class="input-label">Phosphorous (P) ratio</label>
          <input type="number" class="input-field" placeholder="e.g. 42">
        </div>
        <div class="input-group">
          <label class="input-label">Potassium (K) ratio</label>
          <input type="number" class="input-field" placeholder="e.g. 43">
        </div>
        <div style="display: flex; gap: 1rem;">
          <div class="input-group" style="flex: 1">
            <label class="input-label">Temperature (°C)</label>
            <input type="number" class="input-field" placeholder="20.8">
          </div>
          <div class="input-group" style="flex: 1">
            <label class="input-label">Humidity (%)</label>
            <input type="number" class="input-field" placeholder="82">
          </div>
        </div>
        <div style="display: flex; gap: 1rem;">
          <div class="input-group" style="flex: 1">
            <label class="input-label">pH Level</label>
            <input type="number" class="input-field" placeholder="6.5">
          </div>
          <div class="input-group" style="flex: 1">
            <label class="input-label">Rainfall (mm)</label>
            <input type="number" class="input-field" placeholder="202.9">
          </div>
        </div>
        
        <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="window.navigate('results')">Get Recommendation</button>
      </div>
    </div>
  `,
  results: `
    <div class="container fade-in spacer-y">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
        <div>
          <h2 class="display-font" style="font-size: 2.5rem; margin-bottom: 0.5rem">Intelligence Report</h2>
          <p style="color: var(--color-on-surface-variant);">Based on your parameters, here is the optimal choice.</p>
        </div>
        <button class="btn btn-secondary" onclick="window.navigate('form')">Recalculate</button>
      </div>

      <div class="card fade-in" style="border-top: 4px solid var(--color-tertiary-fixed); margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span class="insight-chip">✨ 95% Confidence Match</span>
        </div>
        <h1 class="display-font" style="font-size: 3.5rem; color: var(--color-primary); margin-bottom: 0.5rem;">Rice (Paddy)</h1>
        <p style="color: var(--color-on-surface-variant); max-width: 600px; margin-bottom: 2rem;">
          Your high humidity and rainfall parameters make this region highly suitable for rice cultivation. Expected yield is above local average.
        </p>

        <div style="display: flex; gap: 2rem;">
          <div>
            <span class="input-label">Est. Yield</span>
            <strong style="font-size: 1.25rem;">4.2 tons/ha</strong>
          </div>
          <div>
            <span class="input-label">Water Demand</span>
            <strong style="font-size: 1.25rem; color: #ba1a1a;">High</strong>
          </div>
          <div>
            <span class="input-label">Growth Cycle</span>
            <strong style="font-size: 1.25rem;">120 Days</strong>
          </div>
        </div>
      </div>

      <h3 class="display-font" style="margin-bottom: 1rem;">Alternative Considerations</h3>
      <div class="grid-3" style="margin: 0;">
        <div class="card" style="padding: 1.5rem;">
          <span class="insight-chip" style="background: var(--color-surface-container-high); color: var(--color-on-surface-variant);">82% Match</span>
          <h3 class="display-font" style="margin: 1rem 0 0.5rem;">Maize</h3>
          <p style="font-size: 0.9rem; color: var(--color-on-surface-variant)">Requires slight pH adjustment.</p>
        </div>
        <div class="card" style="padding: 1.5rem;">
          <span class="insight-chip" style="background: var(--color-surface-container-high); color: var(--color-on-surface-variant);">76% Match</span>
          <h3 class="display-font" style="margin: 1rem 0 0.5rem;">Jute</h3>
          <p style="font-size: 0.9rem; color: var(--color-on-surface-variant)">Good tolerance for current rainfall.</p>
        </div>
      </div>
    </div>
  `,
  market: `
    <div class="container fade-in spacer-y">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2 class="display-font" style="font-size: 2.5rem;">Market Prices</h2>
        <input type="text" class="input-field" placeholder="Search crops..." style="max-width: 300px;">
      </div>

      <div class="grid-3" style="margin: 0;">
        <div class="card">
          <div style="display: flex; justify-content: space-between;">
            <h3 class="display-font">Rice</h3>
            <span style="color: var(--color-primary); font-weight: bold;">+2.4%</span>
          </div>
          <div style="font-size: 2rem; font-weight: 700; margin: 1rem 0;">₹2,450 <span style="font-size: 1rem; font-weight: 400; color: var(--color-on-surface-variant)">/ quintal</span></div>
          <p style="font-size: 0.85rem; color: var(--color-on-surface-variant)">High demand in northern sectors.</p>
        </div>
        <div class="card">
          <div style="display: flex; justify-content: space-between;">
            <h3 class="display-font">Wheat</h3>
            <span style="color: #ba1a1a; font-weight: bold;">-0.8%</span>
          </div>
          <div style="font-size: 2rem; font-weight: 700; margin: 1rem 0;">₹2,125 <span style="font-size: 1rem; font-weight: 400; color: var(--color-on-surface-variant)">/ quintal</span></div>
          <p style="font-size: 0.85rem; color: var(--color-on-surface-variant)">Stable supply.</p>
        </div>
        <div class="card">
          <div style="display: flex; justify-content: space-between;">
            <h3 class="display-font">Maize</h3>
            <span style="color: var(--color-primary); font-weight: bold;">+5.1%</span>
          </div>
          <div style="font-size: 2rem; font-weight: 700; margin: 1rem 0;">₹1,980 <span style="font-size: 1rem; font-weight: 400; color: var(--color-on-surface-variant)">/ quintal</span></div>
          <p style="font-size: 0.85rem; color: var(--color-on-surface-variant)">Trending upwards due to feed demand.</p>
        </div>
      </div>
    </div>
  `,
  buyers: `
    <div class="container fade-in spacer-y">
      <h2 class="display-font" style="font-size: 2.5rem; margin-bottom: 2rem">Buyer Network</h2>
      
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div class="card" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem;">
          <div>
            <h3 class="display-font" style="font-size: 1.25rem;">AgriCrop Logistics</h3>
            <p style="color: var(--color-on-surface-variant); font-size: 0.9rem;">⭐ 4.8 | Looking for: Rice, Wheat</p>
          </div>
          <button class="btn btn-secondary">Contact Buyer</button>
        </div>

        <div class="card" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem;">
          <div>
            <h3 class="display-font" style="font-size: 1.25rem;">GreenField Procurements</h3>
            <p style="color: var(--color-on-surface-variant); font-size: 0.9rem;">⭐ 4.5 | Looking for: Maize, Soybeans</p>
          </div>
          <button class="btn btn-secondary">Contact Buyer</button>
        </div>

        <div class="card" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem;">
          <div>
            <h3 class="display-font" style="font-size: 1.25rem;">Local Co-op #44</h3>
            <p style="color: var(--color-on-surface-variant); font-size: 0.9rem;">⭐ 4.9 | Looking for: Organic Vegetables</p>
          </div>
          <button class="btn btn-secondary">Contact Buyer</button>
        </div>
      </div>
    </div>
  `,
  profile: `
    <div class="container fade-in spacer-y">
      <div class="card" style="display: flex; gap: 2rem; align-items: center; margin-bottom: 2rem; border-top: 4px solid var(--color-primary-container);">
        <img src="/public/avatar.png" alt="Profile Avatar" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">
        <div>
          <h2 class="display-font" style="font-size: 2rem;">Elias Thorne</h2>
          <p style="color: var(--color-on-surface-variant);">Farm Size: 12 Hectares | Region: Northern Valley</p>
        </div>
        <button class="btn btn-secondary" style="margin-left: auto;">Edit Profile</button>
      </div>

      <h3 class="display-font" style="margin-bottom: 1rem;">Recent Activity</h3>
      <div class="card" style="padding: 1.5rem;">
        <div style="border-bottom: 1px solid var(--color-surface-container-high); padding-bottom: 1rem; margin-bottom: 1rem;">
          <p><strong>Ran crop recommendation</strong></p>
          <p style="font-size: 0.85rem; color: var(--color-on-surface-variant)">Recommended: Rice (Paddy) | 2 days ago</p>
        </div>
        <div style="border-bottom: 1px solid var(--color-surface-container-high); padding-bottom: 1rem; margin-bottom: 1rem;">
          <p><strong>Contacted Buyer: GreenField Procurements</strong></p>
          <p style="font-size: 0.85rem; color: var(--color-on-surface-variant)">Message sent regarding 4 tons of Maize | 1 week ago</p>
        </div>
        <div>
          <p><strong>Updated Soil Profile</strong></p>
          <p style="font-size: 0.85rem; color: var(--color-on-surface-variant)">pH changed from 6.2 to 6.5 | 2 weeks ago</p>
        </div>
      </div>
    </div>
  `
};

const mainContent = document.getElementById('main-content');
const navLinks = document.querySelectorAll('.nav-link');

function renderRoute(route) {
  if (!screens[route]) route = 'landing';
  
  // Update state
  appState.currentRoute = route;
  
  // Update DOM
  mainContent.innerHTML = screens[route];
  
  // Update Nav highlighting
  navLinks.forEach(link => {
    if (link.dataset.route === route) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Global navigator for buttons
window.navigate = function(route) {
  renderRoute(route);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Nav link listeners
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const route = e.target.dataset.route;
    window.navigate(route);
  });
});

// Initial Render
renderRoute(appState.currentRoute);
