import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  CreditCardIcon,
  PlusIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Wallet: React.FC = () => {
  const { user } = useAuth();
  const [showFundModal, setShowFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState('');

  const transactions = [
    {
      id: 1,
      type: 'credit',
      description: 'Wallet funding via Monnify',
      amount: 10000,
      date: '2025-01-15',
      time: '14:30',
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      description: 'NIN Premium slip download',
      amount: 2500,
      date: '2025-01-15',
      time: '10:15',
      status: 'completed'
    },
    {
      id: 3,
      type: 'debit',
      description: 'MTN ₦1,000 airtime purchase',
      amount: 1000,
      date: '2025-01-14',
      time: '16:45',
      status: 'completed'
    },
    {
      id: 4,
      type: 'credit',
      description: 'Cashback from referral',
      amount: 500,
      date: '2025-01-14',
      time: '09:20',
      status: 'completed'
    },
    {
      id: 5,
      type: 'debit',
      description: 'BVN verification and slip',
      amount: 1500,
      date: '2025-01-13',
      time: '11:30',
      status: 'completed'
    }
  ];

  const fundingOptions = [
    { amount: 1000, label: '₦1,000' },
    { amount: 2000, label: '₦2,000' },
    { amount: 5000, label: '₦5,000' },
    { amount: 10000, label: '₦10,000' },
    { amount: 20000, label: '₦20,000' },
    { amount: 50000, label: '₦50,000' }
  ];

  const handleFunding = (amount?: number) => {
    const fundingAmount = amount || parseInt(fundAmount);
    if (fundingAmount > 0) {
      // Here you would integrate with Monnify payment gateway
      alert(`Initiating payment of ₦${fundingAmount.toLocaleString()} via Monnify...`);
      setShowFundModal(false);
      setFundAmount('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Wallet</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your funds and view transaction history
          </p>
        </div>
        <button
          onClick={() => setShowFundModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Fund Wallet</span>
        </button>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Available Balance</p>
            <p className="text-4xl font-bold mt-2">₦{user?.wallet?.toLocaleString() || '0'}</p>
            <p className="text-blue-100 text-sm mt-1">Last updated: Just now</p>
          </div>
          <div className="opacity-20">
            <CreditCardIcon className="h-20 w-20" />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-blue-100 text-xs">This Month</p>
            <p className="text-xl font-semibold">₦45,750</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-blue-100 text-xs">Last Month</p>
            <p className="text-xl font-semibold">₦32,480</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-blue-100 text-xs">Total Spent</p>
            <p className="text-xl font-semibold">₦128,920</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Transaction History
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'credit' 
                      ? 'bg-emerald-100 dark:bg-emerald-900' 
                      : 'bg-red-100 dark:bg-red-900'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ArrowUpIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <ClockIcon className="h-4 w-4" />
                      <span>{transaction.date} at {transaction.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    transaction.type === 'credit' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                  </p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fund Wallet Modal */}
      {showFundModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowFundModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 sm:mx-0 sm:h-10 sm:w-10">
                    <CreditCardIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Fund Wallet
                    </h3>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Choose an amount or enter a custom amount to fund your wallet
                      </p>
                      
                      {/* Quick amount buttons */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {fundingOptions.map((option) => (
                          <button
                            key={option.amount}
                            onClick={() => handleFunding(option.amount)}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                      
                      {/* Custom amount input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Or enter custom amount
                        </label>
                        <input
                          type="number"
                          value={fundAmount}
                          onChange={(e) => setFundAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => handleFunding()}
                  disabled={!fundAmount || parseInt(fundAmount) <= 0}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Fund with Monnify
                </button>
                <button
                  onClick={() => setShowFundModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;