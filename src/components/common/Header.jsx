import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <span className="bg-blue-600 text-white p-2 rounded">TP</span>
            <span className="font-bold text-xl text-gray-800">TechnoPark Academy</span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 font-medium border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/courses" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 font-medium border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              Courses
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 font-medium border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 font-medium border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              Contact
            </NavLink>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t mt-2">
            <nav className="flex flex-col space-y-4 mt-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? "text-blue-600 font-medium" : "text-gray-600"
                }
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink 
                to="/courses" 
                className={({ isActive }) => 
                  isActive ? "text-blue-600 font-medium" : "text-gray-600"
                }
                onClick={closeMenu}
              >
                Courses
              </NavLink>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  isActive ? "text-blue-600 font-medium" : "text-gray-600"
                }
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  isActive ? "text-blue-600 font-medium" : "text-gray-600"
                }
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;