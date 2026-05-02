import React from 'react';
import { useHistory } from '../hooks/useHistory';

export const HistoryList: React.FC = () => {
  const { history } = useHistory();

  if (history.length === 0) return <p className="text-slate-500">No prediction history available.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 w-full max-w-4xl">
      {history.map((record) => (
        <div key={record.id} className="flex items-center gap-6 p-4 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0">
            <img src={record.image} alt="Scan thumbnail" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{record.prediction}</h3>
                <p className="text-sm text-slate-500">{new Date(record.date).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 font-medium text-sm rounded-full">
                  {(record.confidence * 100).toFixed(1)}% Confidence
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};