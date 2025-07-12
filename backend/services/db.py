import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database("bias_db")

users_collection = db.users
history_collection = db.history