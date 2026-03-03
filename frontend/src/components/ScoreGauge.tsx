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
    if (s > 750) return 'var(--color-primary)';
    if (s > 550) return '#3b82f6';
    return '#ef4444';
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 glass-card rounded-[2.5rem] relative overflow-hidden border-t-2 border-primary/20">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="relative w-56 h-56">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="112"
            cy="112"
            r="85"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-slate-800/40"
          />
          <motion.circle
            cx="112"
            cy="112"
            r="85"
            stroke={getColor(score)}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: strokeDasharray }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <span className="text-6xl font-black tracking-tighter text-white">
              {score}
            </span>
            <div className="h-px w-12 bg-primary/30 mx-auto mt-1 mb-2"></div>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Credit Rating</p>
          </motion.div>
        </div>
      </div>

      <div className="mt-8 text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
          <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: getColor(score) }}></div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Risk Assessment</span>
        </div>
        <p className="text-2xl font-bold tracking-tight mt-2" style={{ color: getColor(score) }}>{level} Risk Profile</p>
      </div>
    </div>
  );
};

export default ScoreGauge;
