import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLeads, leadStatusOptions, leadPriorityOptions, leadSourceOptions } from '../../data/crmData';
import Button from '../common/Button';

const CrmDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingLead, setEditingLead] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    const fetchLeads = () => {
      setIsLoading(true);
      setTimeout(() => {
        setLeads(mockLeads);
        setFilteredLeads(mockLeads);
        setIsLoading(false);
      }, 800);
    };

    fetchLeads();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...leads];
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(lead => lead.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(lead => 
        lead.name.toLowerCase().includes(term) || 
        lead.email.toLowerCase().includes(term) || 
        lead.company.toLowerCase().includes(term) ||
        lead.course.toLowerCase().includes(term)
      );
    }
    
    setFilteredLeads(result);
  }, [leads, statusFilter, searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleStatusChange = (leadId, newStatus) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus, lastContact: new Date().toISOString() } : lead
    );
    setLeads(updatedLeads);
  };

  const handleDeleteLead = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      const updatedLeads = leads.filter(lead => lead.id !== leadId);
      setLeads(updatedLeads);
    }
  };

  const handleEditLead = (lead) => {
    setEditingLead({...lead});
  };

  const handleSaveLead = () => {
    if (!editingLead.name || !editingLead.email) {
      alert('Name and email are required fields');
      return;
    }
    
    if (leads.some(lead => lead.id === editingLead.id)) {
      // Update existing lead
      const updatedLeads = leads.map(lead => 
        lead.id === editingLead.id ? { ...editingLead, lastContact: new Date().toISOString() } : lead
      );
      setLeads(updatedLeads);
    } else {
      // Add new lead
      setLeads([...leads, editingLead]);
    }
    setEditingLead(null);
  };

  const closeEditModal = () => {
    setEditingLead(null);
  };

  const addNewLead = () => {
    const newLead = {
      id: leads.length > 0 ? Math.max(...leads.map(l => l.id)) + 1 : 1,
      name: '',
      email: '',
      phone: '',
      company: '',
      source: 'Website Form',
      course: '',
      status: 'New',
      priority: 'Medium',
      notes: '',
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString()
    };
    setEditingLead(newLead);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingLead(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      'New': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-purple-100 text-purple-800',
      'Qualified': 'bg-cyan-100 text-cyan-800',
      'Proposal': 'bg-yellow-100 text-yellow-800',
      'Negotiation': 'bg-orange-100 text-orange-800',
      'Closed Won': 'bg-green-100 text-green-800',
      'Closed Lost': 'bg-red-100 text-red-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityClass = (priority) => {
    const priorityClasses = {
      'High': 'text-red-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-green-600'
    };
    return priorityClasses[priority] || 'text-gray-600';
  };

  // Calculate lead statistics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const qualifiedLeads = leads.filter(l => ['Qualified', 'Proposal', 'Negotiation'].includes(l.status)).length;
  const closedWon = leads.filter(l => l.status === 'Closed Won').length;
  const conversionRate = totalLeads > 0 ? Math.round((closedWon / totalLeads) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Lead Management</h2>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-gray-50 rounded-lg p-4 border">
          <p className="text-gray-500 text-sm">Total Leads</p>
          <p className="text-2xl font-bold">{totalLeads}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-blue-600 text-sm">New Leads</p>
          <p className="text-2xl font-bold">{newLeads}</p>
        </div>
        <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-100">
          <p className="text-cyan-600 text-sm">Qualified Leads</p>
          <p className="text-2xl font-bold">{qualifiedLeads}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <p className="text-green-600 text-sm">Closed Won</p>
          <p className="text-2xl font-bold">{closedWon}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <p className="text-purple-600 text-sm">Conversion Rate</p>
          <p className="text-2xl font-bold">{conversionRate}%</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              {leadStatusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full md:w-auto mt-4 md:mt-6">
            <Button onClick={addNewLead}>+ Add New Lead</Button>
          </div>
        </div>
      </div>
      
      {/* Leads Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No leads found matching your criteria</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                        <div className="text-sm text-gray-500">{lead.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.course}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusClass(lead.status)}`}
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      >
                        {leadStatusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${getPriorityClass(lead.priority)}`}>{lead.priority}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.source}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(lead.lastContact).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(lead.lastContact).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEditLead(lead)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteLead(lead.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {/* Edit Lead Modal */}
      {editingLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {editingLead.id && editingLead.name ? `Edit Lead: ${editingLead.name}` : 'Add New Lead'}
              </h3>
              <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={editingLead.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={editingLead.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={editingLead.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={editingLead.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Interest</label>
                  <input
                    type="text"
                    name="course"
                    value={editingLead.course}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select
                    name="source"
                    value={editingLead.source}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {leadSourceOptions.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={editingLead.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {leadStatusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    name="priority"
                    value={editingLead.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {leadPriorityOptions.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={editingLead.notes}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline" onClick={closeEditModal}>Cancel</Button>
                <Button onClick={handleSaveLead}>Save Lead</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrmDashboard;