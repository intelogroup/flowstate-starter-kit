
import { ArrowLeft, Play, Eye, Mail, FileSpreadsheet, Star, Users, Clock, CheckCircle, AlertTriangle, Zap, Download, Share, Heart, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const TemplatePreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Enhanced template data with more comprehensive information
  const templates = {
    1: {
      id: 1,
      title: "Email to Drive",
      description: "Save email attachments to Google Drive folders automatically",
      longDescription: "This automation monitors your Gmail inbox for new emails with attachments and automatically saves them to specified folders in Google Drive. Perfect for invoice processing, document management, and file organization.",
      category: "Productivity",
      icon: Mail,
      targetIcon: FileSpreadsheet,
      rating: 4.8,
      totalRatings: 347,
      users: 1247,
      likes: 89,
      bookmarks: 156,
      complexity: "Beginner",
      estimatedTime: "5 min setup",
      lastUpdated: "2 days ago",
      author: "FlowState Team",
      version: "2.1",
      tags: ["email", "drive", "attachments", "automation", "productivity"],
      steps: [
        { 
          step: 1, 
          title: "Email Monitoring", 
          description: "Continuously monitors your Gmail inbox for new emails with attachments",
          icon: Mail,
          estimatedTime: "Real-time",
          complexity: "Simple"
        },
        { 
          step: 2, 
          title: "Attachment Detection", 
          description: "Identifies and validates email attachments based on your filter criteria",
          icon: FileSpreadsheet,
          estimatedTime: "1-2s",
          complexity: "Simple"
        },
        { 
          step: 3, 
          title: "Smart Categorization", 
          description: "Automatically categorizes files by type and creates appropriate folder structure",
          icon: Zap,
          estimatedTime: "2-3s",
          complexity: "Medium"
        },
        { 
          step: 4, 
          title: "Drive Upload", 
          description: "Securely uploads files to your Google Drive with proper naming conventions",
          icon: CheckCircle,
          estimatedTime: "3-5s",
          complexity: "Simple"
        }
      ],
      requirements: [
        { item: "Gmail account with API access", status: "required", description: "Need read access to your emails" },
        { item: "Google Drive storage space", status: "required", description: "At least 1GB available space recommended" },
        { item: "Google Workspace permissions", status: "required", description: "Basic file upload permissions" },
        { item: "Email forwarding rules", status: "optional", description: "For advanced filtering options" }
      ],
      useCases: [
        "Invoice and receipt management",
        "Document backup automation",
        "Client file organization",
        "Legal document processing",
        "Academic paper collection"
      ],
      integrations: ["Gmail", "Google Drive", "Google Sheets", "Slack", "Microsoft Outlook"],
      pricing: "Free for up to 100 files/month",
      supportLevel: "Community + Priority"
    }
  };

  const template = templates[parseInt(id || "1")] || templates[1];
  const SourceIcon = template.icon;
  const TargetIcon = template.targetIcon;

  const reviews = [
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "SC",
      rating: 5,
      date: "3 days ago",
      comment: "This template saved me hours of manual work! The invoice processing is spot-on and the setup was incredibly easy.",
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      avatar: "MR",
      rating: 4,
      date: "1 week ago",
      comment: "Great automation. Had a small issue with large files but support helped resolve it quickly. Highly recommend!",
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      user: "Jennifer Liu",
      avatar: "JL",
      rating: 5,
      date: "2 weeks ago",
      comment: "Perfect for my consulting business. Automatically organizes client documents without any manual intervention.",
      helpful: 15,
      verified: false
    }
  ];

  const relatedTemplates = [
    { id: 2, title: "Email to Sheets", category: "Data Management", users: 892 },
    { id: 3, title: "Invoice Parser", category: "Finance", users: 634 },
    { id: 4, title: "Document OCR", category: "Productivity", users: 423 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Detailed Description */}
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>Detailed breakdown of the automation process</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{template.longDescription}</p>
                
                <div className="space-y-4">
                  {template.steps.map((step, index) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={index} className="flex gap-4 p-4 border border-border rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-foreground">{step.title}</h4>
                            <Badge variant="outline" className="text-xs">{step.complexity}</Badge>
                            <span className="text-xs text-muted-foreground">~{step.estimatedTime}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        <StepIcon className="w-5 h-5 text-muted-foreground" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Common Use Cases</CardTitle>
                <CardDescription>Popular ways people use this template</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {template.useCases.map((useCase, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{useCase}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case "requirements":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Setup Requirements</CardTitle>
              <CardDescription>What you'll need to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {template.requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      req.status === 'required' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{req.item}</span>
                        <Badge variant={req.status === 'required' ? 'destructive' : 'secondary'} className="text-xs">
                          {req.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{req.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Supported Integrations</h4>
                <div className="flex flex-wrap gap-2">
                  {template.integrations.map(integration => (
                    <Badge key={integration} variant="outline">{integration}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      case "reviews":
        return (
          <div className="space-y-6">
            {/* Rating Summary */}
            <Card>
              <CardHeader>
                <CardTitle>User Reviews</CardTitle>
                <CardDescription>What users are saying about this template</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">{template.rating}</div>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(template.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">{template.totalRatings} reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-4">{rating}</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-8">{rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-foreground">{review.user}</span>
                            {review.verified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-xs">
                              Helpful ({review.helpful})
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{template.title}</h1>
              <Badge variant="secondary">{template.category}</Badge>
              <Badge variant="outline">v{template.version}</Badge>
            </div>
            <p className="text-muted-foreground">{template.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {template.rating} ({template.totalRatings})
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {template.users} users
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {template.estimatedTime}
              </div>
              <span>Updated {template.lastUpdated}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
            {template.likes + (isLiked ? 1 : 0)}
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button onClick={() => navigate(`/create-flow/${template.id}`)}>
            <Play className="w-4 h-4 mr-2" />
            Use This Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Visual Flow */}
          <Card>
            <CardHeader>
              <CardTitle>Template Overview</CardTitle>
              <CardDescription>Visual representation of the automation flow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 p-6 border border-border rounded-lg mb-6">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <SourceIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl text-muted-foreground">→</div>
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <TargetIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{template.complexity}</Badge>
                    <span className="text-sm text-muted-foreground">{template.estimatedTime} setup</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pricing: {template.pricing}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Support: {template.supportLevel}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "requirements", label: "Requirements" },
                { id: "reviews", label: "Reviews" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => navigate(`/create-flow/${template.id}`)}>
                <Play className="w-4 h-4 mr-2" />
                Use Template
              </Button>
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export Config
              </Button>
            </CardContent>
          </Card>

          {/* Template Info */}
          <Card>
            <CardHeader>
              <CardTitle>Template Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Author</span>
                <span className="font-medium">{template.author}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium">{template.version}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Updated</span>
                <span className="font-medium">{template.lastUpdated}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Complexity</span>
                <Badge variant="outline" className="text-xs">{template.complexity}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Related Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {relatedTemplates.map(related => (
                  <div key={related.id} className="p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary">
                    <h4 className="font-medium text-foreground text-sm">{related.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs">{related.category}</Badge>
                      <span className="text-xs text-muted-foreground">{related.users} users</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
