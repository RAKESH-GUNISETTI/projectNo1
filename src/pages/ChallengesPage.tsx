import { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Code, Database, ShieldCheck, Server, Award, Lock, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Algorithm' | 'Frontend' | 'Backend' | 'Database' | 'Security';
  xp: number;
  isLocked: boolean;
  icon: React.ReactNode;
  status?: 'not_started' | 'in_progress' | 'completed';
  timeSpent?: number;
}

interface ChallengeProgress {
  challenge_id: string;
  user_id: string;
  status: string;
  time_spent: number;
  started_at: string;
  completed_at: string | null;
  id: string;
}

const ChallengesPage = () => {
  const navigate = useNavigate();
  const { user, profile, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const isLoggedIn = !!user;
  
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userChallengeProgress, setUserChallengeProgress] = useState<Record<string, ChallengeProgress>>({});
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [claimingReward, setClaimingReward] = useState<string | null>(null);

  const initialChallenges: Challenge[] = [
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

  useEffect(() => {
    setChallenges(initialChallenges.map(challenge => ({
      ...challenge,
      isLocked: challenge.id === "c1" ? false : !isLoggedIn,
    })));
    
    if (user) {
      fetchUserChallengeProgress();
    }
  }, [isLoggedIn, user]);

  const fetchUserChallengeProgress = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('challenge_progress')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) {
        throw error;
      }
      
      const progressRecord: Record<string, ChallengeProgress> = {};
      if (data) {
        data.forEach((progress) => {
          progressRecord[progress.challenge_id] = progress as ChallengeProgress;
        });
      }
      
      setUserChallengeProgress(progressRecord);
      
      setChallenges(prevChallenges => 
        prevChallenges.map(challenge => ({
          ...challenge,
          status: progressRecord[challenge.id]?.status as 'not_started' | 'in_progress' | 'completed' || 'not_started',
          timeSpent: progressRecord[challenge.id]?.time_spent || 0,
        }))
      );
      
      const inProgressChallenge = data?.find(
        (progress) => progress.status === 'in_progress'
      );
      if (inProgressChallenge) {
        setActiveChallenge(inProgressChallenge.challenge_id);
      }
    } catch (error) {
      console.error('Error fetching challenge progress:', error);
      toast({
        title: "Error",
        description: "Failed to load your challenge progress.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startChallenge = async (challengeId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to start this challenge.",
        variant: "default",
      });
      navigate('/login');
      return;
    }
    
    if (activeChallenge && activeChallenge !== challengeId) {
      toast({
        title: "Active Challenge",
        description: "You already have an active challenge. Complete or quit it before starting a new one.",
        variant: "default",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const progress = userChallengeProgress[challengeId];
      
      if (progress && progress.status === 'completed') {
        toast({
          title: "Challenge Completed",
          description: "You've already completed this challenge!",
          variant: "default",
        });
        return;
      }
      
      const now = new Date().toISOString();
      
      if (!progress) {
        const { error } = await supabase
          .from('challenge_progress')
          .insert([{
            challenge_id: challengeId,
            user_id: user.id,
            status: 'in_progress',
            time_spent: 0,
            started_at: now,
            completed_at: null
          }]);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('challenge_progress')
          .update({
            status: 'in_progress',
            started_at: now
          })
          .eq('challenge_id', challengeId)
          .eq('user_id', user.id);
          
        if (error) throw error;
      }
      
      setActiveChallenge(challengeId);
      
      setChallenges(prevChallenges => 
        prevChallenges.map(challenge => 
          challenge.id === challengeId 
            ? { ...challenge, status: 'in_progress' } 
            : challenge
        )
      );
      
      navigate(`/challenges/${challengeId}`);
      
      toast({
        title: "Challenge Started",
        description: "Good luck with your challenge!",
      });
    } catch (error) {
      console.error('Error starting challenge:', error);
      toast({
        title: "Error",
        description: "Failed to start the challenge. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const completeChallenge = async (challengeId: string) => {
    if (!user) return;
    
    try {
      setClaimingReward(challengeId);
      
      const challenge = challenges.find(c => c.id === challengeId);
      if (!challenge) return;
      
      const now = new Date().toISOString();
      const { error } = await supabase
        .from('challenge_progress')
        .update({
          status: 'completed',
          completed_at: now
        })
        .eq('challenge_id', challengeId)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          credits: (profile?.credits || 0) + challenge.xp
        })
        .eq('id', user.id);
        
      if (profileError) throw profileError;
      
      setActiveChallenge(null);
      setChallenges(prevChallenges => 
        prevChallenges.map(challenge => 
          challenge.id === challengeId 
            ? { ...challenge, status: 'completed' } 
            : challenge
        )
      );
      
      toast({
        title: "Challenge Completed!",
        description: `Congratulations! You've earned ${challenge.xp} XP.`,
      });
    } catch (error) {
      console.error('Error completing challenge:', error);
      toast({
        title: "Error",
        description: "Failed to complete the challenge. Please try again.",
        variant: "destructive",
      });
    } finally {
      setClaimingReward(null);
    }
  };

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

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'in_progress':
        return <Badge className="bg-orange-500/10 text-orange-500">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-500">Completed</Badge>;
      default:
        return null;
    }
  };

  const handleChallengeClick = (challenge: Challenge) => {
    if (challenge.isLocked) {
      toast({
        title: "Login Required",
        description: "Please login to access this challenge.",
        variant: "default",
      });
      navigate('/login');
    } else if (challenge.status === 'completed') {
      navigate(`/challenges/${challenge.id}`);
    } else {
      startChallenge(challenge.id);
    }
  };

  if (authLoading) {
    return (
      <MainLayout>
        <div className="page-container py-8 flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

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
                    {challenge.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge className={`${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge className={`${getCategoryColor(challenge.category)}`}>
                      {challenge.category}
                    </Badge>
                    {getStatusBadge(challenge.status)}
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
                    {challenge.timeSpent && challenge.timeSpent > 0 && (
                      <div className="flex items-center gap-1 ml-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(challenge.timeSpent / 60)}m {challenge.timeSpent % 60}s
                        </span>
                      </div>
                    )}
                  </div>
                  {challenge.status === 'completed' ? (
                    <Button
                      onClick={() => navigate(`/challenges/${challenge.id}`)}
                      variant="outline"
                      className="text-green-500 border-green-500/50"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Completed
                    </Button>
                  ) : challenge.status === 'in_progress' ? (
                    <Button
                      onClick={() => navigate(`/challenges/${challenge.id}`)}
                      variant="secondary"
                      className="text-orange-500"
                    >
                      Continue Challenge
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleChallengeClick(challenge)}
                      variant={challenge.isLocked ? "outline" : "default"}
                    >
                      {challenge.isLocked ? "Login to Unlock" : "Start Challenge"}
                    </Button>
                  )}
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
