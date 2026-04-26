export default function PredictionResult({ data }: { data: any }) {
  const { prediction, confidence, probabilities, gradcam_image } = data;
  const labels = ["Normal", "Viral", "TBC"];

  return (
    <div className="space-y-6">
      {gradcam_image && (
        <div className="mb-6">
          <p className="text-xs font-bold text-slate-500 mb-2 uppercase">Lokalisasi Grad-CAM</p>
          <img src={gradcam_image} className="w-full rounded-lg border shadow-sm" alt="Heatmap" />
        </div>
      )}

      <div>
        <p className="text-xs font-bold text-slate-500 uppercase">Hasil Deteksi</p>
        <p className="text-3xl font-black text-slate-900 uppercase">{prediction}</p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-bold text-slate-500 uppercase">Probabilitas</p>
        {probabilities.map((p: number, i: number) => (
          <div key={i} className="flex justify-between text-sm">
            <span>{labels[i]}</span>
            <span className="font-mono">{(p * 100).toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}