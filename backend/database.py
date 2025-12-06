from motor.motor_asyncio import AsyncIOMotorClient
from urllib.parse import quote_plus
from dotenv import load_dotenv
import os

load_dotenv()  # load variables from .env

username = quote_plus(os.getenv("MONGO_USER"))
password = quote_plus(os.getenv("MONGO_PASS"))
cluster = os.getenv("MONGO_CLUSTER")

MONGO_URI = f"mongodb+srv://{username}:{password}@{cluster}/?retryWrites=true&w=majority"

client = AsyncIOMotorClient(MONGO_URI)
db = client["heartDB"]
collection = db["patient_data"]
