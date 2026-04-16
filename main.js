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
    sat_sync_title: "उपग्रह सिंक", linking: "लिंक हो रहा है...",
    hero_badge: "🛰️ AI-संचालित कृषि बुद्धिमत्ता",
    hero_main_title: "स्मार्ट खेती", hero_main_sub: "यहाँ से शुरू होती है",
    hero_sub: "AI की मदद से अपनी फसल की उपज, मिट्टी की सेहत और बाजार के मुनाफे को बेहतर बनाएं।",
    stat_farmers: "कुल किसान", stat_crops: "निगरानी में फसलें", stat_soil: "मिट्टी रिपोर्ट", stat_ai: "AI निदान पूर्ण",
    feat_title: "स्मार्ट खेती के लिए सब कुछ",
    feat_home_title: "मुख्य पृष्ठ", feat_home_desc: "आपका केंद्रीय कमांड सेंटर — हर सुबह मौसम, अलर्ट और फसल की स्थिति एक नज़र में देखें।",
    feat_dash_title: "डैशबोर्ड", feat_dash_desc: "रियल-टाइम चार्ट और पूर्वानुमान विश्लेषण के साथ खेत का प्रदर्शन देखें।",
    feat_soil_title: "मृदा विश्लेषण", feat_soil_desc: "उपग्रह-सहायता से पोषक तत्वों और नमी का गहन विश्लेषण करें।",
    feat_diag_title: "AI निदान", feat_diag_desc: "पत्ती की फोटो अपलोड करें — तुरंत कीट और रोग पहचान और उपचार पाएं।",
    feat_market_title: "बाज़ार", feat_market_desc: "लाइव मंडी कीमतें, थोक रुझान और सर्वोत्तम बिक्री समय की सिफ़ारिशें प्राप्त करें।",
    feat_f2b_title: "F2B / B2F", feat_f2b_desc: "किसानों और कृषि व्यवसायों को सीधे थोक अनुबंध और आपूर्ति श्रृंखला से जोड़ें।",
    news_title: "मौसम से एक कदम आगे रहें", news_sub: "AI अंतर्दृष्टि, बाज़ार पूर्वानुमान और खेती की टिप्स अपने इनबॉक्स में पाएं।", news_btn: "सदस्यता लें",
    db_ask_ai: "AI से पूछें", db_welcome_farmer: "नमस्ते! मैं आपका AI कृषि सहायक हूँ। अपनी फसलों, बीमारियों, बाजार की कीमतों या मिट्टी के स्वास्थ्य के बारे में पूछें!",
    db_welcome_buyer: "नमस्ते! मैं आपका खरीद AI सहायक हूँ। मैं विक्रेता जाँच, बाज़ार रुझान और गुणवत्ता सत्यापन में आपकी मदद कर सकता हूँ।",
    db_ai_placeholder_farmer: "अपने खेत के बारे में कुछ भी पूछें...", db_ai_placeholder_buyer: "बाज़ार के रुझानों के बारे में पूछें...",
    db_farmer_title: "किसान डैशबोर्ड", db_weather_fetching: "🌤️ मौसम की जानकारी ली जा रही है...", db_new_report: "नया मृदा रिपोर्ट", db_farm_center: "कृषि इंटेलिजेंस केंद्र",
    db_monitoring: "आपके खेतों की निगरानी की जा रही है।", db_alerts_needed: "अलर्ट पर ध्यान देने की आवश्यकता है।", db_view_alerts: "अलर्ट देखें",
    db_kpi_fields: "कुल खेत", db_kpi_alerts: "सक्रिय अलर्ट", db_kpi_pending: "लंबित रिपोर्ट", db_kpi_market: "बाज़ार मूल्य सूचकांक",
    db_health_score: "फसल स्वास्थ्य स्कोर", db_last_30d: "पिछले 30 दिन — खेत का औसत", db_field_map: "खेत स्थान मानचित्र", db_map_sub: "खेत के अनुसार स्वास्थ्य स्थिति",
    db_recent_alerts: "हाल के अलर्ट", db_mark_read: "सभी पढ़े हुए चिह्नित करें", db_tasks: "आगामी कार्य", db_task_all: "सभी", db_task_pending: "लंबित", db_task_done: "पूर्ण",
    db_th_task: "कार्य", db_th_field: "खेत", db_th_due: "नियत तिथि", db_th_status: "स्थिति",
    db_proc_title: "खरीद डैशबोर्ड", db_biz_hub: "📦 बिजनेस इंटेलिजेंस हब", db_explore_market: "बाज़ार एक्सप्लोर करें", db_proc_intel: "खरीद इंटेलिजेंस",
    db_orders_desc: "सक्रिय खरीद ऑर्डर हैं।", db_view_orders: "ऑर्डर देखें", db_kpi_orders: "सक्रिय ऑर्डर", db_kpi_farms: "सत्यापित खेत", db_kpi_bids: "लंबित बोलियां", db_kpi_spend: "इस महीने का खर्च",
    soil_intel_hub: "मृदा इंटेलिजेंस हब", soil_analytics: "एनालिटिक्स / इंटेलिजेंस", soil_new_scan: "नया स्कैन", soil_field_config: "खेत कॉन्फिगरेशन",
    soil_field_id: "खेत की पहचान", soil_geo: "जियो-लोकेशन", soil_date: "नमूना तिथि", soil_sample_scan: "नमूना स्कैन", soil_nutrient_prof: "पोषक तत्व प्रोफ़ाइल",
    soil_health_index: "स्वास्थ्य सूचकांक", soil_awaiting: "डेटा इनपुट की प्रतीक्षा है", soil_awaiting_sub: "AI धारणा शुरू करने के लिए फॉर्म भरें और नमूना अपलोड करें।",
    soil_ai_insights: "AI अंतर्दृष्टि", soil_analyzing: "अनुकूलित कृषि सलाह उत्पन्न करने के लिए आपके मृदा डेटा का विश्लेषण किया जा रहा है...", soil_export_pdf: "PDF एक्सपोर्ट करें", soil_chronology: "कालक्रम",
    diag_wheat_rust: "गेहूँ का रतुआ पहचाना गया", diag_treatment: "उपचार: नीम के तेल के उपयोग का सुझाव दिया गया है।",
    auth_join: "AgroFarm AI में शामिल हों", auth_fname: "पहला नाम", auth_lname: "अंतिम नाम", auth_role_select: "अपनी भूमिका चुनें:", auth_role_farmer_opt: "किसान", auth_role_buyer_opt: "खरीदार / व्यवसाय",
    auth_create: "खाता बनाएँ", auth_have_acc: "क्या आपके पास पहले से खाता है?",
    nav_feat: "विशेषताएं", nav_about: "हमारे बारे में", nav_f2b: "F2B हब", nav_b2f: "B2F हब",
    home_stories_badge: "⭐ किसान कहानियाँ", home_stories_title: "भारत भर के किसानों द्वारा विश्वसनीय", home_stories_sub: "उन वास्तविक किसानों के वास्तविक परिणाम जिन्होंने AgroFarm AI के साथ अपने कार्यों को बदल दिया।",
    home_testimonial_1: "AI निदान उपकरण ने इस सीजन में मेरी पूरी गेहूं की फसल बचा ली। मैंने गंभीर होने से 2 सप्ताह पहले जंग के संक्रमण की पहचान की - यानी ₹3 लाख की बचत।",
    home_testimonial_2: "AgroFarm AI पर जाने से हमें अपनी उपज बढ़ाते हुए उर्वरक लागत को 30% तक कम करने में मदद मिली। मिट्टी विश्लेषण की सटीकता वास्तव में बेजोड़ है।",
    home_testimonial_3: "मार्केट मॉड्यूल मुझे विभिन्न मंडियों से वास्तविक समय की कीमतें देता है। मुझे आखिरकार लगता है कि मेरे पास निष्पक्ष रूप से बातचीत करने की शक्ति है।",
    home_testimonial_4: "एक कृषि-व्यवसाय के रूप में, F2B/B2F पोर्टल ने हमें 120+ सत्यापित खेतों से जोड़ा है। खरीद अब तेज और सस्ती है।",
    home_auth_1: "रमेश कुमार", home_role_1: "🌾 गेहूं किसान, पंजाब",
    home_auth_2: "प्रिया देशपांडे", home_role_2: "🌿 जैविक किसान, महाराष्ट्र",
    home_auth_3: "अर्जुन सिंह", home_role_3: "🧅 सब्जी उत्पादक, यूपी",
    home_auth_4: "मीरा गुप्ता", home_role_4: "🏢 कृषि-व्यवसाय, गुजरात",
    footer_tagline: "AI की सटीकता और परंपरा के ज्ञान के साथ दुनिया के सबसे महत्वपूर्ण उद्योग को सशक्त बनाना।",
    footer_platform: "प्लेटफॉर्म", footer_resources: "संसाधन", footer_company: "कंपनी", footer_contact: "संपर्क",
    chat_kisan_welcome: "नमस्ते! मैं आपका AI खेती सहायक हूँ। आज मैं आपकी क्या मदद कर सकता हूँ?",
    chat_kisan_placeholder: "कुछ भी पूछें...", chat_kisan_tooltip: "किसान सहायक से पूछें",
    chat_suggest_1: "🌾 चावल के रोग", chat_suggest_2: "📈 बाजार भाव", chat_suggest_3: "🌤️ मौसम की जांच",
    chat_suggest_1: "🌾 चावल के रोग", chat_suggest_2: "📈 बाजार भाव", chat_suggest_3: "🌤️ मौसम की जांच",
    chat_kisan_name: "किसान AI सहायक", chat_kisan_sub: "ऑनलाइन · कृषि विशेषज्ञ", chat_biz_name: "बिजनेस AI सहायक", chat_biz_sub: "ऑनलाइन · खरीद विशेषज्ञ",
    news_placeholder: "अपना ईमेल पता दर्ज करें...", nav_careers: "करियर", nav_privacy: "गोपनीयता नीति", nav_cases: "केस स्टडीज", nav_govt: "सरकारी योजनाएं", nav_help: "सहायता केंद्र",
    chat_typing: "टाइपिंग...", chat_error: "सर्वर से कनेक्ट करने में विफल।", chat_error_api: "AI से कनेक्ट करने में त्रुटि।"
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
    sat_sync_title: "उपग्रह सिंक", linking: "लिंक होत आहे...",
    hero_badge: "🛰️ AI-समर्थित कृषी बुद्धिमत्ता",
    hero_main_title: "स्मार्ट शेती", hero_main_sub: "इथून सुरू होते",
    hero_sub: "AI च्या मदतीने तुमची पीक उत्पादकता, मातीचे आरोग्य आणि बाजारातील नफा सुधारा.",
    stat_farmers: "एकूण शेतकरी", stat_crops: "देखरेखीतील पिके", stat_soil: "माती अहवाल", stat_ai: "AI निदान पूर्ण",
    feat_title: "स्मार्ट शेतीसाठी सर्वकाही",
    feat_home_title: "मुखपृष्ठ", feat_home_desc: "तुमचे केंद्रीय नियंत्रण केंद्र — दररोज सकाळी हवामान, अलर्ट आणि पीक स्थिती एका नजरेत पाहा.",
    feat_dash_title: "डॅशबोर्ड", feat_dash_desc: "रिअल-टाइम चार्ट आणि भविष्यसूचक विश्लेषणासह शेत कामगिरी पाहा.",
    feat_soil_title: "माती विश्लेषण", feat_soil_desc: "उपग्रह-सहाय्याने पोषक तत्त्वे आणि ओलावा यांचे सखोल विश्लेषण करा.",
    feat_diag_title: "AI निदान", feat_diag_desc: "पानाचा फोटो अपलोड करा — तात्काळ कीड आणि रोग ओळख व उपचार मिळवा.",
    feat_market_title: "बाजार", feat_market_desc: "थेट मंडी किमती, घाऊक ट्रेंड आणि सर्वोत्तम विक्री वेळाच्या शिफारशी मिळवा.",
    feat_f2b_title: "F2B / B2F", feat_f2b_desc: "शेतकरी आणि कृषी व्यवसायांना थेट थोक करारांद्वारे जोडा.",
    news_title: "हंगामापूर्वी तयार राहा", news_sub: "AI अंतर्दृष्टी, बाजार अंदाज आणि शेती टिप्स तुमच्या इनबॉक्समध्ये मिळवा.", news_btn: "सदस्य व्हा",
    db_ask_ai: "AI ला विचारा", db_welcome_farmer: "नमस्ते! मी तुमचा AI शेती सहाय्यक आहे. तुमची पिके, रोग, बाजारभाव किंवा मातीच्या आरोग्याबद्दल विचारा!",
    db_welcome_buyer: "नमस्ते! मी तुमचा खरेदी AI सहाय्यक आहे. मी विक्रेता तपासणी, बाजार कल आणि गुणवत्ता पडताळणीमध्ये मदत करू शकतो.",
    db_ai_placeholder_farmer: "तुमच्या शेताबद्दल काहीही विचारा...", db_ai_placeholder_buyer: "बाजार कल बद्दल विचारा...",
    db_farmer_title: "शेतकरी डॅशबोर्ड", db_weather_fetching: "🌤️ हवामानाची माहिती घेतली जात आहे...", db_new_report: "नवीन माती अहवाल", db_farm_center: "कृषी इंटेलिजन्स केंद्र",
    db_monitoring: "तुमच्या शेतात लक्ष ठेवले जात आहे.", db_alerts_needed: "अलर्टकडे लक्ष देणे आवश्यक आहे.", db_view_alerts: "अलर्ट पाहा",
    db_kpi_fields: "एकूण शेते", db_kpi_alerts: "सक्रिय अलर्ट", db_kpi_pending: "प्रलंबित अहवाल", db_kpi_market: "बाजारभाव निर्देशांक",
    db_health_score: "पीक आरोग्य स्कोअर", db_last_30d: "गेले ३० दिवस — शेत सरासरी", db_field_map: "शेत स्थान नकाशा", db_map_sub: "शेतानुसार आरोग्य स्थिती",
    db_recent_alerts: "अलीकडील अलर्ट", db_mark_read: "सर्व वाचलेले म्हणून चिन्हांकित करा", db_tasks: "आगामी कार्ये", db_task_all: "सर्व", db_task_pending: "प्रलंबित", db_task_done: "पूर्ण",
    db_th_task: "कार्य", db_th_field: "शेत", db_th_due: "नियत तारीख", db_th_status: "स्थिती",
    db_proc_title: "खरेदी डॅशबोर्ड", db_biz_hub: "📦 बिझनेस इंटेलिजन्स हब", db_explore_market: "बाजार एक्सप्लोर करा", db_proc_intel: "खरेदी इंटेलिजन्स",
    db_orders_desc: "सक्रिय खरेदी ऑर्डर्स आहेत.", db_view_orders: "ऑर्डर्स पाहा", db_kpi_orders: "सक्रिय ऑर्डर्स", db_kpi_farms: "सत्यापित शेते", db_kpi_bids: "प्रलंबित बोली", db_kpi_spend: "या महिन्याचा खर्च",
    soil_intel_hub: "माती इंटेलिजन्स हब", soil_analytics: "एनालिटिक्स / इंटेलिजन्स", soil_new_scan: "नवीन स्कॅन", soil_field_config: "शेत कॉन्फिगरेशन",
    soil_field_id: "शेत ओळख", soil_geo: "जिओ-लोकेशन", soil_date: "नमुना तारीख", soil_sample_scan: "नमुना स्कॅन", soil_nutrient_prof: "पोषक तत्व प्रोफाइल",
    soil_health_index: "आरोग्य सूचकांक", soil_awaiting: "डेटा इनपुटची प्रतीक्षा आहे", soil_awaiting_sub: "AI आकलन सुरू करण्यासाठी फॉर्म भरा आणि नमुना अपलोड करा.",
    soil_ai_insights: "AI अंतर्दृष्टी", soil_analyzing: "तुमच्या शेतीसाठी सानुकूलित सल्ला देण्यासाठी तुमच्या मातीच्या डेटाचे विश्लेषण केले जात आहे...", soil_export_pdf: "PDF एक्सपोर्ट करा", soil_chronology: "कालक्रम",
    diag_wheat_rust: "गव्हाचा तांबेरा आढळला", diag_treatment: "उपचार: कडुनिंबाच्या तेलाचा वापर सुचवला आहे.",
    auth_join: "AgroFarm AI मध्ये सामील व्हा", auth_fname: "पहिले नाव", auth_lname: "आडनाव", auth_role_select: "तुमची भूमिका निवडा:", auth_role_farmer_opt: "शेतकरी", auth_role_buyer_opt: "खरेदीदार / व्यवसाय",
    auth_create: "खाते तयार करा", auth_have_acc: "तुमचे आधीच खाते आहे का?",
    nav_feat: "वैशिष्ट्ये", nav_about: "आमच्याबद्दल", nav_f2b: "F2B हब", nav_b2f: "B2F हब",
    home_stories_badge: "⭐ शेतकरी कथा", home_stories_title: "भारतभरातील शेतकऱ्यांचा विश्वास", home_stories_sub: "त्या खऱ्या शेतकऱ्यांचे खरे परिणाम ज्यांनी AgroFarm AI सह त्यांच्या शेतीमध्ये बदल घडडून आणला.",
    home_testimonial_1: "AI निदान साधनाने या हंगामात माझे संपूर्ण गव्हाचे पीक वाचवले. मी गंभीर होण्यापूर्वी २ आठवडे तांबेरा रोगाची ओळख पटवली - म्हणजे ₹३ लाखांची बचत.",
    home_testimonial_2: "AgroFarm AI कडे वळल्यामुळे आम्हाला उत्पादनात वाढ करताना खत खर्चात ३०% घट करण्यास मदत झाली. माती विश्लेषणाची अचूकता खरोखर अतुलनीय आहे.",
    home_testimonial_3: "मार्केट मॉड्यूल मला विविध मंड्यांमधून रिअल-टाइम किमती देते. मला अखेर वाटते की माझ्याकडे योग्यरित्या वाटाघाटी करण्याची शक्ती आहे.",
    home_testimonial_4: "कृषी-व्यवसाय म्हणून, F2B/B2F पोर्टलने आम्हाला १२०+ सत्यापित शेतांशी जोडले आहे. खरेदी आता जलद आणि स्वस्त आहे.",
    home_auth_1: "रमेश कुमार", home_role_1: "🌾 गहू शेतकरी, पंजाब",
    home_auth_2: "प्रिया देशपांडे", home_role_2: "🌿 सेंद्रिय शेतकरी, महाराष्ट्र",
    home_auth_3: "अर्जुन सिंह", home_role_3: "🧅 भाजीपाला उत्पादक, युपी",
    home_auth_4: "मीरा गुप्ता", home_role_4: "🏢 कृषी-व्यवसाय, गुजरात",
    footer_tagline: "AI ची अचूकता आणि परंपरेच्या ज्ञानासह जगातील सर्वात महत्त्वाच्या उद्योगाला सक्षम बनवणे.",
    footer_platform: "प्लॅटफॉर्म", footer_resources: "संसाधन", footer_company: "कंपनी", footer_contact: "संपर्क",
    chat_kisan_welcome: "नमस्ते! मी तुमचा AI शेती सहाय्यक आहे. आज मी तुमची काय मदत करू शकतो?",
    chat_kisan_placeholder: "काहीही विचारा...", chat_kisan_tooltip: "किसान सहाय्यकाला विचारा",
    chat_suggest_1: "🌾 भात रोग", chat_suggest_2: "📈 बाजार भाव", chat_suggest_3: "🌤️ हवामान तपासणी",
    chat_suggest_1: "🌾 भात रोग", chat_suggest_2: "📈 बाजार भाव", chat_suggest_3: "🌤️ हवामान तपासणी",
    chat_kisan_name: "शेतकरी AI सहाय्यक", chat_kisan_sub: "ऑनलाइन · कृषी तज्ञ", chat_biz_name: "बिझनेस AI सहाय्यक", chat_biz_sub: "ऑनलाइन · खरेदी तज्ञ",
    news_placeholder: "तुमचा ईमेल पत्ता प्रविष्ट करा...", nav_careers: "करिअर", nav_privacy: "गोपनीयता धोरण", nav_cases: "केस स्टडीज", nav_govt: "शासकीय योजना", nav_help: "मदत केंद्र",
    chat_typing: "टायपिंग...", chat_error: "सर्व्हरशी कनेक्ट करण्यात अयशस्वी।", chat_error_api: "AI शी कनेक्ट करण्यात त्रुटी।"
  }
};

