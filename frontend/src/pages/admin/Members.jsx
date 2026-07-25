import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { FiMail, FiMoreVertical } from 'react-icons/fi';
import api from '../../utils/api';
import { InviteMemberModal } from '../../components/modals/InviteMemberModal';

export const Members = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users');
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMemberAdded = (newUser) => {
    fetchUsers();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Team Members</h1>
          <p className="text-slate-500 mt-1">Manage your team access and roles.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Invite Member</Button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-500">Loading members...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user._id} hover className="relative group">
              <CardContent className="p-6">
                <button className="absolute top-4 right-4 p-2 text-slate-400 hover:text-secondary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiMoreVertical size={20} />
                </button>
                
                <div className="flex flex-col items-center text-center">
                  <img 
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`} 
                    alt={user.name} 
                    className="w-20 h-20 rounded-full border-4 border-white shadow-sm mb-4"
                  />
                  <h3 className="text-lg font-semibold text-secondary">{user.name}</h3>
                  <Badge variant={user.role === 'admin' ? 'primary' : 'neutral'} className="mt-2 mb-4 capitalize">
                    {user.role}
                  </Badge>
                  
                  <div className="w-full flex items-center justify-center gap-2 text-slate-500 text-sm py-3 border-t border-slate-100 mt-2">
                    <FiMail />
                    <a href={`mailto:${user.email}`} className="hover:text-primary transition-colors truncate max-w-[200px]">{user.email}</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <InviteMemberModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleMemberAdded} 
      />
    </div>
  );
};
