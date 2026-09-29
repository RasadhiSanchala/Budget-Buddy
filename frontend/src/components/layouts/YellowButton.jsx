import React from 'react';

const YellowButton = ({ text, onClick, type = 'button', disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="group relative w-full overflow-hidden rounded-2xl bg-[#171335] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(23,19,53,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#211b4f] hover:shadow-[0_18px_36px_rgba(23,19,53,0.26)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
  >
    <span className="relative z-10">{text}</span>
    <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/15 transition-all duration-700 group-hover:left-[120%]" />
  </button>
);

export default YellowButton;
