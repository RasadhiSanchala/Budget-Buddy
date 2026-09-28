import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const FinancialOverview = () => {
  const [financialData, setFinancialData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFinancialOverview = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
        const { totalBalance, totalIncome, totalExpenses } = response.data;
        setFinancialData({
          totalIncome,
          totalExpense: totalExpenses,
          balance: totalBalance,
        });
      } catch (err) {
        setError('Failed to fetch financial overview');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialOverview();
  }, []);

  const chartData = {
    labels: ['Income', 'Expense', 'Balance'],
    datasets: [
      {
        data: [financialData.totalIncome, financialData.totalExpense, financialData.balance],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 28,
          font: { size: 11 },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `LKR ${tooltipItem.raw}`,
        },
      },
    },
  };

  if (loading) return <p className="text-center mt-4">Loading financial overview...</p>;
  if (error) return <p className="text-center text-red-600 mt-4">{error}</p>;

  return (
    <div className="bg-white shadow rounded-2xl p-4 sm:p-5 xl:p-6 w-full h-full min-h-[360px] sm:min-h-[410px] xl:min-h-[430px] min-w-0">
      <h2 className="text-lg sm:text-xl xl:text-2xl font-semibold mb-4 text-gray-800">
        Financial Overview
      </h2>

      <div className="w-full h-[220px] sm:h-[250px] xl:h-[285px] min-w-0">
        <Pie data={chartData} options={chartOptions} />
      </div>

      <div className="mt-5 space-y-3 text-sm sm:text-base">
        <div className="text-gray-700 flex justify-between gap-4">
          <span>Total Income:</span>
          <span className="font-bold text-green-600">LKR {financialData.totalIncome}</span>
        </div>
        <div className="text-gray-700 flex justify-between gap-4">
          <span>Total Expense:</span>
          <span className="font-bold text-red-600">LKR {financialData.totalExpense}</span>
        </div>
        <div className="text-gray-700 flex justify-between gap-4">
          <span>Balance:</span>
          <span className="font-bold text-blue-600">LKR {financialData.balance}</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;
