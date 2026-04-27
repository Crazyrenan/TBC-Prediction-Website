export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-700">
            <span className="text-sm font-bold text-white">PA</span>
          </div>
          <span className="font-semibold text-slate-900">PulmoAI Hospital System</span>
        </div>
        <p>(c) 2026 PulmoAI. Internal screening support only.</p>
      </div>
    </footer>
  );
}
