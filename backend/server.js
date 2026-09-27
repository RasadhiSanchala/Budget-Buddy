require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


const app = express();


// ==============================
// CORS Middleware
// ==============================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// ==============================
// JSON Middleware
// ==============================

app.use(express.json());


// ==============================
// Connect MongoDB
// ==============================

connectDB();


// ==============================
// Health / Root Route
// ==============================

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Budget Buddy API is running",
  });
});


// ==============================
// API Routes
// ==============================

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


// ==============================
// Local Server
// ==============================

const PORT = process.env.PORT || 5000;

if (require.main === module && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


// ==============================
// Export for Vercel
// ==============================

module.exports = app;