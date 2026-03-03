'use client';
import React from 'react';
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, ResponsiveContainer
} from 'recharts';

interface RiskRadarProps {
    ratios: Record<string, number>;
}

const RiskRadar: React.FC<RiskRadarProps> = ({ ratios }) => {
    const data = [
        { subject: 'Liquidity', A: Math.min((ratios.current_assets / ratios.current_liabilities) * 40, 100), fullMark: 100 },
        { subject: 'Solvency', A: Math.min((ratios.equity / ratios.total_debt) * 50, 100), fullMark: 100 },
        { subject: 'Efficiency', A: Math.min(ratios.net_profit * 0.001, 100), fullMark: 100 }, // Scaled for demo
        { subject: 'Operating', A: Math.min((ratios.ebit / ratios.interest_expense) * 10, 100), fullMark: 100 },
        { subject: 'Safety', A: 85, fullMark: 100 }, // Placeholder for clinical safety factor
    ];

    return (
        <div className="glass-card rounded-[2.5rem] p-8 h-[400px] border-t-2 border-primary/10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Factor Radar Analysis</h3>
                <div className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                    Real-time Engine
                </div>
            </div>
            <ResponsiveContainer width="100%" height="85%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                    <Radar
                        name="Risk Factors"
                        dataKey="A"
                        stroke="var(--color-primary)"
                        fill="var(--color-primary)"
                        fillOpacity={0.15}
                        strokeWidth={2}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RiskRadar;
