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

  const cardStyle =
    'bg-white shadow-lg p-4 sm:p-5 xl:p-6 rounded-2xl min-h-[150px] sm:min-h-[170px] xl:min-h-[180px] text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center min-w-0';

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
    <div className="w-full min-w-0">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 xl:gap-7 w-full min-w-0">
        <motion.div
          className={cardStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CircleDollarSign className="w-12 h-12 sm:w-14 sm:h-14 xl:w-16 xl:h-16 text-blue-700" />
          <h2 className="text-gray-700 text-base sm:text-lg xl:text-xl mt-4 sm:mt-5">Total Balance</h2>
          <p className="text-base sm:text-lg xl:text-xl font-bold text-blue-700 break-words">
            LKR {summary.totalBalance}
          </p>
        </motion.div>

        <motion.div
          className={cardStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ArrowDownCircle className="w-12 h-12 sm:w-14 sm:h-14 xl:w-16 xl:h-16 text-green-600" />
          <h3 className="text-gray-700 text-base sm:text-lg xl:text-xl mt-4 sm:mt-5">Total Income</h3>
          <p className="text-base sm:text-lg xl:text-xl font-bold text-green-600 break-words">
            LKR {summary.totalIncome}
          </p>
        </motion.div>

        <motion.div
          className={cardStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ArrowUpCircle className="w-12 h-12 sm:w-14 sm:h-14 xl:w-16 xl:h-16 text-red-600" />
          <h3 className="text-gray-700 text-base sm:text-lg xl:text-xl mt-4 sm:mt-5">Total Expenses</h3>
          <p className="text-base sm:text-lg xl:text-xl font-bold text-red-600 break-words">
            LKR {summary.totalExpenses}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SummaryCards;
