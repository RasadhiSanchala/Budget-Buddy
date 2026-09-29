import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Menu, X, CalendarDays, Bell } from 'lucide-react';
import SideMenu from './SideMenu';
import Logo from './Logo';
import { UserContext } from '../../context/userContext';

function DashboardLayout({ children, activeMenu }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date()),
    []
  );

  return (
    <div className="min-h-screen bg-[#F5F6FB]">
      <header className="sticky top-0 z-[80] flex items-center justify-between gap-4 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Logo className="w-[128px]" />
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#171335] shadow-sm"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
      </header>

      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[270px] lg:block">
        <SideMenu activeMenu={activeMenu} />
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#0B0920]/65 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          />

          <aside className="absolute left-0 top-0 h-full w-[86vw] max-w-[300px] shadow-2xl">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur"
              aria-label="Close navigation menu"
            >
              <X size={19} />
            </button>

            <SideMenu activeMenu={activeMenu} onNavigate={() => setMenuOpen(false)} />
          </aside>
        </div>
      )}

      <main className="min-h-screen min-w-0 lg:ml-[270px]">
        <div className="border-b border-slate-200/70 bg-white/70 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto flex w-full max-w-[1580px] items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-bold tracking-[0.14em] text-[#6D55E8] uppercase">Budget Buddy</p>
              <h1 className="mt-1 truncate text-xl font-extrabold tracking-[-0.03em] text-[#171335] sm:text-2xl">
                {activeMenu}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-500 shadow-sm sm:flex">
                <CalendarDays size={15} className="text-[#6D55E8]" />
                {formattedDate}
              </div>
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:text-[#6D55E8]"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border border-white bg-[#F4C95D]" />
              </button>
              <div className="hidden items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm md:flex">
                <img
                  src={user?.profilePhoto || 'https://via.placeholder.com/100'}
                  alt="Profile"
                  className="h-8 w-8 rounded-xl object-cover"
                />
                <div className="max-w-[150px] pr-2">
                  <p className="truncate text-xs font-bold text-slate-700">{user?.name || 'Guest User'}</p>
                  <p className="text-[10px] text-slate-400">Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 xl:px-10 xl:py-8">
          <div className="mx-auto w-full max-w-[1580px] min-w-0">{children}</div>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
