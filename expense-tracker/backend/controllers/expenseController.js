const Expense = require('../models/Expense');

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Public
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error: Failed to retrieve expenses');
  }
};

// @desc    Get expense by ID
// @route   GET /api/expenses/:id
// @access  Public
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      res.status(404);
      throw new Error('Expense not found');
    }

    res.status(200).json(expense);
  } catch (error) {
    if (error.message === 'Expense not found') {
      res.status(404);
    } else {
      res.status(500);
    }
    throw new Error(error.message || 'Server Error: Failed to retrieve expense');
  }
};

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Public
const createExpense = async (req, res) => {
  try {
    const { title, amount, date, category, description } = req.body;

    if (!title || !amount || !category) {
      res.status(400);
      throw new Error('Please provide title, amount, and category');
    }

    const expense = await Expense.create({
      title,
      amount,
      date: date || Date.now(),
      category,
      description,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    throw new Error(error.message || 'Server Error: Failed to create expense');
  }
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Public
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      res.status(404);
      throw new Error('Expense not found');
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedExpense);
  } catch (error) {
    if (error.message === 'Expense not found') {
      res.status(404);
    } else {
      res.status(500);
    }
    throw new Error(error.message || 'Server Error: Failed to update expense');
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Public
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      res.status(404);
      throw new Error('Expense not found');
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    if (error.message === 'Expense not found') {
      res.status(404);
    } else {
      res.status(500);
    }
    throw new Error(error.message || 'Server Error: Failed to delete expense');
  }
};

// @desc    Get expense statistics
// @route   GET /api/expenses/stats
// @access  Public
const getExpenseStats = async (req, res) => {
  try {
    // Total expenses
    const totalExpenses = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    // Expenses by category
    const expensesByCategory = await Expense.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
        },
      },
    ]);

    // Expenses by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const expensesByMonth = await Expense.aggregate([
      {
        $match: {
          date: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
          },
          total: { $sum: '$amount' },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);

    res.status(200).json({
      total: totalExpenses.length > 0 ? totalExpenses[0].total : 0,
      byCategory: expensesByCategory,
      byMonth: expensesByMonth,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Server Error: Failed to retrieve expense statistics');
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats,
};