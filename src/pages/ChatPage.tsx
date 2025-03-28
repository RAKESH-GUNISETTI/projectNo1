import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SendIcon, Bot, User, Loader2, RefreshCw } from 'lucide-react';
import { MainLayout } from '@/layouts/MainLayout';
import { generateAIResponse, ChatMessage } from '@/services/aiChatService';
import { toast } from "sonner";

interface ActivityHistory {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'challenge' | 'chat' | 'profile' | 'system';
}

const ChatPage = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'bot',
      content: 'Hello! I\'m ByteBolt\'s AI assistant powered by Google\'s Gemini 1.5 Pro. I can answer your questions about technology, programming, and more. How can I help you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ username: '' });
  const [activityHistory, setActivityHistory] = useState<ActivityHistory[]>([]);

  // Load persisted chat data from sessionStorage
  useEffect(() => {
    const savedMessages = sessionStorage.getItem('fullChatMessages');
    const savedQuery = sessionStorage.getItem('fullChatQuery');
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error("Error parsing saved chat messages:", error);
      }
    }
    
    if (savedQuery) {
      setQuery(savedQuery);
    }
  }, []);

  // Save chat data to sessionStorage
  useEffect(() => {
    if (messages.length > 1) { // Only save if there are user messages
      sessionStorage.setItem('fullChatMessages', JSON.stringify(messages));
    }
    
    if (query) {
      sessionStorage.setItem('fullChatQuery', query);
    }
  }, [messages, query]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    const userMessage = { type: 'user' as const, content: query };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get AI response
      const response = await generateAIResponse(query);
      const botMessage = { type: 'bot' as const, content: response };
      setMessages(prev => [...prev, botMessage]);
      // Clear query from session storage after successful response
      sessionStorage.removeItem('fullChatQuery');
    } catch (error) {
      console.error("Error in chat:", error);
      toast.error("Failed to get a response. Please try again.");
      // Add fallback error message
      const errorMessage = { 
        type: 'bot' as const, 
        content: "I'm having trouble processing your request right now. Please try again later." 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([{
        type: 'bot',
        content: 'Hello! I\'m ByteBolt\'s AI assistant powered by Google\'s Gemini 1.5 Pro. I can answer your questions about technology, programming, and more. How can I help you today?'
      }]);
      sessionStorage.removeItem('fullChatMessages');
      sessionStorage.removeItem('fullChatQuery');
      toast.success("Chat history cleared!");
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      // Update profile
      setEditedProfile(prev => ({
        ...prev,
        username: editedProfile.username.trim()
      }));

      // Add to activity history
      setActivityHistory(prev => [{
        id: Math.random().toString(),
        action: "Profile Update",
        details: "Updated profile information",
        timestamp: new Date().toISOString(),
        type: "profile"
      }, ...prev]);

      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <div className="page-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">AI Tech Assistant</h1>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearChat}
              className="transition-all hover:bg-destructive/10"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear Chat
            </Button>
          </div>
          <p className="text-muted-foreground mb-8">
            Ask our AI assistant any technology-related question. Powered by Google's Gemini 1.5 Pro model.
          </p>
          
          <Card className="shadow-lg hover:shadow-xl transition-all duration-500">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle>AI Tech Chat</CardTitle>
              <CardDescription>
                Your personal tech knowledge navigator
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="h-[500px] overflow-y-auto space-y-4 p-2 scroll-m-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%]`}>
                      {message.type === 'bot' && (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div 
                        className={`rounded-lg px-4 py-2 ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.type === 'user' && (
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="rounded-lg px-4 py-2 bg-muted">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-sm text-muted-foreground">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            
            <CardFooter className="p-4 border-t">
              <form onSubmit={handleSubmit} className="w-full flex gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a technology question..."
                  className="flex-1 transition-all focus:ring-2 focus:ring-primary/50"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading}
                  className="transition-all"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <SendIcon className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </CardFooter>
          </Card>
          <div className="text-xs text-muted-foreground italic border-t pt-2 mt-4 text-center">
            ⚠️ This AI assistant is specifically designed to handle technology-related queries only.So we are kindly requesting you to deal only with tech-related Concepts. For any other non-technical questions, please consult appropriate resources or experts in those fields.
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
