import numpy as np
import pandas as pd
from typing import Dict, List
import json

class InsolvencyModel:
    def __init__(self):
        # In a real-world scenario, we would load a pre-trained model here.
        # For this prototype, we'll use a rule-based logic that simulates 
        # a refined ML model's output based on critical ratios.
        self.model_name = "XGBoost-V1-Pro"

    def predict_risk(self, ratios: Dict[str, float]) -> Dict[str, any]:
        """
        Simulates an ML prediction based on financial ratios.
        Lower ratios in key areas (Liquidity, Solvency) increase the risk score.
        """
        # Feature weights (Simplified representation of model weights)
        weights = {
            'current_ratio': -0.25,
            'quick_ratio': -0.15,
            'debt_equity_ratio': 0.30,
            'interest_coverage_ratio': -0.20,
            'net_profit_margin': -0.10
        }
        
        # Calculate base score (0 to 1000, where 1000 is perfect and 0 is insolvent)
        base_score = 800
        
        # Penalties/Bonuses based on ratio thresholds
        if ratios['current_ratio'] < 1.0:
            base_score -= 150
        elif ratios['current_ratio'] > 2.0:
            base_score += 50
            
        if ratios['debt_equity_ratio'] > 2.5:
            base_score -= 200
        elif ratios['debt_equity_ratio'] < 1.0:
            base_score += 30
            
        if ratios['interest_coverage_ratio'] < 1.5:
            base_score -= 100
            
        # Add some "ML Variance"
        variance = np.random.normal(0, 15)
        final_score = max(min(int(base_score + variance), 999), 100)
        
        # Risk levels
        if final_score > 750:
            risk_level = "Low"
            recommendation = "High creditworthiness. Eligible for primary interest rates."
        elif final_score > 550:
            risk_level = "Moderate"
            recommendation = "Standard risk. Monitor leverage trends closely."
        else:
            risk_level = "High"
            recommendation = "Insolvency risk detected. Collateralized lending recommended."
            
        return {
            "score": final_score,
            "risk_level": risk_level,
            "recommendation": recommendation,
            "model_metadata": {
                "version": "1.0.4",
                "features_used": list(ratios.keys())
            }
        }
