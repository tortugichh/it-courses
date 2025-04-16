
import { Link } from 'react-router-dom';
import Button from './Button';


const CourseCard = ({ course, onEnroll, isEnrolled = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <Link to={`/courses/${course.id}`} className="block">
        <div className="h-40 bg-gray-200 relative">
          <img src={course.image} alt={course.title} className="w-full h-full"/>
         <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            {course.category}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/courses/${course.id}`} className="block">
          <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 transition">{course.title}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">
          {course.instructor} • {course.duration}
        </p>
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({course.rating})</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{course.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{course.level}</span>
          {isEnrolled ? (
            <Link to={`/courses/${course.id}`}>
              <Button variant="outline">Continue Learning</Button>
            </Link>
          ) : (
            <div className="flex space-x-2">
              <Link to={`/courses/${course.id}`}>
                <Button variant="outline" className="text-sm px-2">View Details</Button>
              </Link>
              <Button onClick={() => onEnroll(course.id)} className="text-sm px-2">Enroll</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;