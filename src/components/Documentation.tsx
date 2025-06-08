
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Search, ExternalLink, Download, Code, Zap, Settings, BarChart3, Workflow, PlayCircle, FileText, Video, HelpCircle } from "lucide-react";

const Documentation = () => {
  const quickStartGuides = [
    {
      title: "Getting Started with FlowState",
      description: "Learn the basics of creating your first automation flow",
      duration: "5 min read",
      difficulty: "Beginner",
      icon: Zap
    },
    {
      title: "Building Your First Flow",
      description: "Step-by-step guide to creating effective automation workflows",
      duration: "10 min read",
      difficulty: "Beginner",
      icon: Workflow
    },
    {
      title: "Understanding Analytics",
      description: "How to track and analyze your automation performance",
      duration: "8 min read",
      difficulty: "Intermediate",
      icon: BarChart3
    },
    {
      title: "Advanced Configuration",
      description: "Deep dive into advanced settings and customization options",
      duration: "15 min read",
      difficulty: "Advanced",
      icon: Settings
    }
  ];

  const apiDocuments = [
    {
      title: "REST API Reference",
      description: "Complete API documentation with examples",
      type: "API",
      icon: Code
    },
    {
      title: "Webhook Integration",
      description: "How to set up and use webhooks in your flows",
      type: "Integration",
      icon: ExternalLink
    },
    {
      title: "SDK Documentation",
      description: "JavaScript SDK for FlowState integration",
      type: "SDK",
      icon: FileText
    }
  ];

  const videoTutorials = [
    {
      title: "FlowState Overview",
      description: "Complete overview of FlowState features and capabilities",
      duration: "12:30",
      views: "15.2K"
    },
    {
      title: "Creating Complex Workflows",
      description: "Advanced techniques for building sophisticated automation flows",
      duration: "18:45",
      views: "8.7K"
    },
    {
      title: "Troubleshooting Common Issues",
      description: "Solutions to frequently encountered problems",
      duration: "9:15",
      views: "12.1K"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            Documentation
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive guides, API references, and tutorials to help you get the most out of FlowState
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Download PDF Guide
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Start Guides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-primary" />
            Quick Start Guides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickStartGuides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{guide.duration}</span>
                        <Badge className={getDifficultyColor(guide.difficulty)}>
                          {guide.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            API Documentation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {apiDocuments.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <Badge variant="outline">{doc.type}</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Video Tutorials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Video Tutorials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {videoTutorials.map((video, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-24 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{video.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{video.duration}</span>
                    <span>{video.views} views</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Watch
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Need More Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <HelpCircle className="w-6 h-6" />
              <span>Contact Support</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <ExternalLink className="w-6 h-6" />
              <span>Community Forum</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="w-6 h-6" />
              <span>FAQ</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documentation;
