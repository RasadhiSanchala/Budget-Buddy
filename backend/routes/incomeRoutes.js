const express = require("express");
const router = express.Router();
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel
} = require("../controllers/incomeController");

const { protect } = require("../middleware/authMiddleware");

// Route: POST /api/v1/income/add
router.post("/add", protect, addIncome);

// Placeholder routes if needed
router.get("/get", protect, getAllIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);

module.exports = router;
