const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");


exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(userId);

   
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Total Expenses
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Last 60 Days Income
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }, // 60 days
    }).sort({ date: -1 });

    const incomeLast60DaysTotal = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 30 Days Expenses
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // 30 days
    }).sort({ date: -1 });

    const expenseLast30DaysTotal = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 5 Recent Transactions (Income + Expense)
    const last5Income = await Income.find({ userId }).sort({ date: -1 }).limit(5);
    const last5Expense = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

    const lastTransactions = [
      ...last5Income.map(txn => ({ ...txn.toObject(), type: "income" })),
      ...last5Expense.map(txn => ({ ...txn.toObject(), type: "expense" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    // Final Dashboard Response
    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpense[0]?.total || 0,
      last60DaysIncome: {
        total: incomeLast60DaysTotal,
        transactions: last60DaysIncomeTransactions,
      },
      last30DaysExpenses: {
        total: expenseLast30DaysTotal,
        transactions: last30DaysExpenseTransactions,
      },
      recentTransactions: lastTransactions,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
