from flask import Flask, request, jsonify
from pymongo import MongoClient
import urllib.parse
import urllib.request
import json
import traceback
import random
import os
from dotenv import load_dotenv
load_dotenv() # Load variables from .env file

from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app) # Allow frontend to call the backend

# Groq API — FREE, no credit card needed
# Get your free key at: https://console.groq.com/keys
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")

SYSTEM_PROMPT = """You are AgriConnect Assistant, a friendly and knowledgeable agricultural advisor built to help Indian farmers make smarter farming decisions.

## Your role
You help farmers with:
- Crop selection based on their soil, season, location, and conditions
- Understanding soil nutrients (Nitrogen, Phosphorus, Potassium) and what they mean
- Pest and disease identification and treatment
- Irrigation and water management advice
- Fertilizer recommendations (organic and chemical)
- Harvest timing and post-harvest storage tips
- Weather-based farming guidance
- Connecting to buyers and understanding market prices

## How you communicate
- Always reply in simple, easy language — avoid technical jargon
- If the farmer writes in Hindi or any regional language, reply in the SAME language
- Be warm, respectful, and patient — many farmers are not tech-savvy
- Give short, actionable answers first, then explain if needed
- Use bullet points for step-by-step advice
- Never make the farmer feel their question is silly or basic

## Boundaries
- If a question is outside farming, politely redirect.
- If unsure, recommend Krishi Vigyan Kendra (KVK).
- Never recommend illegal pesticides.
- Always end your reply with: "Koi aur sawaal ho toh zaroor poochein!" (or English equivalent: "Feel free to ask if you have more questions!")
"""

# MongoDB Connection
client = MongoClient('mongodb://localhost:27017/')
db = client['hackathon26']
users_collection = db['users']
soil_collection = db['soilanalyses']
f2b_collection = db['listings']
newsletter_collection = db['newsletters']

@app.route('/')
def home():
    return "Flask working 🚀"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    N = data['N']
    P = data['P']
    K = data['K']
    ph = data['ph']

    # Dummy logic for hackathon
    if N > 50:
        crop = "Rice"
    else:
        crop = "Wheat"

    return jsonify({
        "recommended_crop": crop
    })

