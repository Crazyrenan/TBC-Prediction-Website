import React from 'react';
import { usePrediction } from '../hooks/usePrediction';
import { UploadCard } from './UploadCard';
import PredictionResult from './PredictionResult';

export const PredictionFlow: React.FC = () => {
  const { state, result, error, handlePredict, reset } = usePrediction();

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px]">
      {state === 'idle' && (
        <UploadCard onUpload={handlePredict} />
      )}

      {(state === 'uploading' || state === 'processing') && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">
            {state === 'uploading' ? 'Encrypting & Uploading...' : 'Analyzing with PulmoAI engine...'}
          </p>
        </div>
      )}

      {state === 'success' && result && (
        <PredictionResult data={result} onReset={reset} />
      )}

      {state === 'error' && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-center">
          <p className="font-semibold mb-2">Analysis Failed</p>
          <p className="text-sm mb-4">{error}</p>
          <button onClick={reset} className="px-4 py-2 bg-white text-red-700 rounded-lg shadow-sm border border-red-200 hover:bg-red-50">Try Again</button>
        </div>
      )}
    </div>
  );
};