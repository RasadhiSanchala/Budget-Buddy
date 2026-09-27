import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

import Logo from './Logo';
import {
  LayoutDashboard,
  Wallet,
  TrendingDown,
  LogOut,
} from 'lucide-react';

function SideMenu({ activeMenu }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  };

  const baseLink =
    'flex items-center gap-4 px-3 py-3 text-base rounded-xl transition-all duration-200';

  return (
    <div className="h-screen overflow-y-auto overscroll-contain bg-white px-4 py-5 shadow-md">
      <Logo className="mb-5" />

      <div className="flex flex-col items-center text-center mb-7 mt-2">
        <img
          src={user?.profilePhoto || 'https://via.placeholder.com/100'}
          alt="Profile"
          className="w-24 h-24 xl:w-28 xl:h-28 rounded-full mb-4 object-cover border-2 border-gray-300 shadow-sm"
        />
        <h2 className="text-lg xl:text-xl font-semibold text-gray-800 leading-snug break-words max-w-full">
          {user?.name || 'Guest User'}
        </h2>
      </div>

      <nav className="flex flex-col gap-2 pb-6">
        <Link
          to="/Home"
          className={`${baseLink} ${
            activeMenu === 'Dashboard'
              ? 'bg-purple-100 text-purple-700 font-semibold'
              : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
          }`}
        >
          <LayoutDashboard size={22} className="shrink-0" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/Income"
          className={`${baseLink} ${
            activeMenu === 'Income'
              ? 'bg-purple-100 text-purple-700 font-semibold'
              : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
          }`}
        >
          <Wallet size={22} className="shrink-0" />
          <span>Income</span>
        </Link>

        <Link
          to="/Expense"
          className={`${baseLink} ${
            activeMenu === 'Expense'
              ? 'bg-purple-100 text-purple-700 font-semibold'
              : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
          }`}
        >
          <TrendingDown size={22} className="shrink-0" />
          <span>Expense</span>
        </Link>

        <button
          onClick={handleLogout}
          className={`${baseLink} text-red-500 hover:bg-red-50 text-left w-full mt-2`}
        >
          <LogOut size={22} className="shrink-0" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default SideMenu;
