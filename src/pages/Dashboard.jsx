import { userEnrollments } from '../data/mockData';
import EnrolledCourses from '../components/dashboard/EnrolledCourses';
import Certificates from '../components/dashboard/Certificates';
import RecommendedCourses from '../components/dashboard/RecommendedCourses';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Your Learning Dashboard</h1>
      <p className="text-gray-600 mb-8">Track your progress and manage your learning journey</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EnrolledCourses enrollments={userEnrollments} />
        </div>
        
        <div className="space-y-6">
          <Certificates />
          <RecommendedCourses />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;