import React, { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Landmark, WalletCards } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { motion } from 'framer-motion';

const SummaryCards = () => {
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
        const { totalBalance, totalIncome, totalExpenses } = response.data;
        setSummary({ totalBalance, totalIncome, totalExpenses });
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-[170px] animate-pulse rounded-[24px] border border-slate-200 bg-white" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm font-medium text-rose-600">{error}</div>;
  }

  const cards = [
    {
      label: 'Available Balance',
      value: summary.totalBalance,
      icon: Landmark,
      detail: 'Current net position',
      card: 'bg-gradient-to-br from-[#201A55] via-[#171335] to-[#0F0C27] text-white',
      iconWrap: 'bg-white/10 text-[#F4C95D]',
      detailColor: 'text-slate-400',
      accent: 'text-[#F4C95D]',
      badge: 'Balance',
    },
    {
      label: 'Total Income',
      value: summary.totalIncome,
      icon: ArrowDownRight,
      detail: 'Money flowing in',
      card: 'bg-white text-[#171335] border border-slate-200/80',
      iconWrap: 'bg-emerald-50 text-emerald-600',
      detailColor: 'text-slate-400',
      accent: 'text-emerald-600',
      badge: 'Income',
    },
    {
      label: 'Total Expenses',
      value: summary.totalExpenses,
      icon: ArrowUpRight,
      detail: 'Money flowing out',
      card: 'bg-white text-[#171335] border border-slate-200/80',
      iconWrap: 'bg-rose-50 text-rose-600',
      detailColor: 'text-slate-400',
      accent: 'text-rose-600',
      badge: 'Expense',
    },
  ];

  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-3 xl:gap-5">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            className={`relative min-h-[170px] overflow-hidden rounded-[24px] p-5 shadow-[0_18px_45px_rgba(31,35,58,0.07)] sm:p-5 xl:p-6 ${card.card}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            {index === 0 && (
              <>
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#765EF1]/25 blur-2xl" />
                <div className="absolute -bottom-16 left-16 h-32 w-32 rounded-full bg-[#F4C95D]/10 blur-2xl" />
              </>
            )}

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.iconWrap}`}>
                  <Icon size={21} />
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] uppercase ${index === 0 ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
                  {card.badge}
                </span>
              </div>

              <div className="mt-5">
                <p className={`text-xs font-semibold ${index === 0 ? 'text-slate-300' : 'text-slate-500'}`}>{card.label}</p>
                <div className="mt-1 flex items-end gap-2">
                  <span className={`pb-1 text-xs font-bold ${card.accent}`}>LKR</span>
                  <p className="break-all text-2xl font-extrabold tracking-[-0.04em] sm:text-[26px] xl:text-3xl">
                    {Number(card.value || 0).toLocaleString()}
                  </p>
                </div>
                <p className={`mt-2 flex items-center gap-1.5 text-[11px] ${card.detailColor}`}>
                  <WalletCards size={12} />
                  {card.detail}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
