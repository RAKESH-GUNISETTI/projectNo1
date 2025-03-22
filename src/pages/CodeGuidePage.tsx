
import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, CheckCircle } from 'lucide-react';

const CodeGuidePage = () => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopyCode = (code: string, snippetId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(snippetId);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const CodeSnippet = ({ 
    id, 
    code, 
    language 
  }: { 
    id: string; 
    code: string; 
    language: string;
  }) => (
    <div className="relative">
      <pre className="p-4 rounded-md bg-secondary/30 overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 h-8 w-8 opacity-70 hover:opacity-100 bg-background/50"
        onClick={() => handleCopyCode(code, id)}
      >
        {copiedSnippet === id ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <MainLayout>
      <div className="page-container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Code Guide</h1>
          <p className="text-muted-foreground mb-8">
            Learn best practices and explore code snippets for various technologies
          </p>

          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="react">React</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="node">Node.js</TabsTrigger>
            </TabsList>

            <TabsContent value="javascript" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Modern JavaScript Features</CardTitle>
                  <CardDescription>
                    Essential ES6+ features every JavaScript developer should know
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Arrow Functions</h3>
                    <p className="text-muted-foreground mb-3">
                      Arrow functions provide a concise syntax and lexically bind the this value.
                    </p>
                    <CodeSnippet 
                      id="js-arrow" 
                      language="javascript"
                      code={`// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With implicit return
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);`} 
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Destructuring</h3>
                    <p className="text-muted-foreground mb-3">
                      Destructuring makes it easy to extract values from arrays or properties from objects.
                    </p>
                    <CodeSnippet 
                      id="js-destructuring" 
                      language="javascript"
                      code={`// Object destructuring
const person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const { name, age } = person;
console.log(name, age); // John 30

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [primaryColor, secondaryColor] = colors;
console.log(primaryColor, secondaryColor); // red green`} 
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Spread Operator</h3>
                    <p className="text-muted-foreground mb-3">
                      The spread operator expands an iterable into individual elements.
                    </p>
                    <CodeSnippet 
                      id="js-spread" 
                      language="javascript"
                      code={`// Combining arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Copying objects with additional properties
const user = { id: 1, name: 'John' };
const userWithRole = { ...user, role: 'Admin' };
console.log(userWithRole); // { id: 1, name: 'John', role: 'Admin' }`} 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="react" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>React Hooks</CardTitle>
                  <CardDescription>
                    Essential hooks for functional React components
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">useState Hook</h3>
                    <p className="text-muted-foreground mb-3">
                      useState allows functional components to use state.
                    </p>
                    <CodeSnippet 
                      id="react-usestate" 
                      language="javascript"
                      code={`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`} 
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">useEffect Hook</h3>
                    <p className="text-muted-foreground mb-3">
                      useEffect lets you perform side effects in functional components.
                    </p>
                    <CodeSnippet 
                      id="react-useeffect" 
                      language="javascript"
                      code={`import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Cleanup function
    return () => {
      // Cancel requests or clean up resources
    };
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}`} 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="python" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Python Best Practices</CardTitle>
                  <CardDescription>
                    Clean Python code patterns and techniques
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">List Comprehensions</h3>
                    <p className="text-muted-foreground mb-3">
                      List comprehensions offer a concise way to create lists.
                    </p>
                    <CodeSnippet 
                      id="python-list-comp" 
                      language="python"
                      code={`# Traditional approach
squares = []
for i in range(10):
    squares.append(i * i)

# Using list comprehension
squares = [i * i for i in range(10)]

# With conditional
even_squares = [i * i for i in range(10) if i % 2 == 0]

print(squares)     # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
print(even_squares) # [0, 4, 16, 36, 64]`} 
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Context Managers</h3>
                    <p className="text-muted-foreground mb-3">
                      The 'with' statement simplifies resource management.
                    </p>
                    <CodeSnippet 
                      id="python-context" 
                      language="python"
                      code={`# File handling with context manager
with open('file.txt', 'r') as file:
    content = file.read()
    # File is automatically closed after the block

# Custom context manager
from contextlib import contextmanager

@contextmanager
def managed_resource():
    print("Acquiring resource...")
    resource = {"data": "important data"}
    try:
        yield resource
    finally:
        print("Releasing resource...")

with managed_resource() as resource:
    print(f"Using resource: {resource['data']}")`} 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="node" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Node.js Patterns</CardTitle>
                  <CardDescription>
                    Common patterns for building Node.js applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Async/Await with Express</h3>
                    <p className="text-muted-foreground mb-3">
                      Using async/await with Express.js for cleaner route handlers.
                    </p>
                    <CodeSnippet 
                      id="node-async" 
                      language="javascript"
                      code={`const express = require('express');
const app = express();

// Middleware for catching async errors
const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

// Route handler with async/await
app.get('/users/:id', asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await db.users.findById(userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`} 
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Environment Configuration</h3>
                    <p className="text-muted-foreground mb-3">
                      Best practices for managing environment variables.
                    </p>
                    <CodeSnippet 
                      id="node-env" 
                      language="javascript"
                      code={`// config.js
require('dotenv').config();

const config = {
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'myapp',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  jwtSecret: process.env.JWT_SECRET,
  // Validate required environment variables
  validate() {
    const required = ['DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      throw new Error(
        \`Missing required environment variables: \${missing.join(', ')}\`
      );
    }
    
    return this;
  }
};

// Export validated config
module.exports = config.validate();`} 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default CodeGuidePage;
