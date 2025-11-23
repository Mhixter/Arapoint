import React from 'react';
import { Link } from 'react-router-dom';
import {
  UsersIcon,
  CreditCardIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      name: 'Total Users',
      value: '2,847',
      change: '+12%',
      changeType: 'increase',
      icon: UsersIcon,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      name: 'Total Revenue',
      value: '₦4.2M',
      change: '+8.5%',
      changeType: 'increase',
      icon: CreditCardIcon,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      name: 'Transactions Today',
      value: '1,239',
      change: '+15%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'text-orange-600',
      bg: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      name: 'System Uptime',
      value: '99.9%',
      change: 'Stable',
      changeType: 'stable',
      icon: ShieldCheckIcon,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const recentTransactions = [
    {
      id: 'TXN123456',
      user: 'John Doe',
      type: 'NIN Verification',
      amount: '₦2,500',
      status: 'completed',
      time: '2 min ago'
    },
    {
      id: 'TXN123457',
      user: 'Jane Smith',
      type: 'Wallet Funding',
      amount: '₦10,000',
      status: 'completed',
      time: '5 min ago'
    },
    {
      id: 'TXN123458',
      user: 'Mike Johnson',
      type: 'Airtime Purchase',
      amount: '₦1,000',
      status: 'pending',
      time: '8 min ago'
    },
    {
      id: 'TXN123459',
      user: 'Sarah Wilson',
      type: 'BVN Verification',
      amount: '₦1,500',
      status: 'completed',
      time: '12 min ago'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'High transaction volume detected',
      time: '10 min ago'
    },
    {
      id: 2,
      type: 'info',
      message: 'API rate limit reached for user #12345',
      time: '25 min ago'
    },
    {
      id: 3,
      type: 'success',
      message: 'Database backup completed successfully',
      time: '1 hour ago'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-emerald-500" />;
      default:
        return <ShieldCheckIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Monitor platform performance and manage system operations
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
                    <dd className={`text-sm ${
                      stat.changeType === 'increase' 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : stat.changeType === 'decrease'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {stat.change}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Recent Transactions
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.user}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.type} • {transaction.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.amount}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {transaction.status}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {transaction.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              System Alerts
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Quick Actions
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/admin/users" className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all group hover:bg-blue-50 dark:hover:bg-blue-900/10">
              <UsersIcon className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
                Manage Users
              </span>
            </Link>

            <Link to="/admin/transactions" className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-400 transition-all group hover:bg-emerald-50 dark:hover:bg-emerald-900/10">
              <CreditCardIcon className="h-8 w-8 text-gray-400 group-hover:text-emerald-500 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-emerald-500 transition-colors">
                View Transactions
              </span>
            </Link>

            <Link to="/admin/analytics" className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-400 transition-all group hover:bg-orange-50 dark:hover:bg-orange-900/10">
              <ChartBarIcon className="h-8 w-8 text-gray-400 group-hover:text-orange-500 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors">
                Analytics
              </span>
            </Link>

            <Link to="/admin/settings" className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition-all group hover:bg-purple-50 dark:hover:bg-purple-900/10">
              <CogIcon className="h-8 w-8 text-gray-400 group-hover:text-purple-500 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-purple-500 transition-colors">
                Settings
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;