import React, { useEffect, useState } from 'react';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Summary from '../components/Summary';
import Charts from '../components/Charts';
import * as service from '../services/expenseService';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await service.getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load expenses. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchExpenses();
  }, []);

  const handleAdd = async (expense) => {
    try {
      setError(null);
      const saved = await service.addExpense(expense);
      setExpenses(prev => [saved, ...prev]);
    } catch (err) {
      console.error('Error adding expense:', err);
      setError('Failed to add expense. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(null);
      await service.deleteExpense(id);
      setExpenses(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
      setError('Failed to delete expense. Please try again.');
    }
  };

  const handleUpdate = async (id, updated) => {
    try {
      setError(null);
      const res = await service.updateExpense(id, updated);
      setExpenses(prev => prev.map(p => p._id === id ? res : p));
    } catch (err) {
      console.error('Error updating expense:', err);
      setError('Failed to update expense. Please try again.');
    }
  };

  return (
    <div>
      <AddExpenseForm onAdd={handleAdd} />
      <Summary expenses={expenses} />
      {error && <div className="error">{error}</div>}
      {loading ? 
        <div className="loading">Loading expenses...</div> : 
        <ExpenseList expenses={expenses} onDelete={handleDelete} onUpdate={handleUpdate} />
      }
      <Charts expenses={expenses} />
    </div>
  );
};

export default Dashboard;