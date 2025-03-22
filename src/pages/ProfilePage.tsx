
import { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Trophy, Star, Clock, Zap, CheckCircle2 } from "lucide-react";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    credits: 120,
    level: 3,
    progress: 65,
    totalChallenges: 18,
    completedChallenges: 12,
    pendingChallenges: 3,
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "React", level: 70 },
      { name: "Python", level: 60 },
      { name: "Node.js", level: 75 }
    ],
    recentActivity: [
      { type: "challenge", name: "React State Management", date: "2023-07-15", status: "completed", points: 15 },
      { type: "chat", name: "API Authentication Question", date: "2023-07-13", status: "completed", points: 0 },
      { type: "code", name: "Debug React Component", date: "2023-07-10", status: "completed", points: 10 },
      { type: "challenge", name: "Full-Stack App Creation", date: "2023-07-05", status: "in-progress", points: 0 }
    ]
  });

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const ActivityItem = ({ activity }: { activity: any }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        {activity.type === 'challenge' && <Trophy className="h-5 w-5 text-yellow-500" />}
        {activity.type === 'chat' && <Zap className="h-5 w-5 text-blue-500" />}
        {activity.type === 'code' && <Star className="h-5 w-5 text-purple-500" />}
        <div>
          <p className="font-medium">{activity.name}</p>
          <p className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {activity.status === 'completed' && (
          <span className="flex items-center text-sm text-green-500">
            <CheckCircle2 className="h-4 w-4 mr-1" /> 
            {activity.points > 0 ? `+${activity.points} pts` : 'Completed'}
          </span>
        )}
        {activity.status === 'in-progress' && (
          <span className="flex items-center text-sm text-amber-500">
            <Clock className="h-4 w-4 mr-1" /> In Progress
          </span>
        )}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="page-container py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-muted-foreground mb-8">
            Track your progress, credits, and completed tasks
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* User Profile Card */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-4">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://github.com/shadcn.png" alt={userData.name} />
                    <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{userData.name}</CardTitle>
                  <CardDescription>{userData.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Level {userData.level}</span>
                      <span className="text-sm text-muted-foreground">{userData.progress}%</span>
                    </div>
                    <Progress value={userData.progress} className="h-2" />
                  </div>

                  <div className="p-4 rounded-lg bg-primary/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Your Credits</p>
                        <p className="text-2xl font-bold">{userData.credits}</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10">
                        Add More
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-medium">Skills</h3>
                    <div className="space-y-3">
                      {userData.skills.map((skill, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Dashboard */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Your Progress Dashboard</CardTitle>
                <CardDescription>
                  Track your achievements and ongoing activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                    <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 rounded-lg bg-secondary/40 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Total Challenges</p>
                        <p className="text-2xl font-bold">{userData.totalChallenges}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary/40 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Completed</p>
                        <p className="text-2xl font-bold">{userData.completedChallenges}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary/40 text-center">
                        <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                        <p className="text-2xl font-bold">{userData.pendingChallenges}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
                    <div className="space-y-1">
                      {userData.recentActivity.slice(0, 3).map((activity, index) => (
                        <ActivityItem key={index} activity={activity} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="activity">
                    <h3 className="text-lg font-medium mb-3">All Activity</h3>
                    <div className="space-y-1">
                      {userData.recentActivity.map((activity, index) => (
                        <div key={index}>
                          <ActivityItem activity={activity} />
                          {index < userData.recentActivity.length - 1 && <Separator />}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="challenges">
                    <h3 className="text-lg font-medium mb-3">Your Challenges</h3>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-secondary/20 border border-border">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">React State Management</h4>
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">Completed</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Build a complex state management system using React Context or Redux</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                          <span>15 points earned</span>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-secondary/20 border border-border">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Full-Stack App Creation</h4>
                          <span className="text-xs bg-amber-500/20 text-amber-500 px-2 py-1 rounded">In Progress</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Create a full-stack application with React, Node.js, and a database of your choice</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Progress value={30} className="h-1.5 w-24 mr-2" />
                          <span>30% completed</span>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-secondary/20 border border-border">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Debug React Component</h4>
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">Completed</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Fix bugs in a complex React component with performance issues</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                          <span>10 points earned</span>
                        </div>
                      </div>
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
