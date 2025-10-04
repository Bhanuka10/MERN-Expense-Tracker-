import React, { useState } from 'react';

const AddExpenseForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    
    onAdd({ 
      title: description, 
      amount: Number(amount), 
      category, 
      date: date || new Date() 
    });
    
    // Reset form
    setDescription('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().slice(0,10));
  };

  const categories = [
    'Food', 'Transportation', 'Entertainment', 'Shopping',
    'Bills', 'Health', 'Travel', 'Education', 'Other'
  ];

  return (
    <form onSubmit={handleSubmit} className="add-expense-form">
      <h3>Add New Expense</h3>
      <div className="form-row">
        <input 
          placeholder="Description" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          required
        />
        <input 
          placeholder="Amount" 
          type="number" 
          min="0.01" 
          step="0.01"
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          required
        />
        <select 
          value={category} 
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input 
          type="date" 
          value={date} 
          onChange={e => setDate(e.target.value)} 
        />
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default AddExpenseForm;