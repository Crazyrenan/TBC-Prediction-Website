import { useEffect, useState, useRef } from 'react';
import PredictionResult from './PredictionResult';
import HistoryDashboard from './HistoryDashboard';

type User = {
  id: string;
  username: string;
  role: string;
};

type AuthMode = 'login' | 'register';
type ViewMode = 'scan' | 'history';

export default function UploadCard() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [viewMode, setViewMode] = useState<ViewMode>('scan');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [uploadError, setUploadError] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_username');
    if (token && savedUser) {
      setUser({ id: '1', username: savedUser, role: 'Staff' });
    }
    setCheckingSession(false);

    const handleAuthToggle = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode?: AuthMode }>;
      setAuthMode(customEvent.detail?.mode === 'register' ? 'register' : 'login');
      setAuthError('');
      setShowModal(true);
    };

    window.addEventListener('toggle-auth', handleAuthToggle);
    return () => window.removeEventListener('toggle-auth', handleAuthToggle);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const endpoint = authMode === 'login' ? 'http://localhost:8000/login' : 'http://localhost:8000/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Authentication failed.');

      if (authMode === 'register') {
        setAuthMode('login');
        setAuthError('Registration successful. Please log in.');
        setAuthLoading(false);
        return;
      }

      localStorage.setItem('auth_token', data.access_token);
      localStorage.setItem('auth_username', data.username);
      setUser({ id: '1', username: data.username, role: 'Staff' });
      setShowModal(false);
      setUsername('');
      setPassword('');
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_username');
    setUser(null);
    setResult(null);
    setFile(null);
    setPreview(null);
    setUploadError('');
    setIsDropdownOpen(false);
    setViewMode('scan');
  };

  const upload = async () => {
    if (!file || !user) return;

    setLoading(true);
    setUploadError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Analysis failed.');
      setResult(data);
    } catch (err) {
      setUploadError(
        err instanceof Error
          ? `${err.message} Make sure the prediction API is running on localhost:8000.`
          : 'Analysis failed. Make sure the prediction API is running on localhost:8000.',
      );
    } finally {
      setLoading(false);
    }
  };

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (preview) URL.revokeObjectURL(preview);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setUploadError('');
  };

  const modalContent = showModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Staff Access</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">
              {authMode === 'login' ? 'Sign in to PulmoAI' : 'Register staff account'}
            </h2>
          </div>
          <button
            aria-label="Close"
            onClick={() => setShowModal(false)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            x
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4 px-6 py-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Username</span>
            <input
              type="text"
              autoComplete="username"
              value={username}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {authError && (
            <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
              {authError}
            </p>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full rounded-md bg-cyan-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {authLoading ? 'Checking credentials...' : authMode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="border-t border-slate-200 px-6 py-4">
          <button
            onClick={() => {
              setAuthMode(authMode === 'login' ? 'register' : 'login');
              setAuthError('');
            }}
            className="text-sm font-semibold text-cyan-700 hover:text-cyan-900"
            type="button"
          >
            {authMode === 'login' ? 'Register a new staff account' : 'Use an existing account'}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  if (checkingSession) {
    return (
      <div className="mx-auto max-w-6xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Loading workstation session...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
          <div className="p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Restricted Module</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Chest X-ray analysis requires staff login</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Access is limited to registered clinical staff. Sign in or create an account to open the analysis
              workstation and submit X-ray images to the prediction service.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowModal(true);
                }}
                className="rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800"
              >
                Staff login
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setShowModal(true);
                }}
                className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Register account
              </button>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 p-8 lg:border-l lg:border-t-0">
            <p className="text-sm font-semibold text-slate-900">Access checklist</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p className="flex justify-between gap-4"><span>Session control</span><span className="font-medium text-emerald-700">Enabled</span></p>
              <p className="flex justify-between gap-4"><span>Password storage</span><span className="font-medium text-emerald-700">Hashed</span></p>
              <p className="flex justify-between gap-4"><span>Prediction API</span><span className="font-medium text-amber-700">localhost:8000</span></p>
            </div>
          </div>
        </div>
        {modalContent}
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-6xl rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Radiology Workstation</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">TBC image analysis</h2>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 rounded-md border border-transparent px-3 py-2 transition hover:border-slate-200 hover:bg-slate-50"
            >
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">{user.username}</p>
                <p className="text-xs text-slate-500">{user.role}</p>
              </div>
              <svg className={`h-4 w-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
                <button 
                  onClick={() => {
                    setViewMode('scan');
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  New Scan
                </button>
                <button 
                  onClick={() => {
                    setViewMode('history');
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full border-t border-slate-100 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  History
                </button>
                <button 
                  onClick={handleLogout} 
                  className="block w-full border-t border-slate-100 px-4 py-3 text-left text-sm font-medium text-rose-600 hover:bg-rose-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {viewMode === 'scan' && (
          <div className="grid gap-0 lg:grid-cols-[1fr_400px]">
            <div className="p-6 md:p-8">
              <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center hover:border-cyan-500 hover:bg-cyan-50/40">
                <input type="file" accept="image/*,.dcm" onChange={selectFile} className="sr-only" />
                <span className="text-sm font-semibold text-slate-900">Upload chest X-ray image</span>
                <span className="mt-2 text-sm text-slate-500">PNG, JPG, or DICOM file from the radiology queue</span>
                {file && <span className="mt-4 rounded-md bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">{file.name}</span>}
              </label>

              {preview && (
                <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-black">
                  <img src={preview} className="max-h-[480px] w-full object-contain" alt="Selected chest X-ray preview" />
                </div>
              )}

              {uploadError && (
                <p className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
                  {uploadError}
                </p>
              )}

              <button
                onClick={upload}
                disabled={!file || loading}
                className="mt-6 w-full rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Running analysis...' : 'Run AI analysis'}
              </button>
            </div>

            <aside className="border-t border-slate-200 bg-slate-50 p-6 md:p-8 lg:border-l lg:border-t-0">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-950">Report panel</h3>
                <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Ready</span>
              </div>
              {result ? (
                <PredictionResult data={result} />
              ) : (
                <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-500">
                  Results, probability bands, and Grad-CAM images will appear here after analysis.
                </div>
              )}
            </aside>
          </div>
        )}
      </div>

      {viewMode === 'history' && <HistoryDashboard />}
      {modalContent}
    </>
  );
}