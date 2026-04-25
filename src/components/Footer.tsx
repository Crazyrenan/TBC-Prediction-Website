// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
             <span className="text-white font-bold text-sm">PA</span>
           </div>
           <span className="font-bold text-xl tracking-tight text-slate-900">PulmoAI</span>
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-slate-900 transition-colors">About</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Research</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 text-center md:text-left text-slate-400 text-sm flex flex-col md:flex-row justify-between items-center">
         <p>© 2026 PulmoAI Systems Inc. All rights reserved.</p>
         <p className="mt-2 md:mt-0">Not intended for clinical diagnosis.</p>
      </div>
    </footer>
  );
}