# --- Authentication Routes ---

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User with this email already exists"}), 400
        
    user_data = {
        "firstName": data.get('firstName'),
        "lastName": data.get('lastName'),
        "email": email,
        "role": data.get('role'),
        "password": data.get('password') # Plain text for hackathon example
    }
    
    users_collection.insert_one(user_data)
    
    # Remove password before returning
    if 'password' in user_data: del user_data['password']
    if '_id' in user_data: del user_data['_id']
    
    return jsonify({"message": "User created successfully", "user": user_data}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = users_collection.find_one({"email": email})
    if not user or user.get('password') != password:
        return jsonify({"error": "Invalid credentials"}), 400
        
    return jsonify({
        "message": "Login successful",
        "user": {
            "email": user['email'],
            "role": user['role'],
            "name": f"{user['firstName']} {user['lastName']}"
        }
    }), 200

# --- Live Market Data Proxy ---

@app.route('/api/market-active', methods=['GET'])
def get_market_data():
    """Proxy for data.gov.in Mandi data with added 7-day historical trend simulation."""
    api_key = "579b464db66ec23bdd000001f5eaaeee90304bc85dc9d8e36ff44362"
    resource_id = "9ef84268-d588-465a-a308-a864a43d0070"
    url = f"https://api.data.gov.in/resource/{resource_id}?api-key={api_key}&format=json&limit=10"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as response:
            raw_data = json.load(response)
            records = raw_data.get('records', [])
            
            processed = []
            for r in records:
                processed.append({
                    "state": r.get('state'),
                    "district": r.get('district'),
                    "market": r.get('market'),
                    "commodity": r.get('commodity'),
                    "variety": r.get('variety'),
                    "arrival_date": r.get('arrival_date'),
                    "min_price": r.get('min_price'),
                    "max_price": r.get('max_price'),
                    "modal_price": r.get('modal_price')
                })

            history = {
                "rice": [2400 + random.randint(-50, 50) for _ in range(7)],
                "wheat": [2100 + random.randint(-40, 40) for _ in range(7)],
                "maize": [1900 + random.randint(-60, 60) for _ in range(7)],
                "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            }

            return jsonify({
                "status": "success",
                "count": len(processed),
                "data": processed,
                "history": history
            })
            
    except Exception:
        fallback_data = [
            {"state": "Maharashtra", "district": "Pune", "market": "Pune", "commodity": "Rice", "variety": "Fine", "arrival_date": "16/04/2026", "min_price": "2400", "max_price": "2600", "modal_price": "2500"},
            {"state": "Maharashtra", "district": "Nashik", "market": "Nashik", "commodity": "Wheat", "variety": "Common", "arrival_date": "16/04/2026", "min_price": "2100", "max_price": "2200", "modal_price": "2150"},
            {"state": "Maharashtra", "district": "Nagpur", "market": "Nagpur", "commodity": "Maize", "variety": "Hybrid", "arrival_date": "16/04/2026", "min_price": "1800", "max_price": "2000", "modal_price": "1900"}
        ]
        history = {
            "rice": [2410, 2450, 2430, 2480, 2500, 2490, 2520],
            "wheat": [2100, 2120, 2115, 2130, 2125, 2140, 2135],
            "maize": [1850, 1880, 1900, 1920, 1910, 1930, 1950],
            "labels": ["10 Apr", "11 Apr", "12 Apr", "13 Apr", "14 Apr", "15 Apr", "16 Apr"]
        }
        return jsonify({
            "status": "fallback",
            "message": "Connected to demo dataset",
            "data": fallback_data,
            "history": history
        })

# --- Kisan AI Chatbot Backend ---

@app.route('/api/chat', methods=['POST'])
def kisan_chat():
    data = request.get_json()
    message = data.get('message', '')
    lang = data.get('lang', 'en')
    api_key = GROQ_API_KEY
    if not api_key or api_key == "INSERT_YOUR_API_KEY_HERE":
        fallback = "Sorry, the AI backend is missing the GROQ_API_KEY. Get a FREE key at https://console.groq.com/keys"
        if lang == 'hi': fallback = "क्षमा करें, GROQ_API_KEY सेट नहीं है। https://console.groq.com/keys पर मुफ्त कुंजी प्राप्त करें।"
        elif lang == 'mr': fallback = "क्षमस्व, GROQ_API_KEY सेट केलेले नाही. https://console.groq.com/keys वर मोफत की मिळवा."
        return jsonify({"reply": fallback})

    try:
        lang_name = 'Hindi' if lang == 'hi' else 'Marathi' if lang == 'mr' else 'English'
        lang_instruction = (
            f"IMPORTANT LANGUAGE RULE: You MUST reply ONLY in {lang_name}. "
            f"Do NOT use any other language in your response, regardless of what language the farmer used to ask. "
            f"If the farmer wrote in English but the site is set to {lang_name}, still reply fully in {lang_name}.\n\n"
            f"Farmer's Query: {message}"
        )

        payload = json.dumps({
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": lang_instruction}
            ],
            "temperature": 0.7,
            "max_tokens": 1024
        })

        req = urllib.request.Request(
            "https://api.groq.com/openai/v1/chat/completions",
            data=payload.encode('utf-8'),
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }
        )

        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.load(response)
            reply = result['choices'][0]['message']['content']
            return jsonify({"reply": reply})

    except Exception as e:
        print(f"Groq API Error: {e}")
        err = "Oops! I encountered an error connecting to the AI system. Please try again later."
        if lang == 'hi': err = "क्षमा करें! AI सिस्टम से कनेक्ट करने में समस्या हुई। कृपया दोबारा कोशिश करें।"
        elif lang == 'mr': err = "क्षमस्व! AI सिस्टमशी कनेक्ट करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा."
        return jsonify({"reply": err})

# --- Live Weather & Geocoding Logic ---

WMO_CODE_MAP = {
    0: ("Clear Sky", "☀️"), 1: ("Mainly Clear", "🌤️"), 2: ("Partly Cloudy", "⛅"), 3: ("Overcast", "☁️"),
    45: ("Foggy", "🌫️"), 51: ("Light Drizzle", "🌦️"), 61: ("Slight Rain", "🌧️"), 95: ("Thunderstorm", "⛈️")
}

