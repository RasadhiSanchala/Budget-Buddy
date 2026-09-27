import React, { useState } from "react";
import AddIncomeModal from "../../components/Income/AddIncomeModal";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomePage from "../../components/Income/IncomePage";
import IncomeBarChart from '../../components/Income/IncomeBarChart';
import Footer from '../../components/layouts/Footer';

const Income = () => {
  const [showModal, setShowModal] = useState(false);
  const [incomeList, setIncomeList] = useState([]);

  const handleAddIncome = (newIncome) => {
    setIncomeList((prev) => [newIncome, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#f8f7fb]">
      <aside className="fixed top-0 left-0 h-screen w-[260px] z-50 bg-white">
        <DashboardLayout activeMenu="Income" />
      </aside>

      <main className="ml-[260px] min-h-screen min-w-0 px-5 py-6 lg:px-7 xl:px-8 xl:py-8">
        <div className="max-w-[1600px] mx-auto min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl xl:text-3xl font-bold text-[#2D02AF]">Income</h1>
              <p className="text-sm text-gray-500 mt-1">Track and manage your earnings.</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-[#2D02AF] hover:bg-[#23008d] text-white px-5 py-3 rounded-xl shadow-md transition"
            >
              + Add Income
            </button>
          </div>

          <div className="space-y-7 min-w-0">
            <IncomeBarChart />

            <IncomePage
              incomes={incomeList}
              setIncomes={setIncomeList}
              onAddIncome={handleAddIncome}
            />
          </div>

          {showModal && (
            <AddIncomeModal
              onClose={() => setShowModal(false)}
              onIncomeAdded={handleAddIncome}
            />
          )}

          <div className="mt-10">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Income;
