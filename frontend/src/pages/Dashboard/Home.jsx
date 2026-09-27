import React, { useEffect } from 'react';

import DashboardLayout from '../../components/layouts/DashboardLayout';
import SummaryCards from '../../components/Dashboard/SummaryCards';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinancialOverview from '../../components/Dashboard/FinancialOverview';
import Footer from '../../components/layouts/Footer';

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6f6] via-[#f6f2fc] to-[#ffffff]">
      <aside className="fixed top-0 left-0 h-screen w-[260px] z-50 bg-white">
        <DashboardLayout activeMenu="Dashboard" />
      </aside>

      <main className="ml-[260px] min-h-screen min-w-0 px-5 py-6 lg:px-7 xl:px-8 xl:py-8">
        <div className="max-w-[1600px] mx-auto min-w-0">
          <section className="w-full min-w-0">
            <SummaryCards />
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] gap-6 xl:gap-8 mt-8 xl:mt-10 items-stretch min-w-0">
            <div className="min-w-0">
              <RecentTransactions />
            </div>

            <div className="min-w-0">
              <FinancialOverview />
            </div>
          </section>

          <div className="mt-10">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
