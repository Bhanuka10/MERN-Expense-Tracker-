const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add an expense title'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add an expense amount'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Utilities', 'Housing', 'Healthcare', 'Education', 'Personal', 'Other'],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Expense', expenseSchema);