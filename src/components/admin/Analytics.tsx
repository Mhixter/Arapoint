import React, { useState } from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');

  const metrics = [
    {
      name: 'Total Revenue',
      value: '₦4.2M',
      change: '+12.5%',
      changeType: 'increase',
      period: 'vs last month'
    },
    {
      name: 'New Users',
      value: '1,247',
      change: '+8.2%',
      changeType: 'increase',
      period: 'vs last month'
    },
    {
      name: 'Transaction Volume',
      value: '18,453',
      change: '+15.3%',
      changeType: 'increase',
      period: 'vs last month'
    },
    {
      name: 'Success Rate',
      value: '98.7%',
      change: '-0.3%',
      changeType: 'decrease',
      period: 'vs last month'
    }
  ];

  const serviceStats = [
    { name: 'NIN Verification', count: 8542, revenue: '₦2.1M', percentage: 45 },
    { name: 'VTU Services', count: 6234, revenue: '₦1.2M', percentage: 28 },
    { name: 'BVN Verification', count: 3120, revenue: '₦468K', percentage: 17 },
    { name: 'IPE Clearance', count: 890, revenue: '₦89K', percentage: 10 }
  ];

  const recentActivity = [
    { time: '2 min ago', action: 'New user registration', details: 'john.doe@example.com' },
    { time: '5 min ago', action: 'NIN verification completed', details: 'Premium slip download' },
    { time: '8 min ago', action: 'Wallet funding', details: '₦10,000 via Monnify' },
    { time: '12 min ago', action: 'System alert', details: 'High transaction volume' },
    { time: '15 min ago', action: 'API rate limit reached', details: 'User #12345' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Platform performance metrics and insights
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-gray-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.name}
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {metric.value}
                </p>
              </div>
              <div className={`p-2 rounded-md ${
                metric.changeType === 'increase' 
                  ? 'bg-emerald-100 dark:bg-emerald-900' 
                  : 'bg-red-100 dark:bg-red-900'
              }`}>
                {metric.changeType === 'increase' ? (
                  <ArrowTrendingUpIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <ArrowTrendingDownIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className={`${
                metric.changeType === 'increase' 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-red-600 dark:text-red-400'
              } font-medium`}>
                {metric.change}
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                {metric.period}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Service Performance
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {serviceStats.map((service, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {service.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {service.count.toLocaleString()} transactions
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${service.percentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                      {service.revenue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.details}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Revenue Trends
          </h3>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                Revenue Chart
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Chart visualization would be implemented here with a charting library
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;