import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPaths';
import EmojiPicker from "emoji-picker-react";

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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[1000] p-4 overflow-y-auto">
      <div className="bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl p-6 sm:p-8 rounded-2xl w-full max-w-md relative my-auto max-h-[92vh] overflow-y-auto">
        <div className="mb-6 text-center">
          <div className="text-4xl mb-2 animate-bounce">{formData.icon || "💸"}</div>
          <h2 className="text-2xl font-bold text-gray-800">Add New Income</h2>
          <p className="text-sm text-gray-500">Track your earnings smarter 💡</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">Pick an Icon</label>
            <button
              type="button"
              onClick={() => setShowPicker(!showPicker)}
              className="text-3xl bg-white shadow-inner border border-gray-300 w-full py-2 rounded-md hover:ring-2 hover:ring-indigo-300 transition"
            >
              {formData.icon || "😊"}
            </button>
            {showPicker && (
              <div className="absolute z-50 mt-2 left-1/2 -translate-x-1/2 max-w-[calc(100vw-3rem)]">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Income Source"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />

          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            >
              Add Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
