import React, { useState } from 'react';
import AddExpenseModal from '../../components/Expense/AddExpenseModal';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExpensePage from '../../components/Expense/ExpensePage';
import ExpenseBarChart from '../../components/Expense/ExpenseBarChart';
import Footer from '../../components/layouts/Footer';

const Expense = () => {
  const [showModal, setShowModal] = useState(false);
  const [expenseList, setExpenseList] = useState([]);

  const handleAddExpense = (newExpense) => {
    setExpenseList((prev) => [newExpense, ...prev]);
  };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#AF0202]">Expense</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage your spending.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-[#921b1b] hover:bg-[#741515] text-white px-5 py-3 rounded-xl shadow-md transition"
        >
          + Add Expense
        </button>
      </div>

      <div className="space-y-6 sm:space-y-7 min-w-0">
        <ExpenseBarChart />

        <ExpensePage
          expenses={expenseList}
          setExpenses={setExpenseList}
          onAddExpense={handleAddExpense}
        />
      </div>

      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onExpenseAdded={handleAddExpense}
        />
      )}

      <div className="mt-8 sm:mt-10">
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Expense;
