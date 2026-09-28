import React, { useEffect, useRef, useState } from 'react';

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
    <div className="flex flex-col items-center gap-2">
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
        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#FFC300] focus:ring-offset-2"
        aria-label="Choose profile photo"
      >
        {previewUrl ? (
          <>
            <span className="block w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={previewUrl}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            </span>
            <span
              onClick={handleRemoveImage}
              className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-white border-2 border-red-500 text-red-500 rounded-full w-7 h-7 flex items-center justify-center text-xs shadow hover:bg-red-500 hover:text-white transition z-10"
              title="Delete Profile Picture"
            >
              🗑️
            </span>
          </>
        ) : (
          <span className="flex w-full h-full rounded-full border-2 border-dashed border-slate-400 bg-[#F4F4FF] items-center justify-center text-[#2D02AF] text-xs sm:text-sm text-center px-2">
            {processing ? 'Processing…' : 'Upload profile photo'}
          </span>
        )}
      </button>

      <p className="text-xs text-gray-500">JPG, PNG or WEBP · automatically optimized</p>

      {imageError && (
        <p className="text-xs text-red-500 text-center max-w-xs">{imageError}</p>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
