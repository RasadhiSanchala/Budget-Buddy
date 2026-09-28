import React from 'react';

const InputField = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-4 sm:px-5 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC300] bg-white"
  />
);

export default InputField;
