import { BarChart3, Briefcase, DollarSign, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('overview');
  const [activeProjects] = useState([
    { 
      id: 1, 
      title: "E-commerce Website Development", 
      freelancer: "Sarah Johnson", 
      freelancerAvatar: "https://images.unsplash.com/photo-1635768229592-8c2532d33cb7?w=100&h=100&fit=crop&crop=face",
      progress: 85, 
      status: "In Progress", 
      budget: 2500, 
      spent: 1800,
      deadline: "2025-02-15",
      description: "Modern e-commerce platform with payment integration",
      milestones: [
        { name: "Requirements Analysis", completed: true, date: "2025-01-20" },
        { name: "UI/UX Design", completed: true, date: "2025-01-25" },
        { name: "Frontend Development", completed: false, date: "2025-02-10" },
        { name: "Backend & Testing", completed: false, date: "2025-02-15" }
      ]
    },
    { 
      id: 2, 
      title: "Mobile App UI/UX Design", 
      freelancer: "Michael Chen", 
      freelancerAvatar: "https://images.unsplash.com/photo-1755352425808-b8223a330f15?w=100&h=100&fit=crop&crop=face",
      progress: 100, 
      status: "Completed", 
      budget: 1800, 
      spent: 1800,
      deadline: "2025-01-28",
      description: "Complete mobile app design system",
      milestones: [
        { name: "User Research", completed: true, date: "2025-01-15" },
        { name: "Wireframes", completed: true, date: "2025-01-20" },
        { name: "High-fidelity Designs", completed: true, date: "2025-01-25" },
        { name: "Prototyping", completed: true, date: "2025-01-28" }
      ]
    },
    { 
      id: 3, 
      title: "Brand Identity Package", 
      freelancer: "Emily Rodriguez", 
      freelancerAvatar: "https://images.unsplash.com/photo-1739287088635-444554e7ac0e?w=100&h=100&fit=crop&crop=face",
      progress: 60, 
      status: "In Progress", 
      budget: 1200, 
      spent: 720,
      deadline: "2025-02-20",
      description: "Complete brand identity and style guide",
      milestones: [
        { name: "Brand Strategy", completed: true, date: "2025-01-18" },
        { name: "Logo Design", completed: true, date: "2025-01-25" },
        { name: "Brand Guidelines", completed: false, date: "2025-02-15" },
        { name: "Marketing Materials", completed: false, date: "2025-02-20" }
      ]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100/80 text-green-800';
      case 'In Progress': return 'bg-blue-100/80 text-blue-800';
      case 'In Review': return 'bg-yellow-100/80 text-yellow-800';
      default: return 'bg-gray-100/80 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(224, 231, 255, 0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Enhanced Navigation */}
      <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Safelance</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="text-slate-700 font-medium">{user?.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => {}} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/20 border border-white/30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-slate-600 text-lg">Manage your projects and track progress</p>
              </div>
              <div className="hidden md:flex space-x-4">
                <Link to="/post-job">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button variant="outline" className="bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40">
                    <Search className="h-4 w-4 mr-2" />
                    Find Talent
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <div className="mb-8">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/30">
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'projects', label: 'Projects', icon: Briefcase },
                { id: 'finances', label: 'Finances', icon: DollarSign },
                { id: 'messages', label: 'Messages', icon: MessageSquare }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeView === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-white/30'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeView === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-blue-500/10 border border-white/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Active Projects</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">3</p>
                  <p className="text-sm text-slate-500 mt-1">2 in progress</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-green-500/10 border border-white/30 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Total Investment</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$5.5K</p>
                  <p className="text-sm text-slate-500 mt-1">$4.3K spent</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-purple-500/10 border border-white/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Freelancers</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">3</p>
                  <p className="text-sm text-slate-500 mt-1">All active</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-amber-500/10 border border-white/30 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Avg Rating</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">4.8</p>
                  <p className="text-sm text-slate-500 mt-1">From freelancers</p>
                </div>
              </div>
            </div>

            {/* Recent Projects Quick View */}
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-500/10 border border-white/30 overflow-hidden">
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
                  <Button 
                    onClick={() => setActiveView('projects')}
                    variant="outline" 
                    size="sm" 
                    className="bg-white/30 backdrop-blur-sm border-white/30"
                  >
                    View All
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {activeProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/40 transition-all duration-300 cursor-pointer"
                         onClick={() => {setSelectedProject(project); setActiveView('projects');}}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 mb-1">{project.title}</h4>
                          <p className="text-sm text-slate-600">by {project.freelancer}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getStatusColor(project.status)} backdrop-blur-sm`}>
                            {project.status}
                          </Badge>
                          <p className="text-sm text-slate-600 mt-1">${project.budget}</p>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-slate-600 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeView === 'projects' && (
          <div className="space-y-6">
            {selectedProject ? (
              // Project Detail View
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button 
                    onClick={() => setSelectedProject(null)}
                    variant="outline"
                    className="bg-white/30 backdrop-blur-sm border-white/30"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Projects
                  </Button>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="bg-white/30 backdrop-blur-sm border-white/30">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Project
                    </Button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Project Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 overflow-hidden">
                      <div className="p-6 border-b border-white/20">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={selectedProject.freelancerAvatar} />
                            <AvatarFallback>{selectedProject.freelancer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">{selectedProject.title}</h1>
                            <p className="text-slate-600 mb-3">{selectedProject.description}</p>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-slate-600">by {selectedProject.freelancer}</span>
                              <Badge className={getStatusColor(selectedProject.status)}>
                                {selectedProject.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Milestones</h3>
                        <div className="space-y-4">
                          {selectedProject.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                milestone.completed 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-white/30 backdrop-blur-sm text-slate-400'
                              }`}>
                                {milestone.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                              </div>
                              <div className="flex-1">
                                <div className={`font-medium ${milestone.completed ? 'text-slate-900' : 'text-slate-600'}`}>
                                  {milestone.name}
                                </div>
                                <div className="text-sm text-slate-500">{milestone.date}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="space-y-6">
                    <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Overview</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm text-slate-600 mb-1">
                            <span>Progress</span>
                            <span>{selectedProject.progress}%</span>
                          </div>
                          <div className="w-full bg-white/30 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${selectedProject.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-white/30 backdrop-blur-sm rounded-xl">
                            <div className="text-2xl font-bold text-slate-900">${selectedProject.budget}</div>
                            <div className="text-sm text-slate-600">Budget</div>
                          </div>
                          <div className="text-center p-3 bg-white/30 backdrop-blur-sm rounded-xl">
                            <div className="text-2xl font-bold text-slate-900">${selectedProject.spent}</div>
                            <div className="text-sm text-slate-600">Spent</div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/20">
                          <div className="text-sm text-slate-600 mb-1">Deadline</div>
                          <div className="font-semibold text-slate-900">{selectedProject.deadline}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <Button className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                        <Button className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30">
                          <Eye className="h-4 w-4 mr-2" />
                          View Deliverables
                        </Button>
                        <Button className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30">
                          <Star className="h-4 w-4 mr-2" />
                          Leave Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Projects List View
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-500/10 border border-white/30 overflow-hidden">
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">All Projects</h2>
                    <Link to="/post-job">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {activeProjects.map((project) => (
                      <div key={project.id} 
                           className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/40 transition-all duration-300 cursor-pointer"
                           onClick={() => setSelectedProject(project)}>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-start space-x-4 flex-1">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={project.freelancerAvatar} />
                              <AvatarFallback>{project.freelancer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-800 mb-1">{project.title}</h4>
                              <p className="text-sm text-slate-600 mb-2">{project.description}</p>
                              <p className="text-sm text-slate-600">by {project.freelancer}</p>
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end space-y-2">
                            <Badge className={`${getStatusColor(project.status)} backdrop-blur-sm`}>
                              {project.status}
                            </Badge>
                            <div className="text-lg font-bold text-slate-900">${project.budget}</div>
                            <div className="text-sm text-slate-500">Due: {project.deadline}</div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-slate-600 mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-white/30 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-600">Spent: ${project.spent} of ${project.budget}</span>
                          <div className="flex space-x-2">
                            <MessageSquare className="h-4 w-4 text-slate-400 hover:text-blue-500 cursor-pointer" />
                            <Eye className="h-4 w-4 text-slate-400 hover:text-purple-500 cursor-pointer" />
                            <Edit className="h-4 w-4 text-slate-400 hover:text-green-500 cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Finances Tab */}
        {activeView === 'finances' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Budget Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Budget</span>
                    <span className="text-2xl font-bold text-slate-900">$5,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Amount Spent</span>
                    <span className="text-xl font-semibold text-red-600">$4,320</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Remaining</span>
                    <span className="text-xl font-semibold text-green-600">$1,180</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3 mt-4">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {[
                    { freelancer: "Sarah Johnson", amount: 800, date: "Jan 25", project: "E-commerce Development" },
                    { freelancer: "Michael Chen", amount: 1800, date: "Jan 28", project: "Mobile App Design" },
                    { freelancer: "Emily Rodriguez", amount: 400, date: "Jan 30", project: "Brand Identity" }
                  ].map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/30 backdrop-blur-sm rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">{transaction.freelancer}</div>
                        <div className="text-sm text-slate-600">{transaction.project}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900">-${transaction.amount}</div>
                        <div className="text-sm text-slate-500">{transaction.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeView === 'messages' && (
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-xl font-bold text-slate-800">Messages</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { freelancer: "Sarah Johnson", message: "I've completed the frontend setup. Ready for review!", time: "2 hours ago", unread: true },
                  { freelancer: "Michael Chen", message: "Final designs are uploaded to the project folder.", time: "1 day ago", unread: false },
                  { freelancer: "Emily Rodriguez", message: "Can we schedule a call to discuss the brand direction?", time: "2 days ago", unread: true }
                ].map((msg, index) => (
                  <div key={index} className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    msg.unread 
                      ? 'bg-blue-50/50 border-blue-200/50 hover:bg-blue-50/70' 
                      : 'bg-white/30 border-white/20 hover:bg-white/40'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-slate-900">{msg.freelancer}</div>
                      <div className="text-sm text-slate-500">{msg.time}</div>
                    </div>
                    <p className="text-slate-700">{msg.message}</p>
                    {msg.unread && (
                      <div className="mt-2">
                        <Badge className="bg-blue-500/20 text-blue-700">New</Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
