import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { FaTrash, FaDownload } from "react-icons/fa";

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
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading Excel file:", err);
    }
  };

  return (
    <section className="w-full min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-xl xl:text-2xl font-bold text-[#2D02AF]">Income List</h2>

        {incomes.length > 0 && (
          <button
            onClick={handleDownloadExcel}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-3 rounded-xl flex items-center gap-2 shadow transition"
          >
            <FaDownload />
            Download
          </button>
        )}
      </div>

      {incomes.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 text-gray-500">
          No income records yet.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 sm:p-5 xl:p-6 min-w-0">
          <h3 className="text-lg font-semibold text-[#2D02AF] mb-4">All Incomes</h3>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 max-h-[640px] overflow-y-auto pr-1 sm:pr-2">
            {incomes.map((income) => (
              <div
                key={income._id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0"
              >
                <div className="flex gap-4 items-center min-w-0">
                  <div className="text-3xl shrink-0 text-[#FFD700]">
                    {income.icon ? income.icon : "💰"}
                  </div>

                  <div className="min-w-0">
                    <div className="text-base sm:text-lg font-semibold text-[#2D02AF] truncate">
                      {income.source}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      <span className="font-medium text-black">
                        {new Date(income.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg flex items-center gap-2 font-medium whitespace-nowrap">
                    <span>📈</span>
                    Rs {income.amount}
                  </div>

                  <button
                    onClick={() => openModal(income._id)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-700 hover:bg-red-50 transition"
                    aria-label="Delete income"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4 overflow-y-auto">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-full max-w-md my-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this income?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default IncomePage;
