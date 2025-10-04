import React, { useState } from 'react';

const ExpenseItem = ({ expense, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: expense.title || '',
    amount: expense.amount || 0,
    category: expense.category || '',
    date: expense.date ? new Date(expense.date).toISOString().slice(0,10) : ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    onUpdate(expense._id, { ...form, amount: Number(form.amount), date: form.date || new Date() });
    setEditing(false);
  };

  return (
    <div className="expense-item">
      {!editing ? (
        <>
          <div>
            <strong>{expense.title}</strong>
            <div>{expense.category ? expense.category : 'Uncategorized'} • {new Date(expense.date).toLocaleDateString()}</div>
          </div>
          <div>
            <div>${(expense.amount || 0).toFixed(2)}</div>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(expense._id)}>Delete</button>
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Description" />
          <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Amount" />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
          <input name="date" type="date" value={form.date} onChange={handleChange} />
          <div>
            <button onClick={save}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseItem;