from flask import Flask, jsonify, request
from flask_cors import CORS  
import requests

app = Flask(__name__)
CORS(app, resources={r"/user": {"origins": "http://localhost:3000"}}) 

@app.route("/user", methods=["GET"])
def get_user():
    gender = request.args.get('gender')  
    base_url = "https://randomuser.me/api/"

    if gender:
        return requests.get(f"{base_url}?gender={gender}").content
    else:
        return requests.get(base_url).content