import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { ArrowLeft, ArrowRight, Briefcase, Building2, CheckCircle, DollarSign, Globe, Mail, Shield, User, UserPlus, Users } from "lucide-react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

// TODO: Add navbar to this

const SignupPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: "client",
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Client specific
    companyName: "",
    companySize: "",
    industry: "",
    // Freelancer specific
    title: "",
    skills: [],
    experience: "",
    hourlyRate: "",
    bio: "",
    portfolio: "",
    education: "",
    certifications: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const skillOptions = [
    "JavaScript", "React", "Node.js", "Python", "Java", "PHP", "C++",
    "UI/UX Design", "Graphic Design", "Figma", "Adobe Creative Suite",
    "Content Writing", "SEO", "Digital Marketing", "Social Media",
    "Video Editing", "Photography", "3D Modeling", "Animation"
  ];

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Immediate signup without setTimeout
      const userData = {
        id: 1,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        userType: formData.userType
      };
      login(userData, formData.userType);
      setIsLoading(false); // Clear loading state first
      navigate('/dashboard'); // Then navigate
    } catch (error) {
      console.error("Error in handleSignup:", error);
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">Safelance</h1>
              </Link>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Join Safelance</h2>
              <p className="text-slate-600">Create your account and start your journey</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      step >= i 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' 
                        : 'bg-white/30 backdrop-blur-sm text-slate-400 border border-white/30'
                    }`}>
                      {i}
                    </div>
                    {i < 3 && (
                      <div className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                        step > i ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-white/30'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-slate-600">
                Step {step} of 3: {
                  step === 1 ? 'Account Type' : 
                  step === 2 ? 'Basic Information' : 
                  'Professional Details'
                }
              </div>
            </div>

            {/* Signup Form Card */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/20 p-8 border border-white/30">
              <form onSubmit={handleSignup}>
                {/* Step 1: Account Type */}
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">Choose Your Path</h3>
                      <p className="text-slate-600">Are you looking to hire talent or offer your services?</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div 
                        onClick={() => setFormData({...formData, userType: "client"})}
                        className={`cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 ${
                          formData.userType === "client" 
                            ? 'border-emerald-500 bg-emerald-50/50 backdrop-blur-sm shadow-xl' 
                            : 'border-white/30 bg-white/30 backdrop-blur-sm hover:border-emerald-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                            formData.userType === "client" 
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg' 
                              : 'bg-white/40 backdrop-blur-sm'
                          }`}>
                            <Briefcase className={`h-10 w-10 ${formData.userType === "client" ? 'text-white' : 'text-slate-600'}`} />
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">I'm a Client</h4>
                          <p className="text-slate-600 text-sm">I want to hire freelancers for my projects</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => setFormData({...formData, userType: "freelancer"})}
                        className={`cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 ${
                          formData.userType === "freelancer" 
                            ? 'border-emerald-500 bg-emerald-50/50 backdrop-blur-sm shadow-xl' 
                            : 'border-white/30 bg-white/30 backdrop-blur-sm hover:border-emerald-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                            formData.userType === "freelancer" 
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg' 
                              : 'bg-white/40 backdrop-blur-sm'
                          }`}>
                            <User className={`h-10 w-10 ${formData.userType === "freelancer" ? 'text-white' : 'text-slate-600'}`} />
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">I'm a Freelancer</h4>
                          <p className="text-slate-600 text-sm">I want to offer my services and find work</p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="button"
                      onClick={nextStep}
                      className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg font-semibold shadow-xl"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* Step 2: Basic Information */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic Information</h3>
                      <p className="text-slate-600">Tell us about yourself</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                        <Input
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                        <Input
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="pl-12 h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                        <div className="relative">
                          <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            type="password"
                            placeholder="Create password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="pl-12 h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                        <div className="relative">
                          <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            type="password"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className="pl-12 h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Client-specific fields */}
                    {formData.userType === "client" && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name (Optional)</label>
                          <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <Input
                              placeholder="Your company name"
                              value={formData.companyName}
                              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                              className="pl-12 h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Company Size</label>
                            <select 
                              value={formData.companySize}
                              onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                              className="w-full h-12 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 focus:border-emerald-500 focus:outline-none"
                            >
                              <option value="">Select size</option>
                              <option value="1-10">1-10 employees</option>
                              <option value="11-50">11-50 employees</option>
                              <option value="51-200">51-200 employees</option>
                              <option value="200+">200+ employees</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Industry</label>
                            <select 
                              value={formData.industry}
                              onChange={(e) => setFormData({...formData, industry: e.target.value})}
                              className="w-full h-12 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 focus:border-emerald-500 focus:outline-none"
                            >
                              <option value="">Select industry</option>
                              <option value="Technology">Technology</option>
                              <option value="Healthcare">Healthcare</option>
                              <option value="Finance">Finance</option>
                              <option value="Education">Education</option>
                              <option value="E-commerce">E-commerce</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex space-x-4">
                      <Button 
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="flex-1 h-12 bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </Button>
                      <Button 
                        type="button"
                        onClick={nextStep}
                        className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Professional Details */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {formData.userType === "freelancer" ? "Professional Profile" : "Project Requirements"}
                      </h3>
                      <p className="text-slate-600">
                        {formData.userType === "freelancer" 
                          ? "Showcase your skills and experience" 
                          : "Help us understand what you're looking for"
                        }
                      </p>
                    </div>

                    {formData.userType === "freelancer" ? (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Professional Title</label>
                          <Input
                            placeholder="e.g., Full Stack Developer, UI/UX Designer"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">Skills (Select up to 10)</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                            {skillOptions.map((skill) => (
                              <div
                                key={skill}
                                onClick={() => formData.skills.length < 10 || formData.skills.includes(skill) ? handleSkillToggle(skill) : null}
                                className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  formData.skills.includes(skill)
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                                    : 'bg-white/40 backdrop-blur-sm text-slate-700 hover:bg-white/60'
                                } ${formData.skills.length >= 10 && !formData.skills.includes(skill) ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                {skill}
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-slate-500 mt-2">{formData.skills.length}/10 skills selected</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Experience Level</label>
                            <select 
                              value={formData.experience}
                              onChange={(e) => setFormData({...formData, experience: e.target.value})}
                              className="w-full h-12 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 focus:border-emerald-500 focus:outline-none"
                              required
                            >
                              <option value="">Select level</option>
                              <option value="Entry Level">Entry Level (0-2 years)</option>
                              <option value="Intermediate">Intermediate (2-5 years)</option>
                              <option value="Expert">Expert (5+ years)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Hourly Rate (USD)</label>
                            <div className="relative">
                              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                              <Input
                                type="number"
                                placeholder="25"
                                value={formData.hourlyRate}
                                onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                                className="pl-12 h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Professional Bio</label>
                          <textarea
                            placeholder="Describe your experience, expertise, and what makes you unique..."
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            rows={4}
                            className="w-full bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 py-3 focus:border-emerald-500 focus:outline-none resize-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Portfolio URL (Optional)</label>
                          <div className="relative">
                            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <Input
                              placeholder="https://yourportfolio.com"
                              value={formData.portfolio}
                              onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                              className="pl-12 h-12 bg-white/30 backdrop-blur-sm border-white/30 focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">What type of projects are you looking to outsource?</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {["Web Development", "Mobile Apps", "Design", "Content Writing", "Marketing", "Other"].map((type) => (
                              <div
                                key={type}
                                className="p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/40 cursor-pointer transition-all duration-200 text-center"
                              >
                                <span className="text-sm font-medium text-slate-700">{type}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Typical Project Budget Range</label>
                          <select 
                            className="w-full h-12 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 focus:border-emerald-500 focus:outline-none"
                          >
                            <option value="">Select budget range</option>
                            <option value="Under $1,000">Under $1,000</option>
                            <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                            <option value="$10,000+">$10,000+</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div className="flex space-x-4">
                      <Button 
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className="flex-1 h-12 bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </Button>
                      <Button 
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Creating Account...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <UserPlus className="h-5 w-5" />
                            <span>Create Account</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              {step === 1 && (
                <div className="mt-8 text-center">
                  <p className="text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                      Sign in here
                    </Link>
                  </p>
                </div>
              )}
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

        {/* Right Side - Info */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-center p-12">
          <div className="max-w-lg space-y-8">
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Join Our Community</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Verified Professionals</h4>
                    <p className="text-slate-600">All freelancers are verified and rated by real clients</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Secure Payments</h4>
                    <p className="text-slate-600">Protected transactions with money-back guarantee</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">24/7 Support</h4>
                    <p className="text-slate-600">Get help whenever you need it from our support team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;