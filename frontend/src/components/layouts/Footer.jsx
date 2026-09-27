import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16 shadow-inner border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left: Website Info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold tracking-wide">Budget Buddy</h2>
          <p className="text-lg text-gray-300 mt-3">Created by Rasadhi Sanchala</p>
        </div>

        {/* Center: Quick Navigation */}
        <div className="flex space-x-6 mr-10">
          <Link to="/Income" className="text-lg hover:text-purple-400 transition">Income</Link>
          <Link to="/Expense" className="text-lg hover:text-purple-400 transition">Expense</Link>
          <Link to="/Login" className="text-lg hover:text-purple-400 transition">Logout</Link>
        </div>

        {/* Right: Copyright */}
        <div className="ml-10 text-base text-gray-400 text-right">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
