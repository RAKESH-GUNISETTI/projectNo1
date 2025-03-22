
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, Award, CheckCircle2, Clock, User, Mail, Calendar } from 'lucide-react';

interface CompletedTask {
  id: string;
  title: string;
  type: string;
  date: string;
  points: number;
}

const mockCompletedTasks: CompletedTask[] = [
  {
    id: "1",
    title: "Build a Responsive Nav Menu",
    type: "Challenge",
    date: "2023-10-15",
    points: 100
  },
  {
    id: "2",
    title: "Optimize Database Queries",
    type: "Challenge",
    date: "2023-10-20",
    points: 250
  },
  {
    id: "3",
    title: "AI Chat Completion",
    type: "Interaction",
    date: "2023-10-25",
    points: 50
  }
];

const ProfilePage = () => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>(mockCompletedTasks);
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <p>Loading profile...</p>
        </div>
      </MainLayout>
    );
  }

  if (!user || !profile) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please sign in to view your profile</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate('/login')} className="w-full">
                Go to Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const joinedDate = new Date(user.created_at || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const totalPoints = completedTasks.reduce((sum, task) => sum + task.points, 0);

  return (
    <MainLayout>
      <div className="page-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Card */}
            <Card className="md:max-w-sm w-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <CardTitle className="text-2xl">My Profile</CardTitle>
                    <CardDescription>Manage your account</CardDescription>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Username</span>
                  </div>
                  <p className="font-medium">{profile.username || 'Not set'}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Email</span>
                  </div>
                  <p className="font-medium">{user.email}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Joined</span>
                  </div>
                  <p className="font-medium">{joinedDate}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Credits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{profile.credits}</p>
                    {profile.is_premium && (
                      <span className="bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400 text-xs px-2 py-1 rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                </div>
                
                <Alert>
                  <Award className="h-4 w-4" />
                  <AlertTitle>Achievement Progress</AlertTitle>
                  <AlertDescription>
                    You've earned {totalPoints} points from completed tasks and challenges!
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
            
            {/* Activity Tabs */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Activity & Progress</CardTitle>
                <CardDescription>Track your ByteBolt journey</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="completed">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
                    <TabsTrigger value="history">Activity History</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="completed" className="space-y-4">
                    {completedTasks.length > 0 ? (
                      completedTasks.map((task) => (
                        <div 
                          key={task.id} 
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded mr-2">
                                  {task.type}
                                </span>
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{new Date(task.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="font-medium">{task.points} points</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No completed tasks yet. Start a challenge!</p>
                        <Button className="mt-4" onClick={() => navigate('/challenges')}>
                          View Challenges
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="history">
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Activity tracking coming soon!</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        We're working on a comprehensive activity history feature.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
