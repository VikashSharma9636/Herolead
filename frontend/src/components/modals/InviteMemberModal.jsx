import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import api from '../../utils/api';

export const InviteMemberModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member'
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
      // Create user (or register depending on backend logic). We'll use /users if logged in as admin.
      const res = await api.post('/users', formData);
      if (res.data.success) {
        onSuccess(res.data.data);
        onClose();
        // Reset form
        setFormData({ name: '', email: '', password: '', role: 'member' });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to invite member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite New Member">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-danger text-sm bg-red-50 p-2 rounded">{error}</div>}
        
        <Input label="Full Name *" name="name" required value={formData.name} onChange={handleChange} placeholder="Jane Doe" />
        
        <Input label="Email Address *" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="jane@example.com" />
        
        <Input label="Temporary Password *" name="password" type="password" required value={formData.password} onChange={handleChange} placeholder="Must be at least 6 characters" />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
          <select name="role" value={formData.role} onChange={handleChange} className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Inviting...' : 'Send Invite'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
