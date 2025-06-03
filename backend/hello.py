from flask import Flask, send_from_directory, jsonify
from flask_restful import Api
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from flask import request

import requests
import os

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
api = Api(app)

sample_games = [
    {
        "gameID":"612",
        "steamAppID":None,
        "cheapest":"15.95",
        "cheapestDealID":"0f%2B4gT2VVUn4UcmFzPxXnuqoXKAOYoJ5mpFZRWNyohc%3D",
        "external":"LEGO Batman",
        "internalName":"LEGOBATMAN",
        "thumb":"https:\/\/cdn.fanatical.com\/production\/product\/400x225\/105f34ca-7757-47ad-953e-7df7f016741e.jpeg"
    },
    {
        "gameID":"167613",
        "steamAppID":None,
        "cheapest":"15.95",
        "cheapestDealID":"2XSMlnYtPjLoKI9g2vhZch9deHZ%2BE%2BpL7IoBprkWtgM%3D",
        "external":"LEGO Batman 2",
        "internalName":"LEGOBATMAN2",
        "thumb":"https:\/\/cdn.fanatical.com\/production\/product\/400x225\/4cf0701e-77bf-4539-bda7-129ab3e81f8b.jpeg"
    },
]

API_URL = 'https://cheapshark.com/api/1.0/'

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["60 per minute"]
)

# Test API
@app.route('/api/cheapshark')
def cheapshark_proxy():
    return jsonify(sample_games)

# API for games, takes 'title' and 'limit' params
@app.route('/api/games', methods=['GET'])
def get_game_data():
    title = request.args.get('title', 'batman')
    limit = request.args.get('limit', 5)
    response = requests.get(API_URL + f'games?title={title}&limit={limit}')
    return response.json()

# API for stores, takes 'limit' params
@app.route('/api/stores', methods=['GET'])
def get_store_data():
    limit = request.args.get('limit', 10)
    response = requests.get(API_URL + f'stores?limit={limit}')
    return response.json()

# Catch-all route for serving the frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder + '/' + path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
