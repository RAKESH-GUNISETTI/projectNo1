
import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Terminal, Bug, GitCompare, Zap, Copy, CheckCircle, Loader2 } from 'lucide-react';
import { generateAIResponse } from '@/services/aiChatService';

const CodeGuidePage = () => {
  const { toast } = useToast();
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [inputPrompt, setInputPrompt] = useState('');
  const [inputLanguage, setInputLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [result, setResult] = useState('');
  const [currentTab, setCurrentTab] = useState('generator');

  const handleCopyCode = (code: string, snippetId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(snippetId);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleSubmit = async () => {
    if (!inputPrompt && currentTab === 'generator') {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    if (!inputCode && (currentTab === 'debugger' || currentTab === 'enhancer')) {
      toast({
        title: "Error",
        description: "Please enter code to process",
        variant: "destructive",
      });
      return;
    }

    if ((!inputCode || !inputLanguage || !targetLanguage) && currentTab === 'converter') {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      let prompt = '';
      
      switch (currentTab) {
        case 'generator':
          prompt = `Generate code for the following request: ${inputPrompt}. Please provide only the code and brief explanations.`;
          break;
        case 'debugger':
          prompt = `Debug the following code and explain any issues found:\n\n${inputCode}`;
          break;
        case 'converter':
          prompt = `Convert the following code from ${inputLanguage} to ${targetLanguage}:\n\n${inputCode}`;
          break;
        case 'enhancer':
          prompt = `Enhance the following code to improve its time and space complexity, and provide feedback on code style:\n\n${inputCode}`;
          break;
      }

      const response = await generateAIResponse(prompt);
      setResult(response);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setInputCode('');
    setInputPrompt('');
    setInputLanguage('');
    setTargetLanguage('');
    setResult('');
  };

  return (
    <MainLayout>
      <div className="page-container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Code Tools</h1>
          <p className="text-muted-foreground mb-8">
            Powerful tools to help you generate, debug, convert, and enhance your code
          </p>

          <Tabs defaultValue="generator" className="w-full" onValueChange={(value) => {
            setCurrentTab(value);
            resetForm();
          }}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="generator">
                <Terminal className="mr-2 h-4 w-4" />
                Code Generator
              </TabsTrigger>
              <TabsTrigger value="debugger">
                <Bug className="mr-2 h-4 w-4" />
                Code Debugger
              </TabsTrigger>
              <TabsTrigger value="converter">
                <GitCompare className="mr-2 h-4 w-4" />
                Code Converter
              </TabsTrigger>
              <TabsTrigger value="enhancer">
                <Zap className="mr-2 h-4 w-4" />
                Code Enhancer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generator" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Code</CardTitle>
                  <CardDescription>
                    Describe what you need, and we'll generate the code for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="prompt">What would you like to generate?</Label>
                      <Textarea 
                        id="prompt"
                        placeholder="E.g., Create a React component that displays a user profile with avatar, name, and bio"
                        className="min-h-[120px]"
                        value={inputPrompt}
                        onChange={(e) => setInputPrompt(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Terminal className="mr-2 h-4 w-4" />
                          Generate Code
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {result && (
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <pre className="p-4 rounded-md bg-secondary/30 overflow-x-auto whitespace-pre-wrap">
                        <code>{result}</code>
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 opacity-70 hover:opacity-100 bg-background/50"
                        onClick={() => handleCopyCode(result, 'generated-code')}
                      >
                        {copiedSnippet === 'generated-code' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="debugger" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Debug Code</CardTitle>
                  <CardDescription>
                    Paste your code and we'll help you find and fix issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="code-to-debug">Your Code</Label>
                      <Textarea 
                        id="code-to-debug"
                        placeholder="Paste your code here"
                        className="min-h-[200px] font-mono text-sm"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Debugging...
                        </>
                      ) : (
                        <>
                          <Bug className="mr-2 h-4 w-4" />
                          Debug Code
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {result && (
                <Card>
                  <CardHeader>
                    <CardTitle>Debug Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <pre className="p-4 rounded-md bg-secondary/30 overflow-x-auto whitespace-pre-wrap">
                        <code>{result}</code>
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 opacity-70 hover:opacity-100 bg-background/50"
                        onClick={() => handleCopyCode(result, 'debug-result')}
                      >
                        {copiedSnippet === 'debug-result' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="converter" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Convert Code</CardTitle>
                  <CardDescription>
                    Convert your code from one programming language to another
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="source-language">Source Language</Label>
                        <Input 
                          id="source-language"
                          placeholder="E.g., Python"
                          value={inputLanguage}
                          onChange={(e) => setInputLanguage(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="target-language">Target Language</Label>
                        <Input 
                          id="target-language"
                          placeholder="E.g., JavaScript"
                          value={targetLanguage}
                          onChange={(e) => setTargetLanguage(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="code-to-convert">Your Code</Label>
                      <Textarea 
                        id="code-to-convert"
                        placeholder="Paste your code here"
                        className="min-h-[200px] font-mono text-sm"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <GitCompare className="mr-2 h-4 w-4" />
                          Convert Code
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {result && (
                <Card>
                  <CardHeader>
                    <CardTitle>Converted Code ({targetLanguage})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <pre className="p-4 rounded-md bg-secondary/30 overflow-x-auto whitespace-pre-wrap">
                        <code>{result}</code>
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 opacity-70 hover:opacity-100 bg-background/50"
                        onClick={() => handleCopyCode(result, 'converted-code')}
                      >
                        {copiedSnippet === 'converted-code' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="enhancer" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Enhance Code</CardTitle>
                  <CardDescription>
                    Improve your code's performance, readability, and style
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="code-to-enhance">Your Code</Label>
                      <Textarea 
                        id="code-to-enhance"
                        placeholder="Paste your code here"
                        className="min-h-[200px] font-mono text-sm"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enhancing...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Enhance Code
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {result && (
                <Card>
                  <CardHeader>
                    <CardTitle>Enhanced Code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <pre className="p-4 rounded-md bg-secondary/30 overflow-x-auto whitespace-pre-wrap">
                        <code>{result}</code>
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 opacity-70 hover:opacity-100 bg-background/50"
                        onClick={() => handleCopyCode(result, 'enhanced-code')}
                      >
                        {copiedSnippet === 'enhanced-code' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default CodeGuidePage;
