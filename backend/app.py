from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route("/", methods=["GET"])
def home():
    return {"message": "Flask backend is running!"}

@app.route('/submit', methods=['POST'])
def submit():
   
    if request.is_json:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
    else:
        name = request.form.get('name')
        email = request.form.get('email')

    print(f"Received from frontend: Name = {name}, Email = {email}")

    return jsonify({
        'message': 'Data received successfully!',
        'name': name,
        'email': email
    })

if __name__ == '__main__':    
    app.run(host='0.0.0.0', port=5000, debug=True)
