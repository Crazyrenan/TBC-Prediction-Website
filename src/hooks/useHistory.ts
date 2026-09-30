import { useState, useEffect } from 'react';
import type { HistoryRecord } from '../types';

const API_BASE = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000';

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.detail ?? `Failed to fetch history (${response.status})`);
      }

      const data = await response.json();
      setHistory(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Called after a successful prediction to refresh the list
  const saveRecord = () => {
    fetchHistory();
  };

  return { history, loading, error, saveRecord };
};