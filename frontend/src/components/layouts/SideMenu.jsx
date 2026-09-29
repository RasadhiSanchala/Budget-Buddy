import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Logo from './Logo';
import {
  LayoutDashboard,
  Wallet,
  TrendingDown,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

function SideMenu({ activeMenu, onNavigate }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onNavigate?.();
    navigate('/Login');
  };

  const navItems = [
    { label: 'Dashboard', to: '/Home', icon: LayoutDashboard },
    { label: 'Income', to: '/Income', icon: Wallet },
    { label: 'Expense', to: '/Expense', icon: TrendingDown },
  ];

  return (
    <div className="app-scrollbar flex h-screen flex-col overflow-y-auto bg-[#171335] px-4 py-5 text-white shadow-[18px_0_50px_rgba(23,19,53,0.12)]">
      <div className="rounded-2xl bg-white px-3 py-2.5 shadow-sm">
        <Logo className="w-[132px]" />
      </div>

      <div className="mt-7 rounded-[24px] border border-white/10 bg-white/[0.06] p-4">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={user?.profilePhoto || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="h-12 w-12 rounded-2xl border border-white/10 object-cover shadow-lg"
            />
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#171335] bg-emerald-400" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">{user?.name || 'Guest User'}</p>
            <p className="mt-0.5 truncate text-[11px] text-slate-400">Personal workspace</p>
          </div>
        </div>
      </div>

      <div className="mt-7 px-2 text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase">
        Workspace
      </div>

      <nav className="mt-3 flex flex-col gap-2">
        {navItems.map(({ label, to, icon: Icon }) => {
          const active = activeMenu === label;
          return (
            <Link
              key={label}
              to={to}
              onClick={onNavigate}
              className={`group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 ${
                active
                  ? 'bg-white text-[#171335] shadow-[0_12px_24px_rgba(0,0,0,0.16)]'
                  : 'text-slate-300 hover:bg-white/[0.07] hover:text-white'
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                  active ? 'bg-[#6D55E8]/10 text-[#6D55E8]' : 'bg-white/[0.06] text-slate-300 group-hover:text-white'
                }`}
              >
                <Icon size={19} />
              </span>
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={16} className="text-[#6D55E8]" />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <div className="mb-4 rounded-[22px] border border-white/10 bg-gradient-to-br from-[#765EF1]/20 to-[#F4C95D]/10 p-4">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-[#F4C95D]">
            <Sparkles size={16} />
          </div>
          <p className="text-xs font-bold text-white">Stay financially aware</p>
          <p className="mt-1 text-[11px] leading-5 text-slate-400">Small daily tracking builds better long-term habits.</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-sm font-semibold text-slate-300 transition hover:bg-rose-500/10 hover:text-rose-300"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06]">
            <LogOut size={18} />
          </span>
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}

export default SideMenu;
