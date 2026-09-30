const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
    title: 'Role-based access',
    desc: 'Staff accounts are required before the workstation can be opened. Credentials are hashed and session-bound.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
    title: 'X-ray upload flow',
    desc: 'Designed around the everyday radiology queue — upload, preview, and receive AI output in seconds.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: 'Probability output',
    desc: 'Three-class detection (Healthy, Sick, TB) with confidence scores displayed in a compact clinical report panel.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Grad-CAM heatmap',
    desc: 'Visual attention overlay highlights regions the model weighted most heavily — supporting radiologist review.',
  },
];

export default function FeatureSection() {
  return (
    <section className="bg-slate-50 px-4 py-16 border-b border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Operational Modules</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Built for clinical staff, not general users
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Every module is designed for repeated daily use — quiet surfaces, clear statuses,
            and dense information areas that don't get in the way.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-cyan-200 hover:shadow-md transition-all duration-200"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700 group-hover:bg-cyan-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-950">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}