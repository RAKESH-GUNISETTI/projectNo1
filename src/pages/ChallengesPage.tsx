
import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Code, Database, ShieldCheck, Server, Award, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Algorithm' | 'Frontend' | 'Backend' | 'Database' | 'Security';
  xp: number;
  isLocked: boolean;
  icon: React.ReactNode;
}

const ChallengesPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(false); // This would come from your auth context in a real app

  const challenges: Challenge[] = [
    {
      id: "c1",
      title: "Build a Responsive Nav Menu",
      description: "Create a responsive navigation menu that adapts to different screen sizes using CSS and JavaScript.",
      difficulty: "Beginner",
      category: "Frontend",
      xp: 100,
      isLocked: false,
      icon: <Code className="h-5 w-5" />
    },
    {
      id: "c2",
      title: "Optimize Database Queries",
      description: "Analyze and optimize a set of SQL queries to improve performance of a database with millions of records.",
      difficulty: "Intermediate",
      category: "Database",
      xp: 250,
      isLocked: !isLoggedIn,
      icon: <Database className="h-5 w-5" />
    },
    {
      id: "c3",
      title: "Implement OAuth Authentication",
      description: "Build a secure OAuth 2.0 authentication system for a web application.",
      difficulty: "Intermediate",
      category: "Security",
      xp: 300,
      isLocked: !isLoggedIn,
      icon: <ShieldCheck className="h-5 w-5" />
    },
    {
      id: "c4",
      title: "Create a RESTful API",
      description: "Design and implement a RESTful API for a resource management system using Node.js and Express.",
      difficulty: "Intermediate",
      category: "Backend",
      xp: 250,
      isLocked: !isLoggedIn,
      icon: <Server className="h-5 w-5" />
    },
    {
      id: "c5",
      title: "Graph Traversal Algorithms",
      description: "Implement and compare the performance of BFS and DFS algorithms for a complex graph problem.",
      difficulty: "Advanced",
      category: "Algorithm",
      xp: 500,
      isLocked: !isLoggedIn,
      icon: <Brain className="h-5 w-5" />
    },
    {
      id: "c6",
      title: "Build a State Management System",
      description: "Create a custom state management solution for a React application without using existing libraries.",
      difficulty: "Advanced",
      category: "Frontend",
      xp: 450,
      isLocked: !isLoggedIn,
      icon: <Code className="h-5 w-5" />
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'Intermediate':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'Advanced':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return 'bg-primary/10 text-primary hover:bg-primary/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Algorithm':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
      case 'Frontend':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 'Backend':
        return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20';
      case 'Database':
        return 'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20';
      case 'Security':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      default:
        return 'bg-primary/10 text-primary hover:bg-primary/20';
    }
  };

  const handleChallengeClick = (challenge: Challenge) => {
    if (challenge.isLocked) {
      navigate('/login');
    } else {
      navigate(`/challenges/${challenge.id}`);
    }
  };

  return (
    <MainLayout>
      <div className="page-container py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Tech Challenges</h1>
          <p className="text-muted-foreground mb-8">
            Test your skills with hands-on challenges across different domains of technology
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <Card 
                key={challenge.id}
                className={`${
                  challenge.isLocked ? 'opacity-70' : 'hover:shadow-lg'
                } transition-all`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {challenge.icon}
                      </div>
                      <CardTitle className="text-xl">{challenge.title}</CardTitle>
                    </div>
                    {challenge.isLocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge className={`${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge className={`${getCategoryColor(challenge.category)}`}>
                      {challenge.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {challenge.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium">{challenge.xp} XP</span>
                  </div>
                  <Button
                    onClick={() => handleChallengeClick(challenge)}
                    variant={challenge.isLocked ? "outline" : "default"}
                  >
                    {challenge.isLocked ? "Login to Unlock" : "Start Challenge"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChallengesPage;
