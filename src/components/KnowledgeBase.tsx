import { Book, FileText, HelpCircle, Shield, Scale, ChevronRight, Search, ArrowLeft, Users, Settings, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const KnowledgeBase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
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
          id: "welcome",
          title: "Welcome to Flowstate!",
          description: "Overview of Flowstate and core concepts: triggers, actions, and flows",
          readTime: "3 min read",
          difficulty: "Beginner",
          content: {
            sections: [
              {
                title: "What is Flowstate?",
                content: "Flowstate is an automation platform that helps you connect your favorite apps and automate repetitive tasks. Think of it as your personal assistant that works 24/7 to handle routine work for you."
              },
              {
                title: "Core Concepts",
                content: "Every automation in Flowstate consists of three key components:\n\n• **Triggers**: Events that start your automation (like receiving an email)\n• **Actions**: What happens when triggered (like saving an attachment)\n• **Flows**: The complete automation from trigger to action"
              },
              {
                title: "Getting Started",
                content: "Ready to create your first automation? Start with our Gmail Attachment Saver - it's the perfect introduction to Flowstate's capabilities."
              }
            ]
          }
        },
        {
          id: "first-flow",
          title: "Step-by-Step Guide: Creating Your First Flow",
          description: "Detailed walkthrough of the Gmail Attachment Saver onboarding process",
          readTime: "8 min read",
          difficulty: "Beginner",
          content: {
            sections: [
              {
                title: "Before You Begin",
                content: "Make sure you have:\n• A Gmail account\n• Google Drive access\n• A few minutes to complete the setup"
              },
              {
                title: "Step 1: Connect Your Google Account",
                content: "1. Click 'Create Flow' from your dashboard\n2. Select 'Gmail Attachment Saver' template\n3. Click 'Connect Google Account'\n4. Review and accept the required permissions\n5. You'll be redirected back to Flowstate"
              },
              {
                title: "Step 2: Configure Gmail Filter",
                content: "Set up which emails should trigger your automation:\n• Choose a specific sender email\n• Set subject line keywords\n• Select attachment file types\n• Test your filter settings"
              },
              {
                title: "Step 3: Set Google Drive Destination",
                content: "Choose where attachments will be saved:\n• Select an existing folder or create a new one\n• Set up folder organization rules\n• Configure file naming conventions"
              },
              {
                title: "Step 4: Test and Activate",
                content: "Before going live:\n• Use the 'Test Flow' button\n• Check that test files appear in your Drive\n• Activate your flow when ready"
              }
            ]
          }
        },
        {
          id: "dashboard-guide",
          title: "Understanding the Dashboard",
          description: "Key components of the main dashboard and flow management",
          readTime: "5 min read",
          difficulty: "Beginner",
          content: {
            sections: [
              {
                title: "Dashboard Overview",
                content: "Your dashboard is mission control for all your automations. Here's what each element does."
              },
              {
                title: "Flow Cards",
                content: "Each automation appears as a card showing:\n• Flow name and description\n• Current status (Active/Paused)\n• Recent execution history\n• Quick action buttons"
              },
              {
                title: "The Active Toggle",
                content: "The is_active toggle lets you:\n• Pause flows temporarily\n• Resume paused flows\n• Prevent accidental executions during edits"
              },
              {
                title: "Run Now Button",
                content: "Test your flows instantly:\n• Manually trigger any flow\n• Perfect for testing configurations\n• View results in real-time"
              }
            ]
          }
        }
      ]
    },
    {
      id: "managing-flows",
      title: "Managing Your Flows",
      description: "Edit, monitor, and optimize your automations",
      icon: Settings,
      color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
      articles: [
        {
          id: "pause-edit-delete",
          title: "How to Pause, Edit, or Delete a Flow",
          description: "Simple instructions for flow lifecycle management",
          readTime: "4 min read",
          difficulty: "Beginner",
          content: {
            sections: [
              {
                title: "Pausing a Flow",
                content: "To temporarily stop a flow:\n1. Find your flow on the dashboard\n2. Toggle the 'Active' switch to OFF\n3. The flow will stop processing new triggers\n4. Existing queued actions will complete"
              },
              {
                title: "Editing a Flow",
                content: "To modify flow settings:\n1. Click the 'Edit' button on your flow card\n2. Make your changes in the configuration panel\n3. Use 'Test' to verify changes work\n4. Click 'Save' to apply changes\n5. Reactivate if the flow was paused"
              },
              {
                title: "Deleting a Flow",
                content: "To permanently remove a flow:\n1. Click the 'Delete' button (trash icon)\n2. Confirm deletion in the popup\n3. All flow data and history will be removed\n4. This action cannot be undone"
              }
            ]
          }
        },
        {
          id: "history-logs",
          title: "Understanding Your Flow's History & Logs",
          description: "How to read execution history and identify configuration errors",
          readTime: "6 min read",
          difficulty: "Intermediate",
          content: {
            sections: [
              {
                title: "Accessing Flow History",
                content: "Click on any flow card to view its detailed execution history. You'll see a chronological list of all runs with timestamps and status indicators."
              },
              {
                title: "Status Meanings",
                content: "• **SUCCESS**: Flow completed without any issues\n• **FAILURE**: Flow encountered an error and stopped\n• **SUCCESS_WITH_ERRORS**: Flow completed but with minor issues\n• **AWAITING_USER_INPUT**: Flow paused waiting for your action"
              },
              {
                title: "Reading Step-by-Step Logs",
                content: "Each execution shows detailed steps:\n1. Trigger received\n2. Data processing\n3. Action execution\n4. Completion status\n\nClick any step to see detailed information and error messages."
              },
              {
                title: "Example: Troubleshooting a Failed Run",
                content: "If you see 'Resource Not Found' in step 3:\n1. Check if the target folder still exists\n2. Verify you have write permissions\n3. Ensure the folder hasn't been moved\n4. Update the flow configuration if needed"
              }
            ]
          }
        }
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting Common Issues",
      description: "Debug and fix common problems",
      icon: AlertTriangle,
      color: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
      articles: [
        {
          id: "error-messages",
          title: "My Flow Failed: What Do These Error Messages Mean?",
          description: "Common error explanations and user-resolvable solutions",
          readTime: "7 min read",
          difficulty: "Intermediate",
          content: {
            sections: [
              {
                title: "Resource Not Found",
                content: "This usually means:\n• A folder or file was deleted or moved\n• You no longer have access to the resource\n• The path has changed\n\n**Solution**: Update your flow configuration with the correct path or restore access."
              },
              {
                title: "Permission Denied",
                content: "This indicates:\n• Your Google permissions were revoked\n• Folder sharing settings changed\n• Account access was restricted\n\n**Solution**: Reconnect your Google account or check sharing permissions."
              },
              {
                title: "AWAITING_USER_INPUT Status",
                content: "Your flow is paused because:\n• Manual approval is required\n• A decision point needs your input\n• Duplicate file handling awaits your choice\n\n**Solution**: Check your flow dashboard for pending actions and respond accordingly."
              },
              {
                title: "Rate Limit Exceeded",
                content: "You've hit API limits:\n• Too many requests in a short time\n• Google API quotas reached\n• Service temporarily unavailable\n\n**Solution**: Wait a few minutes and try again, or spread out your automation timing."
              }
            ]
          }
        },
        {
          id: "google-disconnected",
          title: "Help! My Google Account was Disconnected",
          description: "Why disconnections happen and how to securely reconnect",
          readTime: "5 min read",
          difficulty: "Beginner",
          content: {
            sections: [
              {
                title: "Why Disconnections Happen",
                content: "Your Google account might disconnect if:\n• You revoked permissions in Google Account settings\n• You changed your Google password\n• Google detected suspicious activity\n• You exceeded usage limits"
              },
              {
                title: "Reconnecting Your Account",
                content: "To reconnect safely:\n1. Go to Settings in your Flowstate dashboard\n2. Click 'Connected Accounts'\n3. Find Google and click 'Reconnect'\n4. Review and accept permissions\n5. Test a flow to confirm connection"
              },
              {
                title: "Preventing Future Disconnections",
                content: "• Don't revoke Flowstate permissions in Google unless necessary\n• Keep your account secure with 2FA\n• Monitor your flows for connection issues\n• Update permissions if Google requests it"
              }
            ]
          }
        }
      ]
    },
    {
      id: "account-security",
      title: "Account & Security",
      description: "Manage your account and understand our security practices",
      icon: Shield,
      color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
      articles: [
        {
          id: "account-settings",
          title: "How to Manage Your Account Settings",
          description: "Update your profile, password, and preferences",
          readTime: "4 min read",
          difficulty: "Beginner",
          content: {
            sections: [
              {
                title: "Accessing Account Settings",
                content: "1. Click your profile icon in the top right\n2. Select 'Account Settings' from the dropdown\n3. You'll see tabs for Profile, Security, and Preferences"
              },
              {
                title: "Updating Profile Information",
                content: "In the Profile tab:\n• Change your display name\n• Update your email address\n• Set timezone preferences\n• Upload a profile picture"
              },
              {
                title: "Changing Your Password",
                content: "In the Security tab:\n1. Click 'Change Password'\n2. Enter your current password\n3. Create a strong new password\n4. Confirm the new password\n5. Click 'Update Password'"
              },
              {
                title: "Notification Preferences",
                content: "Control when you receive emails:\n• Flow execution notifications\n• Weekly summary reports\n• Security alerts\n• Product updates"
              }
            ]
          }
        },
        {
          id: "google-permissions",
          title: "How Flowstate Uses Google Permissions (Scopes)",
          description: "Understanding what permissions we request and why",
          readTime: "6 min read",
          difficulty: "Beginner",
          content: {
            sections: [
              {
                title: "Why We Need Permissions",
                content: "Flowstate requests specific Google permissions to automate tasks on your behalf. We only ask for what's necessary for your flows to work."
              },
              {
                title: "Gmail Permissions",
                content: "• **Read emails**: To detect new messages matching your filters\n• **Read attachments**: To access files you want to save\n• **Basic email info**: To identify senders and subjects\n\n**We cannot**: Read your personal emails unrelated to your flows"
              },
              {
                title: "Google Drive Permissions",
                content: "• **Create files**: To save email attachments\n• **Create folders**: To organize your automated files\n• **Access specific folders**: Only those you designate\n\n**We cannot**: Access files outside your designated automation folders"
              },
              {
                title: "Security Assurance",
                content: "• All connections use OAuth 2.0 encryption\n• We never store your Google password\n• You can revoke access anytime\n• We only access data when your flows run"
              }
            ]
          }
        },
        {
          id: "disconnect-delete",
          title: "How to Disconnect or Delete Your Account",
          description: "Clear instructions for account management and data removal",
          readTime: "3 min read",
          difficulty: "Beginner",
          content: {
            sections: [
              {
                title: "Disconnecting Google Services",
                content: "To remove Google access:\n1. Go to Settings > Connected Accounts\n2. Find Google in the list\n3. Click 'Disconnect'\n4. Confirm in the popup\n\nNote: Your flows will stop working until reconnected."
              },
              {
                title: "Deleting Your Account",
                content: "To permanently delete your Flowstate account:\n1. Go to Settings > Account\n2. Scroll to 'Danger Zone'\n3. Click 'Delete Account'\n4. Type 'DELETE' to confirm\n5. Click 'Delete My Account'"
              },
              {
                title: "What Gets Deleted",
                content: "When you delete your account:\n• All flows and configurations\n• Execution history and logs\n• Connected service permissions\n• Personal profile information\n\nNote: This action cannot be undone."
              }
            ]
          }
        }
      ]
    }
  ];

  const faqItems = [
    {
      question: "Is Flowstate secure?",
      answer: "Yes! We use enterprise-grade security including OAuth 2.0 for service connections, encryption for all data in transit and at rest, and we never store your service passwords. We only access the specific data your flows are configured to process."
    },
    {
      question: "What happens if I run out of my monthly flow runs?",
      answer: "Your flows will automatically pause when you reach your limit. You can upgrade your plan for unlimited runs, or wait until next month when your quota resets. You'll receive notifications before hitting your limit."
    },
    {
      question: "Can I automate other apps besides Google Workspace?",
      answer: "Currently, we focus on Google Workspace automations (Gmail, Drive, Sheets, etc.) to provide the best possible experience. We're working on adding more services based on user feedback."
    },
    {
      question: "Where do I report a bug or suggest a feature?",
      answer: "You can contact us through the 'Contact Support' button in the Help section, or email us directly at support@flowstate.app. We love hearing from users and regularly implement requested features."
    },
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

  if (selectedArticle && selectedCategory) {
    const category = categories.find(c => c.id === selectedCategory);
    const article = category?.articles.find(a => a.id === selectedArticle);
    
    if (!article || !category) return null;

    return (
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelectedArticle(null)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {category.title}
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{article.title}</h1>
          <p className="text-muted-foreground mb-4">{article.description}</p>
          <div className="flex items-center gap-3 mb-6">
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

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {article.content.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">{section.title}</h2>
              <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
          {category.articles.map((article) => (
            <Card 
              key={article.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedArticle(article.id)}
            >
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
    </div>
  );
};

export default KnowledgeBase;
