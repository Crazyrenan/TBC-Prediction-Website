import type { PredictionResponse } from '../types';

const API_BASE = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000';

export const predictImage = async (file: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const token = localStorage.getItem('auth_token');

  const response = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    body: formData,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.detail ?? `Request failed (${response.status})`);
  }

  const data = await response.json();

  return {
    ...data,
    gradcamBase64: data.gradcam_image ?? undefined,
  };
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};