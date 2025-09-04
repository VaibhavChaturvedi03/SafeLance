import { useState } from "react";
import Navigation from "./Navigation";
import { File, MessageSquare, Phone, Search, Video } from "lucide-react";
import { Input } from "../components/Input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import { Button } from "../components/Button";

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState("");
  
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1635768229592-8c2532d33cb7?w=100&h=100&fit=crop&crop=face",
      lastMessage: "I've completed the frontend setup. Ready for review!",
      time: "2h",
      unread: 2,
      online: true,
      project: "E-commerce Website Development"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1755352425808-b8223a330f15?w=100&h=100&fit=crop&crop=face",
      lastMessage: "Final designs are uploaded to the project folder.",
      time: "1d",
      unread: 0,
      online: false,
      project: "Mobile App UI/UX Design"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1739287088635-444554e7ac0e?w=100&h=100&fit=crop&crop=face",
      lastMessage: "Can we schedule a call to discuss the brand direction?",
      time: "2d",
      unread: 1,
      online: true,
      project: "Brand Identity Package"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      message: "Hi! I wanted to update you on the progress of your e-commerce project.",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      message: "Great! How are things going?",
      time: "10:35 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      message: "I've completed the frontend setup and integrated the payment gateway. The shopping cart functionality is working perfectly.",
      time: "10:40 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "Sarah Johnson",
      message: "I've also added the inventory management system. Would you like to review it?",
      time: "10:41 AM",
      isOwn: false
    },
    {
      id: 5,
      sender: "You",
      message: "That sounds excellent! Can you send me a link to review?",
      time: "11:15 AM",
      isOwn: true
    },
    {
      id: 6,
      sender: "Sarah Johnson",
      message: "Absolutely! Here's the staging link: https://staging.yourstore.com",
      time: "11:20 AM",
      isOwn: false
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      // Add message logic here
      setMessageText("");
    }
  };

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
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/20 border border-white/30 overflow-hidden h-[calc(100vh-12rem)]">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-white/20 flex flex-col">
              <div className="p-6 border-b border-white/20">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10 bg-white/30 backdrop-blur-sm border-white/30"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/30 ${
                      selectedConversation?.id === conversation.id ? 'bg-white/40 backdrop-blur-sm' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-slate-900 truncate">{conversation.name}</h4>
                          <span className="text-xs text-slate-500">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-1 truncate">{conversation.project}</p>
                        <p className="text-sm text-slate-500 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-6 border-b border-white/20 bg-white/10 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                            <AvatarFallback>{selectedConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {selectedConversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{selectedConversation.name}</h3>
                          <p className="text-sm text-slate-600">{selectedConversation.project}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          message.isOwn
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                            : 'bg-white/40 backdrop-blur-sm text-slate-900 border border-white/30'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-2 ${message.isOwn ? 'text-emerald-100' : 'text-slate-500'}`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-6 border-t border-white/20 bg-white/10 backdrop-blur-sm">
                    <form onSubmit={handleSendMessage} className="flex space-x-4">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type your message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="pr-12 bg-white/30 backdrop-blur-sm border-white/30"
                        />
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="sm" 
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-white/30"
                        >
                          <File className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Select a conversation</h3>
                    <p className="text-slate-600">Choose a conversation from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;