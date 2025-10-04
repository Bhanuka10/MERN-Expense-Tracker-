const express = require('express');
const router = express.Router();
const {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats,
} = require('../controllers/expenseController');

// Get all expenses and create new expense
router.route('/').get(getExpenses).post(createExpense);

// Get stats
router.get('/stats', getExpenseStats);

// Get, update, and delete expense by id
router.route('/:id').get(getExpenseById).put(updateExpense).delete(deleteExpense);

module.exports = router;