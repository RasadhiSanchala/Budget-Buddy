import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { FaTrash } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";

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
    } catch (err) {
      console.error("Error downloading Excel file:", err);
    }
  };

  return (
    <div className="p-4 relative ml-[250px] overflow-y-auto flex-1">
      <h2 className="text-2xl font-bold mb-6 text-[#AF0202]">Expense List</h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500">No expense records yet.</p>
      ) : (
        <div className="bg-white border border-gray-300 rounded-xl shadow-lg p-6 relative">
          {/* Download Button */}
          <div className="flex justify-end my-4">
            <button
              onClick={handleDownloadExcel}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-3 rounded flex items-center gap-2 shadow"
            >
              <FaDownload className="text-white" />
              Download
            </button>
          </div>

          <h3 className="text-lg font-semibold text-[#AF0202] mb-4">All Expenses</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
            {expenses.map((expense) => (
              <div
                key={expense._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-8 flex items-start justify-between gap-4 relative"
              >
                {/* Left - Icon + Info */}
                <div className="flex gap-4 items-start">
                  <div className="text-3xl text-[#FF6347]">
                    {expense.icon ? expense.icon : "💸"}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[#AF0202]">
                      {expense.category}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-black">
                        {new Date(expense.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right - Amount + Delete */}
                <div className="flex items-center gap-12">
                  <div className="bg-red-100 text-red-800 px-3 py-3 rounded-lg flex items-center gap-2 font-medium">
                    <span>📉</span>
                    Rs {expense.amount}
                  </div>
                  <button
                    onClick={() => openModal(expense._id)}
                    className="text-gray-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-[90%] max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this expense?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensePage;
