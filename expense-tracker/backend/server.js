const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Expense Tracker API' });
});

// Try to connect to database but don't block server startup
let dbConnected = false;
connectDB()
  .then(() => {
    dbConnected = true;
  })
  .catch(() => {
    console.log('Database connection failed. Using mock data.');
  });

// Custom middleware to check database connection
app.use('/api/expenses', (req, res, next) => {
  if (!dbConnected && req.method !== 'GET') {
    return res.status(503).json({ 
      message: 'Database connection unavailable. Only GET requests are supported in demo mode.' 
    });
  }
  next();
}, require('./routes/expenseRoutes'));

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});