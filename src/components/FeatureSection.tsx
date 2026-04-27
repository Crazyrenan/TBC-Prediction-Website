const features = [
  {
    title: 'Role-based access',
    desc: 'Staff accounts are required before the workstation can be opened.',
  },
  {
    title: 'X-ray upload flow',
    desc: 'Designed around the everyday radiology queue, preview, and report handoff.',
  },
  {
    title: 'Probability output',
    desc: 'Displays model results in a compact report panel for quick clinical review.',
  },
  {
    title: 'Audit-friendly sessions',
    desc: 'Uses secure server-side cookies and hashed password records for local development.',
  },
];

export default function FeatureSection() {
  return (
    <section className="bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Operational Modules</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Built like an internal hospital tool</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Quiet surfaces, clear statuses, and dense information areas for repeated staff use.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 h-1.5 w-12 rounded-full bg-cyan-700" />
              <h3 className="text-base font-semibold text-slate-950">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
