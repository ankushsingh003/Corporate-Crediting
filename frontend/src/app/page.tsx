'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, BarChart3, ShieldCheck, ChevronRight, ChevronLeft, Send } from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';
import RiskRadar from '../components/RiskRadar';

export default function Dashboard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    current_assets: 500000,
    current_liabilities: 200000,
    inventory: 50000,
    total_debt: 300000,
    equity: 400000,
    ebit: 120000,
    interest_expense: 15000,
    net_sales: 800000,
    net_profit: 90000,
    total_assets: 1000000,
    average_inventory: 45000,
    average_debtors: 60000
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Real-world integration with FastAPI
    try {
      const response = await fetch('http://localhost:8000/api/v1/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("API Error - falling back to simulated logic for preview", err);
      // Simulate API response if backend not running (for UI demo)
      setResult({
        prediction: { score: 782, risk_level: "Low", recommendation: "Strong performance across indices." },
        ratios: { current_ratio: 1.8, debt_equity_ratio: 0.75, net_profit_margin: 11.2 }
      });
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <ShieldCheck className="text-cyan-400 w-10 h-10" />
              Corporate<span className="text-cyan-400">Crediting.</span>
            </h1>
            <p className="text-slate-400 mt-2">Next-Gen CMA & ML Powered Insolvency Prediction</p>
          </div>
          <div className="flex gap-4">
            <button className="glass-card px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition">Reports</button>
            <button className="neon-border bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-xl text-sm font-medium">New Analysis</button>
          </div>
        </header>

        {!result ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="text-cyan-400" />
                Financial Input System
              </h2>
              <div className="glass-card rounded-[2rem] p-8 space-y-6">
                {/* Multi-step form simplified for single view in this artifact */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(formData).map(key => (
                    <div key={key} className="space-y-1">
                      <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">{key.replace(/_/g, ' ')}</label>
                      <input
                        type="number"
                        value={(formData as any)[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: Number(e.target.value) })}
                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg p-2 text-sm focus:border-cyan-500/50 outline-none transition"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 py-4 rounded-2xl font-bold text-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? "Processing AI Analysis..." : "Generate Credit Score"}
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
            <div className="flex items-center justify-center">
              <div className="text-center opacity-40">
                <BarChart3 className="w-32 h-32 mx-auto mb-4 text-slate-700" />
                <p className="text-xl font-medium">Ready for real-time risk assessment</p>
                <p className="text-sm mt-2">Input financial data to trigger the ML scoring engine</p>
              </div>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ScoreGauge score={result.prediction.score} level={result.prediction.risk_level} />
              <div className="glass-card mt-6 p-6 rounded-3xl">
                <h3 className="font-bold text-cyan-400 mb-2">AI Recommendation</h3>
                <p className="text-slate-300 text-sm italic">"{result.prediction.recommendation}"</p>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-8">
              <RiskRadar ratios={result.ratios} />
              <div className="glass-card p-8 rounded-3xl grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-xs uppercase text-slate-500 mb-1">Current Ratio</p>
                  <p className="text-2xl font-bold text-white">{result.ratios.current_ratio}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs uppercase text-slate-500 mb-1">Debt-Equity</p>
                  <p className="text-2xl font-bold text-white">{result.ratios.debt_equity_ratio}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs uppercase text-slate-500 mb-1">Profit Margin</p>
                  <p className="text-2xl font-bold text-white">{result.ratios.net_profit_margin}%</p>
                </div>
              </div>
              <button
                onClick={() => setResult(null)}
                className="text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Reset Analysis
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
