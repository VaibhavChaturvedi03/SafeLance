import { BarChart3, Bell, Briefcase, DollarSign, Edit, Folder, Globe, Grid3X3, MessageSquare, Plus, Settings, Star, Target, Trash2, TrendingUp, Upload, X, Zap } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Avatar";
import { Badge } from "../../components/Badge";
import { Input } from "../../components/Input";
import { JobStorage } from "../../../Utils/Jobstorage";
import { createPortal } from "react-dom";
import ApplyJobModal from "../../components/ApplyJobModel"

const FreelancerDashboard = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('overview');
  const [recentOrders] = useState([

    {
      id: 1,
      title: "E-commerce Platform Development",
      client: "TechCorp Inc.",
      clientAvatar: "https://images.unsplash.com/photo-1670851810697-68ddb4ecae1c?w=100&h=100&fit=crop&crop=face",
      earnings: 2800,
      status: "Completed",
      rating: 5,
      deadline: "2025-01-25",
      description: "Modern e-commerce platform with payment integration"
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      client: "StartupXYZ",
      clientAvatar: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=100&h=100&fit=crop&crop=face",
      earnings: 1500,
      status: "In Progress",
      rating: null,
      deadline: "2025-02-10",
      description: "Complete mobile app design system"
    },
    {
      id: 3,
      title: "Brand Identity Package",
      client: "Creative Co.",
      clientAvatar: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=100&h=100&fit=crop&crop=face",
      earnings: 900,
      status: "In Review",
      rating: null,
      deadline: "2025-02-05",
      description: "Complete brand identity and style guide"
    }
  ]);

  const [skills, setskills] = useState([
    { name: "React Development", level: 95, projects: 45, category: "Frontend", color: "from-blue-500 to-blue-600" },
    { name: "UI/UX Design", level: 88, projects: 32, category: "Design", color: "from-purple-500 to-purple-600" },
    { name: "Node.js", level: 82, projects: 28, category: "Backend", color: "from-green-500 to-green-600" },
    { name: "Python", level: 78, projects: 25, category: "Backend", color: "from-yellow-500 to-yellow-600" }
  ]);

  const [showAddSkills, setShowAddSkills] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const availableSkills = [
    // Frontend
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Nuxt.js",
    "Angular", "Svelte", "Tailwind CSS", "Bootstrap", "Material UI", "Chakra UI",
    "Redux", "Zustand", "Three.js", "GSAP",

    // Backend
    "Node.js", "Express.js", "NestJS", "Django", "Flask", "FastAPI",
    "Spring Boot", "Laravel", "Ruby on Rails", "ASP.NET Core", "Go (Golang)",

    // Databases
    "MySQL", "PostgreSQL", "MongoDB", "SQLite", "MariaDB",
    "Firebase", "Supabase", "Redis", "Elasticsearch", "Cassandra",

    // Programming Languages
    "C", "C++", "C#", "Java", "Python", "Go", "Rust", "Kotlin",
    "Swift", "PHP", "Ruby", "R", "Matlab", "Perl", "Scala",

    // Mobile Development
    "React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)", "Xamarin",

    // DevOps / Cloud
    "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "GitLab CI/CD",
    "AWS", "Azure", "Google Cloud Platform (GCP)", "DigitalOcean",
    "Terraform", "Ansible", "Vagrant", "NGINX", "Apache",

    // Blockchain / Web3
    "Solidity", "Ethereum", "Hardhat", "Truffle", "Ganache", "Web3.js",
    "Ethers.js", "Polygon", "Solana", "Rust (Solana)", "IPFS", "Pinata",

    // Data Science / ML / AI
    "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Keras", "PyTorch",
    "OpenCV", "Matplotlib", "Seaborn", "NLTK", "Hugging Face", "LangChain",

    // UI/UX / Design
    "Figma", "Adobe XD", "Sketch", "Adobe Photoshop", "Adobe Illustrator",
    "Canva", "Framer", "InVision",

    // Tools & Misc
    "Git", "GitHub", "GitLab", "Bitbucket",
    "Jira", "Trello", "Slack", "Postman", "Insomnia",
    "Linux", "Bash", "PowerShell", "VS Code", "IntelliJ IDEA"
  ];

  const handleSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    const skillExist = skills.find(s => s.name.toLowerCase() === newSkill.toLowerCase());
    if (skillExist) {
      console.log("skill already exist");
      return;
    }

    setskills([
      ...skills,
      {
        name: newSkill,
        level: 60,
        projects: 0,
        category: "General",
        color: "from-emerald-500 to-teal-600"
      }
    ]);
    setNewSkill("");
    setShowAddSkills(false);
  }

  const deleteSkill = (index) => {
    setskills(skills.filter((_, i) => i !== index));
  };

  const [isApplyModelOpen, setIsApplyModelOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [editIndex, setEditIndex] = useState(null);

  const editSkill = (index) => {
    setEditIndex(index);
    setNewSkill(skills[index].name);
    setShowAddSkills(true);
  };

  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      title: "E-commerce Dashboard",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1657697071046-1eef624e96e9?w=400&h=300&fit=crop",
      description: "Modern admin dashboard for e-commerce management",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "https://example.com"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1753162657289-6569cd1da479?w=400&h=300&fit=crop",
      description: "Clean and intuitive mobile banking interface",
      technologies: ["Figma", "Principle", "After Effects"],
      link: "https://example.com"
    },
    {
      id: 3,
      title: "SaaS Landing Page",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1590650467980-8eadfa86ff48?w=400&h=300&fit=crop",
      description: "High-converting landing page for SaaS product",
      technologies: ["React", "Tailwind", "Framer Motion"],
      link: "https://example.com"
    }
  ]);

  // 🔔 Notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      client: "TechCorp Inc.",
      description: "Need a landing page redesign with payment integration",
      amount: 1200,
      time: "2h ago",
    },
    {
      id: 2,
      client: "StartupXYZ",
      description: "Mobile app design system required",
      amount: 800,
      time: "1d ago",
    },
    {
      id: 3,
      client: "Creative Co.",
      description: "Brand identity and logo package",
      amount: 500,
      time: "3d ago",
    },
  ]);

  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: "",
    category: "",
    description: "",
    technologies: "",
    link: ""
  });

  const handleAddPortfolio = (e) => {
    e.preventDefault();
    const newItem = {
      id: portfolio.length + 1,
      ...newPortfolioItem,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      technologies: newPortfolioItem.technologies.split(',').map(t => t.trim())
    };
    setPortfolio([...portfolio, newItem]);
    setNewPortfolioItem({ title: "", category: "", description: "", technologies: "", link: "" });
    setShowAddPortfolio(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100/80 text-green-800';
      case 'In Progress': return 'bg-blue-100/80 text-blue-800';
      case 'In Review': return 'bg-yellow-100/80 text-yellow-800';
      default: return 'bg-gray-100/80 text-gray-800';
    }
  };
  const DemoGigs = [
    {
      id: 1,
      title: "Build a responsive e-commerce website",
      category: "Web Development",
      budget: 3000,
      timeline: "4 weeks",
      client: "Tech Corp",
      postedAgo: "2 days ago",
      skills: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "Design logo and branding materials",
      category: "Graphic Design",
      budget: 500,
      timeline: "1 week",
      client: "Startup Inc",
      postedAgo: "5 days ago",
      skills: ["Figma", "Adobe Illustrator"]
    },
    {
      id: 3,
      title: "Create marketing campaign for product launch",
      category: "Digital Marketing",
      budget: 1200,
      timeline: "3 weeks",
      client: "Brand Agency",
      postedAgo: "1 day ago",
      skills: ["SEO", "Google Ads", "Content Writing"]
    }
  ];
  const localJobs = JobStorage.getAllJobs();
  const allGigs = [...DemoGigs, ...localJobs];

  const getRelevantProjects = (job) => {
    return portfolio.filter((project) =>
      project.technologies.some((tech) => (job.skills || []).includes(tech))
    );
  };

  const handleApplyJobs = (job) => {
    const relevant = getRelevantProjects(job);

    if (relevant.length === 0) {
      alert("No matching projects found in your portfolio for this job.");
      return;
    }

    setIsApplyModelOpen(true);
  }

  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/50 to-green-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(209, 250, 229, 0.4) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Enhanced Navigation */}
      <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Safelance</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Zap className="h-4 w-4 text-emerald-600" />
                <span className="text-slate-700 font-medium">{user?.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="cursor-pointer relative bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20"
              >
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {notifications.length}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { }} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20">
                <Settings className="h-4 w-4" />
              </Button>
              {/* 🔔 Notifications Dropdown */}
              {showNotifications && (
                createPortal(
                  <div className="fixed right-6 top-20 w-80 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 z-[99999] pointer-events-auto">
                    <div className="p-4 border-b border-gray-200 font-semibold text-slate-900">
                      Notifications
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-4 border-b border-gray-100 hover:bg-gray-50 transition"
                        >
                          <p className="text-sm font-medium text-slate-800">
                            {n.client}
                          </p>
                          <p className="text-xs text-slate-600">{n.description}</p>
                          <div className="flex justify-between mt-1">
                            <span className="text-emerald-600 text-sm font-semibold">
                              ${n.amount}
                            </span>
                            <span className="text-gray-400 text-xs">{n.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>,
                  document.body
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-emerald-500/20 border border-white/30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Welcome back, {user?.name}! 🚀
                </h1>
                <p className="text-slate-600 text-lg">Grow your freelance business and showcase your talent</p>
              </div>
              <div className="hidden md:flex space-x-4">
                <Button variant="outline" className="bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
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
                { id: 'portfolio', label: 'Portfolio', icon: Folder },
                { id: 'skills', label: 'Skills', icon: Target },
                { id: 'earnings', label: 'Earnings', icon: DollarSign },
                { id: 'find_gigs', label: 'Find Gigs', icon: Zap }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${activeView === tab.id
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
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
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-emerald-500/10 border border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Grid3X3 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Active Gigs</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">3</p>
                  <p className="text-sm text-slate-500 mt-1">1 new this week</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-green-500/10 border border-white/30 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Monthly Revenue</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$5.2K</p>
                  <p className="text-sm text-slate-500 mt-1">+38% from last month</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-yellow-500/10 border border-white/30 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Projects Completed</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">47</p>
                  <p className="text-sm text-slate-500 mt-1">100% on-time delivery</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-orange-500/10 border border-white/30 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-700 mb-2">Client Rating</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">4.9</p>
                  <p className="text-sm text-slate-500 mt-1">Top 5% performer</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Gig
                  </Button>
                  <Button
                    onClick={() => setActiveView('portfolio')}
                    className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload to Portfolio
                  </Button>
                  <Button className="w-full justify-start bg-white/30 backdrop-blur-sm hover:bg-white/40 text-slate-700 border border-white/30">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: "New order received", client: "TechCorp Inc.", time: "2 hours ago" },
                    { action: "Project delivered", client: "StartupXYZ", time: "1 day ago" },
                    { action: "5-star review received", client: "Creative Co.", time: "3 days ago" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white/30 backdrop-blur-sm rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                        <p className="text-xs text-slate-600">{activity.client} • {activity.time}</p>
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
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-500/10 border border-white/30 overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">My Projects</h2>
                <Badge className="bg-emerald-100/80 text-emerald-800 backdrop-blur-sm">3 Active</Badge>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/40 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={order.clientAvatar} />
                          <AvatarFallback>{order.client.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 mb-1">{order.title}</h4>
                          <p className="text-sm text-slate-600 mb-2">{order.description}</p>
                          <p className="text-sm text-slate-600">for {order.client}</p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end space-y-2">
                        <Badge className={`${getStatusColor(order.status)} backdrop-blur-sm`}>
                          {order.status}
                        </Badge>
                        <div className="text-lg font-bold text-emerald-600">${order.earnings}</div>
                        <div className="text-sm text-slate-500">Due: {order.deadline}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      {order.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{order.rating}</span>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="bg-white/40 backdrop-blur-sm border-white/30">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" className="bg-white/40 backdrop-blur-sm border-white/30">
                          <Upload className="h-3 w-3 mr-1" />
                          Deliver
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeView === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">My Portfolio</h2>
              <Button
                onClick={() => setShowAddPortfolio(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>

            {/* Add Portfolio Modal */}
            {showAddPortfolio && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-6 max-w-md w-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Add Portfolio Item</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddPortfolio(false)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <form onSubmit={handleAddPortfolio} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Project Title</label>
                      <Input
                        placeholder="My awesome project"
                        value={newPortfolioItem.title}
                        onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })}
                        className="bg-white/50 backdrop-blur-sm border-white/30"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                      <select
                        value={newPortfolioItem.category}
                        onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, category: e.target.value })}
                        className="w-full h-10 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md px-3"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Content Writing">Content Writing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                      <textarea
                        placeholder="Describe your project..."
                        value={newPortfolioItem.description}
                        onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, description: e.target.value })}
                        className="w-full h-20 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Technologies (comma-separated)</label>
                      <Input
                        placeholder="React, Node.js, MongoDB"
                        value={newPortfolioItem.technologies}
                        onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, technologies: e.target.value })}
                        className="bg-white/50 backdrop-blur-sm border-white/30"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Project Link (Optional)</label>
                      <Input
                        type="url"
                        placeholder="https://example.com"
                        value={newPortfolioItem.link}
                        onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, link: e.target.value })}
                        className="bg-white/50 backdrop-blur-sm border-white/30"
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button
                        type="button"
                        onClick={() => setShowAddPortfolio(false)}
                        variant="outline"
                        className="flex-1 bg-white/50 backdrop-blur-sm border-white/30"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600"
                      >
                        Add Project
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Portfolio Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <div key={item.id} className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group">
                  <div className="aspect-video bg-slate-200 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-emerald-100/80 text-emerald-800 text-xs">
                        {item.category}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/30">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/30 text-red-500">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-white/40 backdrop-blur-sm">
                          {tech}
                        </Badge>
                      ))}
                      {item.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-white/40 backdrop-blur-sm">
                          +{item.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    {item.link && (
                      <Button size="sm" variant="outline" className="w-full bg-white/30 backdrop-blur-sm border-white/30">
                        <Globe className="h-3 w-3 mr-2" />
                        View Project
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {/* Skills Tab */}
        {activeView === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">My Skills</h2>
              <Button
                onClick={() => setShowAddSkills(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>

            {/* Skills grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">{skill.name}</h3>
                      <p className="text-sm text-slate-600">{skill.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">{skill.projects} projects</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 bg-gradient-to-r ${skill.color}`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-white/30" onClick={() => editSkill(index)} >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:bg-white/30 text-red-500"
                      onClick={() => deleteSkill(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Modal goes here */}
            {showAddSkills && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-6 max-w-md w-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Add Skill</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddSkills(false)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <form onSubmit={handleSkill} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Search or Add Skill
                      </label>
                      <input
                        type="text"
                        list="skills-list"
                        placeholder="e.g. React, Node.js..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="w-full h-10 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md px-3"
                        required
                      />
                      <datalist id="skills-list">
                        {availableSkills.map((s, i) => (
                          <option key={i} value={s} />
                        ))}
                      </datalist>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button
                        type="button"
                        onClick={() => setShowAddSkills(false)}
                        variant="outline"
                        className="flex-1 bg-white/50 backdrop-blur-sm border-white/30"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600"
                      >
                        Add
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}


        {/* Earnings Tab */}
        {activeView === 'earnings' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">This Month</h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  $5,200
                </div>
                <p className="text-sm text-green-600">+38% from last month</p>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">All Time</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">$47,350</div>
                <p className="text-sm text-slate-600">Total earnings</p>
              </div>

              <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Available</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">$2,800</div>
                <p className="text-sm text-slate-600">Ready to withdraw</p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30">
              <div className="p-6 border-b border-white/20">
                <h3 className="text-lg font-semibold text-slate-900">Recent Earnings</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { project: "E-commerce Platform Development", client: "TechCorp Inc.", amount: 2800, date: "Jan 25", status: "Completed" },
                    { project: "Mobile App UI Design", client: "StartupXYZ", amount: 1500, date: "Jan 20", status: "In Progress" },
                    { project: "Brand Identity Package", client: "Creative Co.", amount: 900, date: "Jan 15", status: "Completed" }
                  ].map((earning, index) => (
                    <div key={index} className="flex justify-between items-start p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">{earning.project}</h4>
                        <p className="text-sm text-slate-600">{earning.client}</p>
                        <p className="text-xs text-slate-500 mt-1">{earning.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">${earning.amount}</div>
                        <Badge className={`text-xs ${getStatusColor(earning.status)}`}>
                          {earning.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {activeView === 'find_gigs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Find Gigs</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGigs.map((gig) => (
              <div
                key={gig.id}
                className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-slate-900">{gig.title}</h3>
                <p className="text-sm text-slate-600">{gig.category}</p>
                <p className="mt-2 text-slate-700">
                  Budget: <span className="font-semibold">${gig.budget}</span>
                </p>
                <p className="text-slate-600">Timeline: {gig.timeline}</p>
                <p className="text-slate-500 text-xs">Posted {gig.postedAgo}</p>

                {/* Apply Button */}
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => {
                      setSelectedJob(gig);
                      setIsApplyModelOpen(true);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {isApplyModelOpen && (
  <ApplyJobModal
    isOpen={isApplyModelOpen}
    onClose={() => setIsApplyModelOpen(false)}
    portfolio={portfolio}     
    job={selectedJob}         
  />
)}


        </div>
      )}


    </div>
  );
};

export default FreelancerDashboard;
