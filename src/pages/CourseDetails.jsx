// src/pages/CourseDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { coursesData } from '../data/mockData';
import Button from '../components/common/Button';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundCourse = coursesData.find(c => c.id === parseInt(courseId, 10));
      setCourse(foundCourse);
      setIsEnrolled(Math.random() > 0.7);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [courseId]);

  const handleEnroll = () => {
    setIsEnrolled(true);
    console.log(`Enrolled in course: ${course.title}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the course you're looking for.</p>
        <Link to="/courses">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/courses" className="hover:text-blue-600">Courses</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{course.title}</span>
      </div>

      {/* Course Header */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
        <div className="w-full md:w-2/3">
          <div className="flex items-center mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
              {course.category}
            </span>
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {course.level}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{course.description}</p>
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-700">{course.rating} Rating</span>
          </div>
          <div className="text-gray-600">
            <p className="mb-2">
              <span className="font-medium">Instructor:</span> {course.instructor}
            </p>
            <p className="mb-2">
              <span className="font-medium">Duration:</span> {course.duration}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
          <div className="bg-gray-200 h-40 flex items-center justify-center rounded-md mb-4">
            <img src={course.image} className="w-full h-full rounded-xl"></img>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">This course includes:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>24/7 access to materials</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Certificate of completion</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Practical assignments</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Expert feedback</span>
              </li>
            </ul>
          </div>
          
          {isEnrolled ? (
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                Continue Learning
              </Button>
              <Button className="w-full" variant="secondary">
                View Course Materials
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={handleEnroll}>
              Enroll Now
            </Button>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        <div className="border rounded-lg divide-y">
          {/* Module 1 */}
          <div className="p-4">
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="font-medium">Module 1: Introduction</h3>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Module 2 */}
          <div className="p-4">
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="font-medium">Module 2: Core Concepts</h3>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Module 3 */}
          <div className="p-4">
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="font-medium">Module 3: Advanced Topics</h3>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Module 4 */}
          <div className="p-4">
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="font-medium">Module 4: Practical Projects</h3>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coursesData
            .filter(c => c.category === course.category && c.id !== course.id)
            .slice(0, 3)
            .map(relatedCourse => (
              <div key={relatedCourse.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-36 bg-gray-200 relative">
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {relatedCourse.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{relatedCourse.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{relatedCourse.instructor}</p>
                  <Link to={`/courses/${relatedCourse.id}`}>
                    <Button variant="outline" className="w-full">View Course</Button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;