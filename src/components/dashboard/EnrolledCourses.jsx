import { useState } from 'react';
import { coursesData } from '../../data/mockData';
import ProgressBar from './ProgressBar';

const EnrolledCourses = ({ enrollments }) => {
  const [sortBy, setSortBy] = useState('recent');
  
  // Get full course details for each enrollment
  const enrolledCourses = enrollments.map(enrollment => {
    const courseDetails = coursesData.find(course => course.id === enrollment.courseId);
    return {
      ...courseDetails,
      ...enrollment
    };
  });
  
  // Sort enrolled courses
  const sortedCourses = [...enrolledCourses].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.enrollmentDate) - new Date(a.enrollmentDate);
    } else if (sortBy === 'progress') {
      return b.progress - a.progress;
    }
    return 0;
  });
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Your Enrolled Courses</h3>
        <select 
          className="border rounded-md p-2 text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="progress">By Progress</option>
        </select>
      </div>
      
      {sortedCourses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedCourses.map(course => (
            <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-3 md:mb-0">
                  <h4 className="font-medium">{course.title}</h4>
                  <p className="text-sm text-gray-500">
                    Enrolled on {new Date(course.enrollmentDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-3">{course.progress}%</span>
                  <button className="text-blue-600 text-sm hover:underline">
                    {course.completed ? 'View Certificate' : 'Continue'}
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <ProgressBar progress={course.progress} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;