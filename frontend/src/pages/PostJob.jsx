import { useState } from "react";

const PostJobPage = () => {
  const [jobData, setJobData] = useState({
    title: "",
    category: "",
    subcategory: "",
    description: "",
    skills: [],
    budget: "",
    budgetType: "fixed", // fixed or hourly
    timeline: "",
    experience: "",
    attachments: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { 
      id: "development", 
      name: "Programming & Tech", 
      subcategories: ["Web Development", "Mobile Development", "Desktop Development", "AI/ML", "Data Science"]
    },
    { 
      id: "design", 
      name: "Graphics & Design", 
      subcategories: ["Logo Design", "Web Design", "UI/UX Design", "Print Design", "3D Design"]
    },
    { 
      id: "writing", 
      name: "Writing & Translation", 
      subcategories: ["Content Writing", "Copywriting", "Technical Writing", "Translation", "Proofreading"]
    },
    { 
      id: "marketing", 
      name: "Digital Marketing", 
      subcategories: ["Social Media Marketing", "SEO", "PPC Advertising", "Email Marketing", "Content Marketing"]
    }
  ];

  const skillOptions = [
    "JavaScript", "React", "Node.js", "Python", "Java", "PHP", "C++",
    "UI/UX Design", "Graphic Design", "Figma", "Adobe Creative Suite",
    "Content Writing", "SEO", "Digital Marketing", "Social Media",
    "Video Editing", "Photography", "3D Modeling", "Animation"
  ];

  const handleSkillToggle = (skill) => {
    setJobData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Job posted successfully! Freelancers will start sending proposals soon.");
      setIsSubmitting(false);
      // Reset form or redirect
      setJobData({
        title: "",
        category: "",
        subcategory: "",
        description: "",
        skills: [],
        budget: "",
        budgetType: "fixed",
        timeline: "",
        experience: "",
        attachments: []
      });
      setCurrentStep(1);
    }, 2000);
  };

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 3));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.1) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <Navigation />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Post a New Job
          </h1>
          <p className="text-xl text-slate-600">Find the perfect freelancer for your project</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-white/30 backdrop-blur-sm text-slate-400 border border-white/30'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    currentStep > step ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-white/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-slate-600">
            Step {currentStep} of 3: {
              currentStep === 1 ? 'Project Details' : 
              currentStep === 2 ? 'Requirements' : 
              'Budget & Timeline'
            }
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/20 p-8 border border-white/30">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Project Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Project Title</label>
                  <Input
                    placeholder="e.g., Build a modern e-commerce website"
                    value={jobData.title}
                    onChange={(e) => setJobData({...jobData, title: e.target.value})}
                    className="h-14 text-lg bg-white/30 backdrop-blur-sm border-white/30 focus:border-blue-500"
                    required
                  />
                  <p className="text-sm text-slate-500 mt-2">Write a clear, descriptive title that explains what you need</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-slate-700 mb-3">Category</label>
                    <select 
                      value={jobData.category}
                      onChange={(e) => setJobData({...jobData, category: e.target.value, subcategory: ""})}
                      className="w-full h-14 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 text-lg focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-slate-700 mb-3">Subcategory</label>
                    <select 
                      value={jobData.subcategory}
                      onChange={(e) => setJobData({...jobData, subcategory: e.target.value})}
                      className="w-full h-14 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 text-lg focus:border-blue-500 focus:outline-none"
                      required
                      disabled={!jobData.category}
                    >
                      <option value="">Select subcategory</option>
                      {jobData.category && categories.find(c => c.id === jobData.category)?.subcategories.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Project Description</label>
                  <textarea
                    placeholder="Describe your project in detail. Include what you want to achieve, any specific requirements, and what success looks like..."
                    value={jobData.description}
                    onChange={(e) => setJobData({...jobData, description: e.target.value})}
                    rows={6}
                    className="w-full bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 py-3 text-lg focus:border-blue-500 focus:outline-none resize-none"
                    required
                  />
                  <p className="text-sm text-slate-500 mt-2">Minimum 100 characters. Be specific about what you need.</p>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="button"
                    onClick={nextStep}
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Requirements */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Required Skills</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 max-h-60 overflow-y-auto">
                    {skillOptions.map((skill) => (
                      <div
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          jobData.skills.includes(skill)
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'bg-white/40 backdrop-blur-sm text-slate-700 hover:bg-white/60'
                        }`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 mt-2">{jobData.skills.length} skills selected</p>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Experience Level Required</label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { value: "entry", label: "Entry Level", desc: "New freelancers with basic skills" },
                      { value: "intermediate", label: "Intermediate", desc: "Experienced freelancers" },
                      { value: "expert", label: "Expert", desc: "Top-tier professionals" }
                    ].map((level) => (
                      <div
                        key={level.value}
                        onClick={() => setJobData({...jobData, experience: level.value})}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                          jobData.experience === level.value
                            ? 'border-blue-500 bg-blue-50/50 backdrop-blur-sm shadow-xl'
                            : 'border-white/30 bg-white/30 backdrop-blur-sm hover:border-blue-300'
                        }`}
                      >
                        <h4 className="font-semibold text-slate-900 mb-1">{level.label}</h4>
                        <p className="text-sm text-slate-600">{level.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Project Files (Optional)</label>
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center bg-white/20 backdrop-blur-sm hover:border-blue-300 transition-colors">
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">Drop files here or click to browse</p>
                    <p className="text-sm text-slate-500">Supported formats: PDF, DOC, XLS, PNG, JPG (Max 25MB each)</p>
                    <Button type="button" variant="outline" className="mt-4 bg-white/30 backdrop-blur-sm border-white/30">
                      Choose Files
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="h-12 px-8 bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button 
                    type="button"
                    onClick={nextStep}
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Budget & Timeline */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Budget Type</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div
                      onClick={() => setJobData({...jobData, budgetType: "fixed"})}
                      className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                        jobData.budgetType === "fixed"
                          ? 'border-blue-500 bg-blue-50/50 backdrop-blur-sm shadow-xl'
                          : 'border-white/30 bg-white/30 backdrop-blur-sm hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                        <h4 className="font-semibold text-slate-900">Fixed Price</h4>
                      </div>
                      <p className="text-sm text-slate-600">Pay a fixed amount for the entire project</p>
                    </div>
                    
                    <div
                      onClick={() => setJobData({...jobData, budgetType: "hourly"})}
                      className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                        jobData.budgetType === "hourly"
                          ? 'border-blue-500 bg-blue-50/50 backdrop-blur-sm shadow-xl'
                          : 'border-white/30 bg-white/30 backdrop-blur-sm hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <Clock className="h-6 w-6 text-purple-600" />
                        <h4 className="font-semibold text-slate-900">Hourly Rate</h4>
                      </div>
                      <p className="text-sm text-slate-600">Pay based on time worked</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">
                    Budget {jobData.budgetType === "fixed" ? "Amount" : "Range per Hour"}
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      type="number"
                      placeholder={jobData.budgetType === "fixed" ? "5000" : "25-50"}
                      value={jobData.budget}
                      onChange={(e) => setJobData({...jobData, budget: e.target.value})}
                      className="pl-12 h-14 text-lg bg-white/30 backdrop-blur-sm border-white/30 focus:border-blue-500"
                      required
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    {jobData.budgetType === "fixed" 
                      ? "Set your total project budget" 
                      : "Specify your hourly rate range"
                    }
                  </p>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Project Timeline</label>
                  <select 
                    value={jobData.timeline}
                    onChange={(e) => setJobData({...jobData, timeline: e.target.value})}
                    className="w-full h-14 bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-4 text-lg focus:border-blue-500 focus:outline-none"
                    required
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP (1-3 days)</option>
                    <option value="week">Within a week</option>
                    <option value="month">Within a month</option>
                    <option value="quarter">1-3 months</option>
                    <option value="flexible">I'm flexible</option>
                  </select>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Project Summary</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Title:</span> {jobData.title}</p>
                    <p><span className="font-medium">Category:</span> {jobData.subcategory}</p>
                    <p><span className="font-medium">Skills:</span> {jobData.skills.join(", ")}</p>
                    <p><span className="font-medium">Budget:</span> ${jobData.budget} ({jobData.budgetType})</p>
                    <p><span className="font-medium">Timeline:</span> {jobData.timeline}</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="h-12 px-8 bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Posting Job...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-5 w-5" />
                        <span>Post Job</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;