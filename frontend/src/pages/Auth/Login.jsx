import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Tabs, TabsList, TabsTrigger } from "../../components/Tabs";
import { AlertCircle, ArrowLeft, Briefcase, LogIn, Mail, Shield, User } from "lucide-react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

// TODO: Add navbar to this

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "client"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Immediate login without setTimeout for better UX
      const userData = {
        id: 1,
        name: formData.userType === "freelancer" ? "John Freelancer" : "Jane Client",
        email: formData.email,
        userType: formData.userType
      };
      
      login(userData, formData.userType);
      setIsLoading(false);
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Error in handleLogin:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">Safelance</h1>
              </Link>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back!</h2>
              <p className="text-slate-600">Sign in to your account to continue your journey</p>
            </div>

            {/* Login Form Card */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/20 p-8 border border-white/30">
              {/* User Type Selection */}
              <div className="mb-8">
                <Tabs value={formData.userType} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-12 bg-white/30 backdrop-blur-sm">
                    <TabsTrigger 
                      value="client" 
                      onClick={() => setFormData({...formData, userType: "client"})}
                      className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-medium transition-all cursor-pointer duration-300"
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      I'm a Client
                    </TabsTrigger>
                    <TabsTrigger 
                      value="freelancer" 
                      onClick={() => setFormData({...formData, userType: "freelancer"})}
                      className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-medium transition-all duration-300 cursor-pointer"
                    >
                      <User className="h-4 w-4 mr-2 " />
                      I'm a Freelancer
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-12 h-14 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500 text-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      type="password"
                      placeholder="Enter your password" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-12 h-14 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500 text-lg"
                      required
                    />
                  </div>
                </div>

                {/* Demo Credentials Notice */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800 mb-1">Demo Account</p>
                      <p className="text-xs text-amber-700">
                        Email: demo@example.com | Password: demo123
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg font-semibold shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                    Sign up for free
                  </Link>
                </p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-6">
              <Link to="/" className="inline-flex items-center text-slate-600 hover:text-emerald-600 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Hero */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-center p-12">
          <div className="max-w-lg text-center space-y-8">
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
              <h3 className="text-4xl font-bold text-slate-900 mb-6">
                {formData.userType === "freelancer" ? "Start your freelance journey" : "Find perfect talent"}
              </h3>
              <p className="text-slate-600 text-xl leading-relaxed mb-8">
                {formData.userType === "freelancer" 
                  ? "Join thousands of freelancers building successful careers and working with amazing clients worldwide"
                  : "Connect with skilled professionals and bring your ideas to life with our global talent pool"
                }
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
                  <div className="text-3xl font-bold mb-2">50K+</div>
                  <div className="text-emerald-100">Active Users</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                  <div className="text-3xl font-bold mb-2">99%</div>
                  <div className="text-blue-100">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;