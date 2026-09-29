import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { Pie } from 'react-chartjs-2';
import { ChartPie } from 'lucide-react';
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
        data: [financialData.totalIncome, financialData.totalExpense, Math.max(financialData.balance, 0)],
        backgroundColor: ['#22C55E', '#F43F5E', '#6D55E8'],
        borderColor: '#ffffff',
        borderWidth: 5,
        hoverOffset: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#171335',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 12,
        cornerRadius: 12,
        callbacks: {
          label: (tooltipItem) => ` LKR ${Number(tooltipItem.raw || 0).toLocaleString()}`,
        },
      },
    },
  };

  if (loading) return <div className="h-[430px] animate-pulse rounded-[24px] border border-slate-200 bg-white" />;
  if (error) return <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-600">{error}</div>;

  const rows = [
    { label: 'Income', value: financialData.totalIncome, color: 'bg-emerald-500', text: 'text-emerald-600' },
    { label: 'Expense', value: financialData.totalExpense, color: 'bg-rose-500', text: 'text-rose-600' },
    { label: 'Balance', value: financialData.balance, color: 'bg-[#6D55E8]', text: 'text-[#6D55E8]' },
  ];

  return (
    <div className="surface-card h-full min-h-[430px] w-full min-w-0 p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#6D55E8] uppercase">Distribution</p>
          <h2 className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-[#171335]">Financial overview</h2>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6D55E8]/10 text-[#6D55E8]">
          <ChartPie size={19} />
        </div>
      </div>

      <div className="relative mx-auto h-[225px] w-full max-w-[320px] sm:h-[245px]">
        <Pie data={chartData} options={chartOptions} />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase">Net balance</p>
            <p className="mt-1 text-lg font-extrabold tracking-[-0.03em] text-[#171335]">
              LKR {Number(financialData.balance || 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
        {rows.map((row) => (
          <div key={row.label} className="rounded-2xl bg-slate-50/80 px-3 py-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
              <span className={`h-2 w-2 rounded-full ${row.color}`} />
              {row.label}
            </div>
            <p className={`mt-1 truncate text-sm font-extrabold ${row.text}`}>
              LKR {Number(row.value || 0).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialOverview;
