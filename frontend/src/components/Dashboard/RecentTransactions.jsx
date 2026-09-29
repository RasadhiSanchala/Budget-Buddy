import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { ArrowDownLeft, ArrowUpRight, Clock3, ReceiptText } from 'lucide-react';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
        setTransactions(response.data.recentTransactions.slice(0, 10));
      } catch (err) {
        setError('Failed to fetch recent transactions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <div className="h-[430px] animate-pulse rounded-[24px] border border-slate-200 bg-white" />;
  if (error) return <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-600">{error}</div>;

  return (
    <div className="surface-card h-full min-h-[430px] w-full min-w-0 p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#6D55E8] uppercase">Activity</p>
          <h2 className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-[#171335]">Recent transactions</h2>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6D55E8]/10 text-[#6D55E8]">
          <ReceiptText size={19} />
        </div>
      </div>

      <div className="app-scrollbar max-h-[344px] space-y-2 overflow-y-auto pr-1">
        {transactions.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-5 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
              <ReceiptText size={21} />
            </div>
            <p className="text-sm font-bold text-slate-600">No transactions yet</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">Your latest income and expenses will appear here.</p>
          </div>
        ) : (
          transactions.map((tx, index) => {
            const isIncome = tx.type === 'income';
            return (
              <div
                key={index}
                className="group flex min-w-0 items-center gap-3 rounded-2xl border border-transparent px-2 py-3 transition hover:border-slate-100 hover:bg-slate-50/80 sm:px-3"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {isIncome ? <ArrowDownLeft size={19} /> : <ArrowUpRight size={19} />}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-700">
                    {tx.description || tx.category || tx.source || 'Transaction'}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Clock3 size={11} />
                    {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className={`text-sm font-extrabold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isIncome ? '+' : '-'} LKR {Number(tx.amount || 0).toLocaleString()}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold text-slate-400">{isIncome ? 'Income' : 'Expense'}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
