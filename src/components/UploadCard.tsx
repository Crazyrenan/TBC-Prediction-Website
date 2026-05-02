import React, { useState, useRef } from 'react';

interface UploadCardProps {
  onUpload: (file: File) => void;
  disabled?: boolean;
}

export const UploadCard: React.FC<UploadCardProps> = ({ onUpload, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && fileInputRef.current?.click()}
      className={`relative w-full max-w-2xl p-8 border-2 border-dashed rounded-2xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center bg-white shadow-md hover:shadow-lg ${
        isDragging ? 'border-blue-600 bg-blue-50' : 'border-slate-300 hover:border-blue-400'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={(e) => e.target.files && onUpload(e.target.files[0])} 
        accept="image/*"
        disabled={disabled}
      />
      <svg className="w-12 h-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <h3 className="text-lg font-semibold text-slate-800">Click or drag X-ray image here</h3>
      <p className="text-sm text-slate-500 mt-2">Supports DICOM, PNG, JPG (Max 10MB)</p>
    </div>
  );
};