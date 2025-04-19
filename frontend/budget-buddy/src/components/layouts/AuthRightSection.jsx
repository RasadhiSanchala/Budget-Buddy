import React from 'react';
import bg1 from '../../assets/images/bg1.jpg';

const AuthRightSection = () => {
  return (
    <div className="w-2/3 bg-gradient-to-tr from-[#FFFFFF] to-[#F4F4FF] h-full relative flex items-center justify-center px-8 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bg1})` }}
      ></div>

      <div className="text-center max-w-lg relative z-10">
        <h2 className="text-5xl font-bold text-[#2D02AF] mb-10">Stay on top of your budget!</h2>
        <p className="text-2xl text-slate-700 mb-6">
          Budget Buddy helps you track your finances easily, giving you control over your spending and savings.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <span className="px-8 py-4 bg-[#FFC300] text-white rounded-full text-sm shadow hover:scale-105 transition">
            Secure
          </span>
          <span className="px-8 py-4 bg-[#2D02AF] text-white rounded-full text-sm shadow hover:scale-105 transition">
            Fast
          </span>
          <span className="px-8 py-4 bg-black text-white rounded-full text-sm shadow hover:scale-105 transition">
            Smart
          </span>
        </div>
      </div>

      <div className="absolute w-60 h-60 bg-[#FFC300] opacity-20 rounded-full top-[-30px] right-0 animate-pulse z-10"></div>
      <div className="absolute w-40 h-40 bg-[#2D02AF] opacity-20 rounded-full bottom-[-30px] left-[-20px] animate-pulse z-10"></div>
    </div>
  );
};

export default AuthRightSection;
