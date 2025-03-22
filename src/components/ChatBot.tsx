
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SendIcon, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ChatBot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{type: 'user' | 'bot', content: string}[]>([
    {
      type: 'bot',
      content: 'Hi there! I\'m ByteBolt\'s AI assistant. Ask me any technology-related question!'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sampleQueries = [
    "What is blockchain technology?",
    "Explain quantum computing",
    "What's new in JavaScript ES2023?",
    "How does machine learning work?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    const userMessage = { type: 'user' as const, content: query };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses = {
        "What is blockchain technology?": "Blockchain is a distributed, decentralized ledger technology that records transactions across multiple computers. It ensures security, transparency, and immutability without requiring a central authority. Each block contains a timestamp and link to the previous block, forming a chain. It's the foundation for cryptocurrencies like Bitcoin, but has applications in supply chain, healthcare, voting systems, and more.",
        "Explain quantum computing": "Quantum computing leverages quantum mechanics principles to process information. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or 'qubits' that can exist in multiple states simultaneously through superposition. This enables quantum computers to solve certain complex problems exponentially faster than classical computers, particularly in cryptography, materials science, and optimization problems.",
        "What's new in JavaScript ES2023?": "JavaScript ES2023 introduces several new features including: Array findLast() and findLastIndex() methods, new Hashbang syntax, improvements to Array.prototype.toSorted(), toReversed(), toSpliced(), and with() methods that create new arrays instead of modifying existing ones. It also includes standardized support for the #! syntax in JavaScript source files and additional RegExp features.",
        "How does machine learning work?": "Machine learning is a subset of AI where algorithms learn patterns from data without explicit programming. It works by: 1) Collecting and preparing data, 2) Choosing a model (like neural networks or decision trees), 3) Training the model on sample data, 4) Evaluating performance, and 5) Optimizing and deploying. The model improves with more data and can make predictions or decisions on new inputs. Common types include supervised, unsupervised, and reinforcement learning."
      };

      // Default response for queries not in our sample set
      let responseContent = "I can help you with that! For a more detailed answer, please try our full AI chat feature where I can provide comprehensive information about any technology topic.";
      
      // Check if the query matches any of our prepared responses
      for (const sampleQuery of Object.keys(botResponses)) {
        if (query.toLowerCase().includes(sampleQuery.toLowerCase())) {
          responseContent = botResponses[sampleQuery as keyof typeof botResponses];
          break;
        }
      }

      const botMessage = { type: 'bot' as const, content: responseContent };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      setQuery('');
    }, 1000);
  };

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery);
    const userMessage = { type: 'user' as const, content: sampleQuery };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        "What is blockchain technology?": "Blockchain is a distributed, decentralized ledger technology that records transactions across multiple computers. It ensures security, transparency, and immutability without requiring a central authority. Each block contains a timestamp and link to the previous block, forming a chain. It's the foundation for cryptocurrencies like Bitcoin, but has applications in supply chain, healthcare, voting systems, and more.",
        "Explain quantum computing": "Quantum computing leverages quantum mechanics principles to process information. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or 'qubits' that can exist in multiple states simultaneously through superposition. This enables quantum computers to solve certain complex problems exponentially faster than classical computers, particularly in cryptography, materials science, and optimization problems.",
        "What's new in JavaScript ES2023?": "JavaScript ES2023 introduces several new features including: Array findLast() and findLastIndex() methods, new Hashbang syntax, improvements to Array.prototype.toSorted(), toReversed(), toSpliced(), and with() methods that create new arrays instead of modifying existing ones. It also includes standardized support for the #! syntax in JavaScript source files and additional RegExp features.",
        "How does machine learning work?": "Machine learning is a subset of AI where algorithms learn patterns from data without explicit programming. It works by: 1) Collecting and preparing data, 2) Choosing a model (like neural networks or decision trees), 3) Training the model on sample data, 4) Evaluating performance, and 5) Optimizing and deploying. The model improves with more data and can make predictions or decisions on new inputs. Common types include supervised, unsupervised, and reinforcement learning."
      };

      const botMessage = { 
        type: 'bot' as const, 
        content: botResponses[sampleQuery] || "I can help you with that! For a more detailed answer, please try our full AI chat feature."
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      setQuery('');
    }, 1000);
  };

  return (
    <section className="section-spacing bg-secondary/50">
      <div className="page-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              AI Assistant
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Your AI tech companion</h2>
            <p className="text-muted-foreground mb-6">
              Our AI assistant is designed to answer all your technology-related questions. From programming to hardware, cloud computing to cybersecurity - we've got you covered.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="text-primary h-5 w-5" />
                <span>Technical expertise across all domains</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-primary h-5 w-5" />
                <span>Up-to-date with latest tech trends</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-primary h-5 w-5" />
                <span>Code examples and explanations</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-primary h-5 w-5" />
                <span>24/7 availability for your queries</span>
              </div>
            </div>
            
            <div className="mt-8">
              <Button asChild size="lg">
                <Link to="/chat">Try full AI chat experience</Link>
              </Button>
            </div>
          </div>
          
          <div>
            <Card className="shadow-lg overflow-hidden">
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
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t bg-secondary/30">
                  <div className="text-xs text-muted-foreground mb-2">Try asking about:</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {sampleQueries.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => handleSampleQuery(query)}
                        className="text-xs bg-secondary px-2 py-1 rounded hover:bg-secondary/80 transition-colors"
                      >
                        {query}
                      </button>
                    ))}
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
                    <SendIcon className="h-4 w-4" />
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
