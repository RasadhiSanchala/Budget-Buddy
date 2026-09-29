import React, { useContext, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

import DashboardLayout from '../../components/layouts/DashboardLayout';
import SummaryCards from '../../components/Dashboard/SummaryCards';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinancialOverview from '../../components/Dashboard/FinancialOverview';
import Footer from '../../components/layouts/Footer';
import { UserContext } from '../../context/userContext';

function Home() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const firstName = user?.name?.split(' ')[0] || 'Buddy';

  return (
    <DashboardLayout activeMenu="Dashboard">
      <section className="mb-6 overflow-hidden rounded-[28px] bg-[#171335] px-5 py-6 text-white shadow-[0_20px_50px_rgba(23,19,53,0.18)] sm:px-7 sm:py-7 lg:px-8">
        <div className="relative">
          <div className="absolute -right-12 -top-20 h-48 w-48 rounded-full bg-[#765EF1]/25 blur-2xl" />
          <div className="absolute -bottom-20 right-32 h-44 w-44 rounded-full bg-[#F4C95D]/10 blur-2xl" />
          <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-[#F4C95D] uppercase">
                <Sparkles size={13} />
                Financial snapshot
              </div>
              <h2 className="text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">
                Good to see you, {firstName}.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-[15px]">
                Here’s a clear view of your money today. Review your balance, recent activity and spending mix in one place.
              </p>
            </div>
            <div className="w-fit rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 backdrop-blur">
              <p className="text-[10px] font-bold tracking-[0.14em] text-slate-400 uppercase">Status</p>
              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.75)]" />
                All systems synced
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full min-w-0">
        <SummaryCards />
      </section>

      <section className="mt-6 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <div className="min-w-0">
          <RecentTransactions />
        </div>
        <div className="min-w-0">
          <FinancialOverview />
        </div>
      </section>

      <div className="mt-8">
        <Footer />
      </div>
    </DashboardLayout>
  );
}

export default Home;
