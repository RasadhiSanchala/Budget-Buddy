import React, { useState } from 'react';
import { Plus, TrendingDown } from 'lucide-react';
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
      <section className="mb-6 overflow-hidden rounded-[28px] border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-[#F5F6FB] px-5 py-6 sm:px-7 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-[0_12px_25px_rgba(244,63,94,0.22)]">
              <TrendingDown size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] text-rose-600 uppercase">Cash outflow</p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.035em] text-[#171335] sm:text-3xl">Expense management</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Keep spending visible, track recent expenses and identify your weekly outflow patterns.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#171335] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(23,19,53,0.18)] transition hover:-translate-y-0.5 hover:bg-[#211b4f] sm:w-auto"
          >
            <Plus size={18} />
            Add expense
          </button>
        </div>
      </section>

      <div className="space-y-6 min-w-0">
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

      <div className="mt-8">
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Expense;
