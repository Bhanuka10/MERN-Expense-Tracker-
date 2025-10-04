import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/expenses';

// Mock data for demo mode
const mockExpenses = [
  {
    _id: '1',
    title: 'Groceries',
    amount: 50.25,
    date: new Date('2023-05-01').toISOString(),
    category: 'Food',
    description: 'Weekly groceries',
    createdAt: new Date('2023-05-01').toISOString(),
    updatedAt: new Date('2023-05-01').toISOString(),
  },
  {
    _id: '2',
    title: 'Movie tickets',
    amount: 25.00,
    date: new Date('2023-04-28').toISOString(),
    category: 'Entertainment',
    description: 'Weekend movie',
    createdAt: new Date('2023-04-28').toISOString(),
    updatedAt: new Date('2023-04-28').toISOString(),
  },
  {
    _id: '3',
    title: 'Gas',
    amount: 35.75,
    date: new Date('2023-04-25').toISOString(),
    category: 'Transportation',
    description: 'Car refuel',
    createdAt: new Date('2023-04-25').toISOString(),
    updatedAt: new Date('2023-04-25').toISOString(),
  },
];

// Flag to track if we're in demo mode (backend unavailable)
let isDemoMode = false;

export const getExpenses = async () => {
  try {
    const res = await axios.get(API_URL);
    isDemoMode = false;
    return res.data;
  } catch (error) {
    console.log('Using mock data for expenses due to API error:', error.message);
    isDemoMode = true;
    return mockExpenses;
  }
};

export const addExpense = async (expense) => {
  if (isDemoMode) {
    // In demo mode, simulate adding an expense
    const newExpense = {
      ...expense,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockExpenses.unshift(newExpense);
    return newExpense;
  }

  try {
    const res = await axios.post(API_URL, expense);
    return res.data;
  } catch (error) {
    console.error('Error adding expense:', error.message);
    throw error;
  }
};

export const updateExpense = async (id, updatedExpense) => {
  if (isDemoMode) {
    // In demo mode, simulate updating an expense
    const index = mockExpenses.findIndex((expense) => expense._id === id);
    if (index !== -1) {
      mockExpenses[index] = {
        ...mockExpenses[index],
        ...updatedExpense,
        updatedAt: new Date().toISOString(),
      };
      return mockExpenses[index];
    }
    throw new Error('Expense not found');
  }

  try {
    const res = await axios.put(`${API_URL}/${id}`, updatedExpense);
    return res.data;
  } catch (error) {
    console.error('Error updating expense:', error.message);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  if (isDemoMode) {
    // In demo mode, simulate deleting an expense
    const index = mockExpenses.findIndex((expense) => expense._id === id);
    if (index !== -1) {
      const deleted = mockExpenses.splice(index, 1)[0];
      return { id: deleted._id };
    }
    throw new Error('Expense not found');
  }

  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting expense:', error.message);
    throw error;
  }
};

// default export for backwards compatibility
export default {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};