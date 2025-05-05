import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPaths';
import EmojiPicker from "emoji-picker-react";

const AddExpenseModal = ({ onClose, onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    icon: "",
    category: "",
    amount: "",
    date: "",
  });

  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, formData);
      if (onExpenseAdded) {
        onExpenseAdded(res.data); // Update the expense list
      }
      onClose(); // Close modal
    } catch (error) {
      alert("Failed to add expense");
    }
  };

  const handleEmojiClick = (emojiData) => {
    setFormData({ ...formData, icon: emojiData.emoji });
    setShowPicker(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[1000]">
    <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl p-10 rounded-2xl w-[400px] relative animate-fade-in-up">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="text-4xl mb-2 animate-bounce">{formData.icon || "💰"}</div>
        <h2 className="text-2xl font-bold text-gray-800">Add New Expense</h2>
        <p className="text-sm text-gray-500">Track your spending with ease 🛍️</p>
      </div>
  
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Emoji Picker */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Pick an Icon</label>
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="text-3xl bg-white shadow-inner border border-gray-300 w-full py-2 rounded-md hover:ring-2 hover:ring-indigo-300 transition"
          >
            {formData.icon || "💸"}
          </button>
          {showPicker && (
            <div className="absolute z-50 mt-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
  
        <div>
          <input
            type="text"
            placeholder="Expense Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
  
        <div>
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>
  
        <div>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>
  
        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="text-red-600 hover:underline transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default AddExpenseModal;
