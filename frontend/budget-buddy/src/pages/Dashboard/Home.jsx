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
    <div className="flex min-h-screen relative overflow-hidden">
      {/* Soft charming background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#fdf6f6] via-[#f6f2fc] to-[#ffffff]"></div>

      {/* Blurred charm blobs */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-[#921b1b33] rounded-full filter blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-20 w-72 h-72 bg-[#6a00ff1f] rounded-full filter blur-3xl opacity-20 z-0 animate-pulse-slow"></div>

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-[280px] z-50">
        <DashboardLayout activeMenu="Dashboard" />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[250px] p-8 space-y-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <SummaryCards />
        </div>

        <div className="flex flex-col lg:flex-row gap-16 w-full ml-20">
          <div className="w-full lg:w-1/2">
            <RecentTransactions />
          </div>
          <div className="w-full lg:w-1/2">
            <FinancialOverview />
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
