import React, { useState } from "react";
import AddExpenseModal from "../../components/Expense/AddExpenseModal";  // Assuming you have a similar modal for expenses
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpensePage from "../../components/Expense/ExpensePage";  // Assuming you have a similar component for expense list
import ExpenseBarChart from '../../components/Expense/ExpenseBarChart';  // Assuming you have a similar chart for expenses

const Expense = () => {
  const [showModal, setShowModal] = useState(false);
  const [expenseList, setExpenseList] = useState([]);

  const handleAddExpense = (newExpense) => {
    setExpenseList((prev) => [newExpense, ...prev]);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar only */}
      <div className="fixed top-0 left-0 h-screen w-[280px] z-50">
        <DashboardLayout activeMenu="Expense" />
      </div>
      
      {/* Main content: Add Expense Button + Expense List */}
      <div className="flex-1 p-8 relative">
        {/* Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#921b1b] text-white px-4 py-4 rounded shadow-md"
          >
            + Add Expense
          </button>
        </div>

        {/* Expense Bar Chart */}
        <div>
          <ExpenseBarChart />
        </div>

        {/* Expense List */}
        <ExpensePage
          expenses={expenseList}
          setExpenses={setExpenseList}
          onAddExpense={handleAddExpense}
        />

        {/* Modal */}
        {showModal && (
          <AddExpenseModal
            onClose={() => setShowModal(false)}
            onExpenseAdded={handleAddExpense}
          />
        )}
      </div>
    </div>
  );
};

export default Expense;
