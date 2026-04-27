export default function Hero() {
  return (
    <section className="border-b border-slate-200 bg-white px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-slate-50 p-6 md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Pulmonary Screening Unit</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              TBC detection workspace for hospital staff
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              A protected internal console for uploading chest X-rays, reviewing AI-assisted probability output,
              and keeping screening work focused inside a clinical workflow.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#demo" className="rounded-md bg-cyan-700 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-cyan-800">
              Open workstation
            </a>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-auth', { detail: { mode: 'login' } }))}
              className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-white"
            >
              Staff login
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="border-b border-slate-200 pb-4">
            <p className="text-sm font-semibold text-slate-950">Today&apos;s screening queue</p>
            <p className="mt-1 text-sm text-slate-500">Radiology department dashboard</p>
          </div>
          <div className="grid grid-cols-3 gap-3 py-5">
            {[
              ['24', 'Queued'],
              ['18', 'Reviewed'],
              ['06', 'Needs review'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-2xl font-semibold text-slate-950">{value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[
              ['XR-2049', 'Awaiting analysis', 'text-amber-700 bg-amber-50'],
              ['XR-2048', 'Completed', 'text-emerald-700 bg-emerald-50'],
              ['XR-2047', 'Radiologist review', 'text-cyan-700 bg-cyan-50'],
            ].map(([caseId, status, tone]) => (
              <div key={caseId} className="flex items-center justify-between rounded-md border border-slate-200 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{caseId}</p>
                  <p className="text-xs text-slate-500">Chest X-ray</p>
                </div>
                <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${tone}`}>{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
