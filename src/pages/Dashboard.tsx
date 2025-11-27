import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Sidebar from '../components/Sidebar';
import DashboardHome from '../components/dashboard/DashboardHome';
import Wallet from '../components/dashboard/Wallet';
import IdentityVerification from '../components/dashboard/IdentityVerification';
import VTUServices from '../components/dashboard/VTUServices';
import Transactions from '../components/dashboard/Transactions';
import Profile from '../components/dashboard/Profile';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-gray-800 shadow">
          <span className="text-xl font-bold text-white">Ara</span>
          <button
            className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="py-4 md:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/verification" element={<IdentityVerification />} />
                <Route path="/vtu" element={<VTUServices />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
const Dashboard = () => {  }
export default Dashboard;
