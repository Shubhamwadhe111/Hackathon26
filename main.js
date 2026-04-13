const appState = {
  currentRoute: 'landing',
  soilData: null,
  recommendations: null,
  isAuthenticated: false,
  user: null
};

const screens = {
  landing: function() { const auth = appState.isAuthenticated; return `
    <div class="fade-in stagger-1" style="position: relative; overflow: hidden; min-height: 88vh; display: flex; align-items: center; padding: 6rem 4rem 4rem; background: radial-gradient(ellipse at 60% 40%, rgba(23, 56, 9, 0.04) 0%, transparent 70%);">
      
      <!-- Left: Hero Text -->
      <div style="flex: 1; max-width: 560px; z-index: 5; position: relative;">
        <div style="display: inline-block; padding: 0.5rem 1.5rem; background: var(--color-primary-container); color: var(--color-on-primary); border-radius: 50px; font-weight: 600; margin-bottom: 2rem; animation: slide-up-fade 0.8s ease-out;">🚀 The Future of Precision Agriculture</div>
        <h1 class="hero-title display-font" style="font-size: 4.5rem; line-height: 1.1; margin-bottom: 1.5rem; color: var(--color-primary); text-shadow: 0 4px 20px rgba(0,0,0,0.05); animation: slide-up-fade 1s ease-out;">Your Digital<br>Agronomist</h1>
        <p class="hero-subtitle" style="font-size: 1.2rem; margin-bottom: 2.5rem; color: var(--color-on-surface-variant); line-height: 1.7; max-width: 480px; animation: slide-up-fade 1.2s ease-out;">Harness the power of neural networks to analyze soil, weather, and live market trends to uncover the absolute best crop for your exact coordinates.</p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; animation: slide-up-fade 1.4s ease-out;">
          <button class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2rem; box-shadow: 0 10px 30px rgba(23, 56, 9, 0.2);" onclick="window.navigate('form')">Get Free Recommendation</button>
          ${auth ? `<button class="btn btn-secondary" style="font-size:1.1rem;padding:1rem 2rem;" onclick="window.navigate('dashboard')">Go to Dashboard</button>` : `<button class="btn btn-secondary" style="font-size:1.1rem;padding:1rem 2rem;" onclick="window.navigate('about')">Learn More</button>`}
        </div>
      </div>

      <!-- Right: AI Data Cluster Visual Panel -->
      <div style="flex: 1; position: relative; min-height: 480px; display: flex; align-items: center; justify-content: center;">
        
        <!-- Background glow -->
        <div style="position: absolute; width: 380px; height: 380px; background: radial-gradient(circle, rgba(23,56,9,0.06) 0%, transparent 70%); border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
        
        <!-- Card 1: Neural Match — top right -->
        <div class="glass" style="position: absolute; top: 0; right: 0; width: 220px; padding: 1.5rem; border-radius: var(--radius-lg); animation: float-slow 8s infinite ease-in-out; border: 1px solid rgba(23,56,9,0.12); box-shadow: 0 20px 40px rgba(23, 56, 9, 0.08);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span style="font-size: 1.5rem;">🌾</span>
            <span style="background: #e6f4ea; color: #137333; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.8rem;">98% Match</span>
          </div>
          <div style="font-weight: 700; font-size: 1rem; color: var(--color-on-surface); margin-bottom: 0.25rem;">Golden Wheat</div>
          <div style="font-size: 0.85rem; color: var(--color-on-surface-variant);">Optimal Harvest: Oct</div>
        </div>

        <!-- Card 2: Live Weather API — left middle -->
        <div class="glass" style="position: absolute; bottom: 20%; left: 0; width: 220px; padding: 1.25rem 1.5rem; border-radius: var(--radius-lg); animation: float-fast 12s infinite ease-in-out reverse; border: 1px solid rgba(23,56,9,0.12); box-shadow: 0 20px 40px rgba(23, 56, 9, 0.08);">
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-on-surface-variant); margin-bottom: 0.75rem;">Live Weather</div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="font-size: 2.2rem;">⛅</div>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800; color: var(--color-primary); line-height: 1;">24°C</div>
              <div style="font-size: 0.85rem; color: var(--color-on-surface-variant); margin-top: 0.2rem;">Humidity: 65%</div>
            </div>
          </div>
        </div>

        <!-- Card 3: Soil Diagnostics — bottom center-right -->
        <div class="glass" style="position: absolute; bottom: 0; right: 10%; width: 210px; padding: 1.5rem; border-radius: var(--radius-lg); animation: float-slow 10s 2s infinite ease-in-out; border: 1px solid rgba(23,56,9,0.12); box-shadow: 0 20px 40px rgba(23, 56, 9, 0.08);">
           <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-on-surface-variant); margin-bottom: 0.75rem;">Soil Diagnostics</div>
           <div style="display: flex; gap: 0.5rem; align-items: flex-end; height: 48px; margin-bottom: 0.5rem;">
             <div style="flex: 1; height: 80%; background: var(--color-primary); border-radius: 4px 4px 0 0;"></div>
             <div style="flex: 1; height: 100%; background: var(--color-primary-container); border-radius: 4px 4px 0 0;"></div>
             <div style="flex: 1; height: 60%; background: var(--color-secondary); border-radius: 4px 4px 0 0;"></div>
           </div>
           <div style="display: flex; justify-content: space-around; font-size: 0.78rem; font-weight: 600; color: var(--color-on-surface-variant);">
             <span>N</span><span>P</span><span>K</span>
           </div>
        </div>

        <!-- Center floating badge: AI Confidence -->
        <div style="position: absolute; top: 35%; left: 20%; transform: translate(-50%, -50%); background: var(--color-primary); color: white; padding: 0.75rem 1.25rem; border-radius: 50px; font-weight: 700; font-size: 0.9rem; box-shadow: 0 8px 24px rgba(23,56,9,0.25); animation: float-slow 6s 1s infinite ease-in-out; white-space: nowrap;">
          🧠 AI Confidence: 98.5%
        </div>

        <!-- Abstract dashed connecting lines -->
        <svg style="position: absolute; top:0; left:0; width: 100%; height: 100%; z-index: -1; overflow: visible;" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid meet">
           <path d="M 60 340 Q 200 240 340 60" fill="transparent" stroke="rgba(23,56,9,0.12)" stroke-width="1.5" stroke-dasharray="6,6"/>
           <path d="M 340 60 Q 300 240 200 400" fill="transparent" stroke="rgba(23,56,9,0.12)" stroke-width="1.5" stroke-dasharray="6,6"/>
           <circle cx="340" cy="60" r="4" fill="rgba(23,56,9,0.2)"/>
           <circle cx="60" cy="340" r="4" fill="rgba(23,56,9,0.2)"/>
           <circle cx="200" cy="400" r="4" fill="rgba(23,56,9,0.2)"/>
        </svg>
      </div>
    </div>

    <!-- Impact Stats Bar -->
    <div class="stagger-2" style="background: var(--color-primary); color: white; padding: 3rem 0; margin-top: 0rem; position: relative; z-index: 10; border-radius: 0; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
      <div class="container" style="display: flex; justify-content: space-around; flex-wrap: wrap; text-align: center; gap: 2rem;">
        <div>
          <div class="display-font" style="font-size: 3.5rem; font-weight: 800; color: var(--color-primary-fixed);">98.5%</div>
          <div style="font-size: 1.1rem; opacity: 0.9;">AI Match Accuracy</div>
        </div>
        <div>
          <div class="display-font" style="font-size: 3.5rem; font-weight: 800; color: var(--color-primary-fixed);">12+</div>
          <div style="font-size: 1.1rem; opacity: 0.9;">Monitored Parameters</div>
        </div>
        <div>
          <div class="display-font" style="font-size: 3.5rem; font-weight: 800; color: var(--color-primary-fixed);">50k+</div>
          <div style="font-size: 1.1rem; opacity: 0.9;">Farmers Empowered</div>
        </div>
      </div>
    </div>
    
    <div class="container fade-in spacer-y stagger-3" style="margin-top: 6rem;">
      <div style="text-align: center; max-width: 600px; margin: 0 auto 4rem auto;">
        <h2 class="display-font" style="font-size: 2.5rem; margin-bottom: 1rem;">Core AI Capabilities</h2>
        <p style="color: var(--color-on-surface-variant); font-size: 1.1rem;">A comprehensive suite of tools designed to remove the guesswork from agriculture and elevate your yield.</p>
      </div>
      <div class="grid-4" style="margin-bottom: 6rem;">
        <div class="card hover-card" style="text-align: center; border-radius: var(--radius-lg); position: relative; overflow: hidden; background: var(--color-surface-container-lowest);">
          <div style="position: absolute; top:0; left:0; width:100%; height:4px; background: var(--color-primary);"></div>
          <div style="width: 80px; height: 80px; margin: 0 auto 1.5rem auto; background: var(--color-surface-container-low); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">🌱</div>
          <h3 class="display-font" style="margin-bottom: 1rem; font-size: 1.3rem;">Soil Diagnostics</h3>
          <p style="color: var(--color-on-surface-variant); font-size: 0.95rem;">Evaluate your field's exact NPK and pH levels to determine maximum yield potential.</p>
        </div>
        <div class="card hover-card" style="text-align: center; border-radius: var(--radius-lg); position: relative; overflow: hidden; background: var(--color-surface-container-lowest);">
          <div style="position: absolute; top:0; left:0; width:100%; height:4px; background: #0060a8;"></div>
          <div style="width: 80px; height: 80px; margin: 0 auto 1.5rem auto; background: var(--color-surface-container-low); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">⛅</div>
          <h3 class="display-font" style="margin-bottom: 1rem; font-size: 1.3rem;">Climate Sync</h3>
          <p style="color: var(--color-on-surface-variant); font-size: 0.95rem;">Real-time API forecasts and historical climate data injected into every neural recommendation.</p>
        </div>
        <div class="card hover-card" style="text-align: center; border-radius: var(--radius-lg); position: relative; overflow: hidden; background: var(--color-surface-container-lowest);">
          <div style="position: absolute; top:0; left:0; width:100%; height:4px; background: var(--color-secondary);"></div>
          <div style="width: 80px; height: 80px; margin: 0 auto 1.5rem auto; background: var(--color-surface-container-low); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">🧠</div>
          <h3 class="display-font" style="margin-bottom: 1rem; font-size: 1.3rem;">Neural Routing</h3>
          <p style="color: var(--color-on-surface-variant); font-size: 0.95rem;">Machine learning models compare your data against millions of records to find a 99% match.</p>
        </div>
        <div class="card hover-card" style="text-align: center; border-radius: var(--radius-lg); position: relative; overflow: hidden; background: var(--color-surface-container-lowest);">
          <div style="position: absolute; top:0; left:0; width:100%; height:4px; background: var(--color-tertiary);"></div>
          <div style="width: 80px; height: 80px; margin: 0 auto 1.5rem auto; background: var(--color-surface-container-low); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">📈</div>
          <h3 class="display-font" style="margin-bottom: 1rem; font-size: 1.3rem;">Market Predictor</h3>
          <p style="color: var(--color-on-surface-variant); font-size: 0.95rem;">Track demand and supply forecast trends to ensure your upcoming harvest secures top rates.</p>
        </div>
      </div>
    </div>

    <!-- How it Works Section -->
    <div style="background: var(--color-surface-container-low); padding: 5rem 0; margin-bottom: 4rem; position: relative;">
      <div class="container fade-up-enter">
        <h2 class="display-font" style="text-align: center; font-size: 2.5rem; margin-bottom: 4rem;">How The AI Works</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; position: relative; z-index: 2;">
          <div style="flex: 1; min-width: 250px; text-align: center; background: var(--color-surface); padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-ambient);">
            <div style="width: 60px; height: 60px; background: var(--color-primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; margin: 0 auto 1.5rem auto;">1</div>
            <h4 class="display-font" style="font-size: 1.3rem; margin-bottom: 1rem;">Input Field Data</h4>
            <p style="color: var(--color-on-surface-variant);">Provide bare-minimum details about your soil health and exact GPS coordinates.</p>
          </div>
          <div style="flex: 1; min-width: 250px; text-align: center; background: var(--color-surface); padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-ambient); transform: translateY(-10px);">
            <div style="width: 60px; height: 60px; background: var(--color-primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; margin: 0 auto 1.5rem auto;">2</div>
            <h4 class="display-font" style="font-size: 1.3rem; margin-bottom: 1rem;">AI Validation</h4>
            <p style="color: var(--color-on-surface-variant);">Our proprietary neural network digests the data against external live climate APIs.</p>
          </div>
          <div style="flex: 1; min-width: 250px; text-align: center; background: var(--color-surface); padding: 2rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-ambient);">
            <div style="width: 60px; height: 60px; background: var(--color-primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; margin: 0 auto 1.5rem auto;">3</div>
            <h4 class="display-font" style="font-size: 1.3rem; margin-bottom: 1rem;">Optimized Yield</h4>
            <p style="color: var(--color-on-surface-variant);">Receive a comprehensive, highly-confident recommendation that guarantees max ROI.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Banner -->
    <div class="container fade-up-enter" style="margin-bottom: 6rem;">
      <div style="background: linear-gradient(135deg, var(--color-primary), var(--color-primary-container)); border-radius: var(--radius-lg); padding: 5rem 2rem; text-align: center; color: white; box-shadow: 0 20px 40px rgba(23,56,9,0.3); position: relative; overflow: hidden;">
        <div style="position: absolute; top: -50%; left: -10%; width: 300px; height: 300px; background: rgba(255,255,255,0.1); border-radius: 50%; filter: blur(40px);"></div>
        <div style="position: absolute; bottom: -50%; right: -10%; width: 300px; height: 300px; background: rgba(197,239,173,0.15); border-radius: 50%; filter: blur(40px);"></div>
        <div style="position: relative; z-index: 2;">
          <h2 class="display-font" style="font-size: 3rem; margin-bottom: 1.5rem; color: white;">Ready to digitize your farm?</h2>
          <p style="font-size: 1.2rem; opacity: 0.9; margin-bottom: 3rem; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">Join over 50,000 farmers leveraging next-generation artificial intelligence to secure their livelihood and maximize production.</p>
          ${auth
            ? `<button class="btn" style="background:white;color:var(--color-primary);font-size:1.2rem;padding:1rem 3rem;border-radius:50px;font-weight:bold;box-shadow:0 10px 20px rgba(0,0,0,0.15);transition:transform 0.2s;" onclick="window.navigate('dashboard')">Go to Your Dashboard →</button>`
            : `<button class="btn" style="background:white;color:var(--color-primary);font-size:1.2rem;padding:1rem 3rem;border-radius:50px;font-weight:bold;box-shadow:0 10px 20px rgba(0,0,0,0.15);transition:transform 0.2s;" onclick="window.navigate('signup')">Create Free Account</button>`
          }
        </div>
      </div>
    </div>
  `; },
  form: `
    <div class="container fade-in spacer-y">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem">
        <h2 class="display-font" style="font-size: 2.5rem;">Assess Your Soil</h2>
        <button class="btn btn-secondary" style="border-radius: 50%; width: 48px; height: 48px; padding: 0; display: flex; align-items: center; justify-content: center;" title="Voice Input">
          <span style="font-size: 1.25rem;">🎤</span>
        </button>
      </div>
      <p style="color: var(--color-on-surface-variant); margin-bottom: 2rem">Enter your field parameters to get an AI-powered crop recommendation.</p>
      
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 800px;">
        
        <!-- Soil Data Section -->
        <div class="card" style="border-top: 3px solid var(--color-primary);">
          <h3 class="display-font" style="margin-bottom: 1.5rem; font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">🌱 Soil Data</h3>
          <div class="grid-3" style="margin: 0; gap: 1rem;">
            <div class="input-group">
              <label class="input-label">Nitrogen (N)</label>
              <input type="number" class="input-field" placeholder="e.g. 90">
            </div>
            <div class="input-group">
              <label class="input-label">Phosphorus (P)</label>
              <input type="number" class="input-field" placeholder="e.g. 42">
            </div>
            <div class="input-group">
              <label class="input-label">Potassium (K)</label>
              <input type="number" class="input-field" placeholder="e.g. 43">
            </div>
          </div>
          <div style="display: flex; gap: 1rem;">
            <div class="input-group" style="flex: 1;">
              <label class="input-label">pH Value</label>
              <input type="number" class="input-field" placeholder="e.g. 6.5">
            </div>
            <div class="input-group" style="flex: 1;">
              <label class="input-label">Soil Type</label>
              <select class="input-field" style="width: 100%;">
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="loamy">Loamy</option>
                <option value="silt">Silt</option>
                <option value="peaty">Peaty</option>
                <option value="chalky">Chalky</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Weather Section -->
        <div class="card" style="border-top: 3px solid #0060a8;">
          <h3 class="display-font" style="margin-bottom: 1.5rem; font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">⛅ Weather</h3>
          <div class="grid-3" style="margin: 0; gap: 1rem;">
            <div class="input-group">
              <label class="input-label">Temperature (°C)</label>
              <input type="number" class="input-field" placeholder="20.8">
            </div>
            <div class="input-group">
              <label class="input-label">Humidity (%)</label>
              <input type="number" class="input-field" placeholder="82">
            </div>
            <div class="input-group">
              <label class="input-label">Rainfall (mm)</label>
              <input type="number" class="input-field" placeholder="202.9">
            </div>
          </div>
        </div>

        <!-- Location Section -->
        <div class="card" style="border-top: 3px solid var(--color-secondary);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 class="display-font" style="font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">📍 Location</h3>
            <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.85rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>🧭</span> Use GPS Location
            </button>
          </div>
          <div style="display: flex; gap: 1rem;">
            <div class="input-group" style="flex: 1;">
              <label class="input-label">State</label>
              <input type="text" class="input-field" placeholder="e.g. Maharashtra">
            </div>
            <div class="input-group" style="flex: 1;">
              <label class="input-label">District</label>
              <input type="text" class="input-field" placeholder="e.g. Pune">
            </div>
          </div>
        </div>
        
        <button class="btn btn-primary" style="width: 100%; padding: 1.2rem; font-size: 1.1rem; border-radius: var(--radius-md);" onclick="window.navigate('results')">Get Crop Recommendation</button>
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

      <div class="card fade-in" style="border-top: 4px solid var(--color-tertiary-fixed); margin-bottom: 2rem; display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="insight-chip">✨ 95% Confidence Match</span>
            <span style="font-weight: 600; color: var(--color-primary); background: var(--color-surface-container-high); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.85rem;">Kharif Season</span>
          </div>
          <h1 class="display-font" style="font-size: 3.5rem; color: var(--color-primary); margin-bottom: 0.5rem;">Rice (Paddy)</h1>
          <p style="color: var(--color-on-surface-variant); max-width: 600px; margin-bottom: 2rem;">
            Your high humidity and rainfall parameters make this region highly suitable for rice cultivation. Expected yield is above local average.
          </p>

          <div style="display: flex; gap: 2rem; margin-bottom: 2rem;">
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
          
          <div style="display: flex; gap: 1rem;">
            <button class="btn btn-primary" onclick="window.navigate('market')">View Market Price</button>
            <button class="btn btn-secondary">Save Result</button>
          </div>
        </div>
        
        <div style="flex: 1; min-width: 300px; border-radius: var(--radius-md); overflow: hidden;">
          <div style="width: 100%; height: 100%; min-height: 250px; background: url('https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80') center/cover; border-radius: var(--radius-md);"></div>
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
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <h2 class="display-font" style="font-size: 2.5rem;">Market Intelligence</h2>
        <div style="display: flex; gap: 1rem;">
          <input type="text" class="input-field" placeholder="Filter by Crop..." style="max-width: 200px;">
          <input type="text" class="input-field" placeholder="Filter by Location..." style="max-width: 200px;">
          <button class="btn btn-secondary">Filter</button>
        </div>
      </div>

      <div style="display: flex; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap;">
        <!-- Price Chart Placeholder -->
        <div class="card" style="flex: 2; min-width: 300px;">
          <h3 class="display-font" style="margin-bottom: 1rem;">Crop Price Trends (Last 30 Days)</h3>
          <div style="height: 250px; background: var(--color-surface-container-low); border-radius: var(--radius-md); display: flex; align-items: flex-end; padding: 1rem; gap: 0.5rem; justify-content: space-around;">
            <!-- Mock Chart Bars -->
            <div style="width: 8%; background: var(--color-primary-fixed); height: 40%; border-radius: 4px 4px 0 0;"></div>
            <div style="width: 8%; background: var(--color-primary-fixed); height: 45%; border-radius: 4px 4px 0 0;"></div>
            <div style="width: 8%; background: var(--color-primary-fixed); height: 50%; border-radius: 4px 4px 0 0;"></div>
            <div style="width: 8%; background: var(--color-primary-fixed); height: 65%; border-radius: 4px 4px 0 0;"></div>
            <div style="width: 8%; background: var(--color-primary-fixed); height: 60%; border-radius: 4px 4px 0 0;"></div>
            <div style="width: 8%; background: var(--color-primary-fixed); height: 75%; border-radius: 4px 4px 0 0;"></div>
            <div style="width: 8%; background: var(--color-primary); height: 90%; border-radius: 4px 4px 0 0;"></div>
          </div>
        </div>

        <!-- Demand/Supply Placeholder -->
        <div class="card" style="flex: 1; min-width: 300px;">
          <h3 class="display-font" style="margin-bottom: 1rem;">Local Demand vs Supply</h3>
          <div style="display: flex; flex-direction: column; gap: 1.5rem; justify-content: center; height: 250px;">
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;"><span style="font-weight: 600;">Rice</span><span style="color: var(--color-primary)">High Demand</span></div>
              <div style="height: 8px; background: var(--color-surface-container-high); border-radius: 4px; overflow: hidden;">
                <div style="width: 85%; background: var(--color-primary); height: 100%;"></div>
              </div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;"><span style="font-weight: 600;">Wheat</span><span>Balanced</span></div>
              <div style="height: 8px; background: var(--color-surface-container-high); border-radius: 4px; overflow: hidden;">
                <div style="width: 50%; background: var(--color-secondary); height: 100%;"></div>
              </div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;"><span style="font-weight: 600;">Maize</span><span style="color: #ba1a1a;">Oversupply</span></div>
              <div style="height: 8px; background: var(--color-surface-container-high); border-radius: 4px; overflow: hidden;">
                <div style="width: 20%; background: #ba1a1a; height: 100%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="display-font" style="margin-bottom: 1.5rem; font-size: 2rem;">Today's Market Prices</h3>
      <div class="grid-3" style="margin: 0;">
        <div class="card" style="border-top: 3px solid var(--color-primary);">
          <div style="display: flex; justify-content: space-between;">
            <h3 class="display-font">Rice</h3>
            <span style="color: var(--color-primary); font-weight: bold;">+2.4%</span>
          </div>
          <div style="font-size: 2rem; font-weight: 700; margin: 1rem 0;">₹2,450 <span style="font-size: 1rem; font-weight: 400; color: var(--color-on-surface-variant)">/ quintal</span></div>
          <p style="font-size: 0.85rem; color: var(--color-on-surface-variant)">High demand in northern sectors.</p>
        </div>
        <div class="card" style="border-top: 3px solid #ba1a1a;">
          <div style="display: flex; justify-content: space-between;">
            <h3 class="display-font">Wheat</h3>
            <span style="color: #ba1a1a; font-weight: bold;">-0.8%</span>
          </div>
          <div style="font-size: 2rem; font-weight: 700; margin: 1rem 0;">₹2,125 <span style="font-size: 1rem; font-weight: 400; color: var(--color-on-surface-variant)">/ quintal</span></div>
          <p style="font-size: 0.85rem; color: var(--color-on-surface-variant)">Stable supply.</p>
        </div>
        <div class="card" style="border-top: 3px solid var(--color-primary);">
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
        <div class="card" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; flex-wrap: wrap; gap: 1rem;">
          <div style="flex: 2; min-width: 250px;">
            <h3 class="display-font" style="font-size: 1.25rem; margin-bottom: 0.25rem;">AgriCrop Logistics</h3>
            <p style="color: var(--color-on-surface-variant); font-size: 0.9rem; margin-bottom: 0.5rem;">📍 Mumbai, Maharashtra | ⭐ 4.8</p>
            <p style="color: var(--color-on-surface); font-size: 0.95rem;"><strong>Required:</strong> Rice, Wheat</p>
          </div>
          <div style="flex: 1; min-width: 150px; text-align: left;">
            <span style="font-size: 0.85rem; color: var(--color-on-surface-variant);">Price Offered</span>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">₹2,480<span style="font-size: 1rem; font-weight: 400; color: var(--color-on-surface-variant)">/qtl</span></div>
          </div>
          <div>
            <button class="btn btn-secondary">Contact Buyer</button>
          </div>
        </div>

        <div class="card" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; flex-wrap: wrap; gap: 1rem;">
          <div style="flex: 2; min-width: 250px;">
            <h3 class="display-font" style="font-size: 1.25rem; margin-bottom: 0.25rem;">GreenField Procurements</h3>
            <p style="color: var(--color-on-surface-variant); font-size: 0.9rem; margin-bottom: 0.5rem;">📍 Pune, Maharashtra | ⭐ 4.5</p>
            <p style="color: var(--color-on-surface); font-size: 0.95rem;"><strong>Required:</strong> Maize, Soybeans</p>
          </div>
          <div style="flex: 1; min-width: 150px; text-align: left;">
             <span style="font-size: 0.85rem; color: var(--color-on-surface-variant);">Price Offered</span>
             <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">₹2,000<span style="font-size: 1rem; font-weight: 400; color: var(--color-on-surface-variant)">/qtl</span></div>
          </div>
          <div>
            <button class="btn btn-secondary">Contact Buyer</button>
          </div>
        </div>

        <div class="card" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; flex-wrap: wrap; gap: 1rem;">
          <div style="flex: 2; min-width: 250px;">
            <h3 class="display-font" style="font-size: 1.25rem; margin-bottom: 0.25rem;">Local Co-op #44</h3>
            <p style="color: var(--color-on-surface-variant); font-size: 0.9rem; margin-bottom: 0.5rem;">📍 Nashik, Maharashtra | ⭐ 4.9</p>
            <p style="color: var(--color-on-surface); font-size: 0.95rem;"><strong>Required:</strong> Organic Vegetables</p>
          </div>
          <div style="flex: 1; min-width: 150px; text-align: left;">
             <span style="font-size: 0.85rem; color: var(--color-on-surface-variant);">Price Offered</span>
             <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">Premium</div>
          </div>
          <div>
            <button class="btn btn-secondary">Contact Buyer</button>
          </div>
        </div>
      </div>
    </div>
  `,
  profile: `
    <div class="container fade-in spacer-y">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2 class="display-font" style="font-size: 2.5rem;">Farmer Profile</h2>
        <button class="btn btn-primary">Edit Profile</button>
      </div>

      <div class="card" style="display: flex; gap: 2rem; align-items: center; margin-bottom: 2rem; border-top: 4px solid var(--color-primary-container); flex-wrap: wrap;">
        <img src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Profile Avatar" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid var(--color-primary-fixed);">
        <div style="flex: 1; min-width: 250px;">
          <h2 class="display-font" style="font-size: 2rem; margin-bottom: 0.5rem; color: var(--color-primary);">Ramkishan J.</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; color: var(--color-on-surface-variant);">
            <div><strong style="color: var(--color-on-surface);">📍 Location:</strong> Northern Valley, MH</div>
            <div><strong style="color: var(--color-on-surface);">📱 Phone Number:</strong> +91 98765 43210</div>
            <div><strong style="color: var(--color-on-surface);">🌱 Farm Size:</strong> 12 Hectares</div>
            <div><strong style="color: var(--color-on-surface);">📧 Email:</strong> ramkishan@example.com</div>
          </div>
        </div>
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
  `,
  diagnosis: `
    <div class="container fade-in spacer-y">
      <h2 class="display-font" style="font-size: 2.5rem; margin-bottom: 0.5rem">Disease Diagnosis</h2>
      <p style="color: var(--color-on-surface-variant); margin-bottom: 2rem">Upload a photo of your crop to instantly identify diseases and get treatment recommendations.</p>
      
      <div id="diagnosis-dropzone" class="card fade-in" style="border: 2px dashed var(--color-outline-variant); background: var(--color-surface-container-low); text-align: center; padding: 4rem 2rem; cursor: pointer; transition: all 0.3s ease;" onclick="document.getElementById('file-upload').click()" onmouseover="this.style.borderColor='var(--color-primary)'; this.style.background='var(--color-surface-container-lowest)';" onmouseout="this.style.borderColor='var(--color-outline-variant)'; this.style.background='var(--color-surface-container-low)';">
        <input type="file" id="file-upload" style="display: none;" onchange="window.handleImageUpload(this)">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📸</div>
        <h3 class="display-font">Click to Upload Image</h3>
        <p style="color: var(--color-on-surface-variant); font-size: 0.9rem; margin-top: 0.5rem;">Or drag and drop your plant leaf image here</p>
      </div>

      <div id="diagnosis-scanning" class="card fade-in" style="display: none; border: 2px solid var(--color-primary); background: var(--color-surface-container-lowest); text-align: center; padding: 4rem 2rem;">
        <div class="pulse-animation" style="font-size: 3rem; margin-bottom: 1rem; animation: pulse 1.5s infinite;">🧬</div>
        <h3 class="display-font" style="color: var(--color-primary);">Scanning with AgroIntel Vision Engine</h3>
        <p style="color: var(--color-on-surface-variant); font-size: 0.9rem; margin-top: 0.5rem;">Validating tissue structures against pathogen database...</p>
      </div>

      <div id="diagnosis-results" style="display: none; margin-top: 3rem;">
        <span class="insight-chip" style="background: #ffdad6; color: #93000a; margin-bottom: 1rem;">⚠️ High Confidence Detection</span>
        <h3 class="display-font" style="font-size: 2rem; margin-bottom: 1.5rem;">Wheat Rust (Puccinia triticina)</h3>
        
        <div style="display: flex; gap: 1rem; margin-bottom: 1rem; border-bottom: 1px solid var(--color-outline-variant);">
          <button class="tab-link active" data-tab="info" onclick="window.showDiagnosisTab('info')" style="font-family: var(--font-body); font-weight: 500; font-size: 0.95rem; color: var(--color-primary); background:none; border:none; border-bottom: 2px solid var(--color-primary); padding: 0.5rem 0; cursor:pointer;">Disease Info</button>
          <button class="tab-link" data-tab="organic" onclick="window.showDiagnosisTab('organic')" style="font-family: var(--font-body); font-weight: 500; font-size: 0.95rem; color: var(--color-on-surface-variant); background:none; border:none; padding: 0.5rem 0; cursor:pointer;">Organic Treatment</button>
          <button class="tab-link" data-tab="chemical" onclick="window.showDiagnosisTab('chemical')" style="font-family: var(--font-body); font-weight: 500; font-size: 0.95rem; color: var(--color-on-surface-variant); background:none; border:none; padding: 0.5rem 0; cursor:pointer;">Chemical Treatment</button>
        </div>

        <div class="card fade-in tab-content" id="tab-info">
          <p><strong>Pathogen:</strong> Fungus species</p>
          <p><strong>Symptoms:</strong> Small, brown pustules on the leaf blades in a random scatter distribution.</p>
          <p style="color: var(--color-on-surface-variant); margin-top: 1rem;">This disease thrives in temperatures between 15-22°C with high moisture content. Given your recent weather data, conditions are optimal for its spread.</p>
        </div>
        <div class="card fade-in tab-content" id="tab-organic" style="display: none;">
          <h4 class="display-font">Neem Oil Spray</h4>
          <p style="color: var(--color-on-surface-variant); margin-top: 0.5rem;">Mix 5ml of pure cold-pressed neem oil with 1 liter of water and a few drops of mild soap. Spray early morning or late evening to prevent leaf burn.</p>
        </div>
        <div class="card fade-in tab-content" id="tab-chemical" style="display: none;">
          <h4 class="display-font">Fungicide Application</h4>
          <p style="color: var(--color-on-surface-variant); margin-top: 0.5rem;">Apply a systemic fungicide containing Tebuconazole or Propiconazole. Dosage: 1ml per liter of water. Ensure 15 days of pre-harvest interval.</p>
        </div>
      </div>
    </div>
  `,
  knowledge: `
    <div class="container fade-in spacer-y">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2 class="display-font" style="font-size: 2.5rem;">Knowledge Center</h2>
        <span class="insight-chip" style="background: var(--color-secondary-container); color: var(--color-on-secondary-container-variant)">📚 4 New Guides</span>
      </div>
      
      <div class="grid-3" style="margin: 0;">
        <div class="card hover-card" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; border-top: 3px solid var(--color-primary);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-ambient)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-glass)';">
          <span class="insight-chip" style="background: var(--color-surface-container-high); color: var(--color-on-surface-variant); margin-bottom: 1rem;">Seasonal Tip</span>
          <h3 class="display-font" style="margin-bottom: 0.5rem;">Preparing Soil for Rabi Season</h3>
          <p style="font-size: 0.9rem; color: var(--color-on-surface-variant); margin-bottom: 1rem;">Essential steps to ensure optimal nutrient retention during the winter months.</p>
          <a href="#" style="font-weight: 600; font-size: 0.9rem;">Read Guide →</a>
        </div>
        <div class="card hover-card" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-ambient)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-glass)';">
          <span class="insight-chip" style="background: var(--color-surface-container-high); color: var(--color-on-surface-variant); margin-bottom: 1rem;">Pest Control</span>
          <h3 class="display-font" style="margin-bottom: 0.5rem;">Natural Aphid Deterrents</h3>
          <p style="font-size: 0.9rem; color: var(--color-on-surface-variant); margin-bottom: 1rem;">Companion planting and natural sprays to keep aphids away from your legumes.</p>
          <a href="#" style="font-weight: 600; font-size: 0.9rem;">Read Guide →</a>
        </div>
        <div class="card hover-card" style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-ambient)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-glass)';">
          <span class="insight-chip" style="background: var(--color-surface-container-high); color: var(--color-on-surface-variant); margin-bottom: 1rem;">Water Management</span>
          <h3 class="display-font" style="margin-bottom: 0.5rem;">Drip Irrigation Basics</h3>
          <p style="font-size: 0.9rem; color: var(--color-on-surface-variant); margin-bottom: 1rem;">How to set up a low-cost drip system to conserve water and improve yield.</p>
          <a href="#" style="font-weight: 600; font-size: 0.9rem;">Read Guide →</a>
        </div>
      </div>
    </div>
  `,
  community: `
    <div class="container fade-in spacer-y">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2 class="display-font" style="font-size: 2.5rem;">Farmer Community</h2>
        <button class="btn btn-primary">Ask a Question</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="card">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-secondary-container); display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--color-primary);">RJ</div>
            <div>
              <p style="font-weight: 600;">Ramkishan J.</p>
              <p style="font-size: 0.8rem; color: var(--color-on-surface-variant);">2 hours ago • Central Plateau</p>
            </div>
          </div>
          <h3 class="display-font" style="font-size: 1.25rem; margin-bottom: 0.5rem;">Late blight showing up early this year on tomatoes. Anyone else?</h3>
          <p style="color: var(--color-on-surface-variant);">I've noticed dark spots on the lower leaves. Usually this happens much later in the season. What organic preventative measures are working for you all?</p>
          
          <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--color-surface-container-high);">
            <div style="display: flex; gap: 1rem;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary-container); color: white; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">ET</div>
              <div>
                <p style="font-size: 0.9rem; font-weight: 600;">Elias Thorne (You)</p>
                <p style="font-size: 0.85rem; color: var(--color-on-surface-variant);">Try a copper-based fungicide spray early morning. It helped me last season.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-tertiary-fixed); display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--color-tertiary);">SM</div>
            <div>
              <p style="font-weight: 600;">Sunita M.</p>
              <p style="font-size: 0.8rem; color: var(--color-on-surface-variant);">Yesterday • Northern Valley</p>
            </div>
          </div>
          <h3 class="display-font" style="font-size: 1.25rem; margin-bottom: 0.5rem;">Soil testing lab recommendations?</h3>
          <p style="color: var(--color-on-surface-variant);">Looking for a reliable lab that provides detailed micronutrient analysis, not just NPK.</p>
          <div style="margin-top: 1rem;">
            <span style="font-size: 0.85rem; color: var(--color-primary); font-weight: 600;">💬 4 Replies</span>
          </div>
        </div>
      </div>
    </div>
  `,
  about: `
    <div class="container fade-in spacer-y">
      <div class="hero-section fade-in" style="margin: 0; min-height: 400px; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));">
        <div class="hero-content" style="max-width: 800px;">
          <h1 class="hero-title display-font" style="font-size: 4rem; margin-bottom: 1rem;">Cultivating the Future.</h1>
          <p class="hero-subtitle" style="font-size: 1.5rem; opacity: 0.9;">AgroIntel blends cutting-edge artificial intelligence with deep agricultural expertise to empower every farmer with precision tools for a bountiful harvest.</p>
        </div>
      </div>
      <div class="card fade-in" style="max-width: 800px; margin: 3rem auto; padding: 3rem;">
        <h2 class="display-font" style="font-size: 2rem; margin-bottom: 1rem; color: var(--color-primary);">Our Mission</h2>
        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--color-on-surface-variant); margin-bottom: 2rem;">We are a team of agronomists, data scientists, and engineers dedicated to democratizing farm intelligence. Our proprietary AI analyzes soil composition, localized weather patterns, and crop disease vectors to deliver actionable, enterprise-grade insights directly to your pocket.</p>
        <div style="display: flex; gap: 2rem; border-top: 1px solid var(--color-surface-container-high); padding-top: 2rem; text-align: center;">
          <div style="flex: 1;">
            <h3 class="display-font" style="font-size: 2rem; color: var(--color-primary);">50K+</h3>
            <p style="color: var(--color-on-surface-variant);">Acres Covered</p>
          </div>
           <div style="flex: 1;">
            <h3 class="display-font" style="font-size: 2rem; color: var(--color-primary);">95%</h3>
            <p style="color: var(--color-on-surface-variant);">Prediction Accuracy</p>
          </div>
           <div style="flex: 1;">
            <h3 class="display-font" style="font-size: 2rem; color: var(--color-primary);">10+</h3>
            <p style="color: var(--color-on-surface-variant);">Crops Supported</p>
          </div>
        </div>
      </div>
    </div>
  `,
  features: `
    <div class="container fade-in spacer-y">
      <div style="text-align: center; margin-bottom: 3rem;">
        <span class="insight-chip" style="margin-bottom: 1rem;">Platform Capabilities</span>
        <h2 class="display-font" style="font-size: 3rem;">The Ultimate Ag-Tech Arsenal</h2>
        <p style="color: var(--color-on-surface-variant); max-width: 600px; margin: 1rem auto 0; font-size: 1.1rem;">From seed selection to market sale, AgroIntel supports every stage of the farming lifecycle with robust tools and localized data.</p>
      </div>

      <div class="grid-3">
        <div class="card hover-card" style="border-top: 3px solid var(--color-primary);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">🌱</div>
          <h3 class="display-font" style="margin-bottom: 0.5rem; font-size: 1.5rem;">Soil Assessment</h3>
          <p style="color: var(--color-on-surface-variant); font-size: 0.95rem;">Input your NPK levels and our neural network instantly calculates the most profitable crop options based on historical yields.</p>
        </div>
        <div class="card hover-card" style="border-top: 3px solid var(--color-secondary);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔬</div>
          <h3 class="display-font" style="margin-bottom: 0.5rem; font-size: 1.5rem;">Disease Diagnosis</h3>
          <p style="color: var(--color-on-surface-variant); font-size: 0.95rem;">Snap a photo of failing crops; our vision models identify pathogens and deliver strict organic and chemical treatment plans.</p>
        </div>
        <div class="card hover-card" style="border-top: 3px solid var(--color-tertiary);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">📈</div>
          <h3 class="display-font" style="margin-bottom: 0.5rem; font-size: 1.5rem;">Market Intelligence</h3>
          <p style="color: var(--color-on-surface-variant); font-size: 0.95rem;">Track real-time pricing data and directly connect with reputable buyers in your region to secure the best profit margin.</p>
        </div>
      </div>
    </div>
  `,
  login: `
    <div class="container fade-in spacer-y" style="display: flex; justify-content: center; align-items: center; min-height: 60vh;">
      <div class="card" style="width: 100%; max-width: 450px; padding: 3rem;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h2 class="display-font" style="font-size: 2rem; color: var(--color-primary);">Welcome Back</h2>
          <p style="color: var(--color-on-surface-variant); margin-top: 0.5rem;">Log in to access your farm intelligence.</p>
        </div>
        <div class="input-group">
          <label class="input-label">Email Address</label>
          <input type="email" class="input-field" placeholder="farmer@example.com">
        </div>
        <div class="input-group">
          <label class="input-label">Password</label>
          <input type="password" class="input-field" placeholder="••••••••">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; font-size: 0.9rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <input type="checkbox" style="accent-color: var(--color-primary);"> Remember me
          </label>
          <a href="#" style="font-weight: 600;">Forgot Password?</a>
        </div>
        <button class="btn btn-primary" style="width: 100%; font-size: 1.1rem; padding: 1rem;" onclick="window.loginUser()">Sign In</button>
        <p style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--color-on-surface-variant);">Don't have an account? <a href="#" onclick="window.navigate('signup'); event.preventDefault();" style="font-weight: 600;">Sign up</a></p>
      </div>
    </div>
  `,
  signup: `
    <div class="container fade-in spacer-y" style="display: flex; justify-content: center; align-items: center; min-height: 60vh;">
      <div class="card" style="width: 100%; max-width: 500px; padding: 3rem;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h2 class="display-font" style="font-size: 2rem; color: var(--color-primary);">Create Account</h2>
          <p style="color: var(--color-on-surface-variant); margin-top: 0.5rem;">Join the AgroIntel network today.</p>
        </div>
        <div style="display: flex; gap: 1rem;">
           <div class="input-group" style="flex:1;">
            <label class="input-label">First Name</label>
            <input type="text" class="input-field" placeholder="John">
          </div>
           <div class="input-group" style="flex:1;">
            <label class="input-label">Last Name</label>
            <input type="text" class="input-field" placeholder="Doe">
          </div>
        </div>
        <div class="input-group">
          <label class="input-label">Email Address</label>
          <input type="email" class="input-field" placeholder="farmer@example.com">
        </div>
        <div class="input-group">
          <label class="input-label">Farm Region</label>
          <input type="text" class="input-field" placeholder="e.g. Northern Valley">
        </div>
        <div class="input-group">
          <label class="input-label">Password</label>
          <input type="password" class="input-field" placeholder="Create a password">
        </div>
        <button class="btn btn-primary" style="width: 100%; font-size: 1.1rem; padding: 1rem; margin-top: 1rem;" onclick="window.registerUser()">Create Account</button>
        <p style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--color-on-surface-variant);">Already have an account? <a href="#" onclick="window.navigate('login'); event.preventDefault();" style="font-weight: 600;">Log in</a></p>
      </div>
    </div>
  `,
  dashboard: `
    <div class="container fade-in spacer-y">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h2 class="display-font" style="font-size: 2.5rem;">Intelligent Dashboard</h2>
          <p style="color: var(--color-on-surface-variant);">Welcome back, Ramkishan J.. Your farm overview is ready.</p>
        </div>
        <button class="btn btn-secondary" onclick="window.navigate('profile')">My Profile</button>
      </div>

      <div class="grid-3" style="margin: 0 0 2rem 0;">
        <div class="card hover-card" style="border-top: 3px solid var(--color-primary); padding: 1.5rem;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🌱</div>
          <p style="color: var(--color-on-surface-variant); font-size: 0.9rem; font-weight: 600;">Soil Status</p>
          <h4 class="display-font" style="font-size: 1.25rem;">Optimal (pH 6.5)</h4>
        </div>
        <div class="card hover-card" style="border-top: 3px solid var(--color-secondary); padding: 1.5rem;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🧠</div>
          <p style="color: var(--color-on-surface-variant); font-size: 0.9rem; font-weight: 600;">Last Recommendation</p>
          <h4 class="display-font" style="font-size: 1.25rem;">Rice (Paddy)</h4>
        </div>
        <div class="card hover-card" style="border-top: 3px solid var(--color-tertiary); padding: 1.5rem;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📈</div>
          <p style="color: var(--color-on-surface-variant); font-size: 0.9rem; font-weight: 600;">Market Price Update</p>
          <h4 class="display-font" style="font-size: 1.25rem;">Rice +2.4% Today</h4>
        </div>
        <div class="card hover-card" style="border-top: 3px solid #0060a8; padding: 1.5rem;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">⛅</div>
          <p style="color: var(--color-on-surface-variant); font-size: 0.9rem; font-weight: 600;">Weather Status</p>
          <h4 class="display-font" style="font-size: 1.25rem;">24°C, High Humidity</h4>
        </div>
      </div>

      <div class="card" style="margin-bottom: 2rem; background: var(--color-surface-container-low);">
        <h3 class="display-font" style="margin-bottom: 1rem; color: var(--color-primary);">Quick Actions</h3>
        <div class="grid-3" style="margin: 0; gap: 1rem;">
          <div class="card hover-card" style="padding: 1.5rem; text-align: center; cursor: pointer; border: 1px solid var(--color-outline-variant);" onclick="window.navigate('form')">
            <h4 class="display-font">Assess Soil</h4>
          </div>
          <div class="card hover-card" style="padding: 1.5rem; text-align: center; cursor: pointer; border: 1px solid var(--color-outline-variant);" onclick="window.navigate('diagnosis')">
            <h4 class="display-font">Disease Diagnosis</h4>
          </div>
          <div class="card hover-card" style="padding: 1.5rem; text-align: center; cursor: pointer; border: 1px solid var(--color-outline-variant);" onclick="window.navigate('market')">
            <h4 class="display-font">Market Prices</h4>
          </div>
        </div>
      </div>
    </div>
  `
};

