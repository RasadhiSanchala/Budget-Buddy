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
        <div className="bg-white shadow p-6 rounded-xl mt-10 mx-4 max-w-4xl w-full">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Recent Transactions</h2>
            <div className="overflow-y-auto max-h-80 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 space-y-5">
                {transactions.map((tx, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-between border border-gray-200 shadow-lg rounded-xl p-5 transition duration-300 ${tx.type === 'income' ? 'bg-green-50' : 'bg-red-50'
                            }`}
                    >
                        {/* Icon */}
                        <div className="text-2xl mr-5">
                            {tx.type === 'income' ? (
                                <FaArrowDown className="text-green-600" />
                            ) : (
                                <FaArrowUp className="text-red-500" />
                            )}
                        </div>

                        {/* Transaction Info */}
                        <div className="flex-1">
                            <p className="text-gray-800 font-semibold text-base">
                                {tx.description || tx.category || tx.source || 'Transaction'}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                                {new Date(tx.date).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Amount */}
                        <div
                            className={`text-lg font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'
                                }`}
                        >
                            LKR {tx.amount}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
