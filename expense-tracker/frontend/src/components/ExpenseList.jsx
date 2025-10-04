import React from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onDelete, onUpdate }) => {
  if (!expenses || !expenses.length) return <p>No expenses yet. Add one to get started!</p>;
  
  return (
    <div>
      <h3>Your Expenses</h3>
      {expenses.map(exp => (
        <ExpenseItem 
          key={exp._id} 
          expense={exp} 
          onDelete={onDelete} 
          onUpdate={onUpdate} 
        />
      ))}
    </div>
  );
};

export default ExpenseList;