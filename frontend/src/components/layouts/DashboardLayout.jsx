import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import SideMenu from './SideMenu';
import Logo from './Logo';

function DashboardLayout({ children, activeMenu }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[#f8f7fb]">
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-[80] flex items-center justify-between gap-4 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3 shadow-sm">
        <Logo className="!w-[118px] sm:!w-[130px]" />
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm"
          aria-label="Open navigation menu"
        >
          <Menu size={23} />
        </button>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 h-screen w-[260px] z-50 bg-white">
        <SideMenu activeMenu={activeMenu} />
      </aside>

      {/* Mobile sidebar drawer */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          />

          <aside className="absolute left-0 top-0 h-full w-[82vw] max-w-[300px] bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700"
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>

            <SideMenu
              activeMenu={activeMenu}
              onNavigate={() => setMenuOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Page content */}
      <main className="min-h-screen min-w-0 lg:ml-[260px] px-4 py-5 sm:px-5 sm:py-6 lg:px-7 xl:px-8 xl:py-8">
        <div className="mx-auto w-full max-w-[1600px] min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
