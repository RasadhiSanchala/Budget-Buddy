import React, { useEffect, useState } from 'react';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPaths';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const IncomeBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME); // ✅ Use proper GET path
        const income = res.data;

        // Get latest 7 days
        const today = new Date();
        const last7Days = [...Array(7)].map((_, i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          return d.toISOString().split("T")[0];
        }).reverse();

        // Map amounts to dates
        const dataMap = last7Days.map(date => {
          const dailyIncome = income.filter(i => {
            const formattedDate = new Date(i.date).toISOString().split("T")[0]; // ✅ Proper formatting
            return formattedDate === date;
          });
          const totalAmount = dailyIncome.reduce((sum, item) => sum + item.amount, 0);
          return { date, amount: totalAmount };
        });

        setChartData(dataMap);
      } catch (err) {
        console.error("Failed to fetch income for chart:", err);
      }
    };

    fetchIncome();
  }, []);

  return (
    
    <div className="p-4 relative ml-[250px] overflow-y-auto flex-1">
        <h3 className="text-2xl font-bold mb-6 text-[#2D02AF]">Income in Last 7 Days</h3>
        <div className="bg-white border border-gray-300 rounded-xl shadow-lg p-6 relative">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#3B82F6" radius={[10, 10, 0, 0]} /> {/* Tailwind blue-500 */}
      </BarChart>
    </ResponsiveContainer>
    </div>
  </div>
  
  );
};

export default IncomeBarChart;
