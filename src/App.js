import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddTransaction = (type) => {
    if (!description || !amount) return;
    
    const newTransaction = {
      id: transactions.length + 1,
      description,
      amount: parseFloat(amount),
      type,
    };

    setTransactions([...transactions, newTransaction]);
    setDescription('');
    setAmount('');
  };

  const calculateTotal = (type) => {
    return transactions
      .filter(transaction => transaction.type === type)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);
  };

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <div className="summary">
        <h2>Budget Summary</h2>
        <div>Income: ${calculateTotal('income')}</div>
        <div>Expenses: ${calculateTotal('expense')}</div>
        <div>Balance: ${(calculateTotal('income') - calculateTotal('expense')).toFixed(2)}</div>
      </div>
      <div className="transaction-form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={() => handleAddTransaction('income')}>Add Income</button>
        <button onClick={() => handleAddTransaction('expense')}>Add Expense</button>
      </div>
      <div className="transactions">
        <h2>Transactions</h2>
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id} className={transaction.type}>
              {transaction.description}: ${transaction.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
