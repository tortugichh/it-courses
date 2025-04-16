import { Link } from 'react-router-dom';
import CourseCard from '../common/CourseCard';
import { coursesData } from '../../data/mockData';

const FeaturedCourses = () => {
  // Get the first 3 courses for featured section
  const featuredCourses = coursesData.slice(0, 3);
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Courses</h2>
          <Link to="/courses" className="text-blue-600 hover:underline">
            View All Courses →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course}
              onEnroll={() => console.log(`Enrolled in ${course.title}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;