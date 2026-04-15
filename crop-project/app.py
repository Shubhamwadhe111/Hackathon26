from flask import Flask, request, jsonify

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)