import { useState } from "react";
import { mockFreelancers } from "../data/mockFreelancers";
import Navigation from "./Navigation";
import { ArrowRight, Award, CheckCircle, Clock, DollarSign, Filter, MapPin, Search, Star, User } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { Badge } from "../components/Badge";

const BrowseFreelancersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("rating");

  const categories = ["all", "development", "design", "writing", "marketing", "video", "music", "business"];

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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">Find Talented Freelancers</h1>
          <p className="text-xl text-slate-600">Browse thousands of skilled professionals ready to work on your project</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-8 border border-white/30">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search freelancers..."
                className="pl-10 bg-white/30 backdrop-blur-sm border-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 focus:border-emerald-500 focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
            <select 
              className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 focus:border-emerald-500 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Highest Rated</option>
              <option value="price">Lowest Price</option>
              <option value="recent">Most Recent</option>
            </select>
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Freelancers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockFreelancers.map((freelancer) => (
            <Link key={freelancer.id} to={`/freelancer/${freelancer.id}`}>
              <Card className="group cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white/25 via-white/20 to-white/15 backdrop-blur-xl border border-white/40 rounded-2xl overflow-hidden relative">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-8 relative z-10">
                  {/* Profile Section */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block mb-4">
                      <div className="relative">
                        <Avatar className="w-24 h-24 mx-auto shadow-xl shadow-emerald-500/20 ring-4 ring-white/30">
                          <AvatarImage src={freelancer.profileImage} alt={freelancer.name} />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold text-lg">
                            {freelancer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {/* Online Status */}
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 border-3 border-white rounded-full flex items-center justify-center shadow-lg">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      {/* Verified Badge */}
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-1 rounded-full shadow-lg">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 text-xl mb-1 group-hover:text-emerald-700 transition-colors duration-300">
                      {freelancer.name}
                    </h3>
                    <p className="text-slate-600 text-sm font-medium mb-3 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text">
                      {freelancer.title}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-1 mb-3">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(freelancer.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-bold text-slate-900">{freelancer.rating}</span>
                      <span className="text-slate-500 text-sm">({freelancer.reviews})</span>
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-center justify-center text-sm text-slate-600 bg-white/30 backdrop-blur-sm rounded-full px-3 py-1">
                      <MapPin className="h-3 w-3 mr-1 text-emerald-500" />
                      {freelancer.location}
                    </div>
                  </div>
                  
                  {/* Skills Section */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {freelancer.skills.slice(0, 3).map((skill, index) => (
                        <Badge 
                          key={skill} 
                          className={`text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm border-0 transition-all duration-300 hover:scale-105 ${
                            index === 0 
                              ? 'bg-gradient-to-r from-emerald-400/20 to-teal-400/20 text-emerald-700 hover:from-emerald-400/30 hover:to-teal-400/30' 
                              : index === 1 
                              ? 'bg-gradient-to-r from-blue-400/20 to-indigo-400/20 text-blue-700 hover:from-blue-400/30 hover:to-indigo-400/30'
                              : 'bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-purple-700 hover:from-purple-400/30 hover:to-pink-400/30'
                          }`}
                        >
                          {skill}
                        </Badge>
                      ))}
                      {freelancer.skills.length > 3 && (
                        <Badge className="text-xs bg-gradient-to-r from-gray-400/20 to-slate-400/20 text-slate-600 backdrop-blur-sm rounded-full px-3 py-1">
                          +{freelancer.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    {/* Stats and Pricing */}
                    <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <DollarSign className="h-4 w-4 text-emerald-500 mr-1" />
                            <span className="text-sm text-slate-600">Starting at</span>
                          </div>
                          <div className="font-bold text-emerald-600 text-xl">
                            ${freelancer.hourlyRate}
                            <span className="text-sm text-slate-500 font-normal">/hr</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Award className="h-4 w-4 text-blue-500 mr-1" />
                            <span className="text-sm text-slate-600">Projects</span>
                          </div>
                          <div className="font-bold text-slate-900 text-xl">
                            {freelancer.completedProjects}
                            <span className="text-sm text-slate-500 font-normal"> done</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Availability Status */}
                      <div className="mt-4 pt-3 border-t border-white/20">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-emerald-600">
                            {freelancer.availability}
                          </span>
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">
                            Responds within {freelancer.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-emerald-500/30 group-hover:scale-[1.02]">
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
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

export default BrowseFreelancersPage;