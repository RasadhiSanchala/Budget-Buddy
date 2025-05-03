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
        onIncomeAdded(res.data); // Update the income list
      }
      onClose(); // Close modal
    } catch (error) {
      alert("Failed to add income");
    }
  };

  const handleEmojiClick = (emojiData) => {
    setFormData({ ...formData, icon: emojiData.emoji });
    setShowPicker(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-12 rounded-lg w-96 relative z-50">
        <h2 className="text-xl font-semibold mb-4">Add Income</h2>
        <form onSubmit={handleSubmit}>

          {/* Emoji Picker Field */}
          <div className="mb-6">
            <label className="block text-sm mb-1">Pick Icon</label>
            <button
              type="button"
              onClick={() => setShowPicker(!showPicker)}
              className="text-2xl border px-3 py-2 rounded w-full text-left"
            >
              {formData.icon || "😊"}
            </button>
            {showPicker && (
              <div className="absolute z-50 mt-2">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Income Source"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            className="w-full mb-6 p-2 border"
          />
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full mb-6 p-2 border"
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full mb-9 p-2 border"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-red-600 mr-4">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
