// src/components/Hero.jsx
export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white -z-10"></div>
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="inline-block px-4 py-1.5 mb-8 text-sm font-semibold tracking-wide text-blue-600 bg-blue-50 rounded-full border border-blue-100">
          Next-Generation Health AI
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 max-w-4xl leading-tight">
          Detect Tuberculosis with <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Precision Intelligence
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed">
          High-fidelity AI analysis for chest X-rays. Fast, explainable, and designed for modern clinical workflows.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <button className="px-8 py-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto">
            Try Now
          </button>
          <button className="px-8 py-4 bg-white text-slate-900 font-medium rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all w-full sm:w-auto">
            Learn More
          </button>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-20 relative">
        <div className="aspect-[16/9] md:aspect-[21/9] bg-slate-50 rounded-2xl border border-slate-200 shadow-2xl flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white"></div>
            <div className="relative text-center">
                 <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                 </div>
                 <p className="text-slate-400 font-medium tracking-wide text-sm uppercase">Interactive Demo Interface</p>
            </div>
        </div>
      </div>
    </section>
  );
}