from pydantic import BaseModel
from typing import Dict

class FinancialData(BaseModel):
    current_assets: float
    current_liabilities: float
    inventory: float
    total_debt: float
    equity: float
    ebit: float
    interest_expense: float
    net_sales: float
    net_profit: float
    total_assets: float
    average_inventory: float
    average_debtors: float

class CMARatioEngine:
    @staticmethod
    def calculate_ratios(data: FinancialData) -> Dict[str, float]:
        ratios = {}
        
        # Liquidity Ratios
        ratios['current_ratio'] = data.current_assets / data.current_assets if data.current_assets > 0 else 0
        ratios['quick_ratio'] = (data.current_assets - data.inventory) / data.current_liabilities if data.current_liabilities > 0 else 0
        
        # Solvency Ratios
        ratios['debt_equity_ratio'] = data.total_debt / data.equity if data.equity > 0 else 0
        ratios['interest_coverage_ratio'] = data.ebit / data.interest_expense if data.interest_expense > 0 else 0
        
        # Profitability Ratios
        ratios['net_profit_margin'] = (data.net_profit / data.net_sales) * 100 if data.net_sales > 0 else 0
        ratios['return_on_assets'] = (data.net_profit / data.total_assets) * 100 if data.total_assets > 0 else 0
        
        # Efficiency Ratios
        ratios['inventory_turnover'] = data.net_sales / data.average_inventory if data.average_inventory > 0 else 0
        ratios['debtors_turnover'] = data.net_sales / data.average_debtors if data.average_debtors > 0 else 0
        
        return {k: round(v, 2) for k, v in ratios.items()}
