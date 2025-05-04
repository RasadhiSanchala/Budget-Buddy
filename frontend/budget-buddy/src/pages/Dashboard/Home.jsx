import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import SummaryCards from '../../components/Dashboard/SummaryCards';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinancialOverview from '../../components/Dashboard/FinancialOverview';

function Home() {
  return (
    <div className="flex min-h-screen">
      
    <DashboardLayout activeMenu = "Dashboard">
    <div className='my-5 mx-auto'></div>
    </DashboardLayout>

    <div className="p-12 ">
        <SummaryCards/>
        <div className="">
        <RecentTransactions/>
      </div>
      </div>

    <div>
      <FinancialOverview/>
    </div>

    </div>

    
  )
}

export default Home;