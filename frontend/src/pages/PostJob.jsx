import { useState } from "react";
import Navigation from "./Navigation";
import { Input } from "../components/Input";
import { ArrowLeft, ArrowRight, Clock, DollarSign, Send, Upload } from "lucide-react";
import { Button } from "../components/Button";

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
    { id: "development", name: "Programming & Tech", subcategories: ["Web Development", "Mobile Development", "Desktop Development", "AI/ML", "Data Science"] },
    { id: "design", name: "Graphics & Design", subcategories: ["Logo Design", "Web Design", "UI/UX Design", "Print Design", "3D Design"] },
    { id: "writing", name: "Writing & Translation", subcategories: ["Content Writing", "Copywriting", "Technical Writing", "Translation", "Proofreading"] },
    { id: "marketing", name: "Digital Marketing", subcategories: ["Social Media Marketing", "SEO", "PPC Advertising", "Email Marketing", "Content Marketing"] }
  ];

  const skillOptions = [
    "JavaScript", "React", "Node.js", "Python", "Java", "PHP", "C++",
    "UI/UX Design", "Graphic Design", "Figma", "Adobe Creative Suite",
    "Content Writing", "SEO", "Digital Marketing", "Social Media",
    "Video Editing", "Photography", "3D Modeling", "Animation"
  ];

  const HandleSkillToggle = (skill) => {
    setJobData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const NextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const PrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulated API call delay
    setTimeout(() => {
      alert("Job posted successfully!");
      setIsSubmitting(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-teal-50/60 to-green-50/60"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 25px 25px, rgba(209,250,229,0.18) 2px, transparent)",
          backgroundSize: "50px 50px"
        }}
      ></div>

      <Navigation />

      <main className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-700 mb-3">Post a New Job</h1>
          <p className="text-lg text-green-900">Find the perfect freelancer for your project</p>
        </header>

        {/* Stepper */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex items-center gap-6 mb-1">
            {[1,2,3].map(step => (
              <div key={step} className="flex items-center gap-2">
                <span className={`w-10 h-10 flex items-center justify-center text-lg rounded-full font-bold transition-colors duration-300 ${currentStep >= step ? "bg-emerald-600 text-white shadow" : "bg-white border-2 border-green-200 text-green-500"}`}>
                  {step}
                </span>
                {step < 3 && (
                  <div className={`h-1 w-10 rounded-full transition-colors duration-300 ${currentStep > step ? "bg-emerald-600" : "bg-green-200"}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-green-900 font-medium mt-2">
            Step {currentStep} of 3: {currentStep === 1 ? "Project Details" : currentStep === 2 ? "Requirements" : "Budget & Timeline"}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-8 border border-green-100 shadow-lg">
          <form onSubmit={handleSubmit}>
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <section>
                  <label className="block mb-2 font-semibold text-green-800">Project Title</label>
                  <Input
                    value={jobData.title}
                    onChange={(e) => setJobData({...jobData, title: e.target.value})}
                    placeholder="e.g., Build a modern e-commerce website"
                    className="w-full px-4 py-3 rounded-md border border-green-300 focus:outline-none focus:border-green-500"
                    required
                  />
                  <p className="text-sm text-green-600 mt-1">Write a clear, descriptive title that explains what you need</p>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-semibold text-green-800">Category</label>
                    <select
                      value={jobData.category}
                      onChange={(e) => setJobData({...jobData, category: e.target.value, subcategory: ""})}
                      className="w-full px-4 py-3 rounded-md border border-green-300 focus:outline-none focus:border-green-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-green-800">Subcategory</label>
                    <select
                      value={jobData.subcategory}
                      onChange={(e) => setJobData({...jobData, subcategory: e.target.value})}
                      className="w-full px-4 py-3 rounded-md border border-green-300 focus:outline-none focus:border-green-500"
                      required
                      disabled={!jobData.category}
                    >
                      <option value="">Select Subcategory</option>
                      {jobData.category && categories.find(c => c.id === jobData.category).subcategories.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </section>

                <section>
                  <label className="block mb-2 font-semibold text-green-800">Project Description</label>
                  <textarea
                    value={jobData.description}
                    onChange={(e) => setJobData({...jobData, description: e.target.value})}
                    placeholder="Describe your project in detail."
                    rows={6}
                    className="w-full px-4 py-3 rounded-md border border-green-300 focus:outline-none focus:border-green-500 resize-none"
                    required
                  />
                  <p className="text-sm text-green-600 mt-1">Minimum 100 characters. Be specific about what you need.</p>
                </section>

                <div className="flex justify-end">
                  <Button type="button" onClick={() => setCurrentStep(2)} className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition">
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Skills selection */}
                <section>
                  <label className="block mb-2 font-semibold text-green-800">Skills Required</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-green-50 rounded-md max-h-48 overflow-auto border border-green-200">
                    {skillOptions.map(skill => (
                      <div
                        key={skill}
                        className={`text-center py-2 px-3 text-sm rounded cursor-pointer select-none transition ${
                          jobData.skills.includes(skill) ? "bg-emerald-700 text-white" : "bg-white text-green-700 hover:bg-green-100"
                        }`}
                        onClick={() => {
                          const newSkills = jobData.skills.includes(skill) ?
                            jobData.skills.filter(s => s !== skill) :
                            [...jobData.skills, skill];
                          setJobData({...jobData, skills: newSkills});
                        }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm mt-1 text-green-600">{jobData.skills.length} skills selected</p>
                </section>

                {/* Experience Level */}
                <section>
                  <label className="block mb-2 font-semibold text-green-800">Experience Level</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Entry", value: "entry", description: "New freelancers" },
                      { label: "Intermediate", value: "intermediate", description: "Some experience" },
                      { label: "Expert", value: "expert", description: "Highly skilled" }
                    ].map(level => (
                      <div
                        key={level.value}
                        className={`cursor-pointer border p-4 rounded-md transition ${
                          jobData.experience === level.value ? "border-emerald-700 bg-emerald-100" : "border-green-300 hover:border-green-500"
                        }`}
                        onClick={() => setJobData({...jobData, experience: level.value})}
                      >
                        <div className="font-semibold text-green-800">{level.label}</div>
                        <div className="text-sm text-green-600">{level.description}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="flex justify-between">
                  <Button type="button" onClick={() => setCurrentStep(1)} className="px-6 py-3 rounded-lg border border-green-300 hover:border-green-500 transition">
                    <ArrowLeft className="inline-block mr-2" />
                    Back
                  </Button>
                  <Button type="button" onClick={() => setCurrentStep(3)} className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                    Continue
                    <ArrowRight className="inline-block ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <section>
                  <label className="block mb-2 font-semibold text-green-800">Budget Type</label>
                  <div className="flex gap-4">
                    {["fixed", "hourly"].map(type => (
                      <div
                        key={type}
                        className={`flex-1 cursor-pointer border rounded-md p-4 transition text-center ${
                          jobData.budgetType === type ? "border-emerald-700 bg-emerald-100" : "border-green-300 hover:border-green-500"
                        }`}
                        onClick={() => setJobData({...jobData, budgetType: type})}
                      >
                        {type === "fixed" ? (
                          <>
                            <DollarSign className="mx-auto mb-2 w-6 h-6 text-green-600" />
                            <div className="font-semibold text-green-800">Fixed Price</div>
                            <div className="text-sm text-green-600">Pay total amount</div>
                          </>
                        ) : (
                          <>
                            <Clock className="mx-auto mb-2 w-6 h-6 text-green-600" />
                            <div className="font-semibold text-green-800">Hourly Rate</div>
                            <div className="text-sm text-green-600">Pay per hour</div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <label className="block mb-2 font-semibold text-green-800">Budget Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-green-400" />
                    <Input
                      type="number"
                      placeholder={jobData.budgetType === 'fixed' ? "500" : "20-50"}
                      value={jobData.budget}
                      onChange={(e) => setJobData({...jobData, budget: e.target.value})}
                      className="w-full px-10 py-3 rounded-md border border-green-300 focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>
                </section>

                <section>
                  <label className="block mb-2 font-semibold text-green-800">Project Timeline</label>
                  <select
                    value={jobData.timeline}
                    onChange={(e) => setJobData({...jobData, timeline: e.target.value})}
                    className="w-full px-4 py-3 rounded-md border border-green-300 focus:outline-none focus:border-green-500"
                    required
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP (1-3 days)</option>
                    <option value="week">Within a week</option>
                    <option value="month">Within a month</option>
                    <option value="quarter">1-3 months</option>
                    <option value="flexible">I'm flexible</option>
                  </select>
                </section>

                <div className="flex justify-between">
                  <Button type="button" onClick={() => setCurrentStep(2)} className="px-6 py-3 rounded-lg border border-green-300 hover:border-green-500 transition">
                    <ArrowLeft className="inline-block mr-2" />
                    Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Posting...
                      </span>
                    ) : (
                      "Post Job"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostJobPage;
