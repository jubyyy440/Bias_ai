import bcrypt
import jwt
import os
from flask import request, jsonify
from functools import wraps
from datetime import datetime, timedelta

SECRET = os.getenv("JWT_SECRET")

def hash_password(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode(), hashed.encode())

def generate_token(user_id, name):
    payload = {
        "user_id": str(user_id),
        "name": name,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[-1]
        if not token:
            return jsonify({"msg": "Token is missing"}), 403
        try:
            data = jwt.decode(token, SECRET, algorithms=["HS256"])
            user_id = data['user_id']
            name = data['name']
        except Exception:
            return jsonify({"msg": "Invalid token"}), 403
        return f(user_id, name, *args, **kwargs)
    return decorated
