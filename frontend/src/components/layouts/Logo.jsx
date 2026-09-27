import React from 'react';
import logo from '../../assets/images/logo.png';

const Logo = ({ className = '' }) => (
  <img
    src={logo}
    alt="Budget Buddy"
    className={`w-[135px] sm:w-[145px] h-auto object-contain ${className}`}
  />
);

export default Logo;
