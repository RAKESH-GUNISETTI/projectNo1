
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SendIcon, Bot, User } from 'lucide-react';
import { MainLayout } from '@/layouts/MainLayout';
import { generateAIResponse, ChatMessage } from '@/services/aiChatService';
import { toast } from "sonner";

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
    setQuery('');

    try {
      // Get AI response
      const response = await generateAIResponse(query);
      const botMessage = { type: 'bot' as const, content: response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in chat:", error);
      toast.error("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="page-container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">AI Tech Assistant</h1>
          <p className="text-muted-foreground mb-8">
            Ask our AI assistant any technology-related question. Powered by Google's Gemini 1.5 Pro model.
          </p>
          
          <Card className="shadow-lg">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle>AI Tech Chat</CardTitle>
              <CardDescription>
                Your personal tech knowledge navigator
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="h-[500px] overflow-y-auto space-y-4 p-2">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
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
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="rounded-lg px-4 py-2 bg-muted">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
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
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <SendIcon className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
