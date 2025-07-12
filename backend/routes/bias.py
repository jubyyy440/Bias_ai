from flask import Blueprint, request, jsonify
from services.auth import token_required
from services.db import history_collection
import datetime
import os
import requests
from dotenv import load_dotenv
import traceback

load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")
HF_MODEL = "unitary/unbiased-toxic-roberta"  # Or another supported model
HF_API_URL = f"https://api-inference.huggingface.co/models/{HF_MODEL}"

bias_bp = Blueprint('bias', __name__)

@bias_bp.route('/analyze', methods=['POST'])
@token_required
def analyze(user_id, user_name):
    data = request.get_json()
    text = data.get('text', '').strip()

    if not text:
        return jsonify({"error": "No input text provided."}), 400

    print("[📦] ENV CHECK (HF):", HF_API_KEY[:10] + "... (hidden)")

    try:
        headers = {"Authorization": f"Bearer {HF_API_KEY}"}
        payload = {"inputs": text}
        response = requests.post(HF_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        predictions = response.json()

        # Example handling (modify depending on model output)
        if isinstance(predictions, list) and predictions and isinstance(predictions[0], list):
            label = predictions[0][0].get("label", "Unknown")
            score = round(predictions[0][0].get("score", 0) * 100, 2)
        else:
            label = "Unknown"
            score = 0

        result = {
            "bias_type": label,
            "confidence": f"{score}%"
        }

        history_collection.insert_one({
            "user_id": user_id,
            "text": text,
            "bias_type": result['bias_type'],
            "confidence": result['confidence'],
            "model": HF_MODEL,
            "timestamp": datetime.datetime.utcnow()
        })

        return jsonify(result)

    except requests.exceptions.RequestException as e:
        print("[❌ Hugging Face API ERROR]", str(e))
        traceback.print_exc()
        return jsonify({
            "bias_type": "Error",
            "confidence": "0%",
            "error": str(e)
        }), 500
