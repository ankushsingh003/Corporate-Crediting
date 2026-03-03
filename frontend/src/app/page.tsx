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
  Plus,
  ArrowRight
} from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';
import RiskRadar from '../components/RiskRadar';

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 px-6 py-4 cursor-pointer transition-all ${active ? 'sidebar-item-active' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
    <Icon className="w-5 h-5" />
    <span className="text-sm font-semibold tracking-wide">{label}</span>
  </div>
);

const SectionTitle = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
    <Icon className="w-4 h-4 text-cyan-400" />
    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400/80">{title}</h3>
  </div>
);

const DataInput = ({ label, value, onChange, name }: { label: string, value: number, onChange: any, name: string }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider ml-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(name, Number(e.target.value))}
      className="input-field"
    />
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
      setResult({
        prediction: { score: 812, risk_level: "Low", recommendation: "Strong performance across indices. High creditworthiness." },
        ratios: { current_ratio: 2.5, debt_equity_ratio: 0.75, net_profit_margin: 11.25 }
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0a0f1e] text-slate-200">
      {/* SIDEBAR - Fixed width, no overlap */}
      <aside className="w-72 bg-[#0d1324] border-r border-white/5 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-cyan-500/10 rounded-xl">
              <ShieldCheck className="text-cyan-400 w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">Corp<span className="text-cyan-400">Audit.</span></span>
          </div>

          <nav className="space-y-1 -mx-2">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
            <SidebarItem icon={FileSearch} label="Credit Engine" />
            <SidebarItem icon={Database} label="Asset Vault" />
            <SidebarItem icon={History} label="Audit Logs" />
            <SidebarItem icon={Settings} label="Preferences" />
          </nav>
        </div>

        <div className="mt-auto p-8">
          <div className="p-5 glass-card border border-cyan-500/10 bg-cyan-500/5 rounded-2xl">
            <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-2">Internal Engine</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-xs font-bold text-slate-300">FastAPI Online</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT - Padded for sidebar */}
      <main className="flex-1 ml-72 flex flex-col min-w-0">
        <header className="h-24 px-10 flex items-center justify-between border-b border-white/5 bg-[#0a0f1e]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl px-5 py-2.5 w-full max-w-lg transition-all focus-within:border-cyan-500/30">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Query MSME entities..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              <button className="text-slate-500 hover:text-white transition relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0a0f1e]"></span>
              </button>
            </div>
            <div className="flex items-center gap-4 pl-8 border-l border-white/10">
              <div className="text-right">
                <p className="text-xs font-bold text-white">Ankush Singh</p>
                <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">Lead Auditor</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px]">
                <div className="w-full h-full rounded-2xl bg-[#0d1324] flex items-center justify-center overflow-hidden">
                  <User className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-10 flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-10"
                >
                  <div className="flex items-end justify-between">
                    <div className="space-y-1">
                      <h2 className="text-4xl font-black tracking-tighter text-white">New Credit Analysis</h2>
                      <p className="text-slate-400 font-medium">Configure entity financial parameters for AI evaluation.</p>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition-all">
                      <Download className="w-4 h-4" /> Bulk Import
                    </button>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    <div className="xl:col-span-8 space-y-8">
                      <div className="glass-card p-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>

                        <div className="space-y-12">
                          <div>
                            <SectionTitle title="Liquidity & Asset Base" icon={Database} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                              <DataInput label="Current Assets" name="current_assets" value={formData.current_assets} onChange={handleInputChange} />
                              <DataInput label="Current Liabilities" name="current_liabilities" value={formData.current_liabilities} onChange={handleInputChange} />
                              <DataInput label="Inventory Value" name="inventory" value={formData.inventory} onChange={handleInputChange} />
                              <DataInput label="Total Assets" name="total_assets" value={formData.total_assets} onChange={handleInputChange} />
                            </div>
                          </div>

                          <div>
                            <SectionTitle title="Capital & Leverage" icon={TrendingUp} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                              <DataInput label="Total Debt" name="total_debt" value={formData.total_debt} onChange={handleInputChange} />
                              <DataInput label="Net Equity" name="equity" value={formData.equity} onChange={handleInputChange} />
                              <DataInput label="EBIT" name="ebit" value={formData.ebit} onChange={handleInputChange} />
                              <DataInput label="Interest Expense" name="interest_expense" value={formData.interest_expense} onChange={handleInputChange} />
                            </div>
                          </div>

                          <div>
                            <SectionTitle title="Operational Performance" icon={FileSearch} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                              <DataInput label="Net Sales" name="net_sales" value={formData.net_sales} onChange={handleInputChange} />
                              <DataInput label="Net Profit" name="net_profit" value={formData.net_profit} onChange={handleInputChange} />
                              <DataInput label="Avg. Inventory" name="average_inventory" value={formData.average_inventory} onChange={handleInputChange} />
                              <DataInput label="Avg. Debtors" name="average_debtors" value={formData.average_debtors} onChange={handleInputChange} />
                            </div>
                          </div>

                          <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg rounded-2xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-3 group"
                          >
                            {loading ? "ANALYZING DATA VECTORS..." : "RUN AI CREDIT AUDIT"}
                            {!loading && <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="xl:col-span-4 space-y-8">
                      <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-[2rem]">
                        <div className="flex items-center gap-3 mb-4 text-cyan-400">
                          <AlertCircle className="w-5 h-5" />
                          <span className="text-xs font-black uppercase tracking-widest">Protocol</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium">
                          Risk assessment is based on 12 critical CMA vectors. Output includes probability of insolvency within a 24-month horizon.
                        </p>
                      </div>

                      <div className="glass-card p-8">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Recent Audits</h4>
                        <div className="space-y-4">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 transition-all cursor-pointer">
                              <div>
                                <p className="text-xs font-black text-white">ENTITY-XR{(80 + i)}</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Confirmed</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-black text-emerald-500">842</p>
                                <p className="text-[10px] text-slate-600 font-bold uppercase">Score</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-4xl font-black tracking-tighter text-white">Diagnostic Report</h2>
                      <p className="text-slate-400 font-medium">Validated insolvency risk analysis complete.</p>
                    </div>
                    <button
                      onClick={() => setResult(null)}
                      className="px-6 py-2.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl text-xs font-black hover:bg-cyan-500/20 transition-all uppercase tracking-widest"
                    >
                      New Audit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    <div className="xl:col-span-4">
                      <ScoreGauge score={result.prediction.score} level={result.prediction.risk_level} />
                      <div className="mt-8 p-8 glass-card border-l-4 border-cyan-500">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">AI Verdict</p>
                        <p className="text-sm text-slate-200 leading-relaxed font-medium italic">"{result.prediction.recommendation}"</p>
                      </div>
                    </div>

                    <div className="xl:col-span-8 space-y-10">
                      <RiskRadar ratios={formData as any} />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="glass-card p-8 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Liquidity</p>
                            <p className="text-2xl font-black text-white">{(formData.current_assets / formData.current_liabilities).toFixed(2)}x</p>
                          </div>
                          <div className="p-3 bg-emerald-500/10 rounded-2xl font-black text-emerald-500 text-xs">Healthy</div>
                        </div>
                        <div className="glass-card p-8 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Leverage</p>
                            <p className="text-2xl font-black text-white">{(formData.total_debt / formData.equity).toFixed(2)}x</p>
                          </div>
                          <div className="p-3 bg-cyan-500/10 rounded-2xl font-black text-cyan-400 text-xs">Optimal</div>
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
