import { useEffect, useState } from 'react';

interface ScanRecord {
  id: number | string;
  filename: string;
  prediction: string;
  confidence: number;
  raw_image_url: string;
  gradcam_image_url: string;
  created_at: string;
}

export default function HistoryDashboard() {
  const [records, setRecords] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('Unauthenticated');

      const res = await fetch('http://localhost:8000/history', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to fetch history data');

      const data = await res.json();
      setRecords(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();

    const syncAfterPrediction = () => {
      try {
        void fetchHistory();
      } catch {
        // The visible state is handled by fetchHistory.
      }
    };

    window.addEventListener('prediction-saved', syncAfterPrediction);
    return () => window.removeEventListener('prediction-saved', syncAfterPrediction);
  }, []);

  if (loading) return <div className="mt-8 p-8 text-center text-sm font-medium text-slate-500">Loading records...</div>;
  if (error) return <div className="mt-8 p-8 text-center text-sm font-medium text-rose-600">{error}</div>;

  return (
    <div className="mx-auto mt-6 max-w-6xl">
      <h2 className="mb-4 text-xl font-semibold text-slate-950">Patient Scan History</h2>
      {records.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          No scan records found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {records.map((record) => (
            <div key={record.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex gap-3">
                <div className="flex-1 overflow-hidden rounded border border-slate-200 bg-black">
                  <img src={record.raw_image_url} alt="Raw X-Ray" className="h-32 w-full object-contain" />
                </div>
                {record.gradcam_image_url && (
                  <div className="flex-1 overflow-hidden rounded border border-slate-200 bg-black">
                    <img src={record.gradcam_image_url} alt="GradCAM" className="h-32 w-full object-contain" />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="truncate text-sm font-semibold text-slate-900" title={record.filename}>
                  {record.filename}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider ${
                    record.prediction === 'health' ? 'bg-emerald-50 text-emerald-700' :
                    record.prediction === 'tb' ? 'bg-rose-50 text-rose-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {record.prediction}
                  </span>
                  <span className="text-sm font-medium text-slate-600">
                    {(record.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {new Date(record.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
