from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from joblib import load
from pydantic import BaseModel
from database import collection
from datetime import datetime
import pandas as pd
from pathlib import Path

app = FastAPI(
    title="Heart Disease Prediction API",
    description="Predict heart disease using FastAPI"
)

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Pydantic Model ----------
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

# ---------- Load ML Model ----------
model_path = Path(__file__).parent / "models/heart_model.joblib"
model = load(model_path)

# ---------- Routes ----------
@app.get("/")
def home():
    return {"message": "Welcome to Heart Disease Prediction API!"}

@app.post("/predict")
async def predict(input_data: HeartDiseaseRequest):
    features = [
        input_data.age, input_data.sex, input_data.cp, input_data.trestbps,
        input_data.chol, input_data.fbs, input_data.restecg, input_data.thalach,
        input_data.exang, input_data.oldpeak, input_data.slope, input_data.ca,
        input_data.thal
    ]
    prediction = model.predict([features])[0].item()
    probability = model.predict_proba([features])[0][1].item()

    # Save to MongoDB
    doc = {
        "inputData": input_data.dict(),
        "prediction": prediction,
        "probability": probability,
        "createdAt": datetime.utcnow()
    }
    await collection.insert_one(doc)

    return {"prediction": prediction, "probability": probability}

@app.get("/export-csv")
async def export_csv():
    cursor = collection.find({})
    docs = await cursor.to_list(length=10000)

    if not docs:
        return {"message": "No prediction data found"}

    # Flatten documents
    rows = []
    for item in docs:
        row = {**item["inputData"]}
        row["prediction"] = item["prediction"]
        row["probability"] = item["probability"]
        row["createdAt"] = item["createdAt"]
        rows.append(row)

    df = pd.DataFrame(rows)
    csv_data = df.to_csv(index=False)

    headers = {"Content-Disposition": "attachment; filename=predictions.csv"}
    return Response(content=csv_data, media_type="text/csv", headers=headers)

# ---------- Run server ----------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
