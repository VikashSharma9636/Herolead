import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { FiTrendingUp, FiUsers, FiDollarSign, FiActivity } from 'react-icons/fi';
import { Badge } from '../../components/ui/Badge';
import api from '../../utils/api';

export const Dashboard = () => {
  const [data, setData] = useState({
    stats: { totalLeads: 0, activeLeads: 0, wonDeals: 0, revenue: 0 },
    recentLeads: [],
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/dashboard');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-slate-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-danger p-6 bg-red-50 rounded-lg">{error}</div>;
  }

  const { stats, recentLeads, recentActivities } = data;

  const statCards = [
    { title: 'Total Leads', value: stats.totalLeads, icon: FiUsers, trend: '+12%', color: 'text-primary', bg: 'bg-blue-50' },
    { title: 'Active Leads', value: stats.activeLeads, icon: FiActivity, trend: '+5%', color: 'text-warning', bg: 'bg-amber-50' },
    { title: 'Won Deals', value: stats.wonDeals, icon: FiTrendingUp, trend: '+18%', color: 'text-success', bg: 'bg-green-50' },
    { title: 'Revenue', value: `$${(stats.revenue / 1000).toFixed(1)}k`, icon: FiDollarSign, trend: '+24%', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your leads today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <Card key={idx} hover>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-secondary">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-success font-medium">{stat.trend}</span>
                <span className="text-slate-500 ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Leads */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Latest Leads</CardTitle>
          </CardHeader>
          <div className="divide-y divide-slate-100">
            {recentLeads.length > 0 ? recentLeads.map(lead => (
              <div key={lead._id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col">
                  <span className="font-medium text-secondary">{lead.name}</span>
                  <span className="text-sm text-slate-500">{lead.company || lead.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={lead.status === 'Won' ? 'success' : lead.status === 'Lost' ? 'danger' : 'primary'}>
                    {lead.status}
                  </Badge>
                  <span className="text-sm font-medium text-secondary">${(lead.value || 0).toLocaleString()}</span>
                </div>
              </div>
            )) : <div className="p-4 text-slate-500">No leads found.</div>}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <div className="p-6">
            <div className="space-y-6">
              {recentActivities.length > 0 ? recentActivities.map((activity, idx) => {
                const user = activity.userId;
                return (
                  <div key={activity._id} className="flex gap-4 relative">
                    {idx !== recentActivities.length - 1 && (
                      <div className="absolute top-8 left-4 bottom-[-24px] w-px bg-slate-200" />
                    )}
                    <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random&color=fff`} alt="" className="w-8 h-8 rounded-full z-10 border-2 border-white shadow-sm bg-white" />
                    <div>
                      <p className="text-sm text-secondary">
                        <span className="font-semibold">{user?.name || 'Unknown User'}</span> {activity.description}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              }) : <div className="text-slate-500">No recent activities.</div>}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
