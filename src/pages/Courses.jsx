import { useState, useEffect } from 'react';
import { coursesData } from '../data/mockData';
import CategoryFilter from '../components/courses/CategoryFilter';
import CourseGrid from '../components/courses/CourseGrid';

const Courses = () => {
  const [courses, setCourses] = useState(coursesData);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Extract unique categories from courses
    const uniqueCategories = [...new Set(coursesData.map(course => course.category))];
    setCategories(uniqueCategories);
  }, []);
  
  useEffect(() => {
    if (activeCategory === 'All') {
      setCourses(coursesData);
    } else {
      setCourses(coursesData.filter(course => course.category === activeCategory));
    }
  }, [activeCategory]);
  
  const handleEnroll = (courseId) => {
    console.log(`Enrolled in course with ID: ${courseId}`);
    // In a real app, this would update the user's enrollment status
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Our Courses</h1>
      
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      <CourseGrid courses={courses} onEnroll={handleEnroll} />
    </div>
  );
};

export default Courses;