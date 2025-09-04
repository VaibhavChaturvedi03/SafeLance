import { useState } from "react";
import { mockServices } from "../data/mockservices";
import { Heart, Search, Star } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { mockFreelancers } from "../data/mockFreelancers";
import { Badge } from "../components/Badge";
import Navigation from "./Navigation";

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-purple-50/50"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <Navigation />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">Browse Services</h1>
          <p className="text-xl text-slate-600">Discover services from talented freelancers worldwide</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-8 border border-white/30">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="What service are you looking for?"
                className="pl-10 h-12 bg-white/30 backdrop-blur-sm border-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="h-12 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
              Search
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockServices.map((service) => (
            <Link key={service.id} to={`/service/${service.id}`}>
              <Card className="cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 bg-white/20 backdrop-blur-xl border-white/30">
                <div className="aspect-video bg-slate-200 overflow-hidden rounded-t-lg">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={mockFreelancers.find(f => f.name === service.freelancer)?.profileImage} />
                      <AvatarFallback className="text-xs">{service.freelancer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-slate-600">{service.freelancer}</span>
                  </div>
                  
                  <h3 className="font-medium text-slate-900 line-clamp-2 mb-3 text-sm hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{service.rating}</span>
                      <span className="text-xs text-slate-500">({service.reviews})</span>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-white/40 backdrop-blur-sm">
                      {service.category}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-900">From ${service.price}</div>
                      <div className="text-xs text-slate-500">{service.deliveryTime}</div>
                    </div>
                    <Heart className="h-4 w-4 text-slate-400 hover:text-red-500 cursor-pointer transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;