const appState = {
  currentRoute: 'landing',
  isAuthenticated: !!(_savedSession && _savedSession.user),
  user: _savedSession?.user || null,
  role: _savedSession?.role || null, // 'farmer' | 'buyer'
  fieldConditions: null,
  lang: _savedSession?.lang || 'en',
  _soilGauge: null,
  _soilBar: null,
  _fdSection: 'home',
  _bdSection: 'home'
};

function t(key) {
  return i18n[appState.lang]?.[key] || i18n['en'][key] || key;
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
            <button class="home-cta-primary" onclick="window.navigate('form')" id="cta-get-started">${t('btn_get_started')} →</button>
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
            <div class="home-feature-card" onclick="window.navigate('form')">
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
              <a href="#" class="home-footer-link" onclick="window.navigate('form'); return false;">${t('nav_soil')}</a>
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
              <button class="db-banner-btn" onclick="document.getElementById('db-alerts-panel').scrollIntoView({behavior:'smooth'})">${t('db_view_alerts')} →</button>
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
      </div>

      <!-- AI Chat Floating Button + Panel -->
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
            <h2 class="display-font" style="font-size:2.8rem; margin-bottom:0.4rem;">${t('db_proc_title')}</h2>
            <div style="color:var(--color-primary); font-weight:600; display:flex; align-items:center; gap:0.5rem;">
              <span style="background:rgba(21,101,192,0.1); color:#1565C0; padding:0.25rem 0.75rem; border-radius:99px; font-size:0.85rem;">${t('db_biz_hub')}</span> 
              <span style="color:#ccc;">|</span> 
              <span style="color:#888; font-size:0.85rem;">${dateStr}</span>
            </div>
          </div>
          <button class="btn-primary" style="padding:0.8rem 1.8rem; font-size:0.95rem; background:#1565C0;" onclick="window.navigate('market')">${t('db_explore_market')}</button>
        </div>

        <!-- Welcome Banner (blue theme for buyer) -->
        <div class="db-welcome-banner" style="margin-top:0; background:linear-gradient(135deg,#1565C0,#1976D2,#42A5F5);">
          <div class="db-welcome-left">
            <div class="db-welcome-subtitle">${t('db_proc_intel')}</div>
            <h2 class="db-welcome-title">${greeting}, ${name.split(' ')[0]} 👋</h2>
            <p class="db-welcome-desc">5 ${t('db_orders_desc')} <strong>2 bids</strong> awaiting your response.</p>
            <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:0.25rem;">
              <button class="db-banner-btn" onclick="window.navigate('b2f')">${t('db_view_orders')} →</button>
              <button class="db-banner-btn-ghost" onclick="window.navigate('market')">${t('nav_market')}</button>
            </div>
          </div>
          <div class="db-welcome-illustration">🏭</div>
        </div>

        <!-- KPI Cards -->
        <div class="db-kpi-row">
          <div class="db-kpi-card" style="--kpi-color:#1565C0;">
            <div class="db-kpi-icon">📦</div>
            <div class="db-kpi-label">${t('db_kpi_orders')}</div>
            <div class="db-kpi-value">5</div>
            <div class="db-kpi-trend up">↑ +2 this month</div>
            <div class="db-kpi-sparkline"><canvas id="spark-0" width="80" height="28"></canvas></div>
          </div>
          <div class="db-kpi-card" style="--kpi-color:#2E7D32;">
            <div class="db-kpi-icon">🌾</div>
            <div class="db-kpi-label">${t('db_kpi_farms')}</div>
            <div class="db-kpi-value">120</div>
            <div class="db-kpi-trend up">↑ +14 farms added</div>
            <div class="db-kpi-sparkline"><canvas id="spark-1" width="80" height="28"></canvas></div>
          </div>
          <div class="db-kpi-card" style="--kpi-color:#F57F17;">
            <div class="db-kpi-icon">🤝</div>
            <div class="db-kpi-label">${t('db_kpi_bids')}</div>
            <div class="db-kpi-value">2 <span class="db-kpi-badge">!</span></div>
            <div class="db-kpi-trend neutral">→ Awaiting response</div>
            <div class="db-kpi-sparkline"><canvas id="spark-2" width="80" height="28"></canvas></div>
          </div>
          <div class="db-kpi-card" style="--kpi-color:#6A1B9A;">
            <div class="db-kpi-icon">💰</div>
            <div class="db-kpi-label">${t('db_kpi_spend')}</div>
            <div class="db-kpi-value">₹8.4L</div>
            <div class="db-kpi-trend down">↓ -3% vs last month</div>
            <div class="db-kpi-sparkline"><canvas id="spark-3" width="80" height="28"></canvas></div>
          </div>
        </div>
      </div>

      <!-- AI Chat Floating Button + Panel -->
      <button class="db-ai-fab" id="db-ai-fab" onclick="window.dbToggleAiChat()" title="${t('db_ask_ai')}">
        <span class="db-ai-fab-icon">🤖</span>
        <span class="db-ai-fab-label">${t('db_ask_ai')}</span>
        <div class="db-ai-pulse"></div>
      </button>

      <div class="db-ai-chat-panel" id="db-ai-chat-panel">
        <div class="db-ai-chat-header" style="background: linear-gradient(135deg, #1565C0, #1976D2);">
          <div style="display:flex;align-items:center;gap:0.75rem;"><span style="font-size:1.5rem;">🤖</span><div><div style="font-weight:800;font-size:0.95rem;">${t('chat_biz_name')}</div><div style="font-size:0.72rem;opacity:0.8;">${t('chat_biz_sub')}</div></div></div>
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
    `;
  },
  diagnosis: function() {
    return `<div class="db-wrapper spacer-y fade-in"><h2 class="display-font">${t('feat_diag_title')}</h2><div id="diagnosis-dropzone" class="card" style="padding:4rem; text-align:center; border: 2px dashed #ccc; cursor:pointer;" onclick="document.getElementById('file-upload').click()"><input type="file" id="file-upload" style="display:none;" onchange="window.handleImageUpload(this)">📸 ${t('feat_diag_desc')}</div><div id="diagnosis-scanning" class="card" style="display:none; text-align:center; padding:4rem;">🧬 ${t('soil_analyzing')}</div><div id="diagnosis-results" class="card" style="display:none; padding:2rem;"><h3>${t('diag_wheat_rust')}</h3><p>${t('diag_treatment')}</p></div></div>`;
  },
  login: function() {
    return `<div class="container spacer-y" style="display:flex; justify-content:center;"><div class="card" style="width:400px; padding:3rem;"><h2 class="display-font" style="text-align:center;">${t('sign_in')}</h2><div class="input-group"><label>${t('email')}</label><input type="email" id="login-email" class="input-field"></div><div class="input-group"><label>${t('password')}</label><input type="password" id="login-pass" class="input-field"></div><button class="btn btn-primary" style="width:100%; margin-top:2rem;" onclick="window.loginUser()">${t('login')}</button></div></div>`;
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
    return `<div class="db-wrapper spacer-y fade-in"><h2 class="display-font" style="font-size:2.5rem;">${t('feat_f2b_title')}</h2><p style="color:#666; margin-bottom:2rem;">${t('feat_f2b_desc')}</p><div class="grid-3"><div class="card"><h3>Active Contracts</h3><div class="stat-number">03</div></div><div class="card"><h3>Bids Received</h3><div class="stat-number">08</div></div><div class="card"><h3>Logistics</h3><div class="stat-number">Ready</div></div></div></div>`;
  },
  b2f: function() {
    return `<div class="db-wrapper spacer-y fade-in"><h2 class="display-font" style="font-size:2.5rem;">Business-to-Farm Portal</h2><p style="color:#666; margin-bottom:2rem;">Source raw materials and produce directly from verified growers.</p><div class="grid-3"><div class="card"><h3>Active Requests</h3><div class="stat-number">04</div></div><div class="card"><h3>Verified Farms</h3><div class="stat-number">120</div></div><div class="card"><h3>Processing</h3><div class="stat-number">Active</div></div></div></div>`;
  },
  knowledge: function() {
    return `<div class="container spacer-y fade-in"><h2 class="display-font" style="font-size:2.5rem;">${t('nav_resources')}</h2><p>Agri-Intelligence and latest government schemes.</p><div class="grid-3"><div class="card"><h3>Schemes</h3><p>PM-KISAN dashboard links.</p></div><div class="card"><h3>Techniques</h3><p>Hydroponics and drip irrigation guides.</p></div><div class="card"><h3>Pests</h3><p>Comprehensive identification guide.</p></div></div></div>`;
  },
  community: function() {
    return `<div class="container spacer-y fade-in"><h2 class="display-font">Farmer Community</h2><div class="card" style="padding:4rem; text-align:center;"><p>${t('market_intel')}</p></div></div>`;
  },
  'soil-analysis': function() {
    return `
      <div class="db-wrapper spacer-y fade-in">
        <div class="soil-header">
          <div>
            <div class="soil-breadcrumb">${t('soil_analytics')}</div>
            <h1 class="display-font" style="margin:0; font-size:2.5rem; letter-spacing:-1px;">${t('soil_intel_hub')}</h1>
          </div>
          <div style="display:flex; gap:1rem;">
             <button class="premium-btn-ai" onclick="document.getElementById('soil-form-card').scrollIntoView({behavior:'smooth'})">
                <span style="font-size:1.2rem;">✨</span> ${t('soil_new_scan')}
             </button>
          </div>
        </div>

        <div class="grid-3" style="grid-template-columns: 320px 1fr 380px; gap: 2rem; align-items: start;">
          
          <!-- Column 1: Configurator -->
          <div class="glass-card-premium" id="soil-form-card" style="padding:2rem;">
            <h3 class="display-font" style="margin-top:0; font-size:1.1rem; color:var(--color-primary);">${t('soil_field_config')}</h3>
            <div class="input-group"><label>${t('soil_field_id')}</label><input type="text" id="soil-field" class="input-field" placeholder="North Wheat Plot"></div>
            <div class="input-group">
              <label>${t('soil_geo')}</label>
              <select id="soil-location" class="input-field">
                <option value="Kolhapur">Kolhapur Central</option>
                <option value="Sangli">Sangli East</option>
                <option value="Satara">Satara North</option>
              </select>
            </div>
            <div class="input-group"><label>${t('soil_date')}</label><input type="date" id="soil-date" class="input-field"></div>
            
            <div class="soil-scan-container" onclick="document.getElementById('soil-file').click()">
              <div class="soil-scanner-line" id="scanner-line"></div>
              <div class="soil-dropzone" id="soil-upload" style="margin-bottom:0; border-style:dotted;">
                <input type="file" id="soil-file" style="display:none;" onchange="window.handleSoilUpload(this)">
                <div id="upload-placeholder">
                  <div style="font-size:2rem; margin-bottom:0.5rem;">📷</div>
                  <strong style="font-size:0.85rem;">${t('soil_sample_scan')}</strong>
                </div>
                <img id="soil-preview" style="display:none; width:100%; border-radius:12px;">
              </div>
            </div>

            <h4 style="margin: 1.5rem 0 1rem; font-size:0.8rem; color:#888; letter-spacing:1px;">${t('soil_nutrient_prof')}</h4>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="input-group" style="margin:0;"><label>${t('ph')}</label><input type="number" step="0.1" id="soil-ph" class="input-field" value="6.5"></div>
              <div class="input-group" style="margin:0;"><label>${t('nitrogen')}</label><input type="number" id="soil-n" class="input-field" value="40"></div>
              <div class="input-group" style="margin:0;"><label>${t('phosphorus')}</label><input type="number" id="soil-p" class="input-field" value="25"></div>
              <div class="input-group" style="margin:0;"><label>${t('potassium')}</label><input type="number" id="soil-k" class="input-field" value="30"></div>
              <div class="input-group" style="margin:0;"><label>${t('humidity')}</label><input type="number" id="soil-moisture" class="input-field" value="15"></div>
              <div class="input-group" style="margin:0;"><label>O.M %</label><input type="number" id="soil-om" class="input-field" value="2.5"></div>
            </div>

            <button class="premium-btn-ai" style="width:100%; margin-top:2rem;" onclick="window.runSoilAnalysis()">${t('feat_diag_title')}</button>
          </div>

          <!-- Column 2: The Heart (Visualizer) -->
          <div style="display:flex; flex-direction:column; gap:2rem;">
            <div class="glass-card-premium" id="soil-results-panel" style="display:none; padding:2.5rem; text-align:center;">
                <div class="soil-gauge-container" style="width:400px; height:220px; margin: 0 auto; position: relative;">
                  <canvas id="soilGaugeChart"></canvas>
                  <div class="soil-gauge-score" style="bottom:10px;">
                    <div class="soil-gauge-value" id="res-score" style="font-size:4rem;">--</div>
                    <div class="soil-gauge-label">${t('soil_health_index')}</div>
                  </div>
                </div>
                
                <div class="stat-chip-grid">
                    <div class="stat-chip"><div class="stat-chip-val" id="chip-ph">--</div><div class="stat-chip-label">${t('ph')}</div></div>
                    <div class="stat-chip"><div class="stat-chip-val" id="chip-n">--</div><div class="stat-chip-label">${t('nitrogen')}</div></div>
                    <div class="stat-chip"><div class="stat-chip-val" id="chip-p">--</div><div class="stat-chip-label">${t('phosphorus')}</div></div>
                    <div class="stat-chip"><div class="stat-chip-val" id="chip-k">--</div><div class="stat-chip-label">${t('potassium')}</div></div>
                    <div class="stat-chip"><div class="stat-chip-val" id="chip-moist">--</div><div class="stat-chip-label">${t('humidity')}</div></div>
                    <div class="stat-chip"><div class="stat-chip-val" id="chip-om">--</div><div class="stat-chip-label">Org. Matt</div></div>
                </div>
                
                <div style="margin-top:2.5rem; height:180px;">
                  <canvas id="soilNutrientChart"></canvas>
                </div>
            </div>
            
            <div id="soil-placeholder-card" class="glass-card-premium" style="padding:5rem; text-align:center; color:#ccc; border:2px dashed #eee;">
               <div style="font-size:4rem; margin-bottom:1.5rem; opacity:0.3;">📡</div>
               <h2 style="margin:0; opacity:0.5;">${t('soil_awaiting')}</h2>
               <p style="opacity:0.4;">${t('soil_awaiting_sub')}</p>
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
  renderRoute(appState.currentRoute); 
});

window.getBotReply = function(userInput) {
    if (!window.chatbotData) return "Sorry, data is not loaded.";
    userInput = userInput.toLowerCase();

    for (let item of window.chatbotData) {
        if (userInput.includes(item.question.toLowerCase())) {
            return item.answer;
        }
    }

    return "Sorry, I don't understand. Please ask something else.";
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
  alert('Viewing detailed historical report ID: ' + id);
};
