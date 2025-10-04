import React from 'react';

const Summary = ({ expenses }) => {
  const total = (expenses || []).reduce((s, e) => s + (e.amount || 0), 0);
  const byCategory = (expenses || []).reduce((acc, e) => {
    const k = e.category || 'Uncategorized';
    acc[k] = (acc[k] || 0) + (e.amount || 0);
    return acc;
  }, {});

  return (
    <div className="summary">
      <h3>Summary</h3>
      <div className="total">Total: ${total.toFixed(2)}</div>
      <div className="category-cards">
        {Object.keys(byCategory).map(cat => (
          <div key={cat} className="category-card">
            <div><strong>{cat}</strong></div>
            <div>${byCategory[cat].toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;