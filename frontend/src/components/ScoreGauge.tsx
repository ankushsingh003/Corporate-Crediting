'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ScoreGaugeProps {
  score: number;
  level: string;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, level }) => {
  const percentage = (score / 1000) * 100;
  const strokeDasharray = 440;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  const getColor = (s: number) => {
    if (s > 750) return '#06b6d4'; // Cyan
    if (s > 550) return '#3b82f6'; // Blue
    return '#ef4444'; // Red
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 glass-card rounded-3xl relative overflow-hidden">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-800"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="70"
            stroke={getColor(score)}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: strokeDasharray }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl font-bold neon-glow"
          >
            {score}
          </motion.span>
          <span className="text-xs uppercase tracking-widest text-slate-400 mt-1">Credit Score</span>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-400 uppercase tracking-tighter">Status</p>
        <p className="text-xl font-semibold mt-1" style={{ color: getColor(score) }}>{level} Risk</p>
      </div>
    </div>
  );
};

export default ScoreGauge;
