import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { dummyLeads, dummyUsers, dummyActivities } from '../../utils/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FiArrowLeft, FiMail, FiPhone, FiCalendar, FiClock } from 'react-icons/fi';

export const LeadDetails = () => {
  const { id } = useParams();
  const lead = dummyLeads.find(l => l.id === parseInt(id));

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold text-secondary">Lead not found</h2>
        <Link to="/dashboard/leads" className="mt-4 text-primary hover:underline">
          Back to Leads
        </Link>
      </div>
    );
  }

  const assignee = dummyUsers.find(u => u.id === lead.assignedTo);
  const activities = dummyActivities.filter(a => a.leadId === lead.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/leads">
          <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors">
            <FiArrowLeft size={20} />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-secondary">{lead.name}</h1>
          <p className="text-slate-500 mt-1">Lead Details & History</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Primary Contact</p>
                <p className="font-medium text-secondary">{lead.contact}</p>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <FiMail className="text-slate-400" />
                <a href={`mailto:${lead.email}`} className="hover:text-primary transition-colors">{lead.email}</a>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <FiPhone className="text-slate-400" />
                <a href={`tel:${lead.phone}`} className="hover:text-primary transition-colors">{lead.phone}</a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lead Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-slate-500">Status</span>
                <Badge variant={lead.status === 'Won' ? 'success' : 'primary'}>{lead.status}</Badge>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-slate-500">Priority</span>
                <Badge variant={lead.priority === 'High' ? 'danger' : 'warning'}>{lead.priority}</Badge>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-slate-500">Value</span>
                <span className="font-semibold text-secondary">${lead.value.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Created</span>
                <span className="text-secondary">{new Date(lead.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Activity Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Activity Timeline</CardTitle>
              <Button size="sm">Add Note</Button>
            </CardHeader>
            <CardContent>
              {activities.length > 0 ? (
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {activities.map((activity, idx) => {
                    const user = dummyUsers.find(u => u.id === activity.userId);
                    return (
                      <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          {activity.type === 'Email' && <FiMail size={16} />}
                          {activity.type === 'Call' && <FiPhone size={16} />}
                          {activity.type === 'Meeting' && <FiCalendar size={16} />}
                          {activity.type === 'Note' && <FiClock size={16} />}
                        </div>
                        
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-secondary">{user?.name}</span>
                            <span className="text-xs text-slate-400">{new Date(activity.timestamp).toLocaleDateString()}</span>
                          </div>
                          <Badge variant="neutral" className="mb-2 text-[10px]">{activity.type}</Badge>
                          <p className="text-slate-600 text-sm">{activity.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  No activities recorded yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
