from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_async_client import AsyncIOMotorClient
from pydantic import BaseModel
import uvicorn
import io
import os
from datetime import datetime
from model_loader import load_all_models
from preprocessing import preprocess_image
from inference import run_classification, run_segmentation

app = FastAPI(title="Multi-Cancer Disease Detection System")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Models and Config
MODELS = {}
CONFIG = {}

@app.on_event("startup")
async def startup_event():
    global MODELS, CONFIG
    MODELS, CONFIG = load_all_models()
    print("All models loaded successfully.")

# MongoDB setup 
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGODB_URL)
db = client.cancer_detection_db

@app.get("/")
async def root():
    return {"message": "Welcome to the Multi-Cancer Disease Detection API"}

@app.get("/models")
async def get_models_info():
    return CONFIG

@app.post("/predict/{model_key}")
async def predict(model_key: str, file: UploadFile = File(...)):
    if model_key not in MODELS:
        raise HTTPException(status_code=404, detail="Model not found")
    
    model = MODELS[model_key]
    if model is None:
        raise HTTPException(status_code=503, detail="Model failed to load at startup")
    
    config = CONFIG[model_key]
    
    try:
        content = await file.read()
        image_bytes = io.BytesIO(content)
        
        input_tensor, original_image = preprocess_image(image_bytes, config)
        
        if config["type"] == "classification":
            result = run_classification(model, input_tensor, config["classes"], original_image)
        else:
            result = run_segmentation(model, input_tensor, original_image)
            
        # Store in history (Optional)
        history_entry = {
            "model_key": model_key,
            "timestamp": datetime.utcnow().isoformat(),
            "result": result,
            "filename": file.filename
        }
        await db.history.insert_one(history_entry)
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history")
async def get_history():
    cursor = db.history.find().sort("timestamp", -1).limit(50)
    history = []
    async for document in cursor:
        document["_id"] = str(document["_id"])
        history.append(document)
    return history

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
