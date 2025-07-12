from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.bias import bias_bp
from routes.user import user_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(bias_bp, url_prefix="/bias")
app.register_blueprint(user_bp, url_prefix="/user")

if os.getenv("HF_API_KEY"):
    print("[📦] Hugging Face Key Loaded:", os.getenv("HF_API_KEY")[:10] + "... (hidden)")
elif os.getenv("OPENAI_API_KEY"):
    print("[🔑] OpenAI Key Loaded:", os.getenv("OPENAI_API_KEY")[:10] + "... (hidden)")
else:
    print("[⚠️] No API key found in environment")

print("[🚀] Starting BiasShield API server")

if __name__ == "__main__":
    app.run(debug=True)