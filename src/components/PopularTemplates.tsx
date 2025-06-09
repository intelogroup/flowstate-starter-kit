
import { useState, useEffect } from "react";
import { Mail, MessageSquare, FileSpreadsheet, ArrowRight, Star, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingSkeleton from "./LoadingSkeleton";

const PopularTemplates = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const featuredTemplates = [
    {
      id: 1,
      title: "Email to Drive",
      description: "Save email attachments automatically",
      category: "Productivity",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      users: "1.2K users",
      rating: 4.8,
      trending: true
    },
    {
      id: 2,
      title: "Email to WhatsApp",
      description: "Get WhatsApp notifications for emails",
      category: "Communication",
      icon: Mail,
      targetIcon: MessageSquare,
      users: "890 users",
      rating: 4.6,
      trending: false
    },
    {
      id: 3,
      title: "Email to Sheets",
      description: "Log email details to spreadsheets",
      category: "Data Management",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      users: "520 users",
      rating: 4.7,
      trending: true
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Simple Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Popular Templates</h2>
        <p className="text-muted-foreground">Get started quickly with these proven automations</p>
      </div>
      
      {isLoading ? (
        <LoadingSkeleton type="templates" count={3} />
      ) : (
        <div className="space-y-4">
          {/* Featured Template Cards */}
          {featuredTemplates.map((template, index) => {
            const SourceIcon = template.icon;
            const TargetIcon = template.targetIcon;
            
            return (
              <Card 
                key={template.id} 
                className={`group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
                  index === 0 
                    ? 'border-primary/20 bg-gradient-to-r from-primary/5 to-transparent' 
                    : 'border-border hover:border-primary/20'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    {/* Icon Flow */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <SourceIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex flex-col items-center">
                          <ArrowRight className="w-4 h-4 text-muted-foreground mb-1" />
                          <div className="text-xs text-muted-foreground">automates</div>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <TargetIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <Badge variant="outline" className="border-primary/20">
                      {template.category}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-muted-foreground mt-1">{template.description}</p>
                    </div>
                    
                    {/* Stats Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{template.users}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{template.rating}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        size="sm"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Use Template
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* View All Button */}
          <Card className="border-dashed border-2 border-muted-foreground/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-6 text-center">
              <Button variant="outline" size="lg" className="w-full">
                <ArrowRight className="w-4 h-4 mr-2" />
                View All Templates
                <Badge variant="secondary" className="ml-2">50+ available</Badge>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PopularTemplates;
