import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-7 shadow-inner border-t border-gray-700 rounded-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 flex flex-col lg:flex-row items-center justify-between gap-5">
        <div className="text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-wide">Budget Buddy</h2>
          <p className="text-sm sm:text-base text-gray-300 mt-2">Created by Rasadhi Sanchala</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link to="/Income" className="text-sm sm:text-base hover:text-purple-400 transition">
            Income
          </Link>
          <Link to="/Expense" className="text-sm sm:text-base hover:text-purple-400 transition">
            Expense
          </Link>
          <Link to="/Login" className="text-sm sm:text-base hover:text-purple-400 transition">
            Logout
          </Link>
        </div>

        <div className="text-sm text-gray-400 text-center lg:text-right">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
