import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Button } from "../components/Button";
import { Briefcase, MessageSquare, User } from "lucide-react";

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-emerald-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Safelance</h1>
              </Link>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/browse" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/20">
                Find Talent
              </Link>
              <Link to="/services" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/20">
                Browse Services
              </Link>
              {user && user.userType !== 'client' && (
                <Link to="/post-job" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/20">
                  Post a Job
                </Link>
              )}
              <Link to="/how-it-works" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/20">
                How it Works
              </Link>
            </div>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/messages">
                <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20">
                <User className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/30 border border-white/20">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-to-r cursor-pointer from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg">
                  Join Now
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;