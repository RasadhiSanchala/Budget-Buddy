import React from 'react';

const InputField = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-6 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFC300]"
  />
);

export default InputField;