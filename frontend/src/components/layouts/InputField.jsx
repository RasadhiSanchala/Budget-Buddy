import React from 'react';

const InputField = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-[15px] text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#6D55E8] focus:bg-white focus:ring-4 focus:ring-[#6D55E8]/10"
  />
);

export default InputField;
