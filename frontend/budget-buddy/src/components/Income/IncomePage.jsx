import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { FaTrash } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";

const IncomePage = ({ incomes, setIncomes }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState(null);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
        setIncomes(res.data);
      } catch (err) {
        console.error("Error loading incomes", err);
      }
    };
    fetchIncomes();
  }, [setIncomes]);

  const openModal = (id) => {
    setSelectedIncomeId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedIncomeId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(selectedIncomeId));
      setIncomes((prev) => prev.filter((income) => income._id !== selectedIncomeId));
      closeModal();
    } catch (err) {
      console.error("Failed to delete income:", err);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob", // for binary file
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading Excel file:", err);
    }
  };

  return (
    <div className="p-4 relative">
      <h2 className="text-2xl font-bold mb-6 text-[#2D02AF]">Income List</h2>

      {incomes.length === 0 ? (
        <p className="text-gray-500">No income records yet.</p>
      ) : (
        <div className="bg-white border border-gray-300 rounded-xl shadow-lg p-6 relative">
          {/* Download Button (Top-right) */}
          <button
            onClick={handleDownloadExcel}
            className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded flex items-center gap-2 shadow"
          >
            <FaDownload className="text-white" />
            Download
          </button>

          <h3 className="text-lg font-semibold text-[#2D02AF] mb-4">All Incomes</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
            {incomes.map((income) => (
              <div
                key={income._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-8 flex items-start justify-between gap-4 relative"
              >
                {/* Left Side - Icon + Info */}
                <div className="flex gap-4 items-start">
                  <div className="text-3xl text-[#FFD700]">
                    {income.icon ? income.icon : "💰"}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[#2D02AF]">
                      {income.source}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-black">
                        {new Date(income.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Amount + Delete */}
                <div className="flex items-center gap-12">
                  <div className="bg-blue-100 text-blue-800 px-3 py-3 rounded-lg flex items-center gap-2 font-medium">
                    <span>📈</span>
                    Rs {income.amount}
                  </div>
                  <button
                    onClick={() => openModal(income._id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-[90%] max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this income?</p>
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

export default IncomePage;
