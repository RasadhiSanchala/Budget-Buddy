import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

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

  if (loading) return <p className="text-center mt-4">Loading transactions...</p>;
  if (error) return <p className="text-center text-red-600 mt-4">{error}</p>;

  return (
    <div className="bg-white shadow rounded-2xl p-5 xl:p-6 w-full h-full min-h-[430px] min-w-0">
      <h2 className="text-xl xl:text-2xl font-semibold mb-5 text-gray-800">
        Recent Transactions
      </h2>

      <div className="overflow-y-auto max-h-[350px] pr-1 sm:pr-2 space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500">No recent transactions yet.</p>
        ) : (
          transactions.map((tx, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 border border-gray-200 shadow-sm rounded-xl p-4 transition duration-300 min-w-0 ${
                tx.type === 'income' ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="text-xl shrink-0">
                {tx.type === 'income' ? (
                  <FaArrowDown className="text-green-600" />
                ) : (
                  <FaArrowUp className="text-red-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-gray-800 font-semibold text-sm sm:text-base truncate">
                  {tx.description || tx.category || tx.source || 'Transaction'}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>

              <div
                className={`text-sm sm:text-base font-bold shrink-0 ${
                  tx.type === 'income' ? 'text-green-600' : 'text-red-500'
                }`}
              >
                LKR {tx.amount}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
