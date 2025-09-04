import { Link, useParams } from "react-router-dom";
import { mockFreelancers } from "../data/mockFreelancers";
import { Button } from "../components/Button";
import Navigation from "./Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { CheckCircle, MessageCircle, Star } from "lucide-react";

const FreelancerProfilePage = () => {
  const { id } = useParams();
  const freelancer = mockFreelancers.find(f => f.id === parseInt(id));
  
  if (!freelancer) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
      <div className="text-center bg-white/40 backdrop-blur-xl p-12 rounded-3xl border border-white/50">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Freelancer Not Found</h1>
        <Link to="/browse">
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
            Back to Browse
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <Navigation />
      
      {/* Hero Profile Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-slate-500/10">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Profile Image & Basic Info */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <Avatar className="w-32 h-32 ring-4 ring-white/50 shadow-xl">
                      <AvatarImage src={freelancer.profileImage} />
                      <AvatarFallback className="text-3xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                        {freelancer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{freelancer.name}</h1>
                  <p className="text-xl text-slate-600 mb-4">{freelancer.title}</p>
                  
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold text-slate-900">{freelancer.rating}</span>
                    <span className="text-slate-500">({freelancer.reviews} reviews)</span>
                  </div>
                  
                  <div className="text-3xl font-bold text-emerald-600 mb-6">
                    ${freelancer.hourlyRate}/hour
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-lg py-3 h-auto">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>

              {/* Stats & Quick Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">About</h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    {freelancer.description}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-4 border border-white/50 text-center">
                    <div className="text-2xl font-bold text-emerald-600">{freelancer.completedProjects}</div>
                    <div className="text-sm text-slate-600">Projects Completed</div>
                  </div>
                  <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-4 border border-white/50 text-center">
                    <div className="text-2xl font-bold text-blue-600">{freelancer.responseTime}</div>
                    <div className="text-sm text-slate-600">Response Time</div>
                  </div>
                  <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-4 border border-white/50 text-center">
                    <div className="text-2xl font-bold text-purple-600">{freelancer.availability}</div>
                    <div className="text-sm text-slate-600">Availability</div>
                  </div>
                  <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-4 border border-white/50 text-center">
                    <div className="text-2xl font-bold text-orange-600">{freelancer.location.split(',')[0]}</div>
                    <div className="text-sm text-slate-600">Based In</div>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {freelancer.languages.map((language) => (
                      <span key={language} className="px-4 py-2 bg-blue-100/80 backdrop-blur-xl text-blue-700 font-medium rounded-full">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-slate-500/10">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Skills & Expertise</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Technical Skills</h3>
              <div className="space-y-3">
                {freelancer.skills.map((skill, index) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">{skill}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                          style={{ width: `${85 + (index * 3)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600 font-semibold">{85 + (index * 3)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Specializations</h3>
              <div className="flex flex-wrap gap-3">
                {freelancer.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-emerald-100/80 backdrop-blur-xl text-emerald-700 font-medium rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Work Style</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    Agile development methodology
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    Regular progress updates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    Quality-focused delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    Post-project support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-slate-500/10">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Portfolio</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {freelancer.portfolio.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-video bg-white/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/50 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mt-4 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 mt-2">
                  {index === 0 
                    ? "A comprehensive web application showcasing modern development practices and user experience design."
                    : "Advanced analytics dashboard with real-time data visualization and interactive components."
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-slate-500/10">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Client Reviews</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].slice(0, 2).map((review) => (
              <div key={review} className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-white/50">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={`https://images.unsplash.com/photo-${review === 1 ? '1670851810697-68ddb4ecae1c' : '1568992687947-868a62a9f521'}?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8fDE3NTY3NDI3OTF8MA&ixlib=rb-4.1.0&q=85`} />
                    <AvatarFallback>{review === 1 ? 'JW' : 'MJ'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {review === 1 ? 'Jennifer Walsh' : 'Marcus Johnson'}
                    </div>
                    <div className="text-sm text-slate-500">
                      {review === 1 ? 'TechStart Inc.' : 'Digital Solutions LLC'}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {review === 1 
                    ? "Working with this freelancer was an absolute pleasure. They delivered high-quality work on time and maintained excellent communication throughout the project. I would definitely hire them again."
                    : "Exceptional technical skills and professionalism. The project exceeded our expectations and was delivered ahead of schedule. Highly recommended for any development needs."
                  }
                </p>
                <div className="text-sm text-slate-500 mt-3">
                  {review === 1 ? '3 weeks ago' : '1 month ago'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfilePage;