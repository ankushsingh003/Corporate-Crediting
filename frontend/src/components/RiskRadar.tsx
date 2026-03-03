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
        { subject: 'Liquidity', A: ratios.current_ratio * 50, fullMark: 100 },
        { subject: 'Solvency', A: (1 / (ratios.debt_equity_ratio || 1)) * 100, fullMark: 100 },
        { subject: 'Profitability', A: ratios.net_profit_margin * 2, fullMark: 100 },
        { subject: 'Efficiency', A: ratios.inventory_turnover * 5, fullMark: 100 },
        { subject: 'Safety', A: ratios.interest_coverage_ratio * 10, fullMark: 100 },
    ];

    return (
        <div className="glass-card rounded-3xl p-6 h-[350px]">
            <h3 className="text-lg font-semibold mb-4 text-slate-200">Financial Health Radar</h3>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Radar
                        name="Metrics"
                        dataKey="A"
                        stroke="#06b6d4"
                        fill="#06b6d4"
                        fillOpacity={0.3}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RiskRadar;
