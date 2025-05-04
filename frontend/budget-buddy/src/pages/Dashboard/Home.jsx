import React, { useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import SummaryCards from '../../components/Dashboard/SummaryCards';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinancialOverview from '../../components/Dashboard/FinancialOverview';
import Footer from '../../components/layouts/Footer';

function Home() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-[280px] z-50">
        <DashboardLayout activeMenu="Dashboard" />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[250px] p-8 space-y-12">
        
        {/* Summary Cards in a Row */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <SummaryCards />
        </div>

        {/* Row: Recent Transactions and Financial Overview */}
        <div className="flex flex-col lg:flex-row gap-16 w-full ml-10">
          <div className="w-full lg:w-1/2">
            <RecentTransactions />
          </div>
          <div className="w-full lg:w-1/2">
            <FinancialOverview />
          </div>
        </div>

        {/* Footer */}
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
