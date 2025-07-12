from flask import Blueprint, jsonify
from services.auth import token_required
from services.db import history_collection

user_bp = Blueprint('user', __name__)

@user_bp.route('/history', methods=['GET'])
@token_required
def history(user_id, user_name):
    records = list(history_collection.find({"user_id": user_id}))
    for r in records:
        r['_id'] = str(r['_id'])
        r['timestamp'] = r['timestamp'].isoformat()
    return jsonify(records)