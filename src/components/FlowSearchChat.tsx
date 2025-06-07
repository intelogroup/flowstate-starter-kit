
import { useState, useRef, useEffect } from "react";
import { Search, Send, Bot, User, Sparkles, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: FlowSuggestion[];
}

interface FlowSuggestion {
  id: number;
  title: string;
  description: string;
  confidence: number;
  category: string;
  tags: string[];
  icon: string;
  targetIcon: string;
}

interface FlowSearchChatProps {
  onTemplateSelect: (templateId: number) => void;
}

const FlowSearchChat = ({ onTemplateSelect }: FlowSearchChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "What would you like to automate today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    "Save Gmail attachments to Google Drive",
    "Get WhatsApp alerts for urgent emails",
    "Auto-organize photos by date",
    "Send Slack notifications for new orders",
    "Create Trello cards from support emails"
  ];

  const mockAIResponse = (userInput: string): { content: string; suggestions?: FlowSuggestion[] } => {
    const input = userInput.toLowerCase();
    
    if (input.includes("email") && (input.includes("drive") || input.includes("save") || input.includes("attachment"))) {
      return {
        content: "Found 2 flows for email-to-drive automation:",
        suggestions: [
          {
            id: 1,
            title: "Email to Drive",
            description: "Save email attachments to Google Drive folders automatically.",
            confidence: 95,
            category: "Productivity",
            tags: ["email", "drive", "attachments"],
            icon: "mail",
            targetIcon: "hard-drive"
          },
          {
            id: 4,
            title: "Invoice Processor",
            description: "Extract invoice attachments and organize them by date.",
            confidence: 85,
            category: "Finance",
            tags: ["email", "invoices", "drive"],
            icon: "mail",
            targetIcon: "file-text"
          }
        ]
      };
    }
    
    if (input.includes("whatsapp") || input.includes("notification") || input.includes("alert")) {
      return {
        content: "Perfect! Here's a flow for WhatsApp notifications:",
        suggestions: [
          {
            id: 2,
            title: "Email to WhatsApp",
            description: "Get WhatsApp notifications for specific emails.",
            confidence: 92,
            category: "Communication",
            tags: ["email", "whatsapp", "notifications"],
            icon: "mail",
            targetIcon: "message-square"
          }
        ]
      };
    }

    if (input.includes("sheet") || input.includes("spreadsheet") || input.includes("excel")) {
      return {
        content: "Found flows for spreadsheet automation:",
        suggestions: [
          {
            id: 3,
            title: "Email to Sheets",
            description: "Log email details to Google Sheets for tracking.",
            confidence: 88,
            category: "Data Management",
            tags: ["email", "sheets", "data entry"],
            icon: "mail",
            targetIcon: "file-spreadsheet"
          }
        ]
      };
    }

    if (input.includes("social") || input.includes("post") || input.includes("schedule")) {
      return {
        content: "Here's a social media automation flow:",
        suggestions: [
          {
            id: 5,
            title: "Social Media Scheduler",
            description: "Schedule posts across multiple social media platforms.",
            confidence: 90,
            category: "Marketing",
            tags: ["social media", "scheduling", "content"],
            icon: "message-square",
            targetIcon: "message-square"
          }
        ]
      };
    }

    if (input.includes("crm") || input.includes("lead") || input.includes("sales")) {
      return {
        content: "Found a CRM automation flow:",
        suggestions: [
          {
            id: 6,
            title: "Lead Capture to CRM",
            description: "Automatically add new leads from forms to your CRM system.",
            confidence: 87,
            category: "Sales",
            tags: ["crm", "leads", "sales"],
            icon: "mail",
            targetIcon: "file-spreadsheet"
          }
        ]
      };
    }

    return {
      content: "Can you be more specific? For example: 'save Gmail attachments' or 'send WhatsApp alerts'",
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = mockAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-96 bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI Flow Search</h3>
          <p className="text-sm text-muted-foreground">Tell me what you want to automate</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'ai' && (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
              <div className={`p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground ml-auto' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
              
              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion) => (
                    <Card key={suggestion.id} className="cursor-pointer hover:shadow-md transition-all" onClick={() => onTemplateSelect(suggestion.id)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {suggestion.confidence}% match
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {suggestion.category}
                            </Badge>
                          </div>
                          <Button size="sm" variant="outline">
                            Use Flow
                          </Button>
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {suggestion.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {message.type === 'user' && (
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 order-3">
                <User className="w-4 h-4 text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="bg-secondary text-secondary-foreground p-3 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Popular automations:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickSuggestion(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your automation (e.g., 'save email attachments to drive')"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlowSearchChat;
