import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Lightbulb, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RequestFlowPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    useCase: "",
    services: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Request Submitted!",
      description: "We'll review your flow request and get back to you within 2-3 business days.",
    });

    setIsSubmitting(false);
    navigate('/');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const examples = [
    {
      title: "Social Media Scheduler",
      description: "Schedule posts across multiple platforms automatically"
    },
    {
      title: "Invoice Processing",
      description: "Extract data from invoices and add to accounting software"
    },
    {
      title: "Customer Support Routing",
      description: "Route support tickets based on priority and category"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Request a Custom Flow</h1>
            <p className="text-muted-foreground">Tell us about the automation you need and we'll build it for you</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Flow Request Details
                </CardTitle>
                <CardDescription>
                  Provide as much detail as possible to help us understand your automation needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Flow Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Email to Slack Notifications"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what you want this automation to do..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="productivity">Productivity</SelectItem>
                          <SelectItem value="communication">Communication</SelectItem>
                          <SelectItem value="data-management">Data Management</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Nice to have</SelectItem>
                          <SelectItem value="medium">Medium - Helpful for productivity</SelectItem>
                          <SelectItem value="high">High - Critical for my workflow</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="useCase">Use Case & Expected Outcome</Label>
                    <Textarea
                      id="useCase"
                      placeholder="Explain how you plan to use this automation and what you expect it to achieve..."
                      rows={3}
                      value={formData.useCase}
                      onChange={(e) => handleInputChange('useCase', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="services">Services to Connect</Label>
                    <Input
                      id="services"
                      placeholder="e.g., Gmail, Slack, Google Drive, Notion..."
                      value={formData.services}
                      onChange={(e) => handleInputChange('services', e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Submitting Request...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Flow Request
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5" />
                  Popular Requests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {examples.map((example, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm mb-1">{example.title}</h4>
                    <p className="text-xs text-muted-foreground">{example.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Process Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">1</div>
                  <div>
                    <p className="text-sm font-medium">Review</p>
                    <p className="text-xs text-muted-foreground">We'll review your request within 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">2</div>
                  <div>
                    <p className="text-sm font-medium">Development</p>
                    <p className="text-xs text-muted-foreground">Our team builds your custom flow</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">3</div>
                  <div>
                    <p className="text-sm font-medium">Delivery</p>
                    <p className="text-xs text-muted-foreground">Flow is added to your library</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestFlowPage;
