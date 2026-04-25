// src/components/CTASection.jsx
export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to augment your diagnostics?</h2>
          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Experience the speed and accuracy of AI-assisted TBC detection. Start utilizing our platform today.
          </p>
          
          <button className="px-10 py-5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-colors shadow-lg">
            Start Detection
          </button>
          
          <div className="mt-8 pt-8 border-t border-slate-800">
            <p className="text-slate-500 text-sm">
              <span className="font-semibold text-slate-300">Disclaimer:</span> PulmoAI is designed as an assistive tool for research purposes. It does not provide medical diagnoses and should not replace professional clinical judgment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

}