import { useState } from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Authentication failed.');

      localStorage.setItem('auth_token', data.access_token);
      localStorage.setItem('auth_username', data.username);
      window.location.href = '/dashboard';
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Staff Access</p>
        <h1 className="mt-1 text-xl font-semibold text-slate-950">Sign in to PulmoAI</h1>
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
            autoComplete="current-password"
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
          {authLoading ? 'Checking credentials...' : 'Sign in'}
        </button>
      </form>

      <div className="border-t border-slate-200 px-6 py-4">
        <a href="/register" className="text-sm font-semibold text-cyan-700 hover:text-cyan-900">
          Register a new staff account
        </a>
      </div>
    </div>
  );
}
