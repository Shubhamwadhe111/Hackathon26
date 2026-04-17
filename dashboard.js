/**
 * AgroFarm AI — Dashboard Init Module
 * Handles: sidebar, weather, charts, map, notifications, tasks, AI chat
 */
window.initDashboard = function () {

  // ── Sidebar toggle ────────────────────────────────────────────────
  window.dbToggleSidebar = function () {
    document.getElementById('db-sidebar')?.classList.toggle('open');
    document.getElementById('db-overlay')?.classList.toggle('open');
  };

  // ── Weather ───────────────────────────────────────────────────────
  const wp = document.getElementById('db-weather-pill');
  if (wp && !wp.textContent.includes('Hub') && !wp.textContent.includes('Intelligence')) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude: lat, longitude: lon } = pos.coords;
            const res = await fetch(`http://192.168.137.113:5000/api/weather?lat=${lat}&lon=${lon}`);
            const d = await res.json();
            const temp = Math.round(d?.current?.temp ?? 28);
            const emoji = temp > 35 ? '🔥' : temp > 28 ? '🌤️' : temp > 20 ? '⛅' : '🌧️';
            wp.textContent = `${emoji} ${temp}°C`;
          } catch { wp.textContent = '🌤️ 28°C, Pune'; }
        },
        () => { wp.textContent = '🌤️ 28°C, Pune'; }
      );
    } else {
      wp.textContent = '🌤️ 28°C, Pune';
    }
  }

  // ── Dashboard Stats ───────────────────────────────────────────────
  async function fetchStats() {
    try {
      const email = window.appState?.user?.email || 'guest@example.com';
      const res = await fetch(`http://192.168.137.113:5000/api/dashboard-stats?email=${email}`);
      const d = await res.json();
      
      if (d.error) return;

      const fVal = document.getElementById('db-kpi-fields-val');
      const aVal = document.getElementById('db-kpi-alerts-val');
      const pVal = document.getElementById('db-kpi-pending-val');
      const mVal = document.getElementById('db-kpi-market-val');

      if (fVal) fVal.textContent = d.totalFields;
      if (aVal) aVal.innerHTML = `${d.activeAlerts} ${d.activeAlerts > 0 ? '<span class="db-kpi-badge">!</span>' : ''}`;
      if (pVal) pVal.textContent = d.pendingReports;
      if (mVal) mVal.textContent = d.marketPrice;
      
      const mLabel = document.getElementById('db-kpi-market-label');
      if (mLabel) mLabel.textContent = d.commodityName || 'Wheat';

      // Update welcome banner text if exists
      const welcomeDesc = document.querySelector('.db-welcome-desc');
      if (welcomeDesc) {
        const alertText = d.activeAlerts === 1 ? '1 alert needs attention.' : `${d.activeAlerts} alerts need attention.`;
        welcomeDesc.innerHTML = `Your fields are being monitored. <strong>${alertText}</strong>`;
      }
    } catch (e) {
      console.error('Stats fetch error:', e);
    }
  }
  fetchStats();

  // ── Update Market Price ───────────────────────────────────────────
  window.dbUpdateMarketPrice = async function(commodity) {
    const mVal = document.getElementById('db-kpi-market-val');
    const mLabel = document.getElementById('db-kpi-market-label');
    
    if (mVal) {
      mVal.style.opacity = '0.5';
      mVal.style.transform = 'scale(0.95)';
      mVal.style.transition = 'all 0.2s ease';
    }
    
    try {
      const email = window.appState?.user?.email || 'guest@example.com';
      const res = await fetch(`http://192.168.137.113:5000/api/dashboard-stats?email=${email}&commodity=${commodity}`);
      const d = await res.json();
      
      if (mVal) {
        mVal.textContent = d.marketPrice;
        mVal.style.opacity = '1';
        mVal.style.transform = 'scale(1)';
      }
      if (mLabel) mLabel.textContent = d.commodityName;
    } catch (e) {
      console.error('Market update error:', e);
      if (mVal) mVal.style.opacity = '1';
    }
  };

  // ── Sparklines ────────────────────────────────────────────────────
  const sparkSets = [
    { data: [1,1,2,2,2,2,3,3,3], color: '#2E7D32' },
    { data: [4,3,3,2,2,1,1,1,1], color: '#F57F17' },
    { data: [2,2,2,2,2,2,2,2,2], color: '#1565C0' },
    { data:[100,105,110,108,115,120,118,125,130], color: '#6A1B9A' }
  ];
  sparkSets.forEach(({ data, color }, i) => {
    const canvas = document.getElementById('spark-' + i);
    if (!canvas || !window.Chart) return;
    new window.Chart(canvas, {
      type: 'line',
      data: {
        labels: data.map((_, j) => j),
        datasets: [{ data, borderColor: color, borderWidth: 2, pointRadius: 0, tension: 0.4, fill: false }]
      },
      options: {
        responsive: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
        animation: { duration: 900 }
      }
    });
  });

  // ── Main Chart ────────────────────────────────────────────────────
  const mainCanvas = document.getElementById('db-health-chart');
  if (mainCanvas && window.Chart) {
    const isBuyer = window.appState?.role === 'buyer';
    const labels = isBuyer
      ? ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      : (() => {
          const out = [];
          for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            out.push(d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
          }
          return out;
        })();
    const chartData = isBuyer
      ? [2.1, 2.4, 2.2, 2.8, 3.1, 2.9, 3.4, 3.8, 4.1]
      : [65,68,72,70,75,78,80,76,82,85,88,83,79,84,87,90,88,85,89,91,88,85,90,92,89,93,91,95,92,96];
    new window.Chart(mainCanvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: isBuyer ? 'Spend (₹L)' : 'Health Score',
          data: chartData,
          borderColor: isBuyer ? '#1565C0' : '#4CAF50',
          backgroundColor: isBuyer ? 'rgba(21,101,192,0.08)' : 'rgba(76,175,80,0.08)',
          borderWidth: 3, pointRadius: 4,
          pointBackgroundColor: isBuyer ? '#1565C0' : '#4CAF50',
          tension: 0.45, fill: true
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 }, maxRotation: 0, maxTicksLimit: isBuyer ? 9 : 10 } },
          y: {
            min: isBuyer ? 0 : 40, max: isBuyer ? 6 : 100,
            grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 } }
          }
        }
      }
    });
  }

  // ── Leaflet Map ───────────────────────────────────────────────────
  window._initDbMap = function () {
    const el = document.getElementById('db-field-map');
    if (!el || !window.L || el._leaflet_id) return;
    const map = window.L.map(el, { zoomControl: true, attributionControl: false })
      .setView([18.52, 73.85], 12);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);
    [
      { lat: 18.535, lng: 73.845, name: 'Field A', health: 92, color: '#4CAF50', status: 'Healthy' },
      { lat: 18.510, lng: 73.870, name: 'Field B', health: 67, color: '#FFC107', status: 'Monitor' },
      { lat: 18.525, lng: 73.895, name: 'Field C', health: 41, color: '#F44336', status: 'Alert'   }
    ].forEach(f => {
      window.L.circleMarker([f.lat, f.lng], {
        radius: 18, color: '#fff', weight: 3, fillColor: f.color, fillOpacity: 0.85
      }).bindPopup(`<b>${f.name}</b><br>Health: <b>${f.health}%</b><br>Status: ${f.status}`).addTo(map);
      window.L.marker([f.lat, f.lng], {
        icon: window.L.divIcon({
          className: '',
          html: `<div style="background:${f.color};padding:3px 8px;border-radius:999px;color:#fff;font-size:0.7rem;font-weight:700;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.25)">${f.name} ${f.health}%</div>`,
          iconAnchor: [-10, 24]
        })
      }).addTo(map);
    });
  };

  if (document.getElementById('db-field-map')) {
    if (window.L) {
      window._initDbMap();
    } else if (!document.querySelector('script[src*="leaflet"]')) {
      const lnk = document.createElement('link');
      lnk.rel = 'stylesheet'; lnk.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(lnk);
      const scr = document.createElement('script');
      scr.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      scr.onload = window._initDbMap;
      document.head.appendChild(scr);
    } else {
      // Script loading — retry
      const checkLeaflet = setInterval(() => {
        if (window.L) { clearInterval(checkLeaflet); window._initDbMap(); }
      }, 200);
    }
  }

  // ── Notifications ─────────────────────────────────────────────────
  window.dbDismissNotif = function (id) {
    const el = document.querySelector(`[data-id="${id}"]`);
    if (!el) return;
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateX(20px)';
    setTimeout(() => el.remove(), 320);
  };

  window.dbMarkAllRead = function () {
    const list = document.getElementById('db-notifications-list');
    if (!list) return;
    const items = [...list.querySelectorAll('.db-notif')];
    items.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        el.style.opacity = '0'; el.style.transform = 'translateX(20px)';
        setTimeout(() => el.remove(), 320);
      }, i * 70);
    });
    setTimeout(() => {
      if (list && !list.querySelector('.db-notif')) {
        list.innerHTML = '<div style="padding:1.5rem;text-align:center;color:#9e9e9e;font-size:0.9rem;">✓ All caught up!</div>';
      }
    }, items.length * 70 + 400);
  };

  // ── Task filter ───────────────────────────────────────────────────
  window.dbFilterTasks = function (status, btn) {
    document.querySelectorAll('.db-task-filters .db-filter-pill').forEach(p => p.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll('#db-task-tbody tr').forEach(row => {
      row.style.display = (status === 'all' || row.dataset.status === status) ? '' : 'none';
    });
  };

  // ── AI Chat ───────────────────────────────────────────────────────
  window.dbToggleAiChat = function () {
    const panel = document.getElementById('db-ai-chat-panel');
    if (panel) panel.classList.toggle('open');
  };

  window.dbAiSend = async function (prefill) {
    const input = document.getElementById('db-ai-input');
    const body = document.getElementById('db-ai-chat-body');
    const msg = (prefill || input?.value || '').trim();
    if (!msg || !body) return;
    if (input) input.value = '';

    // User bubble
    const userDiv = document.createElement('div');
    userDiv.className = 'db-ai-msg user';
    userDiv.textContent = msg;
    body.appendChild(userDiv);
    body.scrollTop = body.scrollHeight;

    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'db-ai-msg bot typing-indicator';
    typing.innerHTML = '<span class="db-typing">●●●</span>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    try {
      const lang = window.appState?.lang || 'en';
      const res = await fetch('http://192.168.137.113:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, lang })
      });
      const data = await res.json();
      
      typing.remove();
      
      // Response bubble with formatting
      const botDiv = document.createElement('div');
      botDiv.className = 'db-ai-msg bot';
      const formatted = (data.reply || '').replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      botDiv.innerHTML = formatted;
      body.appendChild(botDiv);
    } catch (e) {
      typing.remove();
      const errDiv = document.createElement('div');
      errDiv.className = 'db-ai-msg bot';
      errDiv.style.color = '#F44336';
      errDiv.textContent = window.appState?.lang === 'hi' ? 'क्षमा करें, जवाब पाने में समस्या हुई।' : (window.appState?.lang === 'mr' ? 'क्षमस्व, प्रतिसाद मिळवण्यात अडचण आली.' : 'Sorry, failed to get a response.');
      body.appendChild(errDiv);
    }
    body.scrollTop = body.scrollHeight;
  };

  // ── Cleanup Chart.js instances on SPA navigate ────────────────────
  const mainEl = document.getElementById('main-content');
  if (mainEl) {
    const mo = new MutationObserver(() => {
      if (window.Chart) {
        Object.values(window.Chart.instances || {}).forEach(c => { try { c.destroy(); } catch {} });
      }
      mo.disconnect();
    });
    mo.observe(mainEl, { childList: true });
  }
};
