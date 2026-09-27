import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
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

  return (
    <section className="w-full min-w-0">
      <h3 className="text-xl xl:text-2xl font-bold mb-4 text-[#AF0202]">
        Expenses in Last 7 Days
      </h3>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 sm:p-5 xl:p-6 min-w-0">
        <div className="w-full h-[300px] sm:h-[330px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} minTickGap={8} />
              <YAxis tick={{ fontSize: 11 }} width={55} />
              <Tooltip />
              <Bar dataKey="amount" fill="#EF4444" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default ExpenseBarChart;
