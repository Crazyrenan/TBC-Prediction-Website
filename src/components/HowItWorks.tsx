const steps = [
  ['01', 'Authenticate', 'Login or register a staff account before entering the workstation.'],
  ['02', 'Upload', 'Select a chest X-ray image from the radiology workflow.'],
  ['03', 'Review', 'Read the AI output and keep professional clinical judgement in the loop.'],
];

export default function HowItWorks() {
  return (
    <section className="border-y border-slate-200 bg-white px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Workflow</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Screening in three steps</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map(([number, title, desc]) => (
              <div key={number} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-cyan-700">{number}</p>
                <h3 className="mt-3 text-base font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
