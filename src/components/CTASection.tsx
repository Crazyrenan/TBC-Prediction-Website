export default function CTASection() {
  return (
    <section className="bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-cyan-800 px-8 py-12 md:px-12">
          {/* Background texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-cyan-600 opacity-20 blur-3xl" />

          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Clinical Notice
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                Assistive screening,<br />not autonomous diagnosis.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-cyan-100">
                PulmoAI provides AI-generated probability scores to support clinical decision-making.
                Final diagnostic authority remains with qualified hospital personnel.
                This system is intended for internal use only.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <a
                href="/dashboard"
                className="rounded-md bg-white px-6 py-3 text-center text-sm font-semibold text-cyan-800 hover:bg-cyan-50 transition-colors whitespace-nowrap"
              >
                Open workstation →
              </a>
              <a
                href="/login"
                className="rounded-md border border-cyan-600 px-6 py-3 text-center text-sm font-semibold text-cyan-100 hover:bg-cyan-700 transition-colors whitespace-nowrap"
              >
                Staff login
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}