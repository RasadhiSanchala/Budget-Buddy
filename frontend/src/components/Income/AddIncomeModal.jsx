import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPaths';
import EmojiPicker from "emoji-picker-react";
import { CalendarDays, CircleDollarSign, SmilePlus, Wallet, X } from 'lucide-react';

const AddIncomeModal = ({ onClose, onIncomeAdded }) => {
  const [formData, setFormData] = useState({
    icon: "",
    source: "",
    amount: "",
    date: "",
  });

  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, formData);
      if (onIncomeAdded) {
        onIncomeAdded(res.data);
      }
      onClose();
    } catch (error) {
      alert("Failed to add income");
    }
  };

  const handleEmojiClick = (emojiData) => {
    setFormData({ ...formData, icon: emojiData.emoji });
    setShowPicker(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0C0A22]/70 p-4 backdrop-blur-sm">
      <div className="app-scrollbar relative my-auto max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-[30px] border border-white/10 bg-white p-6 shadow-[0_35px_100px_rgba(0,0,0,0.32)] sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          aria-label="Close add income dialog"
        >
          <X size={18} />
        </button>

        <div className="pr-10">
          <p className="text-[11px] font-bold tracking-[0.14em] text-emerald-600 uppercase">New transaction</p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.035em] text-[#171335]">Add income</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Record a new source of earnings in your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div className="relative">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Transaction icon</label>
            <button
              type="button"
              onClick={() => setShowPicker(!showPicker)}
              className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-left transition hover:border-emerald-200 hover:bg-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                {formData.icon || "💰"}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-slate-700">Choose an emoji</span>
                <span className="block text-xs text-slate-400">Make this income easy to recognize</span>
              </span>
              <SmilePlus size={18} className="text-slate-400" />
            </button>
            {showPicker && (
              <div className="absolute left-1/2 z-50 mt-2 max-w-[calc(100vw-3rem)] -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Income source</span>
            <div className="relative">
              <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Salary, Freelance, Bonus..."
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Amount</span>
            <div className="relative">
              <CircleDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Date</span>
            <div className="relative">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>
          </label>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(16,185,129,0.22)] transition hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              Add income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
