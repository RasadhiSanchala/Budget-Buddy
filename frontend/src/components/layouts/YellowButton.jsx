import React from 'react';

const YellowButton = ({ text, onClick, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full bg-[#FFC300] text-white font-medium py-3 rounded hover:bg-yellow-500 transition"
  >
    {text}
  </button>
);

export default YellowButton;
