import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master AI, Cybersecurity, and Cloud – Learn Anytime.
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Build your tech skills with industry-leading courses designed by experts.
            Learn at your own pace and boost your career.
          </p>
          <Link to="/courses">
            <Button className="text-lg px-8 py-3">Start Learning</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;