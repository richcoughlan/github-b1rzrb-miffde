import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../lib/auth';

export const Header: React.FC = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActivePath = (path: string) => location.pathname === path;
  const isAdmin = user?.role === 'admin';

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate('/auth');
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Concierge CME</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-8">
            {isAdmin ? (
              <Link
                to="/admin"
                className={`text-sm font-medium ${
                  isActivePath('/admin')
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Admin Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={(e) => handleNavClick(e, '/dashboard')}
                  className={`text-sm font-medium ${
                    isActivePath('/dashboard')
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/courses"
                  onClick={(e) => handleNavClick(e, '/courses')}
                  className={`text-sm font-medium ${
                    isActivePath('/courses')
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Courses
                </Link>
                <Link
                  to="/certificates"
                  onClick={(e) => handleNavClick(e, '/certificates')}
                  className={`text-sm font-medium ${
                    isActivePath('/certificates')
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Certificates
                </Link>
              </>
            )}

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-700">
                    Welcome, {user?.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      signOut();
                      navigate('/');
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};