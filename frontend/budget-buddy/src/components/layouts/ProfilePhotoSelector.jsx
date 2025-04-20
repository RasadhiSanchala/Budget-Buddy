import React, { useEffect, useRef, useState } from 'react';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('profilePic');
    if (savedImage) {
      setPreviewUrl(savedImage);
    }
  }, []);

  useEffect(() => {
    if (previewUrl) {
      localStorage.setItem('profilePic', previewUrl);
    }
  }, [previewUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setPreviewUrl(null);
    localStorage.removeItem('profilePic');
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div
        onClick={onChooseFile}
        className={`w-24 h-24 cursor-pointer relative group ${
          previewUrl ? 'border-4 border-[#ffffff]' : 'border-2 border-slate-400'
        }`}
      >
        {previewUrl ? (
          <>
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={previewUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleRemoveImage}
              className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 bg-white border-2 border-red-500 text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-500 hover:text-white transition z-50"
              title="Delete Profile Picture"
            >
              🗑️
            </button>
          </>
        ) : (
          <div className="w-full h-full rounded-full overflow-hidden bg-[#F4F4FF] flex items-center justify-center text-[#2D02AF] text-sm text-center px-2">
            Upload your profile pic
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
