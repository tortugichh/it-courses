import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold">TechnoPark Academy</NavLink>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className={({ isActive }) => 
            isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition"
          }>
            Home
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => 
            isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition"
          }>
            Courses
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => 
            isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition"
          }>
            Dashboard
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => 
            isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary transition"
          }>
            Contact
          </NavLink>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "text-primary" : "hover:text-primary"}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/courses" 
              className={({ isActive }) => isActive ? "text-primary" : "hover:text-primary"}
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? "text-primary" : "hover:text-primary"}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? "text-primary" : "hover:text-primary"}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;