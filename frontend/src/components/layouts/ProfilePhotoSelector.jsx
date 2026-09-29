import React, { useEffect, useRef, useState } from 'react';
import { Camera, Trash2 } from 'lucide-react';

const MAX_DIMENSION = 1200;
const TARGET_MAX_BYTES = 2 * 1024 * 1024;

const loadImage = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('This image format is not supported. Please choose a JPG or PNG image.'));
    };

    img.src = url;
  });

const canvasToBlob = (canvas, quality) =>
  new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', quality);
  });

const compressProfileImage = async (file) => {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose a valid image file.');
  }

  const img = await loadImage(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  let quality = 0.82;
  let blob = await canvasToBlob(canvas, quality);

  while (blob && blob.size > TARGET_MAX_BYTES && quality > 0.45) {
    quality -= 0.1;
    blob = await canvasToBlob(canvas, quality);
  }

  if (!blob) {
    throw new Error('Could not process this image. Please try another image.');
  }

  return new File([blob], 'profile-photo.jpg', {
    type: 'image/jpeg',
    lastModified: Date.now(),
  });
};

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageError('');
    setProcessing(true);

    try {
      const compressedFile = await compressProfileImage(file);

      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }

      const preview = URL.createObjectURL(compressedFile);
      setImage(compressedFile);
      setPreviewUrl(preview);
    } catch (error) {
      setImage(null);
      setPreviewUrl(null);
      setImageError(error.message || 'Could not process this image.');
    } finally {
      setProcessing(false);
      event.target.value = '';
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();

    if (previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setImage(null);
    setPreviewUrl(null);
    setImageError('');
  };

  const onChooseFile = () => {
    if (!processing) inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-2.5">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={onChooseFile}
        className="group relative flex h-24 w-24 items-center justify-center rounded-[26px] border border-slate-200 bg-slate-50 shadow-sm outline-none transition hover:-translate-y-0.5 hover:border-[#6D55E8]/30 hover:shadow-md focus:ring-4 focus:ring-[#6D55E8]/10 sm:h-28 sm:w-28"
        aria-label="Choose profile photo"
      >
        {previewUrl ? (
          <>
            <span className="block h-full w-full overflow-hidden rounded-[25px]">
              <img
                src={previewUrl}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            </span>
            <span
              onClick={handleRemoveImage}
              className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-white bg-rose-500 text-white shadow-lg transition hover:bg-rose-600"
              title="Delete Profile Picture"
            >
              <Trash2 size={14} />
            </span>
          </>
        ) : (
          <span className="flex flex-col items-center gap-2 text-slate-500">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6D55E8]/10 text-[#6D55E8] transition group-hover:bg-[#6D55E8] group-hover:text-white">
              <Camera size={20} />
            </span>
            <span className="px-2 text-center text-[11px] font-semibold">
              {processing ? 'Processing…' : 'Add photo'}
            </span>
          </span>
        )}
      </button>

      <p className="text-[11px] text-slate-400">JPG, PNG or WEBP · optimized automatically</p>

      {imageError && (
        <p className="max-w-xs text-center text-xs text-rose-500">{imageError}</p>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
