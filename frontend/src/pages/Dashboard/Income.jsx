import React, { useState } from 'react';
import { Plus, TrendingUp } from 'lucide-react';
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
      <section className="mb-6 overflow-hidden rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-[#F5F6FB] px-5 py-6 sm:px-7 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-[0_12px_25px_rgba(16,185,129,0.24)]">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] text-emerald-600 uppercase">Cash inflow</p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.035em] text-[#171335] sm:text-3xl">Income management</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Record earnings, review recent income and understand your weekly inflow at a glance.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#171335] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(23,19,53,0.18)] transition hover:-translate-y-0.5 hover:bg-[#211b4f] sm:w-auto"
          >
            <Plus size={18} />
            Add income
          </button>
        </div>
      </section>

      <div className="space-y-6 min-w-0">
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

      <div className="mt-8">
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Income;
