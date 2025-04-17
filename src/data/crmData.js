export const leadStatusOptions = [
    'New',
    'Contacted',
    'Qualified',
    'Proposal',
    'Negotiation',
    'Closed Won',
    'Closed Lost'
  ];
  
  export const leadSourceOptions = [
    'Website Form',
    'Phone Inquiry',
    'Email',
    'Referral',
    'Social Media',
    'Event',
    'Other'
  ];
  
  export const leadPriorityOptions = [
    'High',
    'Medium',
    'Low'
  ];
  
  export const mockLeads = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      company: 'Tech Solutions Inc.',
      source: 'Website Form',
      course: 'Artificial Intelligence Fundamentals',
      status: 'New',
      priority: 'High',
      notes: 'Interested in corporate training for a team of 5.',
      createdAt: '2025-03-25T10:30:00',
      lastContact: '2025-03-25T10:30:00'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(555) 987-6543',
      company: 'Data Analytics Pro',
      source: 'Email',
      course: 'Cybersecurity Essentials',
      status: 'Contacted',
      priority: 'Medium',
      notes: 'Followed up via email on 26th. Waiting for response.',
      createdAt: '2025-03-24T14:45:00',
      lastContact: '2025-03-26T09:15:00'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'mchen@example.com',
      phone: '(555) 345-6789',
      company: 'Innovative Systems',
      source: 'Referral',
      course: 'Cloud Computing with AWS',
      status: 'Qualified',
      priority: 'High',
      notes: 'Has budget approved. Ready for detailed discussion about curriculum.',
      createdAt: '2025-03-20T11:20:00',
      lastContact: '2025-03-27T13:45:00'
    },
    {
      id: 4,
      name: 'Lisa Wong',
      email: 'lwong@example.com',
      phone: '(555) 567-8901',
      company: 'SecurityFirst',
      source: 'Event',
      course: 'Ethical Hacking',
      status: 'Proposal',
      priority: 'High',
      notes: 'Sent proposal for team of 10. Decision expected by next week.',
      createdAt: '2025-03-15T16:10:00',
      lastContact: '2025-03-25T16:30:00'
    },
    {
      id: 5,
      name: 'David Miller',
      email: 'dmiller@example.com',
      phone: '(555) 234-5678',
      company: 'CloudTech Solutions',
      source: 'Social Media',
      course: 'Microsoft Azure Fundamentals',
      status: 'Negotiation',
      priority: 'Medium',
      notes: 'Discussing pricing details. Requested a 15% discount.',
      createdAt: '2025-03-10T09:45:00',
      lastContact: '2025-03-26T11:20:00'
    },
    {
      id: 6,
      name: 'Jennifer Lee',
      email: 'jlee@example.com',
      phone: '(555) 876-5432',
      company: 'AI Innovations',
      source: 'Website Form',
      course: 'Deep Learning Specialization',
      status: 'Closed Won',
      priority: 'High',
      notes: 'Signed up for the full course. Payment received.',
      createdAt: '2025-03-05T13:30:00',
      lastContact: '2025-03-22T14:15:00'
    },
    {
      id: 7,
      name: 'Robert Davis',
      email: 'rdavis@example.com',
      phone: '(555) 654-3210',
      company: 'Network Solutions',
      source: 'Phone Inquiry',
      course: 'Network Security',
      status: 'Closed Lost',
      priority: 'Low',
      notes: 'Decided to go with a different provider due to timing constraints.',
      createdAt: '2025-03-01T15:20:00',
      lastContact: '2025-03-20T10:10:00'
    },
    {
      id: 8,
      name: 'Emily Wilson',
      email: 'ewilson@example.com',
      phone: '(555) 789-0123',
      company: 'Tech Innovators LLC',
      source: 'Referral',
      course: 'Google Cloud Platform',
      status: 'New',
      priority: 'Medium',
      notes: 'Referred by Jennifer Lee. Interested in cloud migration training.',
      createdAt: '2025-03-27T09:10:00',
      lastContact: '2025-03-27T09:10:00'
    },
    {
      id: 9,
      name: 'Carlos Rodriguez',
      email: 'crodriguez@example.com',
      phone: '(555) 321-6547',
      company: 'Digital Solutions',
      source: 'Email',
      course: 'Natural Language Processing',
      status: 'Contacted',
      priority: 'Medium',
      notes: 'Sent initial information package. Scheduled a call for next week.',
      createdAt: '2025-03-26T11:45:00',
      lastContact: '2025-03-27T15:30:00'
    },
    {
      id: 10,
      name: 'Amanda Taylor',
      email: 'ataylor@example.com',
      phone: '(555) 432-1098',
      company: 'Data Dynamics',
      source: 'Website Form',
      course: 'Artificial Intelligence Fundamentals',
      status: 'Qualified',
      priority: 'High',
      notes: 'Very interested in AI training for data science team. Has immediate need.',
      createdAt: '2025-03-22T14:50:00',
      lastContact: '2025-03-26T13:20:00'
    }
  ];
  
  // Optional: Mock tasks/activities related to leads
  export const mockActivities = [
    {
      id: 1,
      leadId: 3,
      type: 'Call',
      description: 'Discuss curriculum details',
      dueDate: '2025-04-01T10:00:00',
      completed: false,
      priority: 'High'
    },
    {
      id: 2,
      leadId: 4,
      type: 'Email',
      description: 'Follow up on proposal',
      dueDate: '2025-03-30T09:00:00',
      completed: false,
      priority: 'High'
    },
    {
      id: 3,
      leadId: 2,
      type: 'Meeting',
      description: 'Demo session',
      dueDate: '2025-04-02T14:00:00',
      completed: false,
      priority: 'Medium'
    },
    {
      id: 4,
      leadId: 5,
      type: 'Call',
      description: 'Negotiate final pricing',
      dueDate: '2025-03-29T11:30:00',
      completed: false,
      priority: 'High'
    },
    {
      id: 5,
      leadId: 8,
      type: 'Email',
      description: 'Send course catalog',
      dueDate: '2025-03-28T16:00:00',
      completed: true,
      priority: 'Medium'
    }
  ];