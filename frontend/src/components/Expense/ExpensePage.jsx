import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { Download, Trash2, TrendingDown, X } from "lucide-react";

const ExpensePage = ({ expenses, setExpenses }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
        setExpenses(res.data);
      } catch (err) {
        console.error("Error loading expenses", err);
      }
    };

    fetchExpenses();
  }, [setExpenses]);

  const openModal = (id) => {
    setSelectedExpenseId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedExpenseId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(selectedExpenseId));
      setExpenses((prev) => prev.filter((expense) => expense._id !== selectedExpenseId));
      closeModal();
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading Excel file:", err);
    }
  };

  return (
    <section className="surface-card w-full min-w-0 p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-[0.14em] text-rose-600 uppercase">Records</p>
          <h2 className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-[#171335]">Expense history</h2>
          <p className="mt-1 text-xs text-slate-400">Every expense entry saved to your account.</p>
        </div>

        {expenses.length > 0 && (
          <button
            onClick={handleDownloadExcel}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 sm:w-auto"
          >
            <Download size={17} />
            Export Excel
          </button>
        )}
      </div>

      {expenses.length === 0 ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-slate-50/70 px-5 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <TrendingDown size={24} />
          </div>
          <p className="text-sm font-extrabold text-slate-700">No expense records yet</p>
          <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">Add your first expense to start understanding where your money is going.</p>
        </div>
      ) : (
        <div className="app-scrollbar grid max-h-[680px] grid-cols-1 gap-3 overflow-y-auto pr-1 lg:grid-cols-2">
          {expenses.map((expense) => (
            <article
              key={expense._id}
              className="group rounded-[22px] border border-slate-200/80 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-[0_14px_30px_rgba(244,63,94,0.08)] sm:p-5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-2xl shadow-sm">
                  {expense.icon ? expense.icon : "💸"}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold text-[#171335] sm:text-[15px]">{expense.category}</p>
                  <p className="mt-1 text-xs text-slate-400">{new Date(expense.date).toLocaleDateString()}</p>
                </div>

                <button
                  onClick={() => openModal(expense._id)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                  aria-label="Delete expense"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase">Amount spent</p>
                  <p className="mt-1 text-lg font-extrabold tracking-[-0.03em] text-rose-600">
                    LKR {Number(expense.amount || 0).toLocaleString()}
                  </p>
                </div>
                <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-700">Expense</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0C0A22]/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-white p-6 shadow-[0_35px_100px_rgba(0,0,0,0.30)] sm:p-7">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              aria-label="Close delete dialog"
            >
              <X size={17} />
            </button>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <Trash2 size={21} />
            </div>
            <h3 className="mt-5 text-xl font-extrabold tracking-[-0.03em] text-[#171335]">Delete expense record?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">This entry will be removed permanently from your expense history.</p>
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={closeModal}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Keep record
              </button>
              <button
                onClick={handleConfirmDelete}
                className="rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(244,63,94,0.20)] transition hover:bg-rose-600"
              >
                Delete record
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExpensePage;
