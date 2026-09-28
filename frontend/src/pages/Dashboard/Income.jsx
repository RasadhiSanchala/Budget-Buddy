import React, { useState } from 'react';
import AddIncomeModal from '../../components/Income/AddIncomeModal';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomePage from '../../components/Income/IncomePage';
import IncomeBarChart from '../../components/Income/IncomeBarChart';
import Footer from '../../components/layouts/Footer';

const Income = () => {
  const [showModal, setShowModal] = useState(false);
  const [incomeList, setIncomeList] = useState([]);

  const handleAddIncome = (newIncome) => {
    setIncomeList((prev) => [newIncome, ...prev]);
  };

  return (
    <DashboardLayout activeMenu="Income">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D02AF]">Income</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage your earnings.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-[#2D02AF] hover:bg-[#23008d] text-white px-5 py-3 rounded-xl shadow-md transition"
        >
          + Add Income
        </button>
      </div>

      <div className="space-y-6 sm:space-y-7 min-w-0">
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

      <div className="mt-8 sm:mt-10">
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Income;