@app.route('/api/weather', methods=['GET'])
def get_weather():
    lat = request.args.get('lat', 18.5204)
    lon = request.args.get('lon', 73.8567)
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,weather_code&daily=precipitation_sum&timezone=auto"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as response:
            data = json.load(response)
            current = data.get('current', {})
            daily = data.get('daily', {})
            status, icon = WMO_CODE_MAP.get(current.get('weather_code', 0), ("Clear", "☀️"))
            
            return jsonify({
                "status": "success",
                "current": {
                    "temp": current.get('temperature_2m'),
                    "humidity": current.get('relative_humidity_2m'),
                    "rainfall": daily.get('precipitation_sum', [0])[0],
                    "status": status, "icon": icon
                }
            })
    except Exception:
        return jsonify({"status": "error", "message": "Weather fetch failed"}), 500

@app.route('/api/geocoding', methods=['GET'])
def get_geocoding():
    lat, lon = request.args.get('lat'), request.args.get('lon')
    if not lat or not lon: return jsonify({"error": "Missing coords"}), 400
    url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'AgroFarmAI/1.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.load(response)
            address = data.get('address', {})
            return jsonify({
                "status": "success",
                "state": address.get('state', address.get('province', '')),
                "district": address.get('district', address.get('county', address.get('city', '')))
            })
    except Exception:
        return jsonify({"status": "error", "message": "Geocoding failed"}), 500

# --- Soil Analysis Routes ---

@app.route('/api/soil-analysis', methods=['POST'])
def save_soil_analysis():
    try:
        data = request.get_json()
        user_email = data.get('userEmail', 'guest@example.com')
        field_name = data.get('fieldName', 'Unknown Field')
        location = data.get('location', '')
        date_val = data.get('date', datetime.now().strftime('%Y-%m-%d'))
        parameters = data.get('parameters', {})

        # ─── Intelligent Crop Matching Logic ───
        params = parameters
        n, p, k = params.get('n', 0), params.get('p', 0), params.get('k', 0)
        ph = params.get('ph', 7.0)
        m = params.get('moisture', 0)
        
        crops_db = [
            {"name": "Wheat", "n": [30, 60], "p": [20, 40], "k": [150, 250], "ph": [6.0, 7.5], "icon": "🌾"},
            {"name": "Rice", "n": [60, 100], "p": [40, 60], "k": [100, 200], "ph": [5.5, 6.5], "icon": "🍚"},
            {"name": "Cotton", "n": [50, 90], "p": [30, 50], "k": [200, 300], "ph": [6.0, 8.5], "icon": "☁️"},
            {"name": "Maize", "n": [80, 120], "p": [40, 70], "k": [150, 200], "ph": [5.8, 7.0], "icon": "🌽"},
            {"name": "Onion", "n": [40, 80], "p": [20, 50], "k": [180, 250], "ph": [6.0, 7.0], "icon": "🧅"},
            {"name": "Tomato", "n": [50, 100], "p": [30, 60], "k": [250, 400], "ph": [6.0, 6.8], "icon": "🍅"}
        ]
        
        scored_crops = []
        for c in crops_db:
            score = 0
            if c['n'][0] <= n <= c['n'][1]: score += 25
            elif abs(n - (c['n'][0]+c['n'][1])/2) < 20: score += 15
            
            if c['p'][0] <= p <= c['p'][1]: score += 25
            
            if c['k'][0] <= k <= c['k'][1]: score += 25
            
            if c['ph'][0] <= ph <= c['ph'][1]: score += 25
            
            scored_crops.append({"name": c['name'], "icon": c['icon'], "score": score})
        
        scored_crops.sort(key=lambda x: x['score'], reverse=True)
        top_crop = scored_crops[0]
        
        # Calculate overall soil health score (legacy)
        health_score = 85
        if ph < 6 or ph > 7.5: health_score -= 15
        if n < 30: health_score -= 10
        if m > 60 or m < 15: health_score -= 10

        rec = f"Highly suited for {top_crop['name']} cultivation. Your soil profile meets {top_crop['score']}% of this crop's optimal requirements."
        if top_crop['score'] < 75:
            rec += f" Consider balancing NPK for better yield."

        analysis = {
            "userEmail": user_email,
            "fieldName": field_name,
            "location": location,
            "date": date_val,
            "parameters": parameters,
            "healthScore": max(0, health_score),
            "recommendation": rec,
            "recommendedCrops": scored_crops[:3],
            "status": "Completed",
            "createdAt": datetime.now().isoformat()
        }

        result = soil_collection.insert_one(analysis)
        analysis['_id'] = str(result.inserted_id)

        return jsonify(analysis), 201
    except Exception as e:
        print(f"Soil analysis error: {e}")
        return jsonify({"error": "Failed to save analysis"}), 500

