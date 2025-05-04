import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import SummaryCards from '../../components/Dashboard/SummaryCards';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinancialOverview from '../../components/Dashboard/FinancialOverview';

function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-[250px] z-50">
        <DashboardLayout activeMenu="Dashboard" />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[250px] p-8 space-y-12">
        
        {/* Summary Cards in a Row */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <SummaryCards />
        </div>

        {/* Row: Recent Transactions and Financial Overview */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="w-full lg:w-1/2">
            <RecentTransactions />
          </div>
          <div className="w-full lg:w-1/2">
            <FinancialOverview />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
