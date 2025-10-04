import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ expenses = [] }) => {
  // Prepare data for category pie chart
  const byCategory = expenses.reduce((acc, e) => {
    const k = e.category || 'Uncategorized';
    acc[k] = (acc[k] || 0) + (e.amount || 0);
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(byCategory),
    datasets: [
      {
        data: Object.values(byCategory),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  // Prepare data for monthly expenses bar chart
  const months = {};
  expenses.forEach(e => {
    const d = new Date(e.date);
    const key = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}`;
    months[key] = (months[key] || 0) + (e.amount || 0);
  });
  
  const sortedMonths = Object.keys(months).sort();
  
  const barData = {
    labels: sortedMonths.map(m => {
      const [year, month] = m.split('-');
      return `${month}/${year}`;
    }),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: sortedMonths.map(m => months[m]),
        backgroundColor: 'rgba(108, 92, 231, 0.6)',
        borderColor: 'rgba(108, 92, 231, 1)',
        borderWidth: 1,
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Expense Trend'
      }
    }
  };

  return (
    <div className="charts-container">
      <div className="chart-section pie-chart">
        <h4>Category Distribution</h4>
        <Pie data={pieData} />
      </div>
      <div className="chart-section bar-chart">
        <h4>Monthly Expenses</h4>
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default Charts;