window.showDiagnosisTab = function(tabId) {
  const container = document.getElementById('diagnosis-results');
  if (container.style.display === 'none') {
    container.style.display = 'block';
  }
  
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  // Reset all buttons
  document.querySelectorAll('.tab-link').forEach(btn => {
    btn.style.borderBottom = 'none';
    btn.style.color = 'var(--color-on-surface-variant)';
    btn.classList.remove('active');
  });
  
  // Show active
  document.getElementById('tab-' + tabId).style.display = 'block';
  const activeBtn = document.querySelector('.tab-link[data-tab="' + tabId + '"]');
  if(activeBtn) {
    activeBtn.style.borderBottom = '2px solid var(--color-primary)';
    activeBtn.style.color = 'var(--color-primary)';
    activeBtn.classList.add('active');
  }
};


const mainContent = document.getElementById('main-content');
const navLinks = document.querySelectorAll('.nav-link');

function renderRoute(route) {
  if (!screens[route]) route = 'landing';
  
  // Route Protection Logic
  const protectedRoutes = ['dashboard', 'form', 'diagnosis', 'market', 'buyers', 'profile'];
  const authRoutes = ['login', 'signup'];
  
  if (!appState.isAuthenticated && protectedRoutes.includes(route)) {
    console.warn("Unauthorized access attempt. Redirecting to login.");
    route = 'login';
  } else if (appState.isAuthenticated && authRoutes.includes(route)) {
    console.warn("Already authenticated. Redirecting to dashboard.");
    route = 'dashboard';
  }
  
  // Update state
  appState.currentRoute = route;
  
  // Update DOM
  const screenContent = screens[route];
  mainContent.innerHTML = typeof screenContent === 'function' ? screenContent() : screenContent;
  
  // Update Nav highlighting safely
  const currentNavLinks = document.querySelectorAll('.nav-link');
  currentNavLinks.forEach(link => {
    if (link.dataset.route === route) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Authentication Handlers
window.loginUser = function() {
  appState.isAuthenticated = true;
  appState.user = { name: "Ramkishan J.", email: "farmer@example.com" };
  window.updateNavbarUI();
  window.navigate('dashboard');
};

window.registerUser = function() {
  appState.isAuthenticated = true;
  appState.user = { name: "New Farmer", email: "new@example.com" };
  window.updateNavbarUI();
  window.navigate('dashboard');
};

window.logoutUser = function() {
  appState.isAuthenticated = false;
  appState.user = null;
  window.updateNavbarUI();
  window.navigate('landing');
};

window.updateNavbarUI = function() {
  const authButtons = document.getElementById('nav-auth-buttons');
  const userMenu = document.getElementById('nav-user-menu');
  const authOnlyItems = document.querySelectorAll('.auth-only');
  const guestOnlyItems = document.querySelectorAll('.guest-only');

  if (appState.isAuthenticated) {
    // Hide guest controls
    if (authButtons) authButtons.style.display = 'none';
    guestOnlyItems.forEach(el => el.style.display = 'none');

    // Show auth nav items
    authOnlyItems.forEach(el => el.style.display = 'block');

    // Show avatar menu & populate with user data
    if (userMenu) {
      userMenu.style.display = 'flex';
      const name = appState.user?.name || 'User';
      const email = appState.user?.email || '';
      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      const avatarEl = document.getElementById('user-avatar-initials');
      const nameEl = document.getElementById('user-menu-name');
      const emailEl = document.getElementById('user-menu-email');
      if (avatarEl) avatarEl.textContent = initials;
      if (nameEl) nameEl.textContent = name;
      if (emailEl) emailEl.textContent = email;
    }
  } else {
    // Restore guest controls
    if (authButtons) authButtons.style.display = 'flex';
    if (userMenu) userMenu.style.display = 'none';
    guestOnlyItems.forEach(el => el.style.display = 'flex');
    authOnlyItems.forEach(el => el.style.display = 'none');
  }
};



// Global navigator for buttons
window.navigate = function(route) {
  renderRoute(route);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Nav link listeners
document.addEventListener('click', (e) => {
  const link = e.target.closest('.nav-link, .dropdown-link');
  if (link && link.hasAttribute('data-route')) {
    e.preventDefault();
    const route = link.dataset.route;
    window.navigate(route);
  }
  
  // Mobile Menu Toggle logic
  const mobileBtn = e.target.closest('.mobile-menu-btn');
  if (mobileBtn) {
    const mainNav = document.getElementById('main-nav-links');
    if (mainNav) {
      mainNav.classList.toggle('mobile-open');
    }
  } else if (!e.target.closest('.navbar')) {
    // Close mobile menu if clicked outside
    const mainNav = document.getElementById('main-nav-links');
    if (mainNav && mainNav.classList.contains('mobile-open')) {
      mainNav.classList.remove('mobile-open');
    }
  }
});

// Initial Render
window.updateNavbarUI();
renderRoute(appState.currentRoute);

// Language Toggle Logic
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('change', (e) => {
    const currentHTML = mainContent.innerHTML;
    mainContent.innerHTML = '<div class="container spacer-y fade-in" style="display: flex; justify-content: center; align-items: center; min-height: 50vh;"><h2 class="display-font" style="color: var(--color-on-surface-variant)">Translating interface...</h2></div>';
    
    setTimeout(() => {
      renderRoute(appState.currentRoute);
    }, 400); 
  });
}


window.handleImageUpload = function(input) {
  if (input.files && input.files[0]) {
    // 1. Hide dropzone, Show scanning
    const dropzone = document.getElementById('diagnosis-dropzone');
    const scanning = document.getElementById('diagnosis-scanning');
    const results = document.getElementById('diagnosis-results');
    
    if (dropzone) dropzone.style.display = 'none';
    if (results) results.style.display = 'none';
    if (scanning) scanning.style.display = 'block';

    // 2. Mock 2.5 second network latency for AI processing
    setTimeout(() => {
      // 3. Hide loading, show results
      if (scanning) scanning.style.display = 'none';
      window.showDiagnosisTab('info');
    }, 2500);
  }
};
