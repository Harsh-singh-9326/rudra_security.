import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { dashboard } from '../services/api';
import { 
  LayoutGrid, Users, Anchor, Router, Shield, UserCircle, 
  ClipboardList, CreditCard, UserCog, LogOut
} from 'lucide-react';

interface DashboardData {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalRequests: number;
  };
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await dashboard.getData();
      setData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    signOut();
    navigate('/login');
  };

  const handleAuditTrailClick = () => {
    navigate('/audit-trail');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a192f]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f2744] p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            <span className="text-white">future</span>
            <span className="text-[#3b82f6]">konnect</span>
          </h1>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center text-white p-2 rounded hover:bg-[#1a365d]">
                <LayoutGrid className="mr-2" size={20} />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-400 p-2 rounded hover:bg-[#1a365d]">
                <Users className="mr-2" size={20} />
                Users
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-400 p-2 rounded hover:bg-[#1a365d]">
                <Shield className="mr-2" size={20} />
                Security
              </a>
            </li>
            <li>
              <button 
                onClick={handleAuditTrailClick}
                className="flex items-center text-gray-400 p-2 rounded hover:bg-[#1a365d] w-full text-left"
              >
                <ClipboardList className="mr-2" size={20} />
                Audit Trail
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <div className="flex items-center">
            <div className="mr-4 text-white">{user?.name}</div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-400 hover:text-white"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0f2744] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Total Users</h3>
              <Users className="text-[#3b82f6]" size={24} />
            </div>
            <p className="text-3xl font-bold text-white">{data?.stats.totalUsers}</p>
          </div>

          <div className="bg-[#0f2744] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Active Users</h3>
              <UserCircle className="text-[#3b82f6]" size={24} />
            </div>
            <p className="text-3xl font-bold text-white">{data?.stats.activeUsers}</p>
          </div>

          <div className="bg-[#0f2744] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Total Requests</h3>
              <Router className="text-[#3b82f6]" size={24} />
            </div>
            <p className="text-3xl font-bold text-white">{data?.stats.totalRequests}</p>
          </div>
        </div>
      </div>
    </div>
  );
}