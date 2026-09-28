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
    <DashboardLayout activeMenu="Dashboard">
      <section className="w-full min-w-0">
        <SummaryCards />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] gap-5 sm:gap-6 xl:gap-8 mt-6 sm:mt-8 xl:mt-10 items-stretch min-w-0">
        <div className="min-w-0">
          <RecentTransactions />
        </div>

        <div className="min-w-0">
          <FinancialOverview />
        </div>
      </section>

      <div className="mt-8 sm:mt-10">
        <Footer />
      </div>
    </DashboardLayout>
  );
}

export default Home;
