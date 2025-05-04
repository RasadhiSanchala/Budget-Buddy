import React, { useEffect, useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign } from 'lucide-react';
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

  const cardStyle = "bg-white shadow-lg p-6 rounded-xl w-full max-w-xs h-48 w-64 text-center cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-300";


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

  if (loading) return <p className="text-center mt-4">Loading summary...</p>;
  if (error) return <p className="text-center text-red-600 mt-4">{error}</p>;

  return (
    <div className="w-full px-8 mt-8 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <motion.div
          className={cardStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CircleDollarSign className="w-16 h-16 text-blue-700 mx-auto" />
          <h2 className="text-gray-700 text-xl mt-8">Total Balance</h2>
          <p className="text-2xl font-bold text-blue-700">LKR {summary.totalBalance}</p>
        </motion.div>

        <motion.div
          className={cardStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ArrowDownCircle className="w-16 h-16 text-green-600 mx-auto" />
          <h3 className="text-gray-700 text-2xl mt-8">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">LKR {summary.totalIncome}</p>
        </motion.div>

        <motion.div
          className={cardStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ArrowUpCircle className="w-16 h-16 text-red-600 mx-auto" />
          <h3 className="text-gray-700 text-2xl mt-8">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">LKR {summary.totalExpenses}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SummaryCards;
