import React, { useState } from "react";
import AddExpenseModal from "../../components/Expense/AddExpenseModal";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpensePage from "../../components/Expense/ExpensePage";
import ExpenseBarChart from '../../components/Expense/ExpenseBarChart';
import Footer from '../../components/layouts/Footer'; 

const Expense = () => {
  const [showModal, setShowModal] = useState(false);
  const [expenseList, setExpenseList] = useState([]);

  const handleAddExpense = (newExpense) => {
    setExpenseList((prev) => [newExpense, ...prev]);
  };

  return (
    <div className="flex min-h-screen">
     
      <div className="fixed top-0 left-0 h-screen z-50 w-[280px]">
        <DashboardLayout activeMenu="Expense" />
      </div>

      
      <div className="flex-1 p-8 relative ">
     
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#921b1b] text-white px-4 py-4 rounded shadow-md"
          >
            + Add Expense
          </button>
        </div>

       
        <div>
          <ExpenseBarChart />
        </div>

        <ExpensePage
          expenses={expenseList}
          setExpenses={setExpenseList}
          onAddExpense={handleAddExpense}
        />

        
        {showModal && (
          <AddExpenseModal
            onClose={() => setShowModal(false)}
            onExpenseAdded={handleAddExpense}
          />
        )}

        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Expense;
