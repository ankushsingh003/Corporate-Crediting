from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from engines.cma_engine import CMARatioEngine, FinancialData
from ml.ml_model import InsolvencyModel
import uvicorn

app = FastAPI(title="Corporate Credit Scoring API", version="1.0.0")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ml_model = InsolvencyModel()

@app.get("/")
async def root():
    return {"message": "Welcome to the Automated Corporate Credit Scoring API"}

@app.post("/api/v1/score")
async def calculate_credit_score(data: FinancialData):
    try:
        # 1. Calculate CMA Ratios
        ratios = CMARatioEngine.calculate_ratios(data)
        
        # 2. Predict Risk using ML Model
        prediction = ml_model.predict_risk(ratios)
        
        return {
            "ratios": ratios,
            "prediction": prediction,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
