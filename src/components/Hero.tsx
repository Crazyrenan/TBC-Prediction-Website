export default function Hero() {
  return (
    <section className="relative border-b border-slate-200 bg-white px-4 py-16 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#0e7490 1px, transparent 1px), linear-gradient(90deg, #0e7490 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="mx-auto max-w-7xl relative">
        {/* Top label */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-600 animate-pulse" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Pulmonary Screening Unit · Internal System
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left: headline */}
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl leading-[1.1]">
              AI-assisted TBC<br />
              <span className="text-cyan-700">screening</span> for<br />
              hospital staff.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500">
              PulmoAI is a protected clinical workstation for uploading chest X-rays,
              reviewing deep learning probability output, and keeping screening
              integrated into your existing radiology workflow.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/dashboard"
                className="rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800 transition-colors"
              >
                Open workstation
              </a>
              <a
                href="/login"
                className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Staff login
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                ['Grad-CAM Visualization', 'Heatmap overlay on X-ray'],
                ['3-Class Detection', 'Healthy · Sick · TB'],
                ['Secure Auth', 'Role-based access'],
              ].map(([title, sub]) => (
                <div key={title} className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-2 border-cyan-600 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{title}</p>
                    <p className="text-xs text-slate-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mock report card — honest, no fake live data */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
              <div>
                <p className="text-sm font-semibold text-slate-900">Sample AI Report</p>
                <p className="text-xs text-slate-400 mt-0.5">Generated from a sample X-ray</p>
              </div>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Analysis complete
              </span>
            </div>

            {/* Fake X-ray placeholder */}
            <div className="relative mb-5 aspect-square w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-900 flex items-center justify-center">
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(ellipse 60% 80% at 50% 50%, #94a3b8 0%, transparent 70%)',
                }}
              />
              <div className="flex flex-col items-center gap-2 text-slate-500">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                </svg>
                <p className="text-xs">Chest X-ray · PA view</p>
              </div>
              {/* Grad-CAM heatmap hint */}
              <div className="absolute inset-0 opacity-20 rounded-lg"
                style={{
                  backgroundImage: 'radial-gradient(ellipse 40% 30% at 55% 45%, #ef4444 0%, #f97316 40%, transparent 70%)',
                }}
              />
            </div>

            {/* Probability bars */}
            <div className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Confidence Matrix</p>
              {[
                ['Tuberculosis', 87, 'bg-red-500'],
                ['Healthy', 9, 'bg-emerald-500'],
                ['Other pathology', 4, 'bg-amber-400'],
              ].map(([label, pct, color]) => (
                <div key={label as string}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-slate-700">{label}</span>
                    <span className="text-xs font-semibold text-slate-900">{pct}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200">
                    <div
                      className={`h-1.5 rounded-full ${color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-slate-400 italic">
              * This is a static demonstration. No real patient data is displayed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}