import React from 'react';

export const Sidebar: React.FC = () => (
  <aside className="w-64 h-screen fixed top-0 left-0 bg-slate-900 text-white flex flex-col">
    <div className="p-6 border-b border-slate-800">
      <h1 className="text-2xl font-bold tracking-tight">Pulmo<span className="text-blue-500">AI</span></h1>
    </div>
    <nav className="flex-1 p-4 flex flex-col gap-2">
      <a href="/dashboard" className="px-4 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">Dashboard</a>
      <a href="/" className="px-4 py-3 rounded-xl text-slate-300 font-medium hover:bg-slate-800 transition-colors">New Scan</a>
      <a href="/history" className="px-4 py-3 rounded-xl text-slate-300 font-medium hover:bg-slate-800 transition-colors">History</a>
    </nav>
    <div className="p-4 border-t border-slate-800">
      <button className="w-full px-4 py-3 text-left rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">Logout</button>
    </div>
  </aside>
);