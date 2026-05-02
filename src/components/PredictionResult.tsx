import type { HistoryRecord } from '../types';
import { ProbabilityBar } from './ProbabilityBar';

interface PredictionResultProps {
  data: HistoryRecord;
  onReset?: () => void;
}

export default function PredictionResult({ data, onReset }: PredictionResultProps) {
  const imageSource = data.image || data.raw_image_url;
  const gradcamSource = data.gradcamBase64 || data.gradcam_image_url;

  return (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-8 rounded-lg border border-slate-100 bg-white p-8 shadow-sm md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-slate-900">Analysis Complete</h2>
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          {imageSource ? (
            <img src={imageSource} alt="Original X-ray" className="h-full w-full object-contain" />
          ) : (
            <p className="px-4 text-center text-sm text-slate-500">Image preview is available in the upload panel.</p>
          )}
          {gradcamSource && (
            <img 
              src={gradcamSource} 
              alt="Grad-CAM Overlay" 
              className="absolute inset-0 h-full w-full object-contain opacity-60 mix-blend-multiply" 
            />
          )}
        </div>
      </div>
      
      <div className="flex flex-col justify-center gap-6">
        <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-700">Primary Finding</span>
          <p className="text-3xl font-bold text-slate-900 mt-1">{data.prediction}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Confidence Matrix</h3>
          {data.probabilities.map((prob, idx) => (
            <ProbabilityBar key={idx} label={`Class ${idx}`} value={prob} />
          ))}
        </div>

        {onReset && (
          <button 
            onClick={onReset}
            className="mt-4 rounded-md border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
          >
            New Scan
          </button>
        )}
      </div>
    </div>
  );
}
