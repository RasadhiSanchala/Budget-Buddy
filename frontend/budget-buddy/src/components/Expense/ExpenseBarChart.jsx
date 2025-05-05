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

        // Build an array of the last 7 dates (YYYY-MM-DD)
        const today = new Date();
        const last7Days = [...Array(7)]
          .map((_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            return d.toISOString().split('T')[0];
          })
          .reverse();

        // Sum up amounts per date
        const dataMap = last7Days.map(date => {
          const daily = expenses.filter(e => {
            const eDate = new Date(e.date).toISOString().split('T')[0];
            return eDate === date;
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
    <div className="p-4 relative ml-[250px] overflow-y-auto flex-1">
      <h3 className="text-2xl font-bold mb-6 text-[#AF0202] ">Expenses in Last 7 Days</h3>
      <div className="bg-white border border-gray-300 rounded-xl shadow-lg p-6 relative">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#EF4444" radius={[10, 10, 0, 0]} /> {/* Tailwind red-500 */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseBarChart;
