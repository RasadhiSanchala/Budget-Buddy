import React from 'react';

const YellowButton = ({ text, onClick, type = 'button', disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="w-full bg-[#FFC300] text-white font-medium text-base py-3 rounded-lg hover:bg-yellow-500 active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {text}
  </button>
);

export default YellowButton;
