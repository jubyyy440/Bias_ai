from flask import Blueprint, request, jsonify
from services.db import users_collection
from services.auth import hash_password, verify_password, generate_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if users_collection.find_one({"email": data['email']}):
        return jsonify({"msg": "User already exists"}), 409
    hashed_pw = hash_password(data['password'])
    user = {"name": data['name'], "email": data['email'], "password": hashed_pw}
    users_collection.insert_one(user)
    return jsonify({"msg": "User registered successfully"})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = users_collection.find_one({"email": data['email']})
    if not user or not verify_password(data['password'], user['password']):
        return jsonify({"msg": "Invalid credentials"}), 401
    token = generate_token(user['_id'], user['name'])
    return jsonify({"token": token, "name": user['name']})