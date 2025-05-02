const xlsx = require('xlsx');
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const { icon, source, amount, date } = req.body;
  
      // Validation: Check for missing fields
      if (!source || !amount || !date) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newIncome = new Income({
        userId,
        icon,
        source,
        amount,
        date: new Date(date),
      });
  
      await newIncome.save();
  
      res.status(200).json(newIncome);
  
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };

// Get All Income Source
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try{
    const income = await Income.find({userId}).sort({date:-1});
    res.json(income);
  } catch(error){
    res.status(500).json({message:"Server Error"});
  }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {


  try{
    await Income.findByIdAndDelete(req.params.id);
    res.json({message:"Income deleted Successfully"});
  }catch(error){
    res.status(500).json({message:"Server Error"});
  }
};

// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  const path = require('path');
  const fs = require('fs');

  try {
    // 1. Get all income records for the user
    const income = await Income.find({ userId }).sort({ date: -1 });

    // 2. Format the data for Excel
    const data = income.map(item => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], // clean date format
    }));

    // 3. Create a workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // ✅ 4. Define full file path to save temporarily
    const filePath = path.join(__dirname, '../temp/income_details.xlsx');

    // ✅ Ensure the folder exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // 5. Save the Excel file to disk
    xlsx.writeFile(wb, filePath);

    // ✅ 6. Send file to user for download
    res.download(filePath, 'income_details.xlsx', (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Error downloading file");
      } else {
        // ✅ Optional: Delete the file after sending
        fs.unlink(filePath, () => {});
      }
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
