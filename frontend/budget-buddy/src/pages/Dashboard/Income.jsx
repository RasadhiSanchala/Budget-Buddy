import React, { useState } from "react";
import AddIncomeModal from "../../components/Income/AddIncomeModal";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomePage from "../../components/Income/IncomePage";

const Income = () => {
  const [showModal, setShowModal] = useState(false);
  const [incomeList, setIncomeList] = useState([]);

  const handleAddIncome = (newIncome) => {
    setIncomeList((prev) => [newIncome, ...prev]);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar only */}
      <div className="">
        <DashboardLayout activeMenu="Dashboard" />
      </div>

      {/* Main content: Add Income Button + Income List */}
      <div className="flex-1 p-8 relative">
        {/* Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#2D02AF] text-white px-4 py-4 rounded shadow-md"
          >
            + Add Income
          </button>
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
      </div>
    </div>
  );
};

export default Income;
