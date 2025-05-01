import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

import Logo from '../../components/layouts/Logo';
import {
  LayoutDashboard,
  Wallet,
  TrendingDown,
  LogOut
} from 'lucide-react'; 

function SideMenu({ activeMenu }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  };

  return (
    <div className="h-screen bg-white p-4 shadow-md mb-8">
     
      <Logo />
      <div className="flex flex-col items-center mb-10 mt-10">
      <img
        src={user?.profilePhoto || 'https://via.placeholder.com/100'}
        alt="Profile"
        className="w-32 h-32 rounded-full mb-5 object-cover border-2 border-gray-300"
      />
      <h2 className="text-2xl font-semibold text-gray-800">
        {user?.name || 'Guest User'}
      </h2>
    </div>

      
      <nav className="flex flex-col space-y-8">
        <Link
          to="/Home"
          className={`flex items-center gap-6 p-2 text-lg rounded ${
            activeMenu === 'Dashboard' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700'
          }`}
        >
          <LayoutDashboard size={25} />
          Dashboard
        </Link>
        <Link
  to="/Income"
  className={`flex items-center gap-6 p-2 text-lg rounded transition-all duration-200
    ${
      activeMenu === 'Income'
        ? 'bg-purple-100 text-purple-700 font-semibold'
        : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
    }`}
>
  <Wallet size={25} />
  Income
</Link>

<Link
  to="/Expense"
  className={`flex items-center gap-6 p-2 text-lg rounded transition-all duration-200
    ${
      activeMenu === 'Expense'
        ? 'bg-purple-100 text-purple-700 font-semibold'
        : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
    }`}
>
  <TrendingDown size={25} />
  Expense
</Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-6 p-2 text-lg rounded text-red-500 hover:bg-red-100 text-left"
        >
          <LogOut size={25} />
          Logout
        </button>
      </nav>
    </div>
  );
}

export default SideMenu;
