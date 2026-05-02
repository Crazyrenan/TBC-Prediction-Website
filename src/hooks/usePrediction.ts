import { useState } from 'react';
import { predictImage, fileToBase64 } from '../lib/api';
import { useHistory } from './useHistory';
import type { PredictionState, HistoryRecord } from '../types';

export const usePrediction = () => {
  const [state, setState] = useState<PredictionState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HistoryRecord | null>(null);
  const { saveRecord } = useHistory();

  const handlePredict = async (file: File) => {
    try {
      setState('uploading');
      const base64Image = await fileToBase64(file);
      
      setState('processing');
      const apiResult = await predictImage(file);
      
      const record: HistoryRecord = {
        id: crypto.randomUUID(),
        image: base64Image,
        date: Date.now(),
        ...apiResult
      };

      setResult(record);
      saveRecord(record);
      window.dispatchEvent(new CustomEvent('prediction-saved'));
      setState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setState('error');
    }
  };

  const reset = () => {
    setState('idle');
    setResult(null);
    setError(null);
  };

  return { state, result, error, handlePredict, reset };
};
