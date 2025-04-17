import { useState, useEffect } from 'react';
import { mockActivities } from '../../data/crmData';
import Button from '../common/Button';

const LeadActivities = ({ leadId = null }) => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingActivity, setEditingActivity] = useState(null);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    // Simulate API call
    const fetchActivities = () => {
      setIsLoading(true);
      setTimeout(() => {
        setActivities(mockActivities);
        setIsLoading(false);
      }, 600);
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...activities];
    
    // Filter by lead if specified
    if (leadId) {
      result = result.filter(activity => activity.leadId === leadId);
    }
    
    // Apply status filter
    if (filter === 'upcoming') {
      result = result.filter(activity => !activity.completed);
    } else if (filter === 'completed') {
      result = result.filter(activity => activity.completed);
    }
    
    // Sort by due date
    result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    setFilteredActivities(result);
  }, [activities, leadId, filter]);

  const handleToggleComplete = (activityId) => {
    const updatedActivities = activities.map(activity => 
      activity.id === activityId ? { ...activity, completed: !activity.completed } : activity
    );
    setActivities(updatedActivities);
  };

  const handleDeleteActivity = (activityId) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      const updatedActivities = activities.filter(activity => activity.id !== activityId);
      setActivities(updatedActivities);
    }
  };

  const handleEditActivity = (activity) => {
    setEditingActivity({...activity});
  };

  const addNewActivity = () => {
    const newActivity = {
      id: activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1,
      leadId: leadId || null,
      type: 'Call',
      description: '',
      dueDate: new Date().toISOString().split('T')[0] + 'T09:00:00',
      completed: false,
      priority: 'Medium'
    };
    setEditingActivity(newActivity);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingActivity(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveActivity = () => {
    if (editingActivity.id && activities.some(a => a.id === editingActivity.id)) {
      // Update existing activity
      const updatedActivities = activities.map(activity => 
        activity.id === editingActivity.id ? editingActivity : activity
      );
      setActivities(updatedActivities);
    } else {
      // Add new activity
      setActivities([...activities, editingActivity]);
    }
    setEditingActivity(null);
  };

  const closeEditModal = () => {
    setEditingActivity(null);
  };

  const getPriorityClass = (priority) => {
    const priorityClasses = {
      'High': 'text-red-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-green-600'
    };
    return priorityClasses[priority] || 'text-gray-600';
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.getTime() === today.getTime()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.getTime() === tomorrow.getTime()) {
      return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  const isOverdue = (dateString) => {
    const dueDate = new Date(dateString);
    const now = new Date();
    return !editingActivity && dueDate < now;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">
          {leadId ? 'Lead Activities' : 'All Activities'}
        </h3>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={addNewActivity}>+ Add Activity</Button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-3 py-1 rounded text-sm font-medium ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
          }`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded text-sm font-medium ${
            filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
          }`}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`px-3 py-1 rounded text-sm font-medium ${
            filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
          }`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      
      {/* Activities List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No activities found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredActivities.map(activity => (
            <div 
              key={activity.id} 
              className={`border rounded-lg p-4 ${activity.completed ? 'bg-gray-50' : 'hover:shadow-md'} transition`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  
                  <input
                    type="checkbox"
                    checked={activity.completed}
                    onChange={() => handleToggleComplete(activity.id)}
                    className="mt-1"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{activity.type}</span>
                      <span className={`text-sm font-medium ${getPriorityClass(activity.priority)}`}>
                        ({activity.priority})
                      </span>
                    </div>
                    <p className={`${activity.completed ? 'line-through text-gray-500' : ''}`}>
                      {activity.description}
                    </p>
                    <p className={`text-sm ${
                      isOverdue(activity.dueDate) && !activity.completed 
                        ? 'text-red-600 font-medium' 
                        : 'text-gray-500'
                    }`}>
                      {isOverdue(activity.dueDate) && !activity.completed ? 'OVERDUE: ' : ''}
                      {formatDueDate(activity.dueDate)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditActivity(activity)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Edit Activity Modal */}
      {editingActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editingActivity.id ? 'Edit Activity' : 'Add New Activity'}
              </h3>
              <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                  <select
                    name="type"
                    value={editingActivity.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Call">Call</option>
                    <option value="Email">Email</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Task">Task</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={editingActivity.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date & Time</label>
                  <input
                    type="datetime-local"
                    name="dueDate"
                    value={editingActivity.dueDate.split('.')[0]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    name="priority"
                    value={editingActivity.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="completed"
                    name="completed"
                    checked={editingActivity.completed}
                    onChange={() => setEditingActivity({...editingActivity, completed: !editingActivity.completed})}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">
                    Mark as completed
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline" onClick={closeEditModal}>Cancel</Button>
                <Button onClick={handleSaveActivity}>Save Activity</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadActivities;