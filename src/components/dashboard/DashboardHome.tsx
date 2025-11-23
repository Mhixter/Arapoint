import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  CreditCardIcon,
  ShieldCheckIcon,
  PhoneIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Wallet Balance',
      value: `₦${user?.wallet?.toLocaleString() || '0'}`,
      icon: CreditCardIcon,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'Verifications',
      value: '24',
      icon: ShieldCheckIcon,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      name: 'VTU Purchases',
      value: '15',
      icon: PhoneIcon,
      color: 'text-orange-600',
      bg: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      name: 'Total Transactions',
      value: '39',
      icon: ClockIcon,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'NIN Verification',
      description: 'Downloaded NIN slip (Premium)',
      amount: '₦2,500',
      status: 'completed',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'Airtime Purchase',
      description: 'MTN ₦1,000 airtime',
      amount: '₦1,000',
      status: 'completed',
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'Wallet Top-up',
      description: 'Funded wallet via Monnify',
      amount: '₦10,000',
      status: 'completed',
      time: '1 day ago'
    },
    {
      id: 4,
      type: 'BVN Verification',
      description: 'BVN lookup and slip download',
      amount: '₦1,500',
      status: 'completed',
      time: '2 days ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Quick Actions
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors group">
                <ShieldCheckIcon className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mb-2" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-500">
                  Verify Identity
                </span>
              </button>
              
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors group">
                <PhoneIcon className="h-8 w-8 text-gray-400 group-hover:text-emerald-500 mb-2" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-emerald-500">
                  Buy Airtime
                </span>
              </button>
              
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-400 transition-colors group">
                <CreditCardIcon className="h-8 w-8 text-gray-400 group-hover:text-orange-500 mb-2" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-orange-500">
                  Fund Wallet
                </span>
              </button>
              
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition-colors group">
                <ArrowTrendingUpIcon className="h-8 w-8 text-gray-400 group-hover:text-purple-500 mb-2" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-purple-500">
                  View Analytics
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivities.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-600"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="bg-emerald-500 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                            <CheckCircleIcon className="h-5 w-5 text-white" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                              {activity.type}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {activity.description}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap">
                            <p className="text-gray-900 dark:text-white font-medium">
                              {activity.amount}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;