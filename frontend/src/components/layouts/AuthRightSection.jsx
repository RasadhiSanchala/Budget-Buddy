import React from 'react';
import bg1 from '../../assets/images/bg1.jpg';

const AuthRightSection = () => {
  return (
    <div className="hidden lg:flex lg:w-[62%] xl:w-2/3 self-stretch min-h-screen bg-gradient-to-tr from-[#FFFFFF] to-[#F4F4FF] relative items-center justify-center px-8 xl:px-12 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bg1})` }}
      ></div>

      <div className="text-center max-w-2xl relative z-10 py-10">
        <h2 className="text-4xl xl:text-5xl 2xl:text-6xl leading-tight font-bold text-[#2D02AF] mb-7 xl:mb-10">
          Stay on top of your budget!
        </h2>
        <p className="text-xl xl:text-2xl leading-relaxed text-slate-700 mb-7">
          Budget Buddy helps you track your finances easily, giving you control over your spending and savings.
        </p>
        <div className="flex flex-wrap gap-3 xl:gap-4 justify-center">
          <span className="px-7 xl:px-8 py-3 xl:py-4 bg-[#FFC300] text-white rounded-full text-sm shadow hover:scale-105 transition">
            Secure
          </span>
          <span className="px-7 xl:px-8 py-3 xl:py-4 bg-[#2D02AF] text-white rounded-full text-sm shadow hover:scale-105 transition">
            Fast
          </span>
          <span className="px-7 xl:px-8 py-3 xl:py-4 bg-black text-white rounded-full text-sm shadow hover:scale-105 transition">
            Smart
          </span>
        </div>
      </div>

      <div className="absolute w-52 h-52 xl:w-60 xl:h-60 bg-[#FFC300] opacity-20 rounded-full top-[-30px] right-[-20px] animate-pulse z-10"></div>
      <div className="absolute w-36 h-36 xl:w-40 xl:h-40 bg-[#2D02AF] opacity-20 rounded-full bottom-[-30px] left-[-20px] animate-pulse z-10"></div>
    </div>
  );
};

export default AuthRightSection;
