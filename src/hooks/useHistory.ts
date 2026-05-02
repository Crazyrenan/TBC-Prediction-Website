import { useState, useEffect } from 'react';
import type { HistoryRecord } from '../types';

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('pulmoai_history');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const saveRecord = (record: HistoryRecord) => {
    const updated = [record, ...history];
    setHistory(updated);
    localStorage.setItem('pulmoai_history', JSON.stringify(updated));
  };

  return { history, saveRecord };
};