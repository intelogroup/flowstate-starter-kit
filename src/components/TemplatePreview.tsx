
import { ArrowLeft, Play, Eye, Mail, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";

const TemplatePreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock template data
  const template = {
    id: parseInt(id || "1"),
    title: "Email to Drive",
    description: "Save email attachments to Google Drive folders automatically",
    category: "Productivity",
    icon: Mail,
    targetIcon: FileSpreadsheet,
    stats: "924 requests • 1.2K users",
    tags: ["email", "drive", "attachments"],
    steps: [
      { step: 1, title: "Email Received", description: "Monitors your Gmail inbox for new emails with attachments" },
      { step: 2, title: "Filter Attachments", description: "Identifies emails with PDF, DOC, or image attachments" },
      { step: 3, title: "Save to Drive", description: "Automatically saves attachments to your specified Google Drive folder" },
      { step: 4, title: "Send Notification", description: "Optional: Sends you a notification when files are saved" }
    ],
    requirements: [
      "Gmail account access",
      "Google Drive storage space", 
      "Basic Google Workspace permissions"
    ]
  };

  const SourceIcon = template.icon;
  const TargetIcon = template.targetIcon;

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{template.title}</h1>
            <p className="text-muted-foreground">{template.description}</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/create-flow/${template.id}`)}>
          <Play className="w-4 h-4 mr-2" />
          Use This Template
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Visual Flow */}
          <Card>
            <CardHeader>
              <CardTitle>Flow Overview</CardTitle>
              <CardDescription>How this automation works</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 border border-border rounded-lg mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <SourceIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl text-muted-foreground">→</div>
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <TargetIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2">{template.category}</Badge>
                  <div className="text-sm text-muted-foreground">{template.stats}</div>
                </div>
              </div>

              <div className="space-y-4">
                {template.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
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
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
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
                View Demo
              </Button>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
              <CardDescription>What you'll need to set this up</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {template.requirements.map((req, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {req}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
