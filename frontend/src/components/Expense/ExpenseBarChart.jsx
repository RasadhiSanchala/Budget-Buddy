import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { BarChart3 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ExpenseBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
        const expenses = res.data;

        const today = new Date();
        const last7Days = [...Array(7)]
          .map((_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            return d.toISOString().split('T')[0];
          })
          .reverse();

        const dataMap = last7Days.map((date) => {
          const daily = expenses.filter((item) => {
            const itemDate = new Date(item.date).toISOString().split('T')[0];
            return itemDate === date;
          });
          const total = daily.reduce((sum, item) => sum + item.amount, 0);
          return { date, amount: total };
        });

        setChartData(dataMap);
      } catch (err) {
        console.error('Failed to fetch expenses for chart:', err);
      }
    };

    fetchExpenses();
  }, []);

  const totalWeek = chartData.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <section className="surface-card w-full min-w-0 p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-[0.14em] text-rose-600 uppercase">7-day trend</p>
          <h3 className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-[#171335]">Weekly expense activity</h3>
          <p className="mt-1 text-xs text-slate-400">Daily expense totals for the last seven days.</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-rose-50 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white">
            <BarChart3 size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.1em] text-rose-600 uppercase">7-day total</p>
            <p className="text-sm font-extrabold text-rose-700">LKR {totalWeek.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="h-[260px] w-full min-w-0 sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 4 }}>
            <CartesianGrid vertical={false} stroke="#EEF0F5" strokeDasharray="4 4" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value.slice(5)}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              width={58}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(244, 63, 94, 0.05)' }}
              contentStyle={{
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 12px 30px rgba(15,23,42,0.10)',
              }}
              formatter={(value) => [`LKR ${Number(value || 0).toLocaleString()}`, 'Expense']}
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Bar dataKey="amount" fill="#F43F5E" radius={[8, 8, 3, 3]} maxBarSize={44} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ExpenseBarChart;
