import React, { useState } from "react";
import AddIncomeModal from "../../components/Income/AddIncomeModal";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomePage from "../../components/Income/IncomePage";
import IncomeBarChart from '../../components/Income/IncomeBarChart';
import Footer from '../../components/layouts/Footer'; // ✅ Footer import

const Income = () => {
  const [showModal, setShowModal] = useState(false);
  const [incomeList, setIncomeList] = useState([]);

  const handleAddIncome = (newIncome) => {
    setIncomeList((prev) => [newIncome, ...prev]);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar only */}
      <div className="fixed top-0 left-0 h-screen w-[250px] z-50">
        <DashboardLayout activeMenu="Income" />
      </div>

      {/* Main content: Add Income Button + Income List + Footer */}
      <div className="flex-1 p-8 relative ">
        {/* Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#2D02AF] text-white px-4 py-4 rounded shadow-md"
          >
            + Add Income
          </button>
        </div>

        {/* Chart */}
        <div>
          <IncomeBarChart />
        </div>

        {/* Income List */}
        <IncomePage
          incomes={incomeList}
          setIncomes={setIncomeList}
          onAddIncome={handleAddIncome}
        />

        {/* Modal */}
        {showModal && (
          <AddIncomeModal
            onClose={() => setShowModal(false)}
            onIncomeAdded={handleAddIncome}
          />
        )}

        {/* ✅ Footer (added without changing existing styles) */}
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Income;
