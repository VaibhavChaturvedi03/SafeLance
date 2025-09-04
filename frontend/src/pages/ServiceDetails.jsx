import { Link, useParams } from "react-router-dom";
import { mockServices } from "../data/mockservices";
import { mockFreelancers } from "../data/mockFreelancers";
import Navigation from "./Navigation";
import { Button } from "../components/Button";
import { MessageCircle, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";

const ServiceDetailPage = () => {
  const { id } = useParams();
  const service = mockServices.find(s => s.id === parseInt(id));
  const freelancer = mockFreelancers.find(f => f.name === service?.freelancer);
  
  if (!service) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
      <div className="text-center bg-white/40 backdrop-blur-xl p-12 rounded-3xl border border-white/50">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Service Not Found</h1>
        <Link to="/services">
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
            Back to Services
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-emerald-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Service Image */}
            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl shadow-emerald-500/20">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Service Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {service.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/30 backdrop-blur-xl border border-white/40 rounded-full text-sm font-medium text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Service Info */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-emerald-100/80 backdrop-blur-xl text-emerald-700 text-sm font-medium rounded-full">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-slate-700">{service.rating}</span>
                    <span className="text-slate-500">({service.reviews} reviews)</span>
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
                  {service.title}
                </h1>
                
                <p className="text-lg text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Pricing & Delivery */}
              <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-white/50">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-slate-500 uppercase tracking-wide mb-1">Starting Price</div>
                    <div className="text-3xl font-bold text-slate-900">${service.price}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 uppercase tracking-wide mb-1">Delivery Time</div>
                    <div className="text-3xl font-bold text-emerald-600">{service.deliveryTime}</div>
                  </div>
                </div>
                
                <Button className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-lg py-3 h-auto">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Freelancer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Freelancer Profile Section */}
      {freelancer && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-slate-500/10">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">About the Freelancer</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Freelancer Profile */}
              <div className="md:col-span-1">
                <Link to={`/freelancer/${freelancer.id}`} className="block group">
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <Avatar className="w-24 h-24 ring-4 ring-white/50 shadow-xl">
                        <AvatarImage src={freelancer.profileImage} />
                        <AvatarFallback className="text-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                          {freelancer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {freelancer.name}
                    </h3>
                    <p className="text-slate-600 mb-4">{freelancer.title}</p>
                    
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{freelancer.rating}</span>
                      <span className="text-slate-500">({freelancer.reviews})</span>
                    </div>
                    
                    <div className="text-2xl font-bold text-emerald-600">
                      ${freelancer.hourlyRate}/hr
                    </div>
                  </div>
                </Link>
              </div>

              {/* Freelancer Details */}
              <div className="md:col-span-2 space-y-6">
                <p className="text-slate-600 leading-relaxed">
                  {freelancer.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Key Stats</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-slate-600">Projects Completed</dt>
                        <dd className="font-semibold">{freelancer.completedProjects}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-600">Response Time</dt>
                        <dd className="font-semibold text-emerald-600">{freelancer.responseTime}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-600">Location</dt>
                        <dd className="font-semibold">{freelancer.location}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Top Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {freelancer.skills.slice(0, 5).map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-emerald-100/80 backdrop-blur-xl text-emerald-700 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-slate-500/10">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Customer Reviews</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((review) => (
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
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {review === 1 
                    ? "Exceptional work! The freelancer delivered exactly what was promised and even exceeded expectations. Communication was excellent throughout the project."
                    : "Outstanding quality and attention to detail. The project was completed on time and the results were beyond what I hoped for. Highly recommended!"
                  }
                </p>
                <div className="text-sm text-slate-500 mt-3">
                  {review === 1 ? '2 weeks ago' : '1 month ago'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;