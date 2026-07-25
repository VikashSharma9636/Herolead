import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FiSearch, FiFilter, FiMoreVertical, FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { AddLeadModal } from '../../components/modals/AddLeadModal';

export const Leads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await api.get('/leads');
      if (res.data.success) {
        setLeads(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLeadAdded = (newLead) => {
    // Refresh leads from the server to get populated fields
    fetchLeads();
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'primary';
      case 'Contacted': return 'warning';
      case 'Qualified': return 'success';
      case 'Proposal Sent': return 'neutral';
      case 'Won': return 'success';
      case 'Lost': return 'danger';
      default: return 'neutral';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'primary';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Leads Management</h1>
          <p className="text-slate-500 mt-1">View, filter, and manage your sales pipeline.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Add New Lead</Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
        <div className="flex-1">
          <Input 
            icon={FiSearch} 
            placeholder="Search leads by name or company..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <FiFilter /> Filter
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Company & Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow><TableCell colSpan={6} className="text-center py-8 text-slate-500">Loading leads...</TableCell></TableRow>
          ) : filteredLeads.length === 0 ? (
            <TableRow><TableCell colSpan={6} className="text-center py-8 text-slate-500">No leads found.</TableCell></TableRow>
          ) : filteredLeads.map((lead) => {
            const assignee = lead.assignedTo;
            
            return (
              <TableRow key={lead._id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-secondary">{lead.name}</span>
                    <span className="text-sm text-slate-500">{lead.company || lead.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(lead.status)}>{lead.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPriorityColor(lead.priority)}>{lead.priority}</Badge>
                </TableCell>
                <TableCell>
                  <span className="font-medium">${(lead.value || 0).toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  {assignee ? (
                    <div className="flex items-center gap-2">
                      <img src={assignee.avatar || `https://ui-avatars.com/api/?name=${assignee.name}&background=random&color=fff`} alt={assignee.name} className="w-6 h-6 rounded-full" />
                      <span className="text-sm text-slate-600">{assignee.name}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400 italic">Unassigned</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/dashboard/leads/${lead._id}`}>
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors">
                        <FiEye size={18} />
                      </button>
                    </Link>
                    <button className="p-2 text-slate-400 hover:text-warning hover:bg-amber-50 rounded-lg transition-colors">
                      <FiEdit2 size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-danger hover:bg-red-50 rounded-lg transition-colors">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <AddLeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleLeadAdded} 
      />
    </div>
  );
};
