export const dummyUsers = [
  { id: 1, name: "Admin User", email: "admin@leadflow.com", role: "admin", avatar: "https://ui-avatars.com/api/?name=Admin+User&background=2563EB&color=fff" },
  { id: 2, name: "Jane Doe", email: "jane@leadflow.com", role: "member", avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=0F172A&color=fff" },
  { id: 3, name: "John Smith", email: "john@leadflow.com", role: "member", avatar: "https://ui-avatars.com/api/?name=John+Smith&background=22C55E&color=fff" },
];

export const dummyLeads = [
  { id: 101, name: "Acme Corp", contact: "Alice Wonderland", email: "alice@acme.co", phone: "+1 555-0101", status: "New", priority: "High", assignedTo: 2, createdAt: "2026-07-20T10:00:00Z", value: 50000 },
  { id: 102, name: "Globex Inc", contact: "Bob Builder", email: "bob@globex.inc", phone: "+1 555-0202", status: "Contacted", priority: "Medium", assignedTo: 2, createdAt: "2026-07-21T11:30:00Z", value: 12000 },
  { id: 103, name: "Soylent Corp", contact: "Charlie Chaplin", email: "charlie@soylent.com", phone: "+1 555-0303", status: "Qualified", priority: "High", assignedTo: 3, createdAt: "2026-07-22T09:15:00Z", value: 85000 },
  { id: 104, name: "Initech", contact: "Diana Prince", email: "diana@initech.net", phone: "+1 555-0404", status: "Proposal", priority: "Low", assignedTo: null, createdAt: "2026-07-23T14:45:00Z", value: 5000 },
  { id: 105, name: "Umbrella Corp", contact: "Eve Adams", email: "eve@umbrella.co", phone: "+1 555-0505", status: "Won", priority: "High", assignedTo: 3, createdAt: "2026-07-24T16:20:00Z", value: 150000 },
  { id: 106, name: "Massive Dynamic", contact: "Frank Castle", email: "frank@massive.com", phone: "+1 555-0606", status: "Lost", priority: "Medium", assignedTo: 2, createdAt: "2026-07-25T08:00:00Z", value: 20000 },
];

export const dummyActivities = [
  { id: 1, leadId: 101, userId: 2, type: "Note", description: "Left a voicemail.", timestamp: "2026-07-21T10:05:00Z" },
  { id: 2, leadId: 102, userId: 2, type: "Email", description: "Sent introductory email.", timestamp: "2026-07-22T11:35:00Z" },
  { id: 3, leadId: 103, userId: 3, type: "Call", description: "Had a great discovery call.", timestamp: "2026-07-23T09:45:00Z" },
  { id: 4, leadId: 105, userId: 3, type: "Meeting", description: "Signed the contract.", timestamp: "2026-07-25T16:25:00Z" },
];

export const dummyStats = {
  totalLeads: 156,
  activeLeads: 89,
  wonDeals: 34,
  revenue: 1250000,
  conversionRate: 21.8,
};
