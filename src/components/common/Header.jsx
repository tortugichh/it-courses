import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };
    
    // Initial check
    checkAuth();
    
    // Set up event listener for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    // Also check when location changes
    checkAuth();
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [location.pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
    // Trigger a refresh in case other components need to update auth state
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <span className="bg-blue-600 text-white p-2 rounded">TP</span>
            <span className="font-bold text-xl text-gray-800">TechnoPark Academy</span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
            
            {isAuthenticated && (
              <NavLink 
                to="/crm" 
                className={({ isActive }) => 
                  isActive ? "text-blue-600 font-medium border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600 transition"
                }
              >
                CRM
              </NavLink>
            )}
            
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  isActive 
                    ? "bg-blue-700 text-white px-4 py-2 rounded text-sm" 
                    : "bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
                }
              >
                Admin Login
              </NavLink>
            )}
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
              
              {isAuthenticated && (
                <NavLink 
                  to="/crm" 
                  className={({ isActive }) => 
                    isActive ? "text-blue-600 font-medium" : "text-gray-600"
                  }
                  onClick={closeMenu}
                >
                  CRM
                </NavLink>
              )}
              
              {isAuthenticated ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="text-red-600 font-medium text-left"
                >
                  Logout
                </button>
              ) : (
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    isActive ? "text-blue-600 font-medium" : "text-gray-600"
                  }
                  onClick={closeMenu}
                >
                  Admin Login
                </NavLink>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;