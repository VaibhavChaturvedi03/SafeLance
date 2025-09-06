import { BarChart3, Briefcase, DollarSign, Edit, Settings, User, Users, Award, Plus, MessageSquare, Search, ImportIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Avatar";
import ProjectMilestoneModal from "../../components/ProjectMilestoneModal";

const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState("overview");
  const [activeProjects , setActiveProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website Development",
      freelancer: "Sarah Johnson",
      freelancerAvatar:
        "https://images.unsplash.com/photo-1635768229592-8c2532d33cb7?w=100&h=100&fit=crop&crop=face",
      progress: 0,
      status : "In Progress",
      budget: 0.001,
      spent: 0,
      deadline: "2025-02-15",
      description: "Modern e-commerce platform with payment integration",
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      freelancer: "Michael Chen",
      freelancerAvatar:
        "https://images.unsplash.com/photo-1755352425808-b8223a330f15?w=100&h=100&fit=crop&crop=face",
      progress: 100,
      status : "Completed",
      budget: 1800,
      spent: 1800,
      deadline: "2025-01-28",
      description: "Complete mobile app design system",
    },
    {
      id: 3,
      title: "Brand Identity Package",
      freelancer: "Emily Rodriguez",
      freelancerAvatar:
        "https://images.unsplash.com/photo-1739287088635-444554e7ac0e?w=100&h=100&fit=crop&crop=face",
      progress: 60,
      status : "In Progress",
      budget: 1200,
      spent: 720,
      deadline: "2025-02-20",
      description: "Complete brand identity and style guide",
    },
  ]);

  const [selectedProject , setSelectedProject] = useState(null);

  const GetStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100/80 text-emerald-800";
      case "In Progress":
        return "bg-blue-100/80 text-blue-800";
      case "In Review":
        return "bg-yellow-100/80 text-yellow-800";
      default:
        return "bg-gray-100/80 text-gray-800";
    }
  };

  const handleUpdateProject = (updatedProject) => {
  
  if( updatedProject.progress === 100 ){
    updatedProject.status = "Completed";
  } else{
    updatedProject.status = "In Progress"
  }
  
    setActiveProjects((prev) =>
    prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
  );
  setSelectedProject(updatedProject); 
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden font-sans">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/50 to-green-50/50"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(209, 250, 229, 0.4) 2px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Safelance
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <User className="h-4 w-4 text-emerald-600" />
                <span className="text-slate-700 font-medium">{user?.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        {/* Header */}
        <header className="mb-8 bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-emerald-400/20 border border-white/30 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-emerald-700 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-green-800 text-lg">
              Manage your projects and connect with top freelancers
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/post-job">
              <Button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2 rounded-lg font-semibold shadow-md flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Project
              </Button>
            </Link>
            <Link to="/profile">
              <Button
                variant="outline"
                className="border border-emerald-700 text-emerald-700 hover:bg-emerald-100 px-6 py-2 rounded-lg font-semibold shadow-md"
              >
                <Edit className="h-5 w-5" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </header>

        {/* Tabs */}
        <nav className="mb-8 bg-white/20 backdrop-blur-xl rounded-2xl shadow-md border border-white/30 flex p-2 space-x-2">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "projects", label: "Projects", icon: Briefcase },
            { id: "finances", label: "Finances", icon: DollarSign },
            { id: "messages", label: "Messages", icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex-1 rounded-xl flex items-center gap-2 justify-center py-3 font-semibold transition ${activeView === tab.id
                    ? "bg-emerald-700 text-white shadow-lg"
                    : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>

      
      {/* Milestone Modal */}
      {selectedProject && (
        <ProjectMilestoneModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onUpdate={handleUpdateProject}
        />
      )}

        {/* Tab Content */}
        {activeView === "overview" && (
          <section className="space-y-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 flex flex-col items-center">
                <Briefcase className="w-8 h-8 mb-2 text-emerald-600" />
                <span className="text-2xl font-bold">3</span>
                <span className="text-slate-500 text-sm">Active Projects</span>
                <span className="text-xs text-slate-400 mt-1">2 in progress</span>
              </div>
              <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 flex flex-col items-center">
                <DollarSign className="w-8 h-8 mb-2 text-emerald-600" />
                <span className="text-2xl font-bold text-emerald-600">$5.5K</span>
                <span className="text-slate-500 text-sm">Total Investment</span>
                <span className="text-xs text-slate-400 mt-1">$4.3K spent</span>
              </div>
              <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 flex flex-col items-center">
                <Users className="w-8 h-8 mb-2 text-emerald-600" />
                <span className="text-2xl font-bold">3</span>
                <span className="text-slate-500 text-sm">Freelancers</span>
                <span className="text-xs text-slate-400 mt-1">All active</span>
              </div>
              <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 flex flex-col items-center">
                <Award className="w-8 h-8 mb-2 text-yellow-500" />
                <span className="text-2xl font-bold text-yellow-500">4.8</span>
                <span className="text-slate-500 text-sm">Avg Rating</span>
                <span className="text-xs text-slate-400 mt-1">From freelancers</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 space-y-4">
                <h3 className="font-semibold text-green-700 text-xl">Quick Actions</h3>
                <Link to="/post-job">
                  <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Create New Project
                  </Button>
                </Link>
                <Link to="/find-talent">
                  <Button className="w-full justify-start bg-white border border-green-600 text-green-600 hover:bg-green-100">
                    <Search className="w-5 h-5" /> Find Talent
                  </Button>
                </Link>
                <Link to="/finances">
                  <Button className="w-full justify-start bg-white border border-green-600 text-green-600 hover:bg-green-100">
                    <DollarSign className="w-5 h-5" /> View Finances
                  </Button>
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6">
                <h3 className="font-semibold text-green-700 text-xl mb-4">Recent Activity</h3>
                <ul className="space-y-3">
                  {activeProjects.map(({ id, title, freelancer, status, deadline }) => (
                    <li key={id} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 mt-1 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-green-700 text-sm">{title} <span className="text-xs text-green-600 ml-1">by {freelancer}</span></p>
                        <p className="text-xs text-green-600">{status} • Due {deadline}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeView === "projects" && (
          <section className="space-y-6 cursor-pointer">
            <h2 className="text-2xl font-bold text-emerald-700">Active Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-md border border-green-100 p-6 flex flex-col"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={project.freelancerAvatar} />
                      <AvatarFallback>{project.freelancer[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-green-700">{project.title}</h3>
                      <p className="text-sm text-slate-500">by {project.freelancer}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{project.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <Badge className={GetStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <span className="text-xs text-slate-500">Due {project.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}


      </div>
    </div>
  );
};

export default ClientDashboard;