@app.route('/api/soil-analyses', methods=['GET'])
def get_soil_analyses():
    try:
        email = request.args.get('email', '')
        records = list(soil_collection.find({"userEmail": email}).sort("createdAt", -1))
        for r in records:
            r['_id'] = str(r['_id'])
        return jsonify(records), 200
    except Exception as e:
        print(f"Soil history error: {e}")
        return jsonify({"error": "Failed to fetch history"}), 500

@app.route('/api/dashboard-stats', methods=['GET'])
def get_dashboard_stats():
    try:
        email = request.args.get('email', '')
        commodity_target = request.args.get('commodity', 'Wheat').lower()
        if not email:
            return jsonify({"error": "Email is required"}), 400
            
        # 1. Total Unique Fields
        unique_fields = len(soil_collection.distinct("fieldName", {"userEmail": email}))
        
        # 2. Active Alerts
        alerts_count = soil_collection.count_documents({"userEmail": email, "healthScore": {"$lt": 60}})
        
        # 3. Pending Reports
        pending_count = soil_collection.count_documents({"userEmail": email, "status": "Pending"})
        
        # 4. Market Price (Fetch live price from Gov API)
        api_key = "579b464db66ec23bdd000001f5eaaeee90304bc85dc9d8e36ff44362"
        resource_id = "9ef84268-d588-465a-a308-a864a43d0070"
        url = f"https://api.data.gov.in/resource/{resource_id}?api-key={api_key}&format=json&limit=50"
        
        market_price = "₹2,450" # Default if not found
        actual_commodity = "Wheat"
        
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=5) as resp:
                raw = json.load(resp)
                records = raw.get('records', [])
                for r in records:
                    if r.get('commodity', '').lower() == commodity_target:
                        market_price = f"₹{r.get('modal_price')}"
                        actual_commodity = r.get('commodity')
                        break
        except Exception as e:
            print(f"Mandi fetch error in dashboard stats: {e}")
        
        return jsonify({
            "totalFields": max(1, unique_fields),
            "activeAlerts": alerts_count,
            "pendingReports": pending_count,
            "marketPrice": market_price,
            "commodityName": actual_commodity,
            "userGreeting": "Welcome back!"
        }), 200
    except Exception as e:
        print(f"Dashboard stats error: {e}")
        return jsonify({"error": "Failed to fetch dashboard stats"}), 500

@app.route('/api/profile', methods=['PATCH'])
def update_profile():
    data = request.get_json()
    email = data.get('email')
    
    update_fields = {k: v for k, v in data.items() if k != 'email'}
    result = users_collection.find_one_and_update(
        {"email": email}, 
        {"$set": update_fields},
        return_document=True
    )
    
    if not result:
        # Mock successful update for missing users in hackathon
        return jsonify({
            "message": "Profile updated (mock)",
            "user": {
                "email": email, "role": "farmer",
                "name": f"{data.get('firstName', '')} {data.get('lastName', '')}",
                "phone": data.get('phone', ''), "location": data.get('location', ''),
                "farmName": data.get('farmName', ''), "farmArea": data.get('farmArea', '')
            }
        }), 200
        
    return jsonify({
        "message": "Profile updated",
        "user": {
            "email": result.get('email'), "role": result.get('role'),
            "name": f"{result.get('firstName', '')} {result.get('lastName', '')}",
            "phone": result.get('phone', ''), "location": result.get('location', ''),
            "farmName": result.get('farmName', ''), "farmArea": result.get('farmArea', '')
        }
    }), 200

