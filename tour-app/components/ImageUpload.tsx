'use client';

import { ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
  onChange: (file: File) => void;
  preview?: string;
  label?: string;
}

export default function ImageUpload({ onChange, preview, label = 'تصویر' }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        onClick={handleClick}
        className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
      >
        {preview ? (
          <div className="relative w-full h-full">
            <Image
              src={preview}
              alt="Preview"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg"
              priority
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <PhotoIcon className="w-12 h-12 text-gray-400" />
            <span className="text-sm text-gray-500">برای آپلود کلیک کنید</span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
} 