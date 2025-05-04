import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const FinancialOverview = () => {
  const [financialData, setFinancialData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFinancialOverview = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
        const { totalBalance, totalIncome, totalExpenses } = response.data; // Data from SummaryCards
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
        data: [
          financialData.totalIncome,
          financialData.totalExpense,
          financialData.balance
        ],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'], // Green for Income, Red for Expense, Blue for Balance
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `LKR ${tooltipItem.raw}`;
          }
        }
      }
    },
  };

  if (loading) return <p className="text-center mt-4">Loading financial overview...</p>;
  if (error) return <p className="text-center text-red-600 mt-4">{error}</p>;

  return (
    <div className="bg-white shadow p-6 rounded-xl mt-16 mx-4 max-w-6xl w-full">

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Financial Overview</h2>
      
      <div className="flex justify-center">
        <div className="w-full max-w-sm">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="text-lg font-medium text-gray-700 flex justify-between">
          <span>Total Income:</span>
          <span className="font-bold text-green-600">LKR {financialData.totalIncome}</span>
        </div>
        
        <div className="text-lg font-medium text-gray-700 flex justify-between">
          <span>Total Expense:</span>
          <span className="font-bold text-red-600">LKR {financialData.totalExpense}</span>
        </div>

        <div className="text-lg font-medium text-gray-700 flex justify-between">
          <span>Balance:</span>
          <span className="font-bold text-blue-600">LKR {financialData.balance}</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;
