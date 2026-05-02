import React from 'react';

interface ProbabilityBarProps {
  label: string;
  value: number;
}

export const ProbabilityBar: React.FC<ProbabilityBarProps> = ({ label, value }) => (
  <div className="flex flex-col gap-1 w-full mt-2">
    <div className="flex justify-between text-sm font-medium text-slate-700">
      <span>{label}</span>
      <span>{(value * 100).toFixed(1)}%</span>
    </div>
    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
        style={{ width: `${value * 100}%` }} 
      />
    </div>
  </div>
);