import { useState } from 'react';
import { predictImage } from '../lib/api';
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
      setState('processing');
      const apiResult = await predictImage(file);

      // ✅ Data comes from backend now, no need to build record locally
      const record: HistoryRecord = {
        id: String(apiResult.scan_id),
        image: apiResult.gradcamBase64 ?? '',
        date: Date.now(),
        ...apiResult,
      };

      setResult(record);
      saveRecord(); // ✅ no argument — just triggers a backend refresh
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