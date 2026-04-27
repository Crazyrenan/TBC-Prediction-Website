export default function CTASection() {
  return (
    <section className="bg-white px-4 py-10">
      <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-slate-50 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-950">Clinical notice</p>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
              PulmoAI is an assistive screening interface and does not replace diagnosis by qualified clinical staff.
            </p>
          </div>
          <a href="#demo" className="rounded-md bg-cyan-700 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-cyan-800">
            Go to workstation
          </a>
        </div>
      </div>
    </section>
  );
}
