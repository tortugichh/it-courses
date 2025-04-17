import CrmDashboard from '../components/crm/CrmDashboard';
import LeadActivities from '../components/crm/LeadActivities';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Crm = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <CrmDashboard />
        <div className="mt-8">
          <LeadActivities />
        </div>
      </div>
    </div>
  );
};

export default Crm;