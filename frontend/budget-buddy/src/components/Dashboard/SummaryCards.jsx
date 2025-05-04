import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign } from 'lucide-react';

const SummaryCards = () => {
  const cardStyle = "bg-white shadow p-4 rounded-xl w-full text-center w-72 h-48";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-24">
      <div className={cardStyle}>
        <CircleDollarSign className="w-16 h-16 text-blue-700 mx-auto" />
        <h2 className="text-gray-700 text-xl mt-8">Total Balance</h2>
        <p className="text-2xl font-bold text-blue-700">LKR</p>
      </div>
      <div className={cardStyle}>
        <ArrowDownCircle className="w-16 h-16 text-green-600 mx-auto" />
        <h3 className="text-gray-700 text-xl mt-8">Total Income</h3>
        <p className="text-2xl font-bold text-green-600">LKR</p>
      </div>
      <div className={cardStyle}>
        <ArrowUpCircle className="w-16 h-16 text-red-600 mx-auto" />
        <h3 className="text-gray-700 text-xl mt-8">Total Expenses</h3>
        <p className="text-2xl font-bold text-red-600">LKR</p>
      </div>
    </div>
  );
};

export default SummaryCards;
