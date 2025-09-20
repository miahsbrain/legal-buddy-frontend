import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { Scale, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";
import { useAuth } from "../context/AuthContext";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Upload", path: "/upload" },
    { label: "Demo", path: "/demo" },
    { label: "Pricing", path: "/pricing" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Nav Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Scale className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-800">
                Everyday Legal Buddy
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side (Auth Buttons / User) */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm font-medium text-slate-700">
                  {user.first_name} {user.last_name}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="flex gap-2 mt-4 px-3">
                {user ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/login" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" className="flex-1">
                      <Button size="sm" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
