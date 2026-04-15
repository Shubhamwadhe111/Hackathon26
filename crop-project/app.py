from flask import Flask, request, jsonify
from pymongo import MongoClient
import urllib.parse
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Allow frontend to call the backend

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

    # Dummy logic
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
    del user_data['password']
    del user_data['_id']
    
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)