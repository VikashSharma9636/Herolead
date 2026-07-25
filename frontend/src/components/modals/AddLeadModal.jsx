import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import api from '../../utils/api';

export const AddLeadModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'New',
    priority: 'Medium',
    value: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convert value to number if present
      const payload = { ...formData };
      if (payload.value) payload.value = Number(payload.value);
      
      const res = await api.post('/leads', payload);
      if (res.data.success) {
        onSuccess(res.data.data);
        onClose();
        // Reset form
        setFormData({
          name: '', email: '', phone: '', company: '', 
          status: 'New', priority: 'Medium', value: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Lead">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-danger text-sm bg-red-50 p-2 rounded">{error}</div>}
        
        <Input label="Name *" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
        
        <div className="grid grid-cols-2 gap-4">
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Company" name="company" value={formData.company} onChange={handleChange} placeholder="Acme Inc" />
          <Input label="Value ($)" name="value" type="number" min="0" value={formData.value} onChange={handleChange} placeholder="5000" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange} className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Lead'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
