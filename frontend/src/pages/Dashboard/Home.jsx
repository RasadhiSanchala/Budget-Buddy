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

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-[280px] z-50 bg-white">
        <DashboardLayout activeMenu="Dashboard" />
      </aside>


      {/* Main Content */}
      <main className="ml-[280px] min-h-screen p-6 lg:p-8">

        {/* Summary Cards */}
        <section className="w-full">
          <SummaryCards />
        </section>


        {/* Transactions + Financial Overview */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">

          <div className="min-w-0">
            <RecentTransactions />
          </div>

          <div className="min-w-0">
            <FinancialOverview />
          </div>

        </section>


        {/* Footer */}
        <div className="mt-12">
          <Footer />
        </div>

      </main>

    </div>
  );
}

export default Home;