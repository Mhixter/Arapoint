import React, { useState } from 'react';
import {
  ShieldCheckIcon,
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
  PhoneIcon,
  HashtagIcon,
  CalendarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const IdentityVerification: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nin');
  const [searchType, setSearchType] = useState('number');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);

  const tabs = [
    { id: 'nin', name: 'NIN Verification', icon: ShieldCheckIcon },
    { id: 'bvn', name: 'BVN Verification', icon: UserIcon },
    { id: 'ipe', name: 'IPE Clearance', icon: DocumentArrowDownIcon }
  ];

  const ninSearchTypes = [
    { id: 'number', name: 'NIN Number', placeholder: 'Enter 11-digit NIN' },
    { id: 'phone', name: 'Phone Number', placeholder: 'Enter phone number' },
    { id: 'biodata', name: 'Bio Data', placeholder: 'Enter name, DOB, etc.' },
    { id: 'tracking', name: 'Tracking ID', placeholder: 'Enter tracking ID' }
  ];

  const bvnSearchTypes = [
    { id: 'number', name: 'BVN Number', placeholder: 'Enter 11-digit BVN' },
    { id: 'phone', name: 'Phone Number', placeholder: 'Enter phone number' }
  ];

  const slipTypes = [
    { id: 'regular', name: 'Regular Slip', price: 1000, description: 'Basic NIN/BVN information' },
    { id: 'premium', name: 'Premium Slip', price: 2500, description: 'Enhanced details with photo' },
    { id: 'improved', name: 'Improved Slip', price: 2000, description: 'Improved format with validation' },
    { id: 'mobile', name: 'Mobile Slip', price: 1500, description: 'Mobile-optimized format' }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResult({
        found: true,
        data: {
          name: 'John Doe Smith',
          nin: '12345678901',
          bvn: '22334455667',
          dateOfBirth: '1990-05-15',
          phone: '08123456789',
          photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
        }
      });
      setLoading(false);
    }, 2000);
  };

  const handleDownloadSlip = (slipType: string, price: number) => {
    alert(`Downloading ${slipType} slip for ₦${price.toLocaleString()}...`);
  };

  const getCurrentSearchTypes = () => {
    return activeTab === 'nin' ? ninSearchTypes : bvnSearchTypes;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Identity Verification</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Search and verify NIN, BVN, and IPE clearance information
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'ipe' ? (
            // IPE Clearance Search
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  IPE Tracking ID
                </label>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter IPE tracking ID"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleSearch}
                    disabled={loading || !searchQuery.trim()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <MagnifyingGlassIcon className="h-4 w-4" />
                    )}
                    <span>{loading ? 'Checking...' : 'Check Status'}</span>
                  </button>
                </div>
              </div>

              {searchResult && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-800 dark:text-emerald-200 font-medium">
                      IPE Clearance Status: CLEARED
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // NIN/BVN Search
            <div className="space-y-6">
              {/* Search Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search By
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {getCurrentSearchTypes().map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSearchType(type.id)}
                      className={`${
                        searchType === type.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {getCurrentSearchTypes().find(t => t.id === searchType)?.name}
                </label>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={getCurrentSearchTypes().find(t => t.id === searchType)?.placeholder}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleSearch}
                    disabled={loading || !searchQuery.trim()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <MagnifyingGlassIcon className="h-4 w-4" />
                    )}
                    <span>{loading ? 'Searching...' : 'Search'}</span>
                  </button>
                </div>
              </div>

              {/* Search Results */}
              {searchResult && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                    <span>Verification Successful</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <UserIcon className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                          <p className="font-medium text-gray-900 dark:text-white">{searchResult.data.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <HashtagIcon className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{activeTab.toUpperCase()}</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {activeTab === 'nin' ? searchResult.data.nin : searchResult.data.bvn}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <CalendarIcon className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                          <p className="font-medium text-gray-900 dark:text-white">{searchResult.data.dateOfBirth}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <PhoneIcon className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                          <p className="font-medium text-gray-900 dark:text-white">{searchResult.data.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-600">
                        <img
                          src={searchResult.data.photo}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Download Options */}
                  <div className="mt-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Download Slips</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {slipTypes.map((slip) => (
                        <div key={slip.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                          <h5 className="font-medium text-gray-900 dark:text-white">{slip.name}</h5>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{slip.description}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              ₦{slip.price.toLocaleString()}
                            </span>
                            <button
                              onClick={() => handleDownloadSlip(slip.name, slip.price)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1"
                            >
                              <DocumentArrowDownIcon className="h-4 w-4" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification;