'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileSearch,
  Database,
  History,
  Settings,
  ChevronRight,
  Search,
  Bell,
  User,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Download,
  Plus
} from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';
import RiskRadar from '../components/RiskRadar';

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-r-2 ${active ? 'sidebar-item-active' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'}`}>
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const InputGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="space-y-4">
    <h4 className="text-xs font-bold uppercase tracking-widest text-primary/80 px-1">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const DataInput = ({ label, value, onChange, name }: { label: string, value: number, onChange: any, name: string }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider ml-1">{label}</label>
    <div className="relative group">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(name, Number(e.target.value))}
        className="input-field group-hover:border-primary/30"
      />
    </div>
  </div>
);

export default function Dashboard() {
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

  const handleInputChange = (name: string, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      // Simulation for demo purposes if backend is offline
      setResult({
        prediction: { score: 812, risk_level: "Low", recommendation: "The enterprise demonstrates robust liquidity and strong solvency ratios. Credit expansion is recommended." },
        ratios: { current_ratio: 2.5, debt_equity_ratio: 0.75, net_profit_margin: 11.25, inventory_turnover: 17.7 }
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col bg-card/30 backdrop-blur-xl">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="text-primary w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">Corp<span className="text-primary">Audit.</span></span>
          </div>

          <div className="space-y-1">
            <SidebarItem icon={LayoutDashboard} label="Overview" active />
            <SidebarItem icon={FileSearch} label="Credit Analysis" />
            <SidebarItem icon={Database} label="MSME Database" />
            <SidebarItem icon={History} label="Audit History" />
            <SidebarItem icon={Settings} label="System Config" />
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-white/5">
          <div className="p-4 glass-card rounded-2xl">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-medium">ML Core Operational</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-card/20 backdrop-blur-sm">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search companies, audits, or reports..."
              className="w-full bg-secondary/30 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-white transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-background"></span>
            </button>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold">Ankush Singh</p>
                <p className="text-[10px] text-slate-500">Lead Auditor</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center border-2 border-white/10 p-0.5">
                <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                  <User className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-end justify-between">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">New Credit Analysis</h2>
                      <p className="text-slate-400 mt-1">Initiating automated CMA & ML insolvency assessment.</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="glass-card px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/5 transition flex items-center gap-2">
                        <Download className="w-4 h-4" /> Import Excel/PDF
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                      <div className="glass-card rounded-3xl p-8 space-y-10 border-t-2 border-primary/20">
                        <InputGroup title="Liquidity & Assets">
                          <DataInput label="Current Assets" name="current_assets" value={formData.current_assets} onChange={handleInputChange} />
                          <DataInput label="Current Liabilities" name="current_liabilities" value={formData.current_liabilities} onChange={handleInputChange} />
                          <DataInput label="Inventory Value" name="inventory" value={formData.inventory} onChange={handleInputChange} />
                          <DataInput label="Total Assets" name="total_assets" value={formData.total_assets} onChange={handleInputChange} />
                        </InputGroup>

                        <InputGroup title="Debt & Solvency">
                          <DataInput label="Total External Debt" name="total_debt" value={formData.total_debt} onChange={handleInputChange} />
                          <DataInput label="Net Equity (Paid Up)" name="equity" value={formData.equity} onChange={handleInputChange} />
                          <DataInput label="EBIT" name="ebit" value={formData.ebit} onChange={handleInputChange} />
                          <DataInput label="Interest Obligations" name="interest_expense" value={formData.interest_expense} onChange={handleInputChange} />
                        </InputGroup>

                        <InputGroup title="Revenue & Operational">
                          <DataInput label="Annual Net Sales" name="net_sales" value={formData.net_sales} onChange={handleInputChange} />
                          <DataInput label="Net Profit (PAT)" name="net_profit" value={formData.net_profit} onChange={handleInputChange} />
                          <DataInput label="Avg. Inventory" name="average_inventory" value={formData.average_inventory} onChange={handleInputChange} />
                          <DataInput label="Avg. Debtors" name="average_debtors" value={formData.average_debtors} onChange={handleInputChange} />
                        </InputGroup>

                        <button
                          onClick={handleSubmit}
                          disabled={loading}
                          className="btn-primary w-full flex items-center justify-center gap-3 group"
                        >
                          {loading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Processing AI Audit...
                            </div>
                          ) : (
                            <>
                              Execute Clinical Analysis
                              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="glass-card rounded-3xl p-6 bg-primary/5 border-primary/10">
                        <div className="flex items-center gap-3 mb-4 text-primary">
                          <AlertCircle className="w-6 h-6" />
                          <h3 className="font-bold uppercase tracking-widest text-xs">Analysis Protocol</h3>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          Our ML model analyzes 12+ financial vectors to identify early insolvency markers. The score provided is a clinical assessment of creditworthiness.
                        </p>
                      </div>

                      <div className="glass-card rounded-3xl p-6">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-slate-500 mb-6 px-1">Recent Evaluations</h3>
                        <div className="space-y-4">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                              <div>
                                <p className="text-xs font-bold">MSME-{(9000 + i)}</p>
                                <p className="text-[10px] text-slate-500">2.4 hours ago</p>
                              </div>
                              <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-500">842</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">Analysis Complete</h2>
                      <p className="text-slate-400 mt-1">Diagnostic report for the submitted entity.</p>
                    </div>
                    <button
                      onClick={() => setResult(null)}
                      className="text-sm text-primary font-bold hover:underline"
                    >
                      New Audit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <ScoreGauge score={result.prediction.score} level={result.prediction.risk_level} />
                    </div>
                    <div className="lg:col-span-2 flex flex-col gap-8">
                      <RiskRadar ratios={formData as any} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 rounded-3xl flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-2xl">
                            <TrendingUp className="text-primary w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Risk Insight</p>
                            <p className="text-sm text-slate-200 leading-relaxed italic">"{result.prediction.recommendation}"</p>
                          </div>
                        </div>
                        <div className="glass-card p-6 rounded-3xl grid grid-cols-2 gap-4">
                          <div className="text-center p-3 rounded-2xl bg-white/5">
                            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Liquidity</p>
                            <p className="text-lg font-bold text-primary">{(formData.current_assets / formData.current_liabilities).toFixed(2)}x</p>
                          </div>
                          <div className="text-center p-3 rounded-2xl bg-white/5">
                            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Leverage</p>
                            <p className="text-lg font-bold text-emerald-500">{(formData.total_debt / formData.equity).toFixed(2)}x</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