@app.route('/api/soil-analyses/<id>', methods=['DELETE'])
def delete_soil_analysis(id):
    from bson.objectid import ObjectId
    try:
        soil_collection.delete_one({"_id": ObjectId(id)})
        return jsonify({"message": "Deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to delete"}), 500

@app.route('/api/diagnose', methods=['POST'])
def diagnose_disease():
    import random
    diseases = [
        {"name": "Leaf Rust", "crop": "Wheat", "conf": 92, "severity": "High", "treatment": "Apply Propiconazole 25 EC", "prevention": "Use resistant varieties"},
        {"name": "Brown Spot", "crop": "Rice", "conf": 87, "severity": "Medium", "treatment": "Spray Tricyclazole 75% WP", "prevention": "Seed treatment"},
        {"name": "Healthy Crop", "crop": "General", "conf": 96, "severity": "None", "treatment": "No treatment required", "prevention": "Maintain soil health"}
    ]
    file = request.files.get('cropImage')
    seed = len(file.read()) % len(diseases) if file else random.randint(0, len(diseases)-1)
    res = diseases[seed]
    
    import time
    return jsonify({
        "success": True, "disease": res["name"], "crop": res["crop"], "confidence": res["conf"],
        "severity": res["severity"], "treatment": res["treatment"], "prevention": res["prevention"],
        "scanId": f"DX-{int(time.time())}"
    }), 200

@app.route('/upload-soil-card', methods=['POST'])
def upload_soil_card():
    file = request.files.get('soilCard')
    if not file: return jsonify({"error": "No file uploaded"}), 400
    
    seed = (ord(file.filename[0]) if file.filename else 65) % 5
    presets = [
        {"n": 44, "p": 26, "k": 188, "ph": 6.7, "oc": 0.82},
        {"n": 38, "p": 31, "k": 210, "ph": 7.1, "oc": 0.65},
        {"n": 52, "p": 18, "k": 175, "ph": 6.3, "oc": 1.10},
        {"n": 29, "p": 24, "k": 195, "ph": 7.5, "oc": 0.48},
        {"n": 60, "p": 35, "k": 220, "ph": 6.9, "oc": 1.35}
    ]
    
    return jsonify({
        "success": True, "filename": file.filename,
        "sizeKB": round(len(file.read())/1024, 1),
        "extracted": presets[seed], "source": "simulated_ocr"
    }), 200

@app.route('/api/f2b/listings', methods=['GET', 'POST'])
def f2b_listings():
    if request.method == 'GET':
        records = list(f2b_collection.find({"status": "Active"}).sort("_id", -1).limit(20))
        for r in records: r['_id'] = str(r['_id'])
        return jsonify(records), 200
        
    if request.method == 'POST':
        data = request.get_json()
        if not data.get('crop') or not data.get('quantity') or not data.get('price'):
            return jsonify({"error": "crop, quantity and price required"}), 400
            
        listing = {
            "farmerEmail": data.get('farmerEmail'), "farmerName": data.get('farmerName', 'Farmer'),
            "crop": data.get('crop'), "quantity": data.get('quantity'), "unit": data.get('unit', 'Quintals'),
            "grade": data.get('grade', 'Standard'), "price": data.get('price'),
            "location": data.get('location', ''), "status": "Active", "createdAt": datetime.now().isoformat()
        }
        res = f2b_collection.insert_one(listing)
        listing['_id'] = str(res.inserted_id)
        return jsonify({"message": "Listing published successfully", "listing": listing}), 201

@app.route('/api/f2b/listings/<id>', methods=['DELETE'])
def drop_f2b_listing(id):
    from bson.objectid import ObjectId
    f2b_collection.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Listing removed"}), 200

@app.route('/api/newsletter', methods=['POST'])
def subscribe_newsletter():
    email = request.get_json().get('email')
    if not email: return jsonify({"error": "Email required"}), 400
    if newsletter_collection.find_one({"email": email}):
        return jsonify({"message": "Already subscribed!"}), 200
    newsletter_collection.insert_one({"email": email, "createdAt": datetime.now().isoformat()})
    return jsonify({"message": "Subscribed successfully! Welcome to AgroFarm AI."}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)