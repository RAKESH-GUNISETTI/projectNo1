import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SendIcon, Zap, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateAIResponse } from '@/services/aiChatService';
import { toast } from "sonner";

export function ChatBot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{type: 'user' | 'bot', content: string}[]>([
    {
      type: 'bot',
      content: 'Hi there! I\'m ByteBolt\'s AI assistant. Ask me any technology-related question!'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQueries = [
    "What is blockchain technology?",
    "Explain quantum computing",
    "What's new in JavaScript ES2023?",
    "How does machine learning work?"
  ];

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Persist messages and query in session storage
  useEffect(() => {
    const savedMessages = sessionStorage.getItem('chatMessages');
    const savedQuery = sessionStorage.getItem('chatQuery');
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error("Error parsing saved messages:", error);
      }
    }
    
    if (savedQuery) {
      setQuery(savedQuery);
    }
  }, []);
  
  // Save messages and query to session storage when they change
  useEffect(() => {
    if (messages.length > 1) { // Only save if there are user messages
      sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    }
    
    if (query) {
      sessionStorage.setItem('chatQuery', query);
    }
  }, [messages, query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    const userMessage = { type: 'user' as const, content: query };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get response from Gemini
      const response = await generateAIResponse(query);
      const botMessage = { type: 'bot' as const, content: response };
      setMessages(prev => [...prev, botMessage]);
      // Clear query from session storage after successful response
      sessionStorage.removeItem('chatQuery');
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to get a response. Please try again.");
      // Add a fallback error message
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

  const handleSampleQuery = async (sampleQuery: string) => {
    setQuery(sampleQuery);
    const userMessage = { type: 'user' as const, content: sampleQuery };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get response from Gemini
      const response = await generateAIResponse(sampleQuery);
      const botMessage = { type: 'bot' as const, content: response };
      setMessages(prev => [...prev, botMessage]);
      // Clear query from session storage after successful response
      sessionStorage.removeItem('chatQuery');
    } catch (error) {
      console.error("Error generating response:", error);
      // Add a fallback error message
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

  return (
    <section className="section-spacing bg-secondary/50">
      <div className="page-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="scroll-animate" data-animation="slide-up" data-delay="300">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              AI Assistant
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Your AI tech companion</h2>
            <p className="text-muted-foreground mb-6">
              Our AI assistant is designed to answer all your technology-related questions. From programming to hardware, cloud computing to cybersecurity - we've got you covered.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 scroll-animate" data-animation="fade-in" data-delay="400">
                <Zap className="text-primary h-5 w-5" />
                <span>Technical expertise across all domains</span>
              </div>
              <div className="flex items-center gap-2 scroll-animate" data-animation="fade-in" data-delay="500">
                <Zap className="text-primary h-5 w-5" />
                <span>Up-to-date with latest tech trends</span>
              </div>
              <div className="flex items-center gap-2 scroll-animate" data-animation="fade-in" data-delay="600">
                <Zap className="text-primary h-5 w-5" />
                <span>Code examples and explanations</span>
              </div>
              <div className="flex items-center gap-2 scroll-animate" data-animation="fade-in" data-delay="700">
                <Zap className="text-primary h-5 w-5" />
                <span>24/7 availability for your queries</span>
              </div>
            </div>
            
            <div className="mt-8 scroll-animate" data-animation="fade-in" data-delay="800">
              <Button asChild size="lg" className="transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                <Link to="/chat">Try full AI chat experience</Link>
              </Button>
            </div>
          </div>
          
          <div className="scroll-animate" data-animation="slide-up" data-delay="500">
            <Card className="shadow-lg overflow-hidden hover:shadow-xl transition-all duration-700">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>AI Tech Assistant</CardTitle>
                <CardDescription>Ask any technology-related question</CardDescription>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="p-4 h-[320px] overflow-y-auto space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg px-4 py-2 bg-secondary">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-sm text-muted-foreground">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 border-t bg-secondary/30">
                  <div className="text-xs text-muted-foreground mb-2">Try asking about:</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {sampleQueries.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => handleSampleQuery(query)}
                        className="text-xs bg-secondary px-2 py-1 rounded hover:bg-secondary/80 transition-colors"
                        disabled={isLoading}
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground italic border-t pt-2 mt-2">
                    ⚠️ This AI assistant is specifically designed to handle technology-related queries only. For non-technical questions, please consult appropriate resources or experts in those fields.
                  </div>
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
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <SendIcon className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
