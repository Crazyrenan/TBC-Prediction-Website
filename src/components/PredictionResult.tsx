export default function PredictionResult({ data }: { data: any }) {
  const { prediction, probabilities = [], gradcam_image } = data;
  const labels = ['Normal', 'Viral', 'TBC'];

  return (
    <div className="space-y-6">
      {gradcam_image && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Grad-CAM localization</p>
          <img src={gradcam_image} className="w-full rounded-lg border border-slate-200 shadow-sm" alt="Heatmap" />
        </div>
      )}

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Detection result</p>
        <p className="mt-2 text-2xl font-semibold uppercase text-slate-950">{prediction}</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Probability</p>
        {probabilities.map((p: number, i: number) => (
          <div key={labels[i] || i} className="mb-3 last:mb-0">
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-slate-700">{labels[i] || `Class ${i + 1}`}</span>
              <span className="font-mono text-slate-600">{(p * 100).toFixed(2)}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-cyan-700" style={{ width: `${Math.max(0, Math.min(100, p * 100))}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
