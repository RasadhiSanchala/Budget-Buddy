import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import SummaryCards from '../../components/Dashboard/SummaryCards';

function Home() {
  return (
    <div className="flex min-h-screen">
      
    <DashboardLayout activeMenu = "Dashboard">
    <div className='my-5 mx-auto'></div>
    </DashboardLayout>

    <div className="p-12 ">
        <SummaryCards/>
      </div>

    </div>

    
  )
}

export default Home;