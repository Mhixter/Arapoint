import React, { useState } from 'react';
import {
  PhoneIcon,
  WifiIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import NetworkLogo from '../NetworkLogo';

const VTUServices: React.FC = () => {
  const [activeService, setActiveService] = useState('airtime');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const services = [
    { id: 'airtime', name: 'Buy Airtime', icon: PhoneIcon },
    { id: 'data', name: 'Buy Data', icon: WifiIcon },
    { id: 'airtime2cash', name: 'Airtime to Cash', icon: ArrowPathIcon }
  ];

  const networks = [
    { id: 'mtn', name: 'MTN' },
    { id: 'airtel', name: 'Airtel' },
    { id: 'glo', name: 'Glo' },
    { id: '9mobile', name: '9mobile' }
  ];

  const airtimeAmounts = [100, 200, 500, 1000, 1500, 2000, 3000, 5000];

  const dataPlans = {
    mtn: [
      { id: '1gb', name: '1GB - 30 Days', price: 300 },
      { id: '2gb', name: '2GB - 30 Days', price: 500 },
      { id: '3gb', name: '3GB - 30 Days', price: 750 },
      { id: '5gb', name: '5GB - 30 Days', price: 1200 },
      { id: '10gb', name: '10GB - 30 Days', price: 2000 },
      { id: '20gb', name: '20GB - 30 Days', price: 3500 }
    ],
    airtel: [
      { id: '1gb', name: '1GB - 30 Days', price: 320 },
      { id: '2gb', name: '2GB - 30 Days', price: 550 },
      { id: '3gb', name: '3GB - 30 Days', price: 800 },
      { id: '5gb', name: '5GB - 30 Days', price: 1300 },
      { id: '10gb', name: '10GB - 30 Days', price: 2200 },
      { id: '20gb', name: '20GB - 30 Days', price: 3800 }
    ],
    glo: [
      { id: '1gb', name: '1GB - 30 Days', price: 350 },
      { id: '2gb', name: '2GB - 30 Days', price: 600 },
      { id: '3gb', name: '3GB - 30 Days', price: 850 },
      { id: '5gb', name: '5GB - 30 Days', price: 1400 },
      { id: '10gb', name: '10GB - 30 Days', price: 2400 },
      { id: '20gb', name: '20GB - 30 Days', price: 4000 }
    ],
    '9mobile': [
      { id: '1gb', name: '1GB - 30 Days', price: 340 },
      { id: '2gb', name: '2GB - 30 Days', price: 580 },
      { id: '3gb', name: '3GB - 30 Days', price: 820 },
      { id: '5gb', name: '5GB - 30 Days', price: 1350 },
      { id: '10gb', name: '10GB - 30 Days', price: 2300 },
      { id: '20gb', name: '20GB - 30 Days', price: 3900 }
    ]
  };

  const handlePurchase = async () => {
    if (!selectedNetwork || !phoneNumber || (!amount && !selectedPlan)) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`${activeService === 'airtime' ? 'Airtime' : 'Data'} purchase successful!`);
      setLoading(false);
      // Reset form
      setPhoneNumber('');
      setAmount('');
      setSelectedPlan('');
    }, 2000);
  };

  const getCurrentPlans = () => {
    return selectedNetwork ? dataPlans[selectedNetwork as keyof typeof dataPlans] || [] : [];
  };

  const getSelectedPlanPrice = () => {
    const plans = getCurrentPlans();
    const plan = plans.find(p => p.id === selectedPlan);
    return plan ? plan.price : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">VTU Services</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Buy airtime, data bundles, and convert airtime to cash
        </p>
      </div>

      {/* Service Tabs */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`${
                  activeService === service.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <service.icon className="h-5 w-5" />
                <span>{service.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeService === 'airtime2cash' ? (
            // Airtime to Cash
            <div className="text-center py-12">
              <ArrowPathIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Coming Soon</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Airtime to Cash conversion will be available soon.
              </p>
            </div>
          ) : (
            // Airtime & Data Purchase
            <div className="space-y-6">
              {/* Network Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Select Network
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {networks.map((network) => (
                    <button
                      key={network.id}
                      onClick={() => setSelectedNetwork(network.id)}
                      className={`network-button ${
                        selectedNetwork === network.id
                          ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 active'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      } border border-gray-200 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center space-y-3`}
                    >
                      <NetworkLogo network={network.id as 'mtn' | 'airtel' | 'glo' | '9mobile'} size="md" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {network.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {activeService === 'airtime' ? (
                // Airtime Amount Selection
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {airtimeAmounts.map((amountOption) => (
                      <button
                        key={amountOption}
                        onClick={() => setAmount(amountOption.toString())}
                        className={`${
                          amount === amountOption.toString()
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        } px-4 py-2 rounded-md text-sm font-medium transition-colors`}
                      >
                        ₦{amountOption}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Or enter custom amount
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              ) : (
                // Data Plan Selection
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Select Data Plan
                  </label>
                  {selectedNetwork ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getCurrentPlans().map((plan) => (
                        <button
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`${
                            selectedPlan === plan.id
                              ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                          } border border-gray-200 dark:border-gray-600 rounded-lg p-4 text-left transition-all`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{plan.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                ₦{plan.price.toLocaleString()}
                              </p>
                            </div>
                            {selectedPlan === plan.id && (
                              <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      Please select a network first
                    </p>
                  )}
                </div>
              )}

              {/* Purchase Summary */}
              {selectedNetwork && phoneNumber && (activeService === 'airtime' ? amount : selectedPlan) && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Purchase Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Network:</span>
                      <div className="flex items-center space-x-2">
                        <NetworkLogo network={selectedNetwork as 'mtn' | 'airtel' | 'glo' | '9mobile'} size="sm" />
                        <span className="text-gray-900 dark:text-white font-medium">
                          {networks.find(n => n.id === selectedNetwork)?.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                      <span className="text-gray-900 dark:text-white font-medium">{phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {activeService === 'airtime' ? 'Amount:' : 'Plan:'}
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {activeService === 'airtime'
                          ? `₦${parseInt(amount).toLocaleString()}`
                          : getCurrentPlans().find(p => p.id === selectedPlan)?.name
                        }
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                      <span className="text-gray-900 dark:text-white">Total:</span>
                      <span className="text-blue-600 dark:text-blue-400">
                        ₦{(activeService === 'airtime' 
                          ? parseInt(amount) 
                          : getSelectedPlanPrice()
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                disabled={loading || !selectedNetwork || !phoneNumber || (activeService === 'airtime' ? !amount : !selectedPlan)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <PhoneIcon className="h-5 w-5" />
                    <span>
                      Purchase {activeService === 'airtime' ? 'Airtime' : 'Data'}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VTUServices;