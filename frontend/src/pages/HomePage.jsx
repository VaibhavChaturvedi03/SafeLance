import { ArrowRight, Award, Briefcase, Camera, CheckCircle, Code, Globe, Heart, Mail, Megaphone, Music, Palette, PenTool, Phone, Quote, Search, Shield, Star, TrendingUp, User, Users, Zap } from "lucide-react";
import { useState } from "react";
import { mockServices } from "../data/mockservices";
import { mockFreelancers } from "../data/mockFreelancers";
import { mockTestimonials } from "../data/mockTestimonials";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { Badge } from "../components/Badge";
import Navigation from "./Navigation";


const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "development", name: "Programming & Tech", icon: Code, color: "from-blue-500 to-blue-600", count: "2,543 services" },
    { id: "design", name: "Graphics & Design", icon: Palette, color: "from-purple-500 to-purple-600", count: "1,892 services" },
    { id: "writing", name: "Writing & Translation", icon: PenTool, color: "from-green-500 to-green-600", count: "1,456 services" },
    { id: "marketing", name: "Digital Marketing", icon: Megaphone, color: "from-orange-500 to-orange-600", count: "987 services" },
    { id: "video", name: "Video & Animation", icon: Camera, color: "from-red-500 to-red-600", count: "743 services" },
    { id: "music", name: "Music & Audio", icon: Music, color: "from-indigo-500 to-indigo-600", count: "521 services" },
    { id: "business", name: "Business", icon: Briefcase, color: "from-teal-500 to-teal-600", count: "834 services" },
    { id: "ai", name: "AI Services", icon: Zap, color: "from-yellow-500 to-yellow-600", count: "421 services" }
  ];

  const stats = [
    { label: "Talented Freelancers", value: "50,000+", icon: Users },
    { label: "Completed Projects", value: "200,000+", icon: CheckCircle },
    { label: "Client Satisfaction", value: "98%", icon: Award },
    { label: "Countries Served", value: "150+", icon: Globe }
  ];

//   const howItWorks = [
//     {
//       step: "1",
//       title: "Post Your Project",
//       description: "Tell us what you need done and we'll connect you with talented freelancers.",
//       icon: FileText
//     },
//     {
//       step: "2", 
//       title: "Choose Your Freelancer",
//       description: "Browse profiles, compare proposals, and select the perfect freelancer for your project.",
//       icon: Search
//     },
//     {
//       step: "3",
//       title: "Collaborate & Complete",
//       description: "Work together seamlessly with our built-in tools and get your project delivered on time.",
//       icon: Handshake
//     }
//   ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-blue-50/80 to-purple-50/80"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-white/30 backdrop-blur-xl text-emerald-800 rounded-full text-sm font-medium border border-white/20 shadow-lg">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  #1 Freelance Marketplace
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                  Find the best
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block">freelance services</span>
                  for your business
                </h1>
                
                <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                  Connect with world-class freelancers and agencies to bring your projects to life. 
                  From web development to digital marketing, find experts for every need.
                </p>
              </div>
              
              {/* Enhanced Search Bar with Glassmorphism */}
              <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/20 p-3 max-w-lg border border-white/30">
                <div className="flex">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      placeholder="What service are you looking for?"
                      className="pl-12 h-14 text-lg border-0 focus:ring-0 bg-transparent placeholder:text-slate-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="h-14 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-2xl shadow-lg">
                    Search
                  </Button>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  <span>Secure payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span>Quality guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Hero Image with Glassmorphism */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl shadow-2xl shadow-emerald-500/20 relative border border-white/30">
                <img 
                  src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjBwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzU2NzQ0Mzg2fDA&ixlib=rb-4.1.0&q=85"
                  alt="Professional workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
              </div>
              
              {/* Floating Glass Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white/20 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/30">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">2,847 projects completed today</span>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white/20 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/30">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-slate-700">4.9/5 average rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section with Glassmorphism */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl shadow-emerald-500/10 border border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Explore by Category</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover professional services across every industry and skill level
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.id} to={`/browse?category=${category.id}`}>
                  <div className="group cursor-pointer bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl shadow-slate-500/10 border border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">{category.name}</h3>
                      <p className="text-slate-500 text-sm">{category.count}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Services</h2>
              <p className="text-xl text-slate-600">Hand-picked services from our top-rated freelancers</p>
            </div>
            <Link to="/services">
              <Button className="hidden md:flex bg-white/20 backdrop-blur-xl hover:bg-white/30 border border-white/30 text-slate-700">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockServices.map((service) => (
              <Link key={service.id} to={`/service/${service.id}`}>
                <div className="group cursor-pointer bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-500/10 border border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="aspect-video bg-slate-200 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={mockFreelancers.find(f => f.name === service.freelancer)?.profileImage} />
                        <AvatarFallback>{service.freelancer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-slate-600">{service.freelancer}</span>
                    </div>
                    
                    <h3 className="font-semibold text-slate-900 line-clamp-2 mb-3 group-hover:text-emerald-600 transition-colors">
                      {service.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{service.rating}</span>
                        <span className="text-sm text-slate-500">({service.reviews})</span>
                      </div>
                      <Badge className="bg-white/50 backdrop-blur-sm text-slate-700 text-xs">
                        {service.category}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-right">
                        <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">From ${service.price}</div>
                        <div className="text-sm text-slate-500">{service.deliveryTime}</div>
                      </div>
                      <Heart className="h-5 w-5 text-slate-400 hover:text-red-500 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">What Our Clients Say</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join thousands of satisfied clients who have found success on Safelance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl shadow-slate-500/10 border border-white/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <Quote className="h-10 w-10 text-emerald-600 mb-4" />
                
                <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 to-teal-700/90"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 40px 40px, rgba(255, 255, 255, 0.1) 2px, transparent 0)`,
          backgroundSize: '80px 80px'
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-2xl text-emerald-100 mb-10 max-w-3xl mx-auto">
            Join the world's largest freelance marketplace and connect with talented professionals today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button size="lg" className="h-14 px-10 text-lg bg-white/20 backdrop-blur-xl hover:bg-white/30 border border-white/30">
                <Briefcase className="mr-2 h-6 w-6" />
                Hire Freelancers
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" className="h-14 px-10 text-lg bg-gradient-to-r from-white to-emerald-50 text-emerald-700 hover:from-emerald-50 hover:to-white shadow-xl">
                <User className="mr-2 h-6 w-6" />
                Start Freelancing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900/95 backdrop-blur-xl text-slate-300 py-16 relative">
        <div className="absolute inset-0 bg-slate-900/95"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">Safelance</h3>
              <p className="text-slate-400 text-lg mb-6 max-w-md">
                The world's largest freelance marketplace. Connect with skilled professionals and get work done efficiently.
              </p>
              <div className="flex space-x-6">
                <div className="w-10 h-10 bg-slate-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">For Clients</h4>
              <ul className="space-y-4">
                <li><Link to="/browse" className="hover:text-white transition-colors">Find Freelancers</Link></li>
                <li><Link to="/post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Success Stories</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">For Freelancers</h4>
              <ul className="space-y-4">
                <li><Link to="/services" className="hover:text-white transition-colors">Find Work</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Create Profile</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Success Tips</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Press</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400">&copy; 2025 Safelance. All rights reserved.</p>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <Link to="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
                <Link to="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;