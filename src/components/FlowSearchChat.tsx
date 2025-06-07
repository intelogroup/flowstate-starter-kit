
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  suggestions?: FlowSuggestion[];
}

interface FlowSuggestion {
  id: number;
  title: string;
  description: string;
  confidence: number;
  category: string;
}

interface FlowSearchChatProps {
  onTemplateSelect: (templateId: number) => void;
}

const FlowSearchChat = ({ onTemplateSelect }: FlowSearchChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "What would you like to automate? Try: 'save Gmail attachments' or 'WhatsApp alerts'"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockAIResponse = (userInput: string): { content: string; suggestions?: FlowSuggestion[] } => {
    const input = userInput.toLowerCase();
    
    if (input.includes("email") && (input.includes("drive") || input.includes("save") || input.includes("attachment"))) {
      return {
        content: "Found perfect matches:",
        suggestions: [
          {
            id: 1,
            title: "Email to Drive",
            description: "Save email attachments automatically",
            confidence: 95,
            category: "Productivity"
          }
        ]
      };
    }
    
    if (input.includes("whatsapp") || input.includes("notification") || input.includes("alert")) {
      return {
        content: "Here's what I found:",
        suggestions: [
          {
            id: 2,
            title: "Email to WhatsApp",
            description: "Get WhatsApp notifications for emails",
            confidence: 92,
            category: "Communication"
          }
        ]
      };
    }

    if (input.includes("sheet") || input.includes("spreadsheet")) {
      return {
        content: "Found a great match:",
        suggestions: [
          {
            id: 3,
            title: "Email to Sheets",
            description: "Log email details to spreadsheets",
            confidence: 88,
            category: "Data"
          }
        ]
      };
    }

    return {
      content: "Try being more specific. For example: 'save Gmail attachments' or 'WhatsApp alerts'"
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = mockAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse.content,
        suggestions: aiResponse.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-64 bg-card border border-border rounded-lg">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'ai' && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            
            <div className={`max-w-[75%] ${message.type === 'user' ? 'order-2' : ''}`}>
              <div className={`p-2 rounded-lg text-sm ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground ml-auto' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                <p>{message.content}</p>
              </div>
              
              {message.suggestions && (
                <div className="mt-2 space-y-1">
                  {message.suggestions.map((suggestion) => (
                    <Card key={suggestion.id} className="cursor-pointer hover:bg-accent transition-colors" onClick={() => onTemplateSelect(suggestion.id)}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.confidence}% match
                          </Badge>
                          <Button size="sm" variant="outline" className="h-6 text-xs">
                            Use
                          </Button>
                        </div>
                        <h4 className="font-medium text-sm">{suggestion.title}</h4>
                        <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {message.type === 'user' && (
              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 order-3">
                <User className="w-3 h-3 text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 justify-start">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3 h-3 text-primary-foreground" />
            </div>
            <div className="bg-secondary text-secondary-foreground p-2 rounded-lg">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What do you want to automate?"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 text-sm"
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} size="sm">
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlowSearchChat;
