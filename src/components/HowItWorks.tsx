// src/components/HowItWorks.jsx
const steps = [
  {
    number: "01",
    title: "Upload X-ray",
    desc: "Securely upload your chest X-ray image in standard formats directly through our web interface."
  },
  {
    number: "02",
    title: "AI Processing",
    desc: "Our proprietary neural network analyzes the image for distinct radiological features associated with TBC."
  },
  {
    number: "03",
    title: "Instant Results",
    desc: "Receive a detailed report with probability scores and explainable heatmaps in seconds."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">How PulmoAI Works</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              A streamlined workflow designed to deliver rapid insights without complex configurations. Upload, process, and analyze in three simple steps.
            </p>
          </div>
          
          <div className="lg:w-2/3 grid sm:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-bold text-slate-100 mb-4 tracking-tighter">{step.number}</div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3 relative z-10">{step.title}</h4>
                <p className="text-slate-500 leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}