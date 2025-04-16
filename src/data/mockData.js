import image from "../assets/course.png";
import ai from "../assets/ai.jpg";
import cyber from "../assets/cyber.png";
import cloud from "../assets/cloud.jpg";

export const coursesData = [
    {
      id: 1,
      title: "Artificial Intelligence Fundamentals",
      category: "AI",
      description: "Learn the basics of AI, machine learning, and neural networks.",
      duration: "8 weeks",
      level: "Beginner",
      instructor: "Dr. Sarah Johnson",
      image: ai,
      enrollmentStatus: "Open",
      rating: 4.7,
    },
    {
      id: 2,
      title: "Cybersecurity Essentials",
      category: "Cybersecurity",
      description: "Master the essential concepts and practices in cybersecurity.",
      duration: "10 weeks",
      level: "Intermediate",
      instructor: "Prof. Michael Chen",
      image: cyber,
      enrollmentStatus: "Open",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Cloud Computing with AWS",
      category: "Cloud",
      description: "Comprehensive guide to cloud services using Amazon Web Services.",
      duration: "6 weeks",
      level: "Intermediate",
      instructor: "Jessica Williams",
      image: cloud,
      enrollmentStatus: "Open",
      rating: 4.5,
    },
    {
      id: 4,
      title: "Natural Language Processing",
      category: "AI",
      description: "Deep dive into NLP techniques and applications.",
      duration: "12 weeks",
      level: "Advanced",
      instructor: "Dr. David Lee",
      image: ai,
      enrollmentStatus: "Open",
      rating: 4.6,
    },
    {
      id: 5,
      title: "Ethical Hacking",
      category: "Cybersecurity",
      description: "Learn ethical hacking techniques to secure systems and networks.",
      duration: "8 weeks",
      level: "Advanced",
      instructor: "Alex Martinez",
      image: cyber,
      enrollmentStatus: "Open",
      rating: 4.8,
    },
    {
      id: 6,
      title: "Microsoft Azure Fundamentals",
      category: "Cloud",
      description: "Introduction to cloud computing with Microsoft Azure.",
      duration: "5 weeks",
      level: "Beginner",
      instructor: "Emily Castro",
      image: cloud,
      enrollmentStatus: "Open",
      rating: 4.4,
    },
    {
      id: 7,
      title: "Deep Learning Specialization",
      category: "AI",
      description: "Comprehensive course on deep learning algorithms and applications.",
      duration: "14 weeks",
      level: "Advanced",
      instructor: "Dr. Robert Zhang",
      image: ai,
      enrollmentStatus: "Open",
      rating: 4.9,
    },
    {
      id: 8,
      title: "Network Security",
      category: "Cybersecurity",
      description: "Learn how to secure networks against various cyber threats.",
      duration: "7 weeks",
      level: "Intermediate",
      instructor: "Lisa Nguyen",
      image: cyber,
      enrollmentStatus: "Open",
      rating: 4.6,
    },
    {
      id: 9,
      title: "Google Cloud Platform",
      category: "Cloud",
      description: "Explore cloud services offered by Google Cloud Platform.",
      duration: "9 weeks",
      level: "Intermediate",
      instructor: "Mark Robinson",
      image: cloud,
      enrollmentStatus: "Open",
      rating: 4.7,
    },
  ];
  
  export const userEnrollments = [
    {
      courseId: 1,
      enrollmentDate: "2025-03-10",
      progress: 65,
      completed: false,
    },
    {
      courseId: 5,
      enrollmentDate: "2025-02-20",
      progress: 90,
      completed: false,
    },
    {
      courseId: 6,
      enrollmentDate: "2025-01-15",
      progress: 100,
      completed: true,
    },
  ];
  
  export const userCertificates = [
    {
      id: 1,
      courseId: 6,
      title: "Microsoft Azure Fundamentals",
      issueDate: "2025-03-01",
      credential: "CERT-AZ900-12345",
    },
  ];
  
  export const recommendedCourses = [
    {
      courseId: 2,
      reason: "Based on your interest in AI Fundamentals",
    },
    {
      courseId: 9,
      reason: "Popular among students who completed Azure Fundamentals",
    },
  ];
  
  export const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, simply browse our Courses page, select the course you're interested in, and click the 'Enroll' button. You'll then be able to access the course from your Dashboard."
    },
    {
      question: "Are there any prerequisites for the courses?",
      answer: "Each course has its own prerequisites which are listed in the course details. Beginner courses typically have no prerequisites, while intermediate and advanced courses may require prior knowledge or completion of earlier courses."
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer: "Yes, upon successful completion of a course, you will receive a digital certificate that you can download, share, and add to your professional profiles."
    },
    {
      question: "What is the refund policy?",
      answer: "We offer a 7-day money-back guarantee for all courses. If you're not satisfied with a course, you can request a refund within 7 days of enrollment."
    },
    {
      question: "How long do I have access to a course after enrollment?",
      answer: "Once enrolled, you have lifetime access to the course materials, allowing you to learn at your own pace and revisit the content whenever needed."
    },
  ];