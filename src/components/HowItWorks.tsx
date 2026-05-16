const steps = [
  {
    number: '01',
    title: 'Authenticate',
    desc: 'Login with your hospital staff account. Access is restricted to registered personnel only.',
    detail: 'Secure JWT session',
  },
  {
    number: '02',
    title: 'Upload X-ray',
    desc: 'Select a chest X-ray image from the radiology queue. Supports PNG, JPG up to 10MB.',
    detail: 'PNG · JPG · up to 10MB',
  },
  {
    number: '03',
    title: 'Review output',
    desc: 'Read the AI probability report and Grad-CAM heatmap. Clinical judgement remains with the physician.',
    detail: 'AI-assisted, not AI-decided',
  },
];

export default function HowItWorks() {
  return (
    <section className="border-b border-slate-200 bg-white px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
          <div className="lg:pt-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Workflow</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Screening in three steps
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              The entire process from login to report takes under two minutes for a trained staff member.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.number} className="relative rounded-xl border border-slate-200 bg-slate-50 p-5">
                {/* Connector line between cards */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-2 w-4 h-px bg-slate-300 z-10" />
                )}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl font-bold text-slate-200">{step.number}</span>
                  <span className="rounded-full bg-cyan-50 border border-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-700">
                    {step.detail}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}