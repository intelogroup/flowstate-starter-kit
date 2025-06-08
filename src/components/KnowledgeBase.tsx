
import { Book, FileText, HelpCircle, Shield, Scale, ChevronRight, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const KnowledgeBase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Essential guides for new users",
      icon: Book,
      color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
      articles: [
        {
          title: "Configuring the Gmail Attachment Saver",
          description: "Step-by-step guide to set up automatic email attachment saving",
          readTime: "5 min read",
          difficulty: "Beginner"
        },
        {
          title: "Creating Your First Automation Flow",
          description: "Learn the basics of building automation workflows",
          readTime: "8 min read",
          difficulty: "Beginner"
        },
        {
          title: "Understanding Triggers and Actions",
          description: "Core concepts of how automations work",
          readTime: "6 min read",
          difficulty: "Beginner"
        }
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      description: "Debug and fix common issues",
      icon: HelpCircle,
      color: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
      articles: [
        {
          title: "How to Debug a Failed Flow Run Using Your History Log",
          description: "Use execution logs to identify and resolve flow failures",
          readTime: "7 min read",
          difficulty: "Intermediate"
        },
        {
          title: "Common Authentication Errors and Solutions",
          description: "Fix connection issues with Google and other services",
          readTime: "5 min read",
          difficulty: "Beginner"
        },
        {
          title: "Flow Performance Optimization",
          description: "Improve the speed and reliability of your automations",
          readTime: "10 min read",
          difficulty: "Advanced"
        }
      ]
    },
    {
      id: "permissions",
      title: "Permissions & Security",
      description: "Understanding data access and security",
      icon: Shield,
      color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
      articles: [
        {
          title: "Understanding Google Permissions and Scopes",
          description: "What permissions we request and why they're needed",
          readTime: "6 min read",
          difficulty: "Beginner"
        },
        {
          title: "Data Security and Privacy Best Practices",
          description: "How we protect your data and what you can do too",
          readTime: "8 min read",
          difficulty: "Intermediate"
        },
        {
          title: "Managing Third-Party Connections",
          description: "Control and revoke access to external services",
          readTime: "4 min read",
          difficulty: "Beginner"
        }
      ]
    },
    {
      id: "flow-management",
      title: "Flow Management",
      description: "Managing and optimizing your flows",
      icon: FileText,
      color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
      articles: [
        {
          title: "How to Pause or Edit a Flow",
          description: "Modify existing automations without losing data",
          readTime: "4 min read",
          difficulty: "Beginner"
        },
        {
          title: "Duplicating and Sharing Flows",
          description: "Create copies and share automations with your team",
          readTime: "6 min read",
          difficulty: "Intermediate"
        },
        {
          title: "Advanced Flow Configuration",
          description: "Complex setups and conditional logic",
          readTime: "12 min read",
          difficulty: "Advanced"
        }
      ]
    }
  ];

  const faqItems = [
    {
      question: "What data do you collect from my Google account?",
      answer: "We only access the specific data needed for your automations. For Gmail, this includes email metadata and attachments you choose to process. We never read personal emails unrelated to your flows."
    },
    {
      question: "Can I revoke permissions at any time?",
      answer: "Yes, you can revoke permissions through your Google Account settings or directly in our app under Settings > Connections. Your flows will pause automatically if permissions are revoked."
    },
    {
      question: "How many automations can I create?",
      answer: "Free accounts can create up to 5 active flows with 500 executions per month. Paid plans offer unlimited flows and executions."
    },
    {
      question: "What happens if my flow fails?",
      answer: "Failed flows are automatically paused and you'll receive a notification. Check the execution logs to identify the issue, fix it, then resume the flow."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade encryption and follow SOC 2 compliance standards. Your data is encrypted in transit and at rest, and we never share it with third parties."
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.some(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedCategory) {
    const category = categories.find(c => c.id === selectedCategory);
    if (!category) return null;

    const CategoryIcon = category.icon;

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Knowledge Base
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color}`}>
            <CategoryIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{category.title}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>

        <div className="grid gap-4">
          {category.articles.map((article, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4">{article.description}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs">
                        {article.readTime}
                      </Badge>
                      <Badge 
                        variant={article.difficulty === 'Beginner' ? 'default' : 
                                article.difficulty === 'Intermediate' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {article.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground ml-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Knowledge Base</h1>
        <p className="text-muted-foreground">Find answers and learn how to get the most out of your automations</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder="Search articles and FAQs..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((category) => {
          const CategoryIcon = category.icon;
          
          return (
            <Card 
              key={category.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {category.articles.length} articles
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {searchTerm && (
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredFAQ.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h4 className="font-medium mb-2">{item.question}</h4>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KnowledgeBase;
