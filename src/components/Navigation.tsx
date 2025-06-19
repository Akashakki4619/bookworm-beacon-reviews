
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, User, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/books', label: 'Books' },
    { href: '/profile', label: 'Profile' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-amber-600 transition-colors">
            <BookOpen className="h-6 w-6 text-amber-600" />
            BookReview
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-gray-600 hover:text-amber-600 transition-colors font-medium ${
                  isActive(item.href) ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-200">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-gray-600 hover:text-amber-600 transition-colors font-medium ${
                    isActive(item.href) ? 'text-amber-600' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="bg-amber-600 hover:bg-amber-700 text-white w-fit">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
