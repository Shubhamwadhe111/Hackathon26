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
import google.generativeai as genai

app = Flask(__name__)
CORS(app) # Allow frontend to call the backend

genai.configure(api_key=os.environ.get("GEMINI_API_KEY", ""))

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
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key or api_key == "INSERT_YOUR_API_KEY_HERE":
        fallback = "Sorry, the AI backend is missing the GEMINI_API_KEY environment variable. Please set it!"
        if lang == 'hi': fallback = "क्षमा करें, AI बैकएंड में GEMINI_API_KEY सेट नहीं है।"
        elif lang == 'mr': fallback = "क्षमस्व, एआय बॅकएंडमध्ये GEMINI_API_KEY सेट केलेले नाही."
        return jsonify({"reply": fallback})

    try:
        model = genai.GenerativeModel(
            'gemini-1.5-flash',
            system_instruction=SYSTEM_PROMPT
        )
        lang_name = 'Hindi' if lang == 'hi' else 'Marathi' if lang == 'mr' else 'English'
        lang_instruction = (
            f"IMPORTANT LANGUAGE RULE: You MUST reply ONLY in {lang_name}. "
            f"Do NOT use any other language in your response, regardless of what language the farmer used to ask. "
            f"If the farmer wrote in English but the site is set to {lang_name}, still reply fully in {lang_name}.\n\n"
            f"Farmer's Query: {message}"
        )
        response = model.generate_content(lang_instruction)
        return jsonify({"reply": response.text})
    except Exception as e:
        print(f"Gemini API Error: {e}")
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)