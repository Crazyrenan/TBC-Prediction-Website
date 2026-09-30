export type PredictionState = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export interface PredictionResponse {
  prediction: string;
  confidence: number;
  probabilities: number[];
  gradcamBase64?: string;
  gradcam_image_url?: string;
  scan_id?: number;        
}

export interface HistoryRecord extends PredictionResponse {
  id: string;
  image: string;
  raw_image_url?: string;
  date: number;
}