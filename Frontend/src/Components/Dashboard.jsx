import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css';
import ConfirmationModal from './ConfirmationModal'; 
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');
  const [showModal, setShowModal] = useState(false);  
  const [transactionToDelete, setTransactionToDelete] = useState(null); 

  useEffect(() => {
    axios.get('http://localhost:3030/user/transactions')
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the transactions:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { description, amount: parseFloat(amount), type };

    axios.post('http://localhost:3030/user/transactions', newTransaction)
      .then((response) => {
        setTransactions([response.data, ...transactions]);
        setAmount('');
        setDescription('');
      })
      .catch((error) => {
        console.error('There was an error adding the transaction:', error);
      });
  };

  const handleDeleteClick = (id) => {
    setTransactionToDelete(id);
    setShowModal(true); 
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:3030/user/transactions/${transactionToDelete}`)
      .then(() => {
        setTransactions(transactions.filter((transaction) => transaction._id !== transactionToDelete));
        setShowModal(false); 
      })
      .catch((error) => {
        console.error('There was an error deleting the transaction:', error);
      });
  };

  const cancelDelete = () => {
    setShowModal(false); 
  };

  return (
    <div className="dashboardcon">
      <div className='header'>
      <h1>Financial Dashboard</h1> 
      <Link to="/login" className='header-button'>Logout</Link>
      </div>
      <div className="financial">
        <p>
          <span>Total Income: </span>
          ₹{transactions.filter((trans) => trans.type === 'income').reduce((acc, trans) => acc + trans.amount, 0).toFixed(2)}
        </p>
        <p>
          <span>Total Expenses: </span>
          ₹{transactions.filter((trans) => trans.type === 'expense').reduce((acc, trans) => acc + trans.amount, 0).toFixed(2)}
        </p>
        <p>
          <span>Total Savings: </span>
          ₹{(
            transactions.filter((trans) => trans.type === 'income').reduce((acc, trans) => acc + trans.amount, 0) -
            transactions.filter((trans) => trans.type === 'expense').reduce((acc, trans) => acc + trans.amount, 0)
          ).toFixed(2)}
        </p>
      </div>
      <div className="transaction-form">
        <h2>Financial Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="transaction">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" value={description} required placeholder="Enter description" onChange={(e) => setDescription(e.target.value)}/>
          </div>
          <div className="transaction">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amount} required placeholder="Enter amount" onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="transaction">
            <label htmlFor="type">Transaction Type</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <button className="transactionbtn" type="submit">Transaction</button>
        </form>
      </div>

      {/* History List */}
      <div className="transaction-history">
        <h2>Transaction History</h2>
        <div className="transaction-title">
          <p>Description</p>
          <p>Amount Transaction</p>
          <p>Delete</p>
        </div>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              <div className="transaction-details">
                <span>{transaction.description}</span>
                <span className={transaction.type}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                </span>
                <button onClick={() => handleDeleteClick(transaction._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (<ConfirmationModal message="Are you sure you want to delete the transaction?" onConfirm={confirmDelete} onCancel={cancelDelete}/>)}
    </div>
  );
};

export default Dashboard;
