# database.py
from motor.motor_asyncio import AsyncIOMotorClient
import os
from urllib.parse import quote_plus


username = quote_plus(os.getenv("MONGO_USERNAME"))
password = quote_plus(os.getenv("MONGO_PASSWORD"))
cluster = os.getenv("MONGO_CLUSTER")

MONGO_URI = f"mongodb+srv://{username}:{password}@{cluster}.mongodb.net/?retryWrites=true&w=majority"

client = AsyncIOMotorClient(MONGO_URI)
db = client[os.getenv("MONGO_DB", "heart_disease")]
collection = db[os.getenv("MONGO_COLLECTION", "predictions")]
