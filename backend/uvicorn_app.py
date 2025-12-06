# uvicorn_app.py
"""
Heart Disease Prediction API with MongoDB storage
Author: Your Name
License: Apache 2.0
"""

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from joblib import load
from pydantic import BaseModel
from datetime import datetime
import pandas as pd
from pathlib import Path
import os
from dotenv import load_dotenv

# MongoDB async client
from motor.motor_asyncio import AsyncIOMotorClient

# -------------------- Load Environment --------------------
load_dotenv()  # loads .env file

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("MONGO_DB", "heart_disease")
COLLECTION_NAME = os.getenv("MONGO_COLLECTION", "predictions")

EXPORT_DIR = Path(__file__).parent / "exports"
EXPORT_DIR.mkdir(exist_ok=True)

# -------------------- MongoDB Setup --------------------
client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# -------------------- FastAPI Setup --------------------
app = FastAPI(
    title="Heart Disease Prediction API",
    description="Predict heart disease and store real-time data in MongoDB"
)

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Pydantic Request Model --------------------
class HeartDiseaseRequest(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

# -------------------- Load ML Model --------------------
MODEL_PATH = Path(__file__).parent / "models" / "heart_model.joblib"
model = load(MODEL_PATH)

# -------------------- Routes --------------------
@app.get("/")
def home():
    return {"message": "Heart Disease Prediction API is running ✅"}

@app.post("/predict")
async def predict(input_data: HeartDiseaseRequest):
    features = [[
        input_data.age,
        input_data.sex,
        input_data.cp,
        input_data.trestbps,
        input_data.chol,
        input_data.fbs,
        input_data.restecg,
        input_data.thalach,
        input_data.exang,
        input_data.oldpeak,
        input_data.slope,
        input_data.ca,
        input_data.thal
    ]]

    prediction = int(model.predict(features)[0])
    probability = float(model.predict_proba(features)[0][1])

    document = {
        "inputData": input_data.dict(),
        "prediction": prediction,
        "probability": probability,
        "createdAt": datetime.utcnow()
    }

    # ✅ Prevent duplicates (optional)
    exists = await collection.find_one({"inputData": input_data.dict()})
    if not exists:
        await collection.insert_one(document)

    return {
        "prediction": prediction,
        "probability": probability
    }

@app.get("/export-csv")
async def export_csv():
    """Developer-only endpoint to export all stored predictions"""
    cursor = collection.find({})
    docs = await cursor.to_list(length=10000)

    if not docs:
        return {"message": "No prediction data found"}

    rows = []
    for item in docs:
        row = item["inputData"]
        row["prediction"] = item["prediction"]
        row["probability"] = item["probability"]
        row["createdAt"] = item["createdAt"]
        rows.append(row)

    df = pd.DataFrame(rows)
    export_path = EXPORT_DIR / "predictions.csv"
    df.to_csv(export_path, index=False)

    csv_data = df.to_csv(index=False)
    headers = {"Content-Disposition": f"attachment; filename=predictions.csv"}
    return Response(content=csv_data, media_type="text/csv", headers=headers)

# -------------------- Run Server --------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
