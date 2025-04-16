import { recommendedCourses, coursesData } from '../../data/mockData';

const RecommendedCourses = () => {
  const recommendations = recommendedCourses.map(rec => {
    const courseDetails = coursesData.find(course => course.id === rec.courseId);
    return {
      ...rec,
      ...courseDetails
    };
  });
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-6">Recommended For You</h3>
      
      <div className="space-y-4">
        {recommendations.map(course => (
          <div key={course.courseId} className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{course.title}</h4>
                <p className="text-sm text-gray-700 mt-1">{course.reason}</p>
                <div className="flex items-center mt-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2">
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-500">{course.duration}</span>
                </div>
              </div>
              <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition">
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;