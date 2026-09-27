import React, { useState } from "react";
import AddExpenseModal from "../../components/Expense/AddExpenseModal";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpensePage from "../../components/Expense/ExpensePage";
import ExpenseBarChart from '../../components/Expense/ExpenseBarChart';
import Footer from '../../components/layouts/Footer';

const Expense = () => {
  const [showModal, setShowModal] = useState(false);
  const [expenseList, setExpenseList] = useState([]);

  const handleAddExpense = (newExpense) => {
    setExpenseList((prev) => [newExpense, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#f8f7fb]">
      <aside className="fixed top-0 left-0 h-screen w-[260px] z-50 bg-white">
        <DashboardLayout activeMenu="Expense" />
      </aside>

      <main className="ml-[260px] min-h-screen min-w-0 px-5 py-6 lg:px-7 xl:px-8 xl:py-8">
        <div className="max-w-[1600px] mx-auto min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl xl:text-3xl font-bold text-[#AF0202]">Expense</h1>
              <p className="text-sm text-gray-500 mt-1">Track and manage your spending.</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-[#921b1b] hover:bg-[#741515] text-white px-5 py-3 rounded-xl shadow-md transition"
            >
              + Add Expense
            </button>
          </div>

          <div className="space-y-7 min-w-0">
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

          <div className="mt-10">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Expense;
