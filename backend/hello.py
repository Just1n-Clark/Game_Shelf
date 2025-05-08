from flask import Flask, send_from_directory
from flask_restful import Api

import requests
import os

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
api = Api(app)

API_URL = 'https://cheapshark.com/api/1.0/'

# API routes go here, prefixed with /api
@app.route('/api/games', methods=['GET'])
def get_game_data():
    response = requests.get(API_URL + 'games?title=batman&limit=5')
    return response.json()

@app.route('/api/stores', methods=['GET'])
def get_store_data():
    response = requests.get(API_URL + 'stores?limit=5')
    return response.json()

# Catrch-all route for serving the frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder + '/' + path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
