import React from 'react';
import { Link } from 'react-router-dom';
import { WalletCards } from 'lucide-react';

function Footer() {
  return (
    <footer className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_16px_40px_rgba(31,35,58,0.05)]">
      <div className="flex flex-col gap-5 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#171335] text-[#F4C95D]">
            <WalletCards size={20} />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-[#171335]">Budget Buddy</h2>
            <p className="mt-0.5 text-xs text-slate-400">Personal finance made simpler.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-500">
          <Link to="/Home" className="transition hover:text-[#6D55E8]">Dashboard</Link>
          <Link to="/Income" className="transition hover:text-[#6D55E8]">Income</Link>
          <Link to="/Expense" className="transition hover:text-[#6D55E8]">Expense</Link>
        </div>

        <div className="text-xs text-slate-400">© {new Date().getFullYear()} Rasadhi Sanchala</div>
      </div>
    </footer>
  );
}

export default Footer;
