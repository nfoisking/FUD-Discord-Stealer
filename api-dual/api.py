from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

url = "YOUR_SHIT_WEBHOOK_API"

@app.route('/ilovedicklol', methods=['POST'])
def proxy_discord_webhook():
    if not request.json:
        return jsonify({"error": "invalid webhook lol"}), 400
    response = requests.post(url, json=request.json)
    if response.status_code == 204:
        return jsonify({"message": "sended"}), 200
    else:
        return jsonify({"error": "idk"}), 500

if __name__ == '__main__':
    app.run('0.0.0.0', 0